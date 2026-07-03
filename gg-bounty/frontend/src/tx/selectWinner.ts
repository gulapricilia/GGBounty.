import { types } from '../proto/generated.js';
import { signAndBroadcast, type SignerHandle, type BroadcastResult } from './buildTx';
import { hexToBytes } from '../lib/bytes';

const SELECT_WINNER_TYPE_URL = 'type.googleapis.com/types.MessageSelectWinner';

/**
 * Selects a winner for a bounty. This single transaction atomically releases the escrowed
 * reward to the winner - see plugin/src/contract/contract.ts's DeliverMessageSelectWinner
 * docblock for why there's no separate "transfer reward" step.
 */
export async function selectWinner(
    signerAddress: Uint8Array,
    bountyId: string,
    winnerAddress: string,
    signer: SignerHandle
): Promise<BroadcastResult> {
    const msg = types.MessageSelectWinner.create({
        signerAddress,
        bountyId: hexToBytes(bountyId),
        winnerAddress: hexToBytes(winnerAddress)
    });
    const msgBytes = types.MessageSelectWinner.encode(msg).finish();

    return signAndBroadcast(
        { messageType: 'selectWinner', typeUrl: SELECT_WINNER_TYPE_URL, msgBytes },
        signer
    );
}
