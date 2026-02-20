import { Metadata } from 'next';
import { AccountPageContent } from './AccountPageContent';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your account, view orders, and saved addresses.',
};

export default function AccountPage() {
  return <AccountPageContent />;
}
