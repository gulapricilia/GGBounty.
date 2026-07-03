/**
 * Generic transaction build + sign + broadcast for GG Bounty's plugin-only custom transactions.
 *
 * Mirrors plugin/typescript/tutorial/src/rpc_test.ts's getSignBytes() / buildSignAndSendTx()
 * exactly:
 *   - sign bytes = protobuf-encoded Transaction with the signature field omitted
 *   - time is Date.now() in MICROSECONDS (matches the tutorial's `BigInt(Date.now() * 1000)`)
 *   - for plugin-only message types (everything GG Bounty defines - CreateProfile, and later
 *     CreateBounty, JoinBounty, SubmitWork, SelectWinner, TransferReward), the broadcast JSON
 *     uses `msgTypeUrl` / `msgBytes` (hex) instead of `msg`, because these types are not in
 *     Canopy core's RegisteredMessages and so cannot use the `msg` JSON path that 'send' uses.
 *   - the sign-bytes Transaction object uses camelCase field names (networkId/chainId) per
 *     protobufjs convention, but the final broadcast JSON uses Go's json tags (networkID/
 *     chainID) - this asymmetry is copied verbatim from the tutorial, not invented here.
 */

import { types, google } from '../proto/generated.js';
import { bytesToHex } from '../lib/bytes';
import { CANOPY_RPC_URL, NETWORK_ID, CHAIN_ID } from '../lib/env';

export interface UnsignedPluginMessage {
    /** the ContractConfig.supportedTransactions name, e.g. 'createProfile' */
    messageType: string;
    /** the ContractConfig.transactionTypeUrls entry, e.g. 'type.googleapis.com/types.MessageCreateProfile' */
    typeUrl: string;
    /** the protobuf-encoded message bytes */
    msgBytes: Uint8Array;
}

export interface SignerHandle {
    /** Signs arbitrary bytes and returns the signature plus the public key that produced it. */
    sign: (message: Uint8Array) => { signature: Uint8Array; publicKey: Uint8Array };
}

export interface SubmitOptions {
    fee?: bigint;
    memo?: string;
}

// uCNPY. Placeholder magnitude - CheckTx only rejects a tx if its fee is below the chain's
// configured FeeParams.sendFee (see plugin/src/contract/contract.ts ContractAsync.CheckTx),
// which this code does not yet query. If broadcasts fail with a fee-related error, either query
// `/v1/query/params` for the real minimum or raise this constant.
const DEFAULT_FEE = 10000n;

/** Fetch the current chain height from the Canopy node's query RPC. */
export async function getHeight(): Promise<bigint> {
    const res = await fetch(`${CANOPY_RPC_URL}/v1/query/height`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
    });
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`getHeight failed: HTTP ${res.status} ${text}`);
    }
    const body = JSON.parse(text) as { height: number };
    return BigInt(body.height);
}

function buildSignBytes(
    messageType: string,
    typeUrl: string,
    msgBytes: Uint8Array,
    time: bigint,
    createdHeight: bigint,
    fee: bigint,
    memo: string,
    networkId: bigint,
    chainId: bigint
): Uint8Array {
    // google.protobuf.Any uses snake_case field names (type_url, not typeUrl) - see the
    // tutorial's identical comment in getSignBytes().
    const anyMsg = google.protobuf.Any.create({ type_url: typeUrl, value: msgBytes });

    const txData: Record<string, unknown> = {
        messageType,
        msg: anyMsg,
        signature: null,
        createdHeight: Number(createdHeight),
        time: Number(time),
        fee: Number(fee),
        networkId: Number(networkId),
        chainId: Number(chainId)
    };
    // Don't include memo field if empty - Go proto omits empty strings (matches tutorial).
    if (memo) {
        txData.memo = memo;
    }
    const tx = types.Transaction.create(txData);
    return types.Transaction.encode(tx).finish();
}

export interface BroadcastResult {
    hash: string;
    /** the chain height fetched and used when building this tx's sign bytes */
    height: bigint;
    /** the microsecond timestamp used when building this tx's sign bytes */
    time: bigint;
}

/**
 * Builds, signs (locally, via the caller-supplied signer), and broadcasts a GG Bounty custom
 * transaction to the Canopy node's query/tx RPC. Returns the transaction hash plus the
 * height/time actually used, since some transactions derive a deterministic on-chain id from
 * those values (e.g. Bounty.id - see plugin/src/contract/contract.ts's deriveBountyId, which
 * every caller deriving that id client-side must mirror exactly).
 */
export async function signAndBroadcast(
    unsigned: UnsignedPluginMessage,
    signer: SignerHandle,
    options: SubmitOptions = {}
): Promise<BroadcastResult> {
    const height = await getHeight();
    const time = BigInt(Date.now()) * 1000n; // microseconds, matching the tutorial's convention
    const fee = options.fee ?? DEFAULT_FEE;
    const memo = options.memo ?? '';

    const signBytes = buildSignBytes(
        unsigned.messageType,
        unsigned.typeUrl,
        unsigned.msgBytes,
        time,
        height,
        fee,
        memo,
        NETWORK_ID,
        CHAIN_ID
    );

    const { signature, publicKey } = signer.sign(signBytes);

    const txJSON: Record<string, unknown> = {
        type: unsigned.messageType,
        msgTypeUrl: unsigned.typeUrl,
        msgBytes: bytesToHex(unsigned.msgBytes),
        signature: {
            publicKey: bytesToHex(publicKey),
            signature: bytesToHex(signature)
        },
        time: Number(time),
        createdHeight: Number(height),
        fee: Number(fee),
        memo,
        networkID: Number(NETWORK_ID),
        chainID: Number(CHAIN_ID)
    };

    const res = await fetch(`${CANOPY_RPC_URL}/v1/tx`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txJSON)
    });
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`transaction broadcast failed: HTTP ${res.status} ${text}`);
    }
    // /v1/tx returns the tx hash as a raw JSON string, per the tutorial's buildSignAndSendTx()
    const hash = JSON.parse(text) as string;
    return { hash, height, time };
}
