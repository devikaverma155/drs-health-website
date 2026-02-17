'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function ConsultationFormSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
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

  return (
    <section id="consultation" className="section-padding bg-soft-bg border-y border-border scroll-mt-20 panel-accent-mint">
      <div className="container-tight max-w-xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-2">
          Get Free Consultation
        </h2>
        <p className="text-center text-body-muted mb-10">
          Share your health concerns. Our experts will get back to you with personalised advice. You will get your consultation schedule and booking slot shortly after submitting.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Your Name" name="name" required placeholder="Full name" />
          <Input label="Email" name="email" type="email" required placeholder="you@example.com" />
          <Input label="Phone" name="phone" type="tel" required placeholder="10-digit mobile" />
          <Textarea label="Your Message" name="message" placeholder="Briefly describe your health concern or question" />
          {status === 'success' && (
            <p className="text-sm text-green-700">Thank you. We will contact you soon.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
          )}
          <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Submit'}
          </Button>
        </form>
      </div>
    </section>
  );
}
