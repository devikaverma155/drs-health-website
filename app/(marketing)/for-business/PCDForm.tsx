'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function PCDForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/pcd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          company: formData.get('company'),
          state: formData.get('state'),
          message: formData.get('message'),
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl bg-primary/10 border border-primary/20 p-6 text-sm text-foreground">
        Thank you. We have received your PCD enquiry and will get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Your Name" name="name" required placeholder="Full name" />
      <Input label="Email" name="email" type="email" required placeholder="you@example.com" />
      <Input label="Phone" name="phone" type="tel" required placeholder="10-digit mobile" />
      <Input label="Company / Business Name" name="company" placeholder="Company name" />
      <Input label="State / Region" name="state" placeholder="State or region of operation" />
      <Textarea label="Message" name="message" placeholder="Tell us about your PCD interest or experience" />
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <Button type="submit" variant="primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting…' : 'Submit PCD enquiry'}
      </Button>
    </form>
  );
}
