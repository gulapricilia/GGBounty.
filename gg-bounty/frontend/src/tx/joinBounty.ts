import { types } from '../proto/generated.js';
import { signAndBroadcast, type SignerHandle, type BroadcastResult } from './buildTx';
import { hexToBytes } from '../lib/bytes';

const JOIN_BOUNTY_TYPE_URL = 'type.googleapis.com/types.MessageJoinBounty';

export async function joinBounty(
    signerAddress: Uint8Array,
    bountyId: string,
    signer: SignerHandle
): Promise<BroadcastResult> {
    const msg = types.MessageJoinBounty.create({
        signerAddress,
        bountyId: hexToBytes(bountyId)
    });
    const msgBytes = types.MessageJoinBounty.encode(msg).finish();

    return signAndBroadcast({ messageType: 'joinBounty', typeUrl: JOIN_BOUNTY_TYPE_URL, msgBytes }, signer);
}
