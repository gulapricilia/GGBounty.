import { useEffect, useState } from 'react';
import { User, Save, Loader2, CheckCircle2, AlertTriangle, Star, Trophy, Award, Plus } from 'lucide-react';
import { useWallet } from '../wallet/WalletContext';
import { hexToBytes } from '../lib/bytes';
import { createProfile, validateCreateProfileInput } from '../tx/createProfile';
import { getProfile, pollProfile, type ProfileRecord } from '../rpc/pluginRpc';

type SubmitPhase = 'idle' | 'broadcasting' | 'confirming' | 'confirmed' | 'error';

function StatPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }): JSX.Element {
    return (
        <div className="card" style={{ padding: '10px 12px', flex: 1, minWidth: 100 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent)', marginBottom: 4 }}>
                {icon}
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-0)' }}>{value}</span>
            </div>
            <p className="text-muted" style={{ fontSize: 11 }}>
                {label}
            </p>
        </div>
    );
}

export function ProfileForm(): JSX.Element {
    const { activeAddress, isUnlocked, sign } = useWallet();
    const [existing, setExisting] = useState<ProfileRecord | null>(null);
    const [loadingExisting, setLoadingExisting] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    const [phase, setPhase] = useState<SubmitPhase>('idle');
    const [txHash, setTxHash] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // load the current on-chain profile (if any) whenever the active address changes
    useEffect(() => {
        if (!activeAddress) return;
        let cancelled = false;
        setLoadingExisting(true);
        setLoadError(null);
        getProfile(activeAddress)
            .then((profile) => {
                if (cancelled) return;
                setExisting(profile);
                if (profile) {
                    setUsername(profile.username);
                    setBio(profile.bio);
                    setAvatarUrl(profile.avatarUrl);
                }
            })
            .catch((e) => {
                if (!cancelled) {
                    setLoadError(
                        e instanceof Error
                            ? `couldn't reach the plugin RPC (:50010) - is Canopy + the plugin running? (${e.message})`
                            : 'failed to load profile'
                    );
                }
            })
            .finally(() => {
                if (!cancelled) setLoadingExisting(false);
            });
        return () => {
            cancelled = true;
        };
    }, [activeAddress]);

    const submit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!activeAddress) return;

        const validationError = validateCreateProfileInput({ username, bio, avatarUrl });
        if (validationError) {
            setPhase('error');
            setSubmitError(validationError);
            return;
        }

        setSubmitError(null);
        setTxHash(null);
        setPhase('broadcasting');
        try {
            const addressBytes = hexToBytes(activeAddress);
            const result = await createProfile(addressBytes, { username, bio, avatarUrl }, { sign });
            setTxHash(result.hash);
            setPhase('confirming');

            const confirmed = await pollProfile(activeAddress);
            setExisting(confirmed);
            setPhase('confirmed');
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
                <p className="text-muted">Create or unlock a wallet first to manage your profile.</p>
            </div>
        );
    }

    if (!isUnlocked) {
        return (
            <div className="card" style={{ padding: 24, maxWidth: 420 }}>
                <p className="text-muted">Unlock your wallet to create or edit your profile.</p>
            </div>
        );
    }

    return (
        <div className="card" style={{ padding: 20, maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <User size={18} color="var(--accent)" />
                <h2 style={{ fontSize: 15 }}>{existing ? 'Edit profile' : 'Create your profile'}</h2>
            </div>

            {loadingExisting && <p className="text-muted" style={{ fontSize: 12 }}>Loading on-chain profile...</p>}
            {loadError && (
                <p className="text-error" style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                    <AlertTriangle size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {loadError}
                </p>
            )}

            {existing && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <StatPill icon={<Star size={13} />} label="Reputation" value={existing.reputation} />
                    <StatPill icon={<Trophy size={13} />} label="Completed" value={existing.completedBounties} />
                    <StatPill icon={<Plus size={13} />} label="Created" value={existing.createdBounties} />
                    <StatPill icon={<Award size={13} />} label="uCNPY earned" value={existing.totalRewardsEarned} />
                </div>
            )}

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                    <label className="label" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        className="input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={32}
                        placeholder="e.g. satoshi_builds"
                        required
                    />
                </div>
                <div>
                    <label className="label" htmlFor="avatarUrl">
                        Avatar URL (optional)
                    </label>
                    <input
                        id="avatarUrl"
                        className="input"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        maxLength={512}
                        placeholder="https://..."
                    />
                </div>
                <div>
                    <label className="label" htmlFor="bio">
                        Bio (optional)
                    </label>
                    <textarea
                        id="bio"
                        className="input"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        maxLength={280}
                        rows={3}
                        placeholder="What do you build?"
                        style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    />
                    <p className="text-muted" style={{ fontSize: 11, marginTop: 4 }}>
                        {bio.length}/280
                    </p>
                </div>

                {phase === 'error' && submitError && (
                    <p className="text-error" style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                        <AlertTriangle size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {submitError}
                    </p>
                )}
                {phase === 'confirmed' && (
                    <p style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: 'var(--accent)' }}>
                        <CheckCircle2 size={14} /> Profile confirmed on-chain
                        {txHash && (
                            <span className="mono text-muted" style={{ marginLeft: 4 }}>
                                tx {txHash.slice(0, 10)}...
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
                        <Save size={15} />
                    )}
                    {phase === 'broadcasting'
                        ? 'Signing & broadcasting...'
                        : phase === 'confirming'
                          ? 'Confirming on-chain...'
                          : existing
                            ? 'Save changes'
                            : 'Create profile'}
                </button>
            </form>
        </div>
    );
}
