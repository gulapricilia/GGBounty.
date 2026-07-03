import { WalletPanel } from '../components/WalletPanel';
import { ProfileForm } from '../components/ProfileForm';

export function WalletPage(): JSX.Element {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <WalletPanel />
            <ProfileForm />
        </div>
    );
}
