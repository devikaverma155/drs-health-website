'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // Call API to create customer in WooCommerce
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to create account');
        setIsLoading(false);
        return;
      }

      // Customer created successfully in WooCommerce
      // Save to localStorage as well for client-side state
      localStorage.setItem('customer-email', formData.email);
      localStorage.setItem('customer-first-name', formData.firstName);
      localStorage.setItem('customer-last-name', formData.lastName);
      localStorage.setItem('customer-phone', formData.phone);
      localStorage.setItem('customer-id', result.customer.id);

      // Redirect to account page
      router.push('/account');
    } catch (err) {
      setError('Error creating account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 border border-input-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary';

  return (
    <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center bg-gradient-soft">
      <div className="card-soft p-8 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-body-muted">Join DRS Health to track orders and manage your profile</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl text-primary-dark text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password (Optional)</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className={inputClass} />
            <p className="text-xs text-body-muted mt-1">Leave empty to login with email only</p>
          </div>
          {formData.password && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password *</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className={inputClass} />
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50 font-semibold transition-colors mt-6">
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="my-6 relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-background text-body-muted">Already have an account?</span></div>
        </div>

        <Link href="/auth/login">
          <button type="button" className="w-full py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary/5 font-semibold transition-colors">
            Login Instead
          </button>
        </Link>

        <p className="text-xs text-body-muted text-center mt-6">
          By creating an account, you agree to our{' '}
          <Link href="/terms-and-conditions" className="text-primary hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
