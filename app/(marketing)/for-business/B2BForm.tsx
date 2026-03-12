'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { validatePhone } from '@/lib/phoneValidation';

export function B2BForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [generalError, setGeneralError] = useState('');

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPhone(value);
    
    const validation = validatePhone(value);
    setPhoneError(validation.error);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGeneralError('');
    
    const validation = validatePhone(phone);
    if (!validation.isValid) {
      setPhoneError(validation.error);
      setStatus('error');
      return;
    }

    setStatus('loading');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: phone,
          company: formData.get('company'),
          message: formData.get('message'),
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setGeneralError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      
      setStatus('success');
      form.reset();
      setPhone('');
    } catch {
      setGeneralError('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg bg-primary/10 border border-primary/20 p-6 text-sm text-foreground">
        Thank you. We have received your B2B enquiry and will get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Your Name" name="name" required placeholder="Full name" />
      <Input label="Email" name="email" type="email" required placeholder="you@example.com" />
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Phone
          <span className="text-red-500 ml-0.5">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          required
          placeholder="10-digit mobile"
          value={phone}
          onChange={handlePhoneChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        {phoneError && <p className="text-sm text-red-600 mt-1">{phoneError}</p>}
      </div>
      <Input label="Company / Business Name" name="company" placeholder="Company name" />
      <Textarea label="Message" name="message" placeholder="Tell us about your interest (e.g. retail, distribution)" />
      {status === 'error' && generalError && (
        <div className="rounded-lg bg-red-50 border-2 border-red-500 p-4">
          <p className="text-red-700 font-semibold text-center">⚠ Error</p>
          <p className="text-red-600 text-sm text-center mt-2">{generalError}</p>
        </div>
      )}
      <Button type="submit" variant="primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting…' : 'Submit B2B enquiry'}
      </Button>
    </form>
  );
}
