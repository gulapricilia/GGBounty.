/**
 * Query client for the Canopy node's own core RPC (default :50002) - separate from the GG
 * Bounty plugin's custom RPC (see rpc/pluginRpc.ts). Endpoints and their request/response
 * shapes are taken directly from plugin/typescript/tutorial/src/rpc_test.ts's own usage
 * (getAccountBalance, waitForTxInclusion), not guessed.
 */

import { CANOPY_RPC_URL } from '../lib/env';

/** Fetch an address's real on-chain CNPY balance (uCNPY). */
export async function getAccountBalance(address: string): Promise<bigint> {
    const res = await fetch(`${CANOPY_RPC_URL}/v1/query/account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
    });
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`getAccountBalance failed: HTTP ${res.status} ${text}`);
    }
    const body = JSON.parse(text) as { amount: number };
    return BigInt(body.amount || 0);
}

export interface TxSummary {
    txHash: string;
    height: number;
    // the node's tx history response includes more fields than this (sender/recipient/type/etc.)
    // depending on version; anything beyond txHash/height is passed through untyped since I
    // haven't verified its exact shape against a running node.
    [key: string]: unknown;
}

export interface TxHistoryPage {
    results: TxSummary[];
    totalCount: number;
}

/** Fetch an address's transaction history (most recent first, per the node's own ordering). */
export async function getTxHistory(address: string, perPage = 20): Promise<TxHistoryPage> {
    const res = await fetch(`${CANOPY_RPC_URL}/v1/query/txs-by-sender`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, perPage })
    });
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`getTxHistory failed: HTTP ${res.status} ${text}`);
    }
    return JSON.parse(text) as TxHistoryPage;
}
