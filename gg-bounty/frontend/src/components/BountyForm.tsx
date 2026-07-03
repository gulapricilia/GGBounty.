import { useState } from 'react';
import { Target, Send, Loader2, CheckCircle2, AlertTriangle, Coins, CalendarClock } from 'lucide-react';
import { useWallet } from '../wallet/WalletContext';
import { hexToBytes } from '../lib/bytes';
import { createBounty, validateCreateBountyInput } from '../tx/createBounty';
import { pollBounty } from '../rpc/pluginRpc';

type SubmitPhase = 'idle' | 'broadcasting' | 'confirming' | 'confirmed' | 'error';

const UCNPY_PER_CNPY = 1_000_000n;

export function BountyForm(): JSX.Element {
    const { activeAddress, isUnlocked, sign } = useWallet();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rewardCnpy, setRewardCnpy] = useState('');
    const [deadlineLocal, setDeadlineLocal] = useState('');

    const [phase, setPhase] = useState<SubmitPhase>('idle');
    const [txHash, setTxHash] = useState<string | null>(null);
    const [bountyId, setBountyId] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const reset = (): void => {
        setTitle('');
        setDescription('');
        setRewardCnpy('');
        setDeadlineLocal('');
    };

    const submit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!activeAddress) return;

        const rewardFloat = Number(rewardCnpy);
        if (!Number.isFinite(rewardFloat) || rewardFloat <= 0) {
            setPhase('error');
            setSubmitError('reward must be a positive number');
            return;
        }
        const reward = BigInt(Math.round(rewardFloat * Number(UCNPY_PER_CNPY)));

        const deadlineMs = deadlineLocal ? new Date(deadlineLocal).getTime() : NaN;
        if (!Number.isFinite(deadlineMs)) {
            setPhase('error');
            setSubmitError('pick a valid deadline');
            return;
        }
        const deadline = BigInt(Math.floor(deadlineMs / 1000));

        const input = { title, description, reward, deadline };
        const validationError = validateCreateBountyInput(input);
        if (validationError) {
            setPhase('error');
            setSubmitError(validationError);
            return;
        }

        setSubmitError(null);
        setTxHash(null);
        setBountyId(null);
        setPhase('broadcasting');
        try {
            const addressBytes = hexToBytes(activeAddress);
            const result = await createBounty(addressBytes, input, { sign });
            setTxHash(result.hash);
            setBountyId(result.bountyId);
            setPhase('confirming');

            await pollBounty(result.bountyId);
            setPhase('confirmed');
            reset();
        } catch (e) {
            setPhase('error');
            setSubmitError(
                e instanceof Error
                    ? e.message
                    : 'failed to submit transaction - is the Canopy node running at the configured RPC URL?'
            );
        }
    };

    if (!activeAddress) {
        return (
            <div className="card" style={{ padding: 24, maxWidth: 420 }}>
                <p className="text-muted">Create or unlock a wallet first to post a bounty.</p>
            </div>
        );
    }

    if (!isUnlocked) {
        return (
            <div className="card" style={{ padding: 24, maxWidth: 420 }}>
                <p className="text-muted">Unlock your wallet to post a bounty.</p>
            </div>
        );
    }

    return (
        <div className="card" style={{ padding: 20, maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Target size={18} color="var(--accent)" />
                <h2 style={{ fontSize: 15 }}>Create a bounty</h2>
            </div>
            <p className="text-muted" style={{ fontSize: 11.5, marginTop: -10 }}>
                The reward is escrowed from your balance the moment this transaction confirms - it's
                held on-chain until a winner is selected.
            </p>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                    <label className="label" htmlFor="bounty-title">
                        Title
                    </label>
                    <input
                        id="bounty-title"
                        className="input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                        placeholder="e.g. Fix mempool race condition in tx broadcast"
                        required
                    />
                </div>
                <div>
                    <label className="label" htmlFor="bounty-description">
                        Description
                    </label>
                    <textarea
                        id="bounty-description"
                        className="input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={2000}
                        rows={4}
                        placeholder="What needs to be done? What counts as complete?"
                        style={{ resize: 'vertical', fontFamily: 'inherit' }}
                        required
                    />
                    <p className="text-muted" style={{ fontSize: 11, marginTop: 4 }}>
                        {description.length}/2000
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                        <label className="label" htmlFor="bounty-reward">
                            <Coins size={12} style={{ verticalAlign: -1, marginRight: 3 }} />
                            Reward (CNPY)
                        </label>
                        <input
                            id="bounty-reward"
                            className="input"
                            type="number"
                            min="0"
                            step="0.000001"
                            value={rewardCnpy}
                            onChange={(e) => setRewardCnpy(e.target.value)}
                            placeholder="850"
                            required
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className="label" htmlFor="bounty-deadline">
                            <CalendarClock size={12} style={{ verticalAlign: -1, marginRight: 3 }} />
                            Deadline
                        </label>
                        <input
                            id="bounty-deadline"
                            className="input"
                            type="datetime-local"
                            value={deadlineLocal}
                            onChange={(e) => setDeadlineLocal(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {phase === 'error' && submitError && (
                    <p className="text-error" style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                        <AlertTriangle size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {submitError}
                    </p>
                )}
                {phase === 'confirmed' && (
                    <p style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: 'var(--accent)' }}>
                        <CheckCircle2 size={14} /> Bounty confirmed on-chain
                        {bountyId && (
                            <span className="mono text-muted" style={{ marginLeft: 4 }}>
                                id {bountyId.slice(0, 10)}...
                            </span>
                        )}
                    </p>
                )}
                {phase === 'confirming' && (
                    <p className="text-muted" style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
                        <Loader2 size={14} className="spin" /> Broadcast sent
                        {txHash && <span className="mono">({txHash.slice(0, 10)}...)</span>}, waiting for block
                        inclusion...
                    </p>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={phase === 'broadcasting' || phase === 'confirming'}
                >
                    {phase === 'broadcasting' || phase === 'confirming' ? (
                        <Loader2 size={15} className="spin" />
                    ) : (
                        <Send size={15} />
                    )}
                    {phase === 'broadcasting'
                        ? 'Signing & broadcasting...'
                        : phase === 'confirming'
                          ? 'Escrowing reward...'
                          : 'Create bounty'}
                </button>
            </form>
        </div>
    );
}
