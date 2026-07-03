/**
 * CreateBounty transaction helper.
 *
 * Client-side mirror of plugin/src/contract/contract.ts's CheckMessageCreateBounty validation
 * (same length/positivity limits), so obviously-invalid input never reaches the network - the
 * plugin's own CheckTx is still the actual source of truth.
 *
 * Also mirrors deriveBountyId() from the same file EXACTLY, so the UI can compute the resulting
 * bounty's id right after broadcasting and poll for its on-chain confirmation (see
 * rpc/pluginRpc.ts's pollBounty). If that function's derivation ever changes, this must change
 * identically or the two will disagree on the id.
 */

import Long from 'long';
import { sha256 } from '@noble/hashes/sha256';
import { types } from '../proto/generated.js';
import { signAndBroadcast, type SignerHandle, type BroadcastResult } from './buildTx';
import { bytesToHex, bigUint64BE, concatBytes } from '../lib/bytes';

const CREATE_BOUNTY_TYPE_URL = 'type.googleapis.com/types.MessageCreateBounty';

export interface CreateBountyInput {
    title: string;
    description: string;
    /** reward amount in uCNPY (1 CNPY = 1_000_000 uCNPY, matching the chain's micro-denomination) */
    reward: bigint;
    /** unix seconds; must be strictly after the moment this tx is actually built (checked server-side against tx.time) */
    deadline: bigint;
}

export function validateCreateBountyInput(input: CreateBountyInput): string | null {
    const title = input.title.trim();
    if (title.length < 1 || title.length > 100) {
        return 'title must be 1-100 characters';
    }
    const description = input.description.trim();
    if (description.length < 1 || description.length > 2000) {
        return 'description must be 1-2000 characters';
    }
    if (input.reward <= 0n) {
        return 'reward must be greater than 0';
    }
    if (input.deadline <= BigInt(Math.floor(Date.now() / 1000))) {
        return 'deadline must be in the future';
    }
    return null;
}

/** Mirrors deriveBountyId() in plugin/src/contract/contract.ts exactly - see that function's docblock. */
function deriveBountyId(creator: Uint8Array, title: string, txTimeMicros: bigint, createdHeight: bigint): string {
    const titleBytes = new TextEncoder().encode(title);
    const preimage = concatBytes(creator, titleBytes, bigUint64BE(txTimeMicros), bigUint64BE(createdHeight));
    return bytesToHex(sha256(preimage).slice(0, 20));
}

export interface CreateBountyResult extends BroadcastResult {
    /** the deterministic id this bounty will be stored under, derived client-side */
    bountyId: string;
}

/**
 * Builds, signs, and broadcasts a createBounty transaction. Returns the broadcast result plus
 * the resulting bounty's id (derived client-side, matching the plugin's deriveBountyId exactly),
 * ready to poll for on-chain confirmation.
 */
export async function createBounty(
    signerAddress: Uint8Array,
    input: CreateBountyInput,
    signer: SignerHandle
): Promise<CreateBountyResult> {
    const validationError = validateCreateBountyInput(input);
    if (validationError) {
        throw new Error(validationError);
    }

    const title = input.title.trim();
    const msg = types.MessageCreateBounty.create({
        signerAddress,
        title,
        description: input.description.trim(),
        reward: Long.fromString(input.reward.toString(), true),
        deadline: Long.fromString(input.deadline.toString(), true)
    });
    const msgBytes = types.MessageCreateBounty.encode(msg).finish();

    const broadcastResult = await signAndBroadcast(
        { messageType: 'createBounty', typeUrl: CREATE_BOUNTY_TYPE_URL, msgBytes },
        signer
    );

    const bountyId = deriveBountyId(signerAddress, title, broadcastResult.time, broadcastResult.height);

    return { ...broadcastResult, bountyId };
}
