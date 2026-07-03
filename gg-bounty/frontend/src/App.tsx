import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Plus, Activity } from 'lucide-react';
import { WalletProvider, useWallet } from './wallet/WalletContext';
import { HomePage } from './pages/HomePage';
import { BountyDetailPage } from './pages/BountyDetailPage';
import { CreateBountyPage } from './pages/CreateBountyPage';
import { ActivityPage } from './pages/ActivityPage';
import { WalletPage } from './pages/WalletPage';
import ggBountyLogo from './assets/gg-bounty-logo.png';

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }): JSX.Element {
    const location = useLocation();
    const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
    return (
        <Link
            to={to}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 13,
                color: isActive ? 'var(--text-0)' : 'var(--text-2)',
                background: isActive ? 'var(--bg-2)' : 'transparent',
                textDecoration: 'none'
            }}
        >
            {icon}
            {label}
        </Link>
    );
}

function WalletChip(): JSX.Element {
    const { activeAddress, isUnlocked } = useWallet();
    return (
        <Link
            to="/wallet"
            className="mono"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '6px 10px',
                fontSize: 12,
                textDecoration: 'none',
                color: 'var(--text-1)'
            }}
        >
            <span
                style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: isUnlocked ? 'var(--accent)' : 'var(--text-3)',
                    flexShrink: 0
                }}
            />
            {activeAddress ? `${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}` : 'No wallet'}
        </Link>
    );
}

function Shell(): JSX.Element {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '10px 24px',
                    borderBottom: '1px solid var(--border-soft)',
                    flexWrap: 'wrap'
                }}
            >
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
                    <img src={ggBountyLogo} alt="GG Bounty" style={{ height: 28, width: 28, borderRadius: 6 }} />
                    <strong style={{ fontSize: 15, letterSpacing: '-0.01em' }}>GG Bounty</strong>
                </Link>
                <nav style={{ display: 'flex', gap: 2 }}>
                    <NavLink to="/" icon={<Home size={14} />} label="Home" />
                    <NavLink to="/create" icon={<Plus size={14} />} label="Create" />
                    <NavLink to="/activity" icon={<Activity size={14} />} label="Activity" />
                </nav>
                <div style={{ flex: 1 }} />
                <WalletChip />
            </header>

            <main
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '32px 24px'
                }}
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/bounty/:id" element={<BountyDetailPage />} />
                    <Route path="/create" element={<CreateBountyPage />} />
                    <Route path="/activity" element={<ActivityPage />} />
                    <Route path="/wallet" element={<WalletPage />} />
                    <Route
                        path="*"
                        element={
                            <p className="text-muted">
                                Not found. <Link to="/">Go home</Link>.
                            </p>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default function App(): JSX.Element {
    return (
        <WalletProvider>
            <BrowserRouter>
                <Shell />
            </BrowserRouter>
        </WalletProvider>
    );
}
