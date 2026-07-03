/*
This file implements the plugin's own custom RPC endpoints, on top of the SKELETON HTTP server
shipped with the base template.

Canopy core only exposes a single, generic, read-only transport over the unix socket:
`plugin.queryState(height, read)`, which returns raw key/value state at a historical height. The
plugin process owns its HTTP server entirely, so builders may register as many routes as they want
and decode their own keys/protobufs into whatever response shapes they like. Canopy never needs to
know about chain-specific endpoints.

Registered here:
    GET /v1/query/profiles[?height=<uint64>]                 -> list all Profile records (range read)
    GET /v1/query/profiles?address=<hex>[&height=<uint64>]   -> a single address's Profile record
*/

import * as http from 'http';
import Long from 'long';

import { Plugin, PLUGIN_BUILD, Unmarshal } from './plugin.js';
import {
    KeyForProfile,
    ProfilePrefix,
    KeyForBounty,
    BountyPrefix,
    KeyForParticipant,
    ParticipantsByBountyPrefix,
    KeyForSubmission,
    SubmissionsByBountyPrefix
} from './contract.js';
import { types } from '../proto/types.js';

// StartRPCServer() launches the plugin's own HTTP server that exposes custom, chain-specific RPC
// endpoints. Each route uses the detached, read-only queryState() path to fetch state snapshots
// from Canopy.
export function StartRPCServer(plugin: Plugin): void {
    // resolve the listen address from config
    const addr = plugin.config.rpcAddress;
    // if no address is configured, the RPC server is disabled
    if (!addr) {
        console.log('plugin RPC server disabled (no rpcAddress configured)');
        return;
    }

    const server = http.createServer((req, res) => {
        const url = new URL(req.url || '', 'http://localhost');
        if (url.pathname === '/v1/query/profiles') {
            return void handleQueryProfiles(plugin, url, res);
        }
        if (url.pathname === '/v1/query/bounties') {
            return void handleQueryBounties(plugin, url, res);
        }
        if (url.pathname === '/v1/query/participants') {
            return void handleQueryParticipants(plugin, url, res);
        }
        if (url.pathname === '/v1/query/submissions') {
            return void handleQuerySubmissions(plugin, url, res);
        }
        writeJSONError(res, 404, 'not found');
    });

    // split the listen address into host:port (default 0.0.0.0:50010)
    const idx = addr.lastIndexOf(':');
    const host = idx >= 0 ? addr.slice(0, idx) : '0.0.0.0';
    const port = idx >= 0 ? Number(addr.slice(idx + 1)) : Number(addr);

    server.listen(port, host, () => {
        // log the build marker so the running version is obvious in the log
        console.log(`plugin RPC server (${PLUGIN_BUILD}) listening on ${addr}`);
        console.log(
            'plugin RPC server started (routes: GET /v1/query/profiles, GET /v1/query/bounties, ' +
                'GET /v1/query/participants, GET /v1/query/submissions)'
        );
    });

    server.on('error', (err) => {
        console.log(`plugin RPC server error: ${err.message}`);
    });
}

// parseHeight() reads the optional ?height= query param; 0 (default) means "latest committed"
function parseHeight(url: URL): number {
    const raw = url.searchParams.get('height');
    if (!raw) {
        return 0;
    }
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : 0;
}

// isValidAddressHex() checks for exactly 20 bytes (40 hex characters), matching Canopy's address size
function isValidAddressHex(hex: string): boolean {
    return /^[0-9a-fA-F]{40}$/.test(hex);
}

