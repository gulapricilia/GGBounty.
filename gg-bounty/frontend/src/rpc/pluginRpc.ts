/**
 * Query client for the GG Bounty plugin's custom RPC server (default :50010).
 * This is a SEPARATE service from the Canopy node's own query/tx RPC (:50002, see tx/buildTx.ts) -
 * see src/lib/env.ts for why.
 */

import { PLUGIN_RPC_URL } from '../lib/env';
import { bytesToHex } from '../lib/bytes';

export interface ProfileRecord {
    address: string;
    username: string;
    avatarUrl: string;
    bio: string;
    reputation: number;
    totalRewardsEarned: number;
    completedBounties: number;
    createdBounties: number;
    createdAt: number;
    updatedAt: number;
}

export interface ParticipantRecord {
    bountyId: string;
    address: string;
    joinedAt: number;
}

export interface SubmissionRecord {
    bountyId: string;
    submitter: string;
    description: string;
    repoUrl: string;
    demoUrl: string;
    submittedAt: number;
    updatedAt: number;
}

export type BountyStatus = 0 | 1; // 0 = Open, 1 = Completed

export interface BountyRecord {
    id: string;
    creator: string;
    title: string;
    description: string;
    reward: number;
    deadline: number;
    status: BountyStatus;
    participantCount: number;
    submissionCount: number;
    winner: string | null;
    createdAt: number;
    /** computed server-side for display; a passed deadline with no winner selected yet */
    isExpired: boolean;
}

// a never-used address returns an all-zero record (HTTP 200) per the plugin's rpc.ts convention -
// treat that as "no profile yet" rather than a real record.
function isEmptyProfile(p: ProfileRecord): boolean {
    return p.username === '' && p.createdAt === 0;
}

/** Fetch a single address's profile. Returns null if no profile has been created yet. */
export async function getProfile(address: Uint8Array | string): Promise<ProfileRecord | null> {
    const hex = typeof address === 'string' ? address : bytesToHex(address);
    const res = await fetch(`${PLUGIN_RPC_URL}/v1/query/profiles?address=${hex}`);
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`getProfile failed: HTTP ${res.status} ${text}`);
    }
    const body = JSON.parse(text) as { profile: ProfileRecord };
    return isEmptyProfile(body.profile) ? null : body.profile;
}

/** List every profile record on-chain (range read). */
export async function listProfiles(): Promise<ProfileRecord[]> {
    const res = await fetch(`${PLUGIN_RPC_URL}/v1/query/profiles`);
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`listProfiles failed: HTTP ${res.status} ${text}`);
    }
    const body = JSON.parse(text) as { profiles: ProfileRecord[] };
    return body.profiles;
}

/**
 * Polls getProfile() until a profile appears or the timeout elapses. Used right after
 * broadcasting a createProfile tx to confirm it actually landed on-chain (block time is a few
 * seconds, so the record won't be there immediately after the broadcast call returns).
 */
export async function pollProfile(
    address: Uint8Array | string,
    timeoutMs = 20000,
    intervalMs = 1500
): Promise<ProfileRecord> {
    const deadline = Date.now() + timeoutMs;
    let lastErr: unknown = null;
    while (Date.now() < deadline) {
        try {
            const profile = await getProfile(address);
            if (profile) {
                return profile;
            }
        } catch (err) {
            lastErr = err;
        }
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    throw new Error(
        lastErr instanceof Error
            ? `profile not found within timeout: ${lastErr.message}`
            : 'profile not found within timeout'
    );
}

/**
 * Polls getBounty() until its status flips to Completed with the expected winner - used right
 * after broadcasting a selectWinner tx to confirm it landed on-chain.
 */
export async function pollBountyCompleted(
    bountyId: string,
    expectedWinner: string,
    timeoutMs = 20000,
    intervalMs = 1500
): Promise<BountyRecord> {
    const deadline = Date.now() + timeoutMs;
    let lastErr: unknown = null;
    while (Date.now() < deadline) {
        try {
            const bounty = await getBounty(bountyId);
            if (bounty && bounty.status === 1 && bounty.winner?.toLowerCase() === expectedWinner.toLowerCase()) {
                return bounty;
            }
        } catch (err) {
            lastErr = err;
        }
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    throw new Error(
        lastErr instanceof Error
            ? `winner selection not confirmed within timeout: ${lastErr.message}`
            : 'winner selection not confirmed within timeout'
    );
}

/** Fetch a single bounty by its 20-byte hex id. Returns null if it doesn't exist. */
export async function getBounty(id: string): Promise<BountyRecord | null> {
    const res = await fetch(`${PLUGIN_RPC_URL}/v1/query/bounties?id=${id}`);
    if (res.status === 404) {
        return null;
    }
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`getBounty failed: HTTP ${res.status} ${text}`);
    }
    const body = JSON.parse(text) as { bounty: BountyRecord };
    return body.bounty;
}

