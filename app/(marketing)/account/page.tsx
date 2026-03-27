import { Metadata } from 'next';
import { Suspense } from 'react';
import { AccountPageContent } from './AccountPageContent';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your account, view orders, and saved addresses.',
};

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">Loading...</div>}>
      <AccountPageContent />
    </Suspense>
  );
}
