import { types } from '../proto/generated.js';
import { signAndBroadcast, type SignerHandle, type BroadcastResult } from './buildTx';
import { hexToBytes } from '../lib/bytes';

const SUBMIT_WORK_TYPE_URL = 'type.googleapis.com/types.MessageSubmitWork';

export interface SubmitWorkInput {
    description: string;
    repoUrl: string;
    demoUrl?: string;
}

export function validateSubmitWorkInput(input: SubmitWorkInput): string | null {
    const description = input.description.trim();
    if (description.length < 1 || description.length > 2000) {
        return 'description must be 1-2000 characters';
    }
    const repoUrl = input.repoUrl.trim();
    if (repoUrl.length < 1 || repoUrl.length > 512) {
        return 'repoUrl is required and must be 1-512 characters';
    }
    if ((input.demoUrl ?? '').length > 512) {
        return 'demoUrl must be 512 characters or fewer';
    }
    return null;
}

export async function submitWork(
    signerAddress: Uint8Array,
    bountyId: string,
    input: SubmitWorkInput,
    signer: SignerHandle
): Promise<BroadcastResult> {
    const validationError = validateSubmitWorkInput(input);
    if (validationError) {
        throw new Error(validationError);
    }

    const msg = types.MessageSubmitWork.create({
        signerAddress,
        bountyId: hexToBytes(bountyId),
        description: input.description.trim(),
        repoUrl: input.repoUrl.trim(),
        demoUrl: input.demoUrl ?? ''
    });
    const msgBytes = types.MessageSubmitWork.encode(msg).finish();

    return signAndBroadcast({ messageType: 'submitWork', typeUrl: SUBMIT_WORK_TYPE_URL, msgBytes }, signer);
}
