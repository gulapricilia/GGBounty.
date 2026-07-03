import { useEffect, useState } from 'react';
import { Activity, Loader2, AlertTriangle, Wallet, RefreshCw } from 'lucide-react';
import { useWallet } from '../wallet/WalletContext';
import { getAccountBalance, getTxHistory, type TxSummary } from '../rpc/canopyRpc';

function formatCnpy(uCnpy: bigint): string {
    return (Number(uCnpy) / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 6 });
}

export function ActivityPage(): JSX.Element {
    const { activeAddress } = useWallet();
    const [balance, setBalance] = useState<bigint | null>(null);
    const [txs, setTxs] = useState<TxSummary[] | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const load = async (): Promise<void> => {
        if (!activeAddress) return;
        setLoading(true);
        setError(null);
        try {
            const [bal, history] = await Promise.all([
                getAccountBalance(activeAddress),
                getTxHistory(activeAddress, 20)
            ]);
            setBalance(bal);
            setTxs(history.results || []);
            setTotalCount(history.totalCount || 0);
        } catch (e) {
            setError(
                e instanceof Error
                    ? `couldn't reach the Canopy node RPC (:50002) - is it running? (${e.message})`
                    : 'failed to load activity'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeAddress]);

    if (!activeAddress) {
        return (
            <div className="card" style={{ padding: 24, maxWidth: 480 }}>
                <p className="text-muted">Create or unlock a wallet to see your activity.</p>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Activity size={18} color="var(--accent)" />
                    <h1 style={{ fontSize: 16 }}>Activity</h1>
                </div>
                <button className="btn btn-ghost" onClick={load} disabled={loading} aria-label="Refresh">
                    <RefreshCw size={14} className={loading ? 'spin' : ''} />
                </button>
            </div>

            {error && (
                <p className="text-error" style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                    <AlertTriangle size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {error}
                </p>
            )}

            <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
                <Wallet size={20} color="var(--accent)" />
                <div>
                    <p className="text-muted" style={{ fontSize: 11 }}>Balance</p>
                    <p style={{ fontSize: 18, fontWeight: 600 }}>
                        {balance === null ? '...' : `${formatCnpy(balance)} CNPY`}
                    </p>
                </div>
            </div>

            <div className="card" style={{ padding: 18 }}>
                <p className="text-muted" style={{ fontSize: 12, marginBottom: 10 }}>
                    Transaction history {totalCount > 0 && `(${totalCount} total)`}
                </p>
                {!txs && !error && (
                    <p className="text-muted" style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
                        <Loader2 size={13} className="spin" /> Loading...
                    </p>
                )}
                {txs && txs.length === 0 && <p className="text-muted" style={{ fontSize: 12 }}>No transactions yet.</p>}
                {txs && txs.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {txs.map((tx) => (
                            <div
                                key={tx.txHash}
                                className="card"
                                style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <span className="mono text-muted" style={{ fontSize: 11.5 }}>
                                    {tx.txHash.slice(0, 14)}...
                                </span>
                                <span className="text-muted" style={{ fontSize: 11.5 }}>height {tx.height}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
