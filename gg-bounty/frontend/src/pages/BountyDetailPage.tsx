import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Coins,
    Clock,
    Users,
    FileText,
    ExternalLink,
    Loader2,
    AlertTriangle,
    CheckCircle2,
    Trophy,
    Send,
    UserPlus
} from 'lucide-react';
import { useWallet } from '../wallet/WalletContext';
import { hexToBytes } from '../lib/bytes';
import {
    getBounty,
    getParticipants,
    getSubmissions,
    hasJoinedBounty,
    pollJoined,
    pollSubmission,
    pollBountyCompleted,
    type BountyRecord,
    type ParticipantRecord,
    type SubmissionRecord
} from '../rpc/pluginRpc';
import { joinBounty } from '../tx/joinBounty';
import { submitWork, validateSubmitWorkInput } from '../tx/submitWork';
import { selectWinner } from '../tx/selectWinner';

function formatCnpy(uCnpy: number): string {
    return (uCnpy / 1_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function shortAddr(addr: string): string {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
}

type ActionPhase = 'idle' | 'broadcasting' | 'confirming' | 'confirmed' | 'error';

export function BountyDetailPage(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const { activeAddress, isUnlocked, sign } = useWallet();

    const [bounty, setBounty] = useState<BountyRecord | null>(null);
    const [participants, setParticipants] = useState<ParticipantRecord[]>([]);
    const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
    const [hasJoined, setHasJoined] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [joinPhase, setJoinPhase] = useState<ActionPhase>('idle');
    const [joinError, setJoinError] = useState<string | null>(null);

    const [description, setDescription] = useState('');
    const [repoUrl, setRepoUrl] = useState('');
    const [demoUrl, setDemoUrl] = useState('');
    const [submitPhase, setSubmitPhase] = useState<ActionPhase>('idle');
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [selectedWinner, setSelectedWinner] = useState('');
    const [winnerPhase, setWinnerPhase] = useState<ActionPhase>('idle');
    const [winnerError, setWinnerError] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setLoadError(null);
        try {
            const [b, p, s] = await Promise.all([getBounty(id), getParticipants(id), getSubmissions(id)]);
            setBounty(b);
            setParticipants(p);
            setSubmissions(s);
            if (activeAddress) {
                setHasJoined(await hasJoinedBounty(id, activeAddress));
            }
        } catch (e) {
            setLoadError(
                e instanceof Error
                    ? `couldn't reach the plugin RPC (:50010) - is Canopy + the plugin running? (${e.message})`
                    : 'failed to load bounty'
            );
        } finally {
            setLoading(false);
        }
    }, [id, activeAddress]);

    useEffect(() => {
        load();
    }, [load]);

    const isCreator = !!bounty && !!activeAddress && bounty.creator.toLowerCase() === activeAddress.toLowerCase();
    const isOpen = !!bounty && bounty.status === 0 && !bounty.isExpired;
    const mySubmission = submissions.find((s) => s.submitter.toLowerCase() === activeAddress?.toLowerCase());

    const doJoin = async (): Promise<void> => {
        if (!id || !activeAddress) return;
        setJoinError(null);
        setJoinPhase('broadcasting');
        try {
            const addressBytes = hexToBytes(activeAddress);
            await joinBounty(addressBytes, id, { sign });
            setJoinPhase('confirming');
            await pollJoined(id, activeAddress);
            setHasJoined(true);
            setJoinPhase('confirmed');
            await load();
        } catch (e) {
            setJoinPhase('error');
            setJoinError(e instanceof Error ? e.message : 'failed to join bounty');
        }
    };

    const doSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!id || !activeAddress) return;
        const validationError = validateSubmitWorkInput({ description, repoUrl, demoUrl });
        if (validationError) {
            setSubmitPhase('error');
            setSubmitError(validationError);
            return;
        }
        setSubmitError(null);
        setSubmitPhase('broadcasting');
        try {
            const addressBytes = hexToBytes(activeAddress);
            await submitWork(addressBytes, id, { description, repoUrl, demoUrl }, { sign });
            setSubmitPhase('confirming');
            await pollSubmission(id, activeAddress);
            setSubmitPhase('confirmed');
            setDescription('');
            setRepoUrl('');
            setDemoUrl('');
            await load();
        } catch (e) {
            setSubmitPhase('error');
            setSubmitError(e instanceof Error ? e.message : 'failed to submit work');
        }
    };

    const doSelectWinner = async (): Promise<void> => {
        if (!id || !activeAddress || !selectedWinner) return;
        setWinnerError(null);
        setWinnerPhase('broadcasting');
        try {
            const addressBytes = hexToBytes(activeAddress);
            await selectWinner(addressBytes, id, selectedWinner, { sign });
            setWinnerPhase('confirming');
            await pollBountyCompleted(id, selectedWinner);
            setWinnerPhase('confirmed');
            await load();
        } catch (e) {
            setWinnerPhase('error');
            setWinnerError(e instanceof Error ? e.message : 'failed to select winner');
        }
    };

    if (loading) {
        return (
            <p className="text-muted" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <Loader2 size={14} className="spin" /> Loading bounty from chain...
            </p>
        );
    }
    if (loadError) {
        return (
            <p className="text-error" style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                <AlertTriangle size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {loadError}
            </p>
        );
    }
    if (!bounty) {
        return <p className="text-muted">Bounty not found.</p>;
    }

    return (
        <div style={{ width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Link to="/" className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <ArrowLeft size={14} /> Back to bounties
            </Link>

            <div className="card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <h1 style={{ fontSize: 18, lineHeight: 1.4 }}>{bounty.title}</h1>
                    {bounty.status === 1 ? (
                        <span className="badge">
                            <Trophy size={11} /> Completed
                        </span>
                    ) : bounty.isExpired ? (
                        <span className="badge" style={{ background: 'var(--bg-3)', color: 'var(--text-2)' }}>
                            Expired
                        </span>
                    ) : (
                        <span className="badge">Open</span>
                    )}
                </div>
                <p style={{ marginTop: 12, fontSize: 13, color: 'var(--text-1)', whiteSpace: 'pre-wrap' }}>
                    {bounty.description}
                </p>
                <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', gap: 5, alignItems: 'center', color: 'var(--accent)', fontSize: 14, fontWeight: 500 }}>
                        <Coins size={14} /> {formatCnpy(bounty.reward)} CNPY
                    </span>
                    <span className="text-muted" style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 12.5 }}>
                        <Clock size={13} /> deadline {new Date(bounty.deadline * 1000).toLocaleString()}
                    </span>
                    <span className="text-muted" style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 12.5 }}>
                        <Users size={13} /> {bounty.participantCount} joined
                    </span>
                    <span className="text-muted" style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 12.5 }}>
                        <FileText size={13} /> {bounty.submissionCount} submissions
                    </span>
                </div>
                <p className="text-muted mono" style={{ fontSize: 11, marginTop: 12 }}>
                    creator {shortAddr(bounty.creator)}
                    {bounty.status === 1 && bounty.winner && ` · winner ${shortAddr(bounty.winner)}`}
                </p>
            </div>

            {!activeAddress && (
                <div className="card" style={{ padding: 16 }}>
                    <p className="text-muted" style={{ fontSize: 12 }}>Create or unlock a wallet to join or submit work.</p>
                </div>
            )}

            {activeAddress && isUnlocked && !isCreator && isOpen && !hasJoined && (
                <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {joinPhase === 'error' && joinError && (
                        <p className="text-error" style={{ fontSize: 12 }}>{joinError}</p>
                    )}
                    <button className="btn btn-primary" onClick={doJoin} disabled={joinPhase === 'broadcasting' || joinPhase === 'confirming'}>
                        {joinPhase === 'broadcasting' || joinPhase === 'confirming' ? (
                            <Loader2 size={15} className="spin" />
                        ) : (
                            <UserPlus size={15} />
                        )}
                        {joinPhase === 'broadcasting'
                            ? 'Signing & broadcasting...'
                            : joinPhase === 'confirming'
                              ? 'Confirming on-chain...'
                              : 'Join bounty'}
                    </button>
                </div>
            )}

            {activeAddress && isUnlocked && !isCreator && isOpen && hasJoined && (
                <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <h2 style={{ fontSize: 14 }}>{mySubmission ? 'Update your submission' : 'Submit your work'}</h2>
                    <form onSubmit={doSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                            <label className="label" htmlFor="sub-description">Description</label>
                            <textarea
                                id="sub-description"
                                className="input"
                                rows={3}
                                maxLength={2000}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What did you build? How should it be evaluated?"
                                style={{ resize: 'vertical', fontFamily: 'inherit' }}
                                required
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="sub-repo">GitHub repository URL</label>
                            <input
                                id="sub-repo"
                                className="input"
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                                placeholder="https://github.com/..."
                                required
                            />
                        </div>
                        <div>
                            <label className="label" htmlFor="sub-demo">Demo URL (optional)</label>
                            <input
                                id="sub-demo"
                                className="input"
                                value={demoUrl}
                                onChange={(e) => setDemoUrl(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                        {submitPhase === 'error' && submitError && (
                            <p className="text-error" style={{ fontSize: 12 }}>{submitError}</p>
                        )}
                        {submitPhase === 'confirmed' && (
                            <p style={{ fontSize: 12, color: 'var(--accent)', display: 'flex', gap: 6, alignItems: 'center' }}>
                                <CheckCircle2 size={14} /> Submission confirmed on-chain
                            </p>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={submitPhase === 'broadcasting' || submitPhase === 'confirming'}
                        >
                            {submitPhase === 'broadcasting' || submitPhase === 'confirming' ? (
                                <Loader2 size={15} className="spin" />
                            ) : (
                                <Send size={15} />
                            )}
                            {submitPhase === 'broadcasting'
                                ? 'Signing & broadcasting...'
                                : submitPhase === 'confirming'
                                  ? 'Confirming on-chain...'
                                  : mySubmission
                                    ? 'Update submission'
                                    : 'Submit work'}
                        </button>
                    </form>
                </div>
            )}

            <div className="card" style={{ padding: 20 }}>
                <h2 style={{ fontSize: 14, marginBottom: 12 }}>Submissions ({submissions.length})</h2>
                {submissions.length === 0 && <p className="text-muted" style={{ fontSize: 12 }}>No submissions yet.</p>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {submissions.map((s) => (
                        <div key={s.submitter} className="card" style={{ padding: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <span className="mono text-muted" style={{ fontSize: 11.5 }}>{shortAddr(s.submitter)}</span>
                                {bounty.status === 1 && bounty.winner?.toLowerCase() === s.submitter.toLowerCase() && (
                                    <span className="badge">
                                        <Trophy size={11} /> Winner
                                    </span>
                                )}
                            </div>
                            <p style={{ fontSize: 12.5, marginBottom: 8, whiteSpace: 'pre-wrap' }}>{s.description}</p>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <a href={s.repoUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, display: 'flex', gap: 4, alignItems: 'center' }}>
                                    <ExternalLink size={12} /> Repo
                                </a>
                                {s.demoUrl && (
                                    <a href={s.demoUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, display: 'flex', gap: 4, alignItems: 'center' }}>
                                        <ExternalLink size={12} /> Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isCreator && bounty.status === 0 && submissions.length > 0 && (
                <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <h2 style={{ fontSize: 14 }}>Select a winner</h2>
                    <p className="text-muted" style={{ fontSize: 11.5 }}>
                        This releases the escrowed {formatCnpy(bounty.reward)} CNPY directly to the winner - it
                        cannot be undone.
                    </p>
                    <select className="input" value={selectedWinner} onChange={(e) => setSelectedWinner(e.target.value)}>
                        <option value="">Choose a submitter...</option>
                        {submissions.map((s) => (
                            <option key={s.submitter} value={s.submitter}>
                                {shortAddr(s.submitter)}
                            </option>
                        ))}
                    </select>
                    {winnerPhase === 'error' && winnerError && (
                        <p className="text-error" style={{ fontSize: 12 }}>{winnerError}</p>
                    )}
                    {winnerPhase === 'confirmed' && (
                        <p style={{ fontSize: 12, color: 'var(--accent)', display: 'flex', gap: 6, alignItems: 'center' }}>
                            <CheckCircle2 size={14} /> Winner selected, reward paid out on-chain
                        </p>
                    )}
                    <button
                        className="btn btn-primary"
                        onClick={doSelectWinner}
                        disabled={!selectedWinner || winnerPhase === 'broadcasting' || winnerPhase === 'confirming'}
                    >
                        {winnerPhase === 'broadcasting' || winnerPhase === 'confirming' ? (
                            <Loader2 size={15} className="spin" />
                        ) : (
                            <Trophy size={15} />
                        )}
                        {winnerPhase === 'broadcasting'
                            ? 'Signing & broadcasting...'
                            : winnerPhase === 'confirming'
                              ? 'Releasing reward...'
                              : 'Select winner & pay out'}
                    </button>
                </div>
            )}

            {participants.length > 0 && (
                <div className="card" style={{ padding: 20 }}>
                    <h2 style={{ fontSize: 14, marginBottom: 10 }}>Participants ({participants.length})</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {participants.map((p) => (
                            <span key={p.address} className="mono text-muted" style={{ fontSize: 11, background: 'var(--bg-2)', padding: '4px 8px', borderRadius: 6 }}>
                                {shortAddr(p.address)}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
