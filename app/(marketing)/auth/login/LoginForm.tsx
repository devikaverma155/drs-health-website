'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Call API to verify customer in WooCommerce
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to login');
        setIsLoading(false);
        return;
      }

      // Customer verified successfully in WooCommerce
      // Save to localStorage for client-side state
      localStorage.setItem('customer-email', result.customer.email);
      localStorage.setItem('customer-first-name', result.customer.firstName);
      localStorage.setItem('customer-last-name', result.customer.lastName);
      localStorage.setItem('customer-id', result.customer.id);

      // Redirect to account page
      router.push('/account');
    } catch (err) {
      setError('Error logging in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center bg-gradient-soft">
      <div className="card-soft p-8 w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-body-muted">Login to access your account and orders</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl text-primary-dark text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 border border-input-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password (if set)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-input-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
            <p className="text-xs text-body-muted mt-1">Leave empty if you didn't set a password</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50 font-semibold transition-colors mt-6"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="my-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-body-muted">Don't have an account?</span>
          </div>
        </div>

        <Link href="/auth/signup">
          <button type="button" className="w-full py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 font-semibold transition-colors">
            Create Account
          </button>
        </Link>

        <Link href="/shop" className="block mt-6 text-center">
          <p className="text-body-muted hover:text-foreground">Continue Shopping</p>
        </Link>
      </div>
    </div>
  );
}
