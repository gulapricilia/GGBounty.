import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Loader2, AlertTriangle, Clock, Users, Trophy, Coins } from 'lucide-react';
import { listBounties, type BountyRecord } from '../rpc/pluginRpc';

type SortKey = 'reward-desc' | 'deadline-asc' | 'newest';
type StatusFilter = 'all' | 'open' | 'completed' | 'expired';

function formatCnpy(uCnpy: number): string {
    return (uCnpy / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatDeadline(unixSeconds: number): string {
    const diffMs = unixSeconds * 1000 - Date.now();
    if (diffMs <= 0) return 'expired';
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days >= 1) return `${days}d left`;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    return `${Math.max(hours, 1)}h left`;
}

function shortAddr(addr: string): string {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

const cardLinkStyle: React.CSSProperties = {
    display: 'block',
    padding: 14,
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color 0.15s ease'
};

function BountyCard({ bounty }: { bounty: BountyRecord }): JSX.Element {
    return (
        <Link to={`/bounty/${bounty.id}`} className="card" style={cardLinkStyle}>
            <p style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, marginBottom: 10 }}>{bounty.title}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 500, display: 'flex', gap: 4, alignItems: 'center' }}>
                    <Coins size={13} /> {formatCnpy(bounty.reward)} CNPY
                </span>
                {bounty.status === 1 ? (
                    <span className="badge">
                        <Trophy size={11} /> Completed
                    </span>
                ) : bounty.isExpired ? (
                    <span className="badge" style={{ background: 'var(--bg-3)', color: 'var(--text-2)' }}>
                        Expired
                    </span>
                ) : (
                    <span className="text-muted" style={{ fontSize: 11, display: 'flex', gap: 4, alignItems: 'center' }}>
                        <Clock size={11} /> {formatDeadline(bounty.deadline)}
                    </span>
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-muted mono" style={{ fontSize: 11 }}>
                    by {shortAddr(bounty.creator)}
                </span>
                <span className="text-muted" style={{ fontSize: 11, display: 'flex', gap: 4, alignItems: 'center' }}>
                    <Users size={11} /> {bounty.participantCount}
                </span>
            </div>
        </Link>
    );
}

export function HomePage(): JSX.Element {
    const [bounties, setBounties] = useState<BountyRecord[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<StatusFilter>('all');
    const [sort, setSort] = useState<SortKey>('reward-desc');

    useEffect(() => {
        let cancelled = false;
        listBounties()
            .then((list) => {
                if (!cancelled) setBounties(list);
            })
            .catch((e) => {
                if (!cancelled) {
                    setError(
                        e instanceof Error
                            ? `couldn't reach the plugin RPC (:50010) - is Canopy + the plugin running? (${e.message})`
                            : 'failed to load bounties'
                    );
                }
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const filtered = useMemo(() => {
        if (!bounties) return [];
        let result = bounties;
        if (query.trim()) {
            const q = query.trim().toLowerCase();
            result = result.filter(
                (b) => b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
            );
        }
        if (status === 'open') result = result.filter((b) => b.status === 0 && !b.isExpired);
        if (status === 'completed') result = result.filter((b) => b.status === 1);
        if (status === 'expired') result = result.filter((b) => b.status === 0 && b.isExpired);

        const sorted = [...result];
        if (sort === 'reward-desc') sorted.sort((a, b) => b.reward - a.reward);
        else if (sort === 'deadline-asc') sorted.sort((a, b) => a.deadline - b.deadline);
        else sorted.sort((a, b) => b.createdAt - a.createdAt);
        return sorted;
    }, [bounties, query, status, sort]);

    const featured = filtered.find((b) => b.status === 0 && !b.isExpired) ?? filtered[0];
    const rest = featured ? filtered.filter((b) => b.id !== featured.id) : filtered;
    const completed = (bounties ?? []).filter((b) => b.status === 1).slice(0, 3);

    return (
        <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: 10, top: 11, color: 'var(--text-3)' }} />
                    <input
                        className="input"
                        style={{ paddingLeft: 32 }}
                        placeholder="Search bounties..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <select
                    className="input"
                    style={{ width: 150 }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value as StatusFilter)}
                >
                    <option value="all">All statuses</option>
                    <option value="open">Open</option>
                    <option value="completed">Completed</option>
                    <option value="expired">Expired</option>
                </select>
                <select
                    className="input"
                    style={{ width: 170 }}
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                >
                    <option value="reward-desc">Highest reward</option>
                    <option value="deadline-asc">Deadline soonest</option>
                    <option value="newest">Newest</option>
                </select>
            </div>

            {error && (
                <p className="text-error" style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                    <AlertTriangle size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {error}
                </p>
            )}
            {!bounties && !error && (
                <p className="text-muted" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <Loader2 size={14} className="spin" /> Loading bounties from chain...
                </p>
            )}
            {bounties && bounties.length === 0 && (
                <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                    <p className="text-muted">No bounties yet. Be the first to create one.</p>
                </div>
            )}

            {featured && (
                <Link
                    to={`/bounty/${featured.id}`}
                    className="card"
                    style={{
                        ...cardLinkStyle,
                        background: 'linear-gradient(135deg, var(--accent-soft), transparent)',
                        borderColor: 'var(--accent-dim)'
                    }}
                >
                    <span className="badge" style={{ marginBottom: 8 }}>
                        <Trophy size={11} /> Featured
                    </span>
                    <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>{featured.title}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="text-muted mono" style={{ fontSize: 12 }}>
                            by {shortAddr(featured.creator)} &middot; {featured.participantCount} participants
                        </span>
                        <span style={{ color: 'var(--accent)', fontSize: 18, fontWeight: 600 }}>
                            {formatCnpy(featured.reward)} CNPY
                        </span>
                    </div>
                </Link>
            )}

            {rest.length > 0 && (
                <div>
                    <p className="text-muted" style={{ fontSize: 12, marginBottom: 8 }}>
                        {rest.length} more {rest.length === 1 ? 'bounty' : 'bounties'}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                        {rest.map((b) => (
                            <BountyCard key={b.id} bounty={b} />
                        ))}
                    </div>
                </div>
            )}

            {completed.length > 0 && (
                <div>
                    <p className="text-muted" style={{ fontSize: 12, marginBottom: 8 }}>
                        Recently completed
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {completed.map((b) => (
                            <Link
                                key={b.id}
                                to={`/bounty/${b.id}`}
                                className="card"
                                style={{ ...cardLinkStyle, padding: '10px 14px', display: 'flex', justifyContent: 'space-between' }}
                            >
                                <span style={{ fontSize: 12.5 }}>{b.title}</span>
                                <span className="text-muted mono" style={{ fontSize: 11.5 }}>
                                    winner {b.winner ? shortAddr(b.winner) : '-'} &middot; {formatCnpy(b.reward)} CNPY
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