/** List every bounty record on-chain (range read). */
export async function listBounties(): Promise<BountyRecord[]> {
    const res = await fetch(`${PLUGIN_RPC_URL}/v1/query/bounties`);
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`listBounties failed: HTTP ${res.status} ${text}`);
    }
    const body = JSON.parse(text) as { bounties: BountyRecord[] };
    return body.bounties;
}

/**
 * Polls getBounty() until the bounty appears or the timeout elapses. Used right after
 * broadcasting a createBounty tx to confirm it actually landed on-chain.
 */
export async function pollBounty(id: string, timeoutMs = 20000, intervalMs = 1500): Promise<BountyRecord> {
    const deadline = Date.now() + timeoutMs;
    let lastErr: unknown = null;
    while (Date.now() < deadline) {
        try {
            const bounty = await getBounty(id);
            if (bounty) {
                return bounty;
            }
        } catch (err) {
            lastErr = err;
        }
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    throw new Error(
        lastErr instanceof Error
            ? `bounty not found within timeout: ${lastErr.message}`
            : 'bounty not found within timeout'
    );
}

/** List every address that has joined a bounty. */
export async function getParticipants(bountyId: string): Promise<ParticipantRecord[]> {
    const res = await fetch(`${PLUGIN_RPC_URL}/v1/query/participants?bountyId=${bountyId}`);
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`getParticipants failed: HTTP ${res.status} ${text}`);
    }
    const body = JSON.parse(text) as { participants: ParticipantRecord[] };
    return body.participants;
}

/** Check whether a specific address has joined a bounty. */
export async function hasJoinedBounty(bountyId: string, address: string): Promise<boolean> {
    const res = await fetch(`${PLUGIN_RPC_URL}/v1/query/participants?bountyId=${bountyId}&address=${address}`);
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`hasJoinedBounty failed: HTTP ${res.status} ${text}`);
    }
    const body = JSON.parse(text) as { hasJoined: boolean };
    return body.hasJoined;
}

/** List every submission made to a bounty. */
export async function getSubmissions(bountyId: string): Promise<SubmissionRecord[]> {
    const res = await fetch(`${PLUGIN_RPC_URL}/v1/query/submissions?bountyId=${bountyId}`);
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`getSubmissions failed: HTTP ${res.status} ${text}`);
    }
    const body = JSON.parse(text) as { submissions: SubmissionRecord[] };
    return body.submissions;
}

/** Fetch one address's submission to a bounty, if any. */
export async function getSubmission(bountyId: string, address: string): Promise<SubmissionRecord | null> {
    const res = await fetch(`${PLUGIN_RPC_URL}/v1/query/submissions?bountyId=${bountyId}&address=${address}`);
    if (res.status === 404) {
        return null;
    }
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`getSubmission failed: HTTP ${res.status} ${text}`);
    }
    const body = JSON.parse(text) as { submission: SubmissionRecord };
    return body.submission;
}

/**
 * Polls for a specific address's submission to appear - used right after broadcasting a
 * submitWork tx to confirm it landed on-chain.
 */
export async function pollSubmission(
    bountyId: string,
    address: string,
    timeoutMs = 20000,
    intervalMs = 1500
): Promise<SubmissionRecord> {
    const deadline = Date.now() + timeoutMs;
    let lastErr: unknown = null;
    while (Date.now() < deadline) {
        try {
            const submission = await getSubmission(bountyId, address);
            if (submission) {
                return submission;
            }
        } catch (err) {
            lastErr = err;
        }
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    throw new Error(
        lastErr instanceof Error
            ? `submission not found within timeout: ${lastErr.message}`
            : 'submission not found within timeout'
    );
}

/**
 * Polls getBounty() until it reports the given address has joined - used right after
 * broadcasting a joinBounty tx to confirm it landed on-chain (the Bounty record itself doesn't
 * carry per-participant info, so this polls the participants endpoint instead).
 */
export async function pollJoined(
    bountyId: string,
    address: string,
    timeoutMs = 20000,
    intervalMs = 1500
): Promise<void> {
    const deadline = Date.now() + timeoutMs;
    let lastErr: unknown = null;
    while (Date.now() < deadline) {
        try {
            if (await hasJoinedBounty(bountyId, address)) {
                return;
            }
        } catch (err) {
            lastErr = err;
        }
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
    throw new Error(
        lastErr instanceof Error ? `join not confirmed within timeout: ${lastErr.message}` : 'join not confirmed within timeout'
    );
}
