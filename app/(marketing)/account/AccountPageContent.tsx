'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ProfileSection } from './components/ProfileSection';
import { OrdersSection } from './components/OrdersSection';
import { AddressesSection } from './components/AddressesSection';

type TabType = 'profile' | 'orders' | 'addresses';

export function AccountPageContent() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get email from localStorage or sessionStorage
    const storedEmail = localStorage.getItem('customer-email') || sessionStorage.getItem('customer-email');
    setEmail(storedEmail);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Your Account</h1>
            <p className="text-gray-600 mb-8">
              Login or create an account to view your profile, orders, and saved addresses.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/auth/login">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                  Login
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                  Create Account
                </button>
              </Link>
              <Link href="/shop">
                <button className="px-8 py-3 text-blue-600 hover:text-blue-700 font-semibold">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">
            Welcome back, <span className="font-semibold">{email}</span>
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex gap-8">
            {[
              { id: 'profile' as TabType, label: 'Profile' },
              { id: 'orders' as TabType, label: 'Orders' },
              { id: 'addresses' as TabType, label: 'Addresses' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'profile' && <ProfileSection email={email} />}
          {activeTab === 'orders' && <OrdersSection email={email} />}
          {activeTab === 'addresses' && <AddressesSection email={email} />}
        </div>
      </div>
    </div>
  );
}