// longToNumber() normalizes a protobuf uint64 (Long | number | undefined) into a plain JS number.
// Profile counters (reputation, bounty counts, reward totals in uCNPY) are not expected to exceed
// Number.MAX_SAFE_INTEGER in practice for this application; if that assumption ever breaks, switch
// this to emit strings instead (the frontend's toBigInt-style parsing would accept either).
function longToNumber(v: Long | number | undefined | null): number {
    if (v === undefined || v === null) {
        return 0;
    }
    return Long.isLong(v) ? v.toNumber() : Number(v);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function profileToJSON(addressHex: string, profile: any): Record<string, unknown> {
    return {
        address: addressHex,
        username: profile?.username || '',
        avatarUrl: profile?.avatarUrl || '',
        bio: profile?.bio || '',
        reputation: longToNumber(profile?.reputation),
        totalRewardsEarned: longToNumber(profile?.totalRewardsEarned),
        completedBounties: longToNumber(profile?.completedBounties),
        createdBounties: longToNumber(profile?.createdBounties),
        createdAt: longToNumber(profile?.createdAt),
        updatedAt: longToNumber(profile?.updatedAt)
    };
}

// handleQueryProfiles() serves both GET /v1/query/profiles (list, range read) and
// GET /v1/query/profiles?address=<hex> (single key read)
async function handleQueryProfiles(plugin: Plugin, url: URL, res: http.ServerResponse): Promise<void> {
    const height = parseHeight(url);
    const addressParam = url.searchParams.get('address');

    if (addressParam) {
        if (!isValidAddressHex(addressParam)) {
            writeJSONError(res, 400, 'address must be 40 hex characters (20 bytes)');
            return;
        }
        const queryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const addrBytes = Buffer.from(addressParam, 'hex');

        const [resp, err] = await plugin.queryState(height, {
            keys: [{ queryId, key: KeyForProfile(addrBytes) }]
        });
        if (err) {
            writeJSONError(res, 500, err.msg);
            return;
        }

        let valueBytes: Uint8Array | null = null;
        for (const r of resp?.results || []) {
            const qid = r.queryId as Long;
            if (qid.equals(queryId)) {
                valueBytes = r.entries?.[0]?.value || null;
            }
        }

        const [decoded, decodeErr] = Unmarshal(valueBytes || new Uint8Array(), types.Profile);
        if (decodeErr) {
            writeJSONError(res, 500, decodeErr.msg);
            return;
        }
        // a never-used address returns an empty (zero-valued) record with HTTP 200, matching the
        // faucet/reward endpoints' convention in TUTORIAL.md
        writeJSON(res, 200, {
            profile: decoded ? profileToJSON(addressParam, decoded) : profileToJSON(addressParam, null)
        });
        return;
    }

    // no ?address - list every Profile record via a range read over the shared prefix.
    // NOTE: `limit` is left unset (proto3 default 0). This assumes the Go-side FSM treats an
    // absent/zero limit as "no cap" - the same assumption TUTORIAL.md's faucet/reward list
    // endpoints make (neither sets `limit` either). I have not verified this against the Go FSM
    // source. If the list endpoint below unexpectedly returns zero results, that's the first
    // thing to check - set an explicit limit (e.g. 1000) instead.
    const queryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    const [resp, err] = await plugin.queryState(height, {
        ranges: [{ queryId, prefix: ProfilePrefix(), reverse: false }]
    });
    if (err) {
        writeJSONError(res, 500, err.msg);
        return;
    }

    const profiles: Array<Record<string, unknown>> = [];
    for (const r of resp?.results || []) {
        const qid = r.queryId as Long;
        if (!qid.equals(queryId)) {
            continue;
        }
        for (const entry of r.entries || []) {
            const [decoded, decodeErr] = Unmarshal(entry.value || new Uint8Array(), types.Profile);
            if (decodeErr || !decoded) {
                continue;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const addrBytes = (decoded as any).address as Uint8Array | undefined;
            profiles.push(profileToJSON(Buffer.from(addrBytes || []).toString('hex'), decoded));
        }
    }
    writeJSON(res, 200, { profiles, count: profiles.length, height });
}

// isValidBountyIdHex() checks for exactly 20 bytes (40 hex characters), matching KeyForBounty
function isValidBountyIdHex(hex: string): boolean {
    return /^[0-9a-fA-F]{40}$/.test(hex);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function bountyToJSON(idHex: string, bounty: any): Record<string, unknown> {
    const deadline = longToNumber(bounty?.deadline);
    // isExpired is computed here, purely for display, using the RPC server's own wall clock -
    // this is safe precisely BECAUSE it's a read-only API response, not consensus state (unlike
    // DeliverTx, which must never use Date.now() - see the determinism notes in contract.ts).
    const nowSeconds = Math.floor(Date.now() / 1000);
    const winnerBytes = bounty?.winner as Uint8Array | undefined;
    return {
        id: idHex,
        creator: Buffer.from((bounty?.creator as Uint8Array) || []).toString('hex'),
        title: bounty?.title || '',
        description: bounty?.description || '',
        reward: longToNumber(bounty?.reward),
        deadline,
        status: bounty?.status ?? 0,
        participantCount: longToNumber(bounty?.participantCount),
        submissionCount: longToNumber(bounty?.submissionCount),
        winner: winnerBytes && winnerBytes.length > 0 ? Buffer.from(winnerBytes).toString('hex') : null,
        createdAt: longToNumber(bounty?.createdAt),
        isExpired: deadline > 0 && deadline < nowSeconds
    };
}

// handleQueryBounties() serves both GET /v1/query/bounties (list, range read) and
// GET /v1/query/bounties?id=<hex> (single key read)
async function handleQueryBounties(plugin: Plugin, url: URL, res: http.ServerResponse): Promise<void> {
    const height = parseHeight(url);
    const idParam = url.searchParams.get('id');

    if (idParam) {
        if (!isValidBountyIdHex(idParam)) {
            writeJSONError(res, 400, 'id must be 40 hex characters (20 bytes)');
            return;
        }
        const queryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const idBytes = Buffer.from(idParam, 'hex');

        const [resp, err] = await plugin.queryState(height, {
            keys: [{ queryId, key: KeyForBounty(idBytes) }]
        });
        if (err) {
            writeJSONError(res, 500, err.msg);
            return;
        }

        let valueBytes: Uint8Array | null = null;
        for (const r of resp?.results || []) {
            const qid = r.queryId as Long;
            if (qid.equals(queryId)) {
                valueBytes = r.entries?.[0]?.value || null;
            }
        }

        const [decoded, decodeErr] = Unmarshal(valueBytes || new Uint8Array(), types.Bounty);
        if (decodeErr) {
            writeJSONError(res, 500, decodeErr.msg);
            return;
        }
        if (!decoded) {
            writeJSONError(res, 404, 'bounty not found');
            return;
        }
        writeJSON(res, 200, { bounty: bountyToJSON(idParam, decoded) });
        return;
    }

    // no ?id - list every Bounty record via a range read over the shared prefix.
    // Same unverified limit=0 assumption as handleQueryProfiles above.
    const queryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    const [resp, err] = await plugin.queryState(height, {
        ranges: [{ queryId, prefix: BountyPrefix(), reverse: false }]
    });
    if (err) {
        writeJSONError(res, 500, err.msg);
        return;
    }

    const bounties: Array<Record<string, unknown>> = [];
    for (const r of resp?.results || []) {
        const qid = r.queryId as Long;
        if (!qid.equals(queryId)) {
            continue;
        }
        for (const entry of r.entries || []) {
            const [decoded, decodeErr] = Unmarshal(entry.value || new Uint8Array(), types.Bounty);
            if (decodeErr || !decoded) {
                continue;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const idBytes = (decoded as any).id as Uint8Array | undefined;
            bounties.push(bountyToJSON(Buffer.from(idBytes || []).toString('hex'), decoded));
        }
    }
    writeJSON(res, 200, { bounties, count: bounties.length, height });
}

// isValidHex20() checks for exactly 20 bytes (40 hex characters) - shared by bountyId/address params
function isValidHex20(hex: string): boolean {
    return /^[0-9a-fA-F]{40}$/.test(hex);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function participantToJSON(bounty: any): Record<string, unknown> {
    return {
        bountyId: Buffer.from((bounty?.bountyId as Uint8Array) || []).toString('hex'),
        address: Buffer.from((bounty?.address as Uint8Array) || []).toString('hex'),
        joinedAt: longToNumber(bounty?.joinedAt)
    };
}

// handleQueryParticipants() serves:
//   GET /v1/query/participants?bountyId=<hex>                 -> list everyone who joined (range read)
//   GET /v1/query/participants?bountyId=<hex>&address=<hex>   -> whether one address has joined
async function handleQueryParticipants(plugin: Plugin, url: URL, res: http.ServerResponse): Promise<void> {
    const height = parseHeight(url);
    const bountyIdParam = url.searchParams.get('bountyId');
    if (!bountyIdParam || !isValidHex20(bountyIdParam)) {
        writeJSONError(res, 400, 'bountyId query param is required and must be 40 hex characters');
        return;
    }
    const bountyIdBytes = Buffer.from(bountyIdParam, 'hex');
    const addressParam = url.searchParams.get('address');

    if (addressParam) {
        if (!isValidHex20(addressParam)) {
            writeJSONError(res, 400, 'address must be 40 hex characters (20 bytes)');
            return;
        }
        const queryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const [resp, err] = await plugin.queryState(height, {
            keys: [{ queryId, key: KeyForParticipant(bountyIdBytes, Buffer.from(addressParam, 'hex')) }]
        });
        if (err) {
            writeJSONError(res, 500, err.msg);
            return;
        }
        let valueBytes: Uint8Array | null = null;
        for (const r of resp?.results || []) {
            const qid = r.queryId as Long;
            if (qid.equals(queryId)) valueBytes = r.entries?.[0]?.value || null;
        }
        const [decoded, decodeErr] = Unmarshal(valueBytes || new Uint8Array(), types.Participant);
        if (decodeErr) {
            writeJSONError(res, 500, decodeErr.msg);
            return;
        }
        writeJSON(res, 200, { hasJoined: !!decoded, participant: decoded ? participantToJSON(decoded) : null });
        return;
    }

    const queryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    const [resp, err] = await plugin.queryState(height, {
        ranges: [{ queryId, prefix: ParticipantsByBountyPrefix(bountyIdBytes), reverse: false }]
    });
    if (err) {
        writeJSONError(res, 500, err.msg);
        return;
    }

    const participants: Array<Record<string, unknown>> = [];
    for (const r of resp?.results || []) {
        const qid = r.queryId as Long;
        if (!qid.equals(queryId)) continue;
        for (const entry of r.entries || []) {
            const [decoded, decodeErr] = Unmarshal(entry.value || new Uint8Array(), types.Participant);
            if (decodeErr || !decoded) continue;
            participants.push(participantToJSON(decoded));
        }
    }
    writeJSON(res, 200, { participants, count: participants.length, height });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function submissionToJSON(submission: any): Record<string, unknown> {
    return {
        bountyId: Buffer.from((submission?.bountyId as Uint8Array) || []).toString('hex'),
        submitter: Buffer.from((submission?.submitter as Uint8Array) || []).toString('hex'),
        description: submission?.description || '',
        repoUrl: submission?.repoUrl || '',
        demoUrl: submission?.demoUrl || '',
        submittedAt: longToNumber(submission?.submittedAt),
        updatedAt: longToNumber(submission?.updatedAt)
    };
}

// handleQuerySubmissions() serves GET /v1/query/submissions?bountyId=<hex>[&address=<hex>]
// - with only bountyId: lists every submission to that bounty (range read)
// - with bountyId + address: a single submitter's submission
async function handleQuerySubmissions(plugin: Plugin, url: URL, res: http.ServerResponse): Promise<void> {
    const height = parseHeight(url);
    const bountyIdParam = url.searchParams.get('bountyId');
    if (!bountyIdParam || !isValidHex20(bountyIdParam)) {
        writeJSONError(res, 400, 'bountyId query param is required and must be 40 hex characters');
        return;
    }
    const bountyIdBytes = Buffer.from(bountyIdParam, 'hex');
    const addressParam = url.searchParams.get('address');

    if (addressParam) {
        if (!isValidHex20(addressParam)) {
            writeJSONError(res, 400, 'address must be 40 hex characters (20 bytes)');
            return;
        }
        const queryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
        const [resp, err] = await plugin.queryState(height, {
            keys: [{ queryId, key: KeyForSubmission(bountyIdBytes, Buffer.from(addressParam, 'hex')) }]
        });
        if (err) {
            writeJSONError(res, 500, err.msg);
            return;
        }
        let valueBytes: Uint8Array | null = null;
        for (const r of resp?.results || []) {
            const qid = r.queryId as Long;
            if (qid.equals(queryId)) valueBytes = r.entries?.[0]?.value || null;
        }
        const [decoded, decodeErr] = Unmarshal(valueBytes || new Uint8Array(), types.Submission);
        if (decodeErr) {
            writeJSONError(res, 500, decodeErr.msg);
            return;
        }
        if (!decoded) {
            writeJSONError(res, 404, 'submission not found');
            return;
        }
        writeJSON(res, 200, { submission: submissionToJSON(decoded) });
        return;
    }

    const queryId = Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    const [resp, err] = await plugin.queryState(height, {
        ranges: [{ queryId, prefix: SubmissionsByBountyPrefix(bountyIdBytes), reverse: false }]
    });
    if (err) {
        writeJSONError(res, 500, err.msg);
        return;
    }

    const submissions: Array<Record<string, unknown>> = [];
    for (const r of resp?.results || []) {
        const qid = r.queryId as Long;
        if (!qid.equals(queryId)) continue;
        for (const entry of r.entries || []) {
            const [decoded, decodeErr] = Unmarshal(entry.value || new Uint8Array(), types.Submission);
            if (decodeErr || !decoded) continue;
            submissions.push(submissionToJSON(decoded));
        }
    }
    writeJSON(res, 200, { submissions, count: submissions.length, height });
}

// writeJSON() writes a successful JSON response with the given status code
function writeJSON(res: http.ServerResponse, status: number, body: unknown): void {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
}

// writeJSONError() writes a JSON error response with the given status code
function writeJSONError(res: http.ServerResponse, status: number, message: string): void {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: message }));
}
