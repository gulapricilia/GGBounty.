/**
 * CreateProfile transaction helper.
 *
 * Client-side mirror of plugin/src/contract/contract.ts's CheckMessageCreateProfile validation
 * (same length limits), so obviously-invalid input never reaches the network - the plugin's own
 * CheckTx is still the actual source of truth and will reject anything this misses.
 */

import { types } from '../proto/generated.js';
import { signAndBroadcast, type SignerHandle, type BroadcastResult } from './buildTx';

const CREATE_PROFILE_TYPE_URL = 'type.googleapis.com/types.MessageCreateProfile';

export interface CreateProfileInput {
    username: string;
    avatarUrl?: string;
    bio?: string;
}

export function validateCreateProfileInput(input: CreateProfileInput): string | null {
    const username = input.username.trim();
    if (username.length < 1 || username.length > 32) {
        return 'username must be 1-32 characters';
    }
    if ((input.bio ?? '').length > 280) {
        return 'bio must be 280 characters or fewer';
    }
    if ((input.avatarUrl ?? '').length > 512) {
        return 'avatarUrl must be 512 characters or fewer';
    }
    return null;
}

/**
 * Builds, signs, and broadcasts a createProfile transaction for the given signer address.
 * Returns the broadcast result (tx hash + the height/time used to build it).
 */
export async function createProfile(
    signerAddress: Uint8Array,
    input: CreateProfileInput,
    signer: SignerHandle
): Promise<BroadcastResult> {
    const validationError = validateCreateProfileInput(input);
    if (validationError) {
        throw new Error(validationError);
    }

    const msg = types.MessageCreateProfile.create({
        signerAddress,
        username: input.username.trim(),
        avatarUrl: input.avatarUrl ?? '',
        bio: input.bio ?? ''
    });
    const msgBytes = types.MessageCreateProfile.encode(msg).finish();

    return signAndBroadcast(
        { messageType: 'createProfile', typeUrl: CREATE_PROFILE_TYPE_URL, msgBytes },
        signer
    );
}
