'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function PrivateLabellingForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/private-labelling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          company: formData.get('company'),
          productInterest: formData.get('productInterest'),
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
        Thank you. We have received your private labelling enquiry and will get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Your Name" name="name" required placeholder="Full name" />
      <Input label="Email" name="email" type="email" required placeholder="you@example.com" />
      <Input label="Phone" name="phone" type="tel" required placeholder="10-digit mobile" />
      <Input label="Company / Brand Name" name="company" placeholder="Company or brand name" />
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Product category interest</label>
        <select
          name="productInterest"
          className="w-full rounded-xl border border-input-border bg-white px-4 py-3 text-foreground"
        >
          <option value="">Select (optional)</option>
          <option value="ayurvedic-herbs">Ayurvedic / Herbal</option>
          <option value="wellness">Wellness &amp; immunity</option>
          <option value="liver-care">Liver care</option>
          <option value="diabetes">Diabetes support</option>
          <option value="other">Other</option>
        </select>
      </div>
      <Textarea label="Message" name="message" placeholder="Describe your private labelling requirement" />
      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <Button type="submit" variant="primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting…' : 'Submit Private Labelling enquiry'}
      </Button>
    </form>
  );
}
