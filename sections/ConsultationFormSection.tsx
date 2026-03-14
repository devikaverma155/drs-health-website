'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { validatePhone } from '@/lib/phoneValidation';

export function ConsultationFormSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [phone, setPhone] = useState('');

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: phone,
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
    } catch (err) {
      setGeneralError('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <section
      id="consultation"
      className="section-padding bg-soft-bg border-y border-border scroll-mt-20 panel-accent-mint"
      style={{
        backgroundImage: "url('https://9gk.22b.myftpupload.com/wp-content/uploads/2026/02/image-1771828238429-e1772350773356.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-tight max-w-xl">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground text-center mb-2">
          Get Free Consultation
        </h2>
        <p className="text-center text-body-muted mb-10">
          Share your health concerns. Our experts will get back to you with personalised advice. You will get your consultation schedule and booking slot shortly after submitting.
        </p>
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
          <Textarea label="Your Message" name="message" placeholder="Briefly describe your health concern or question" />
          {status === 'success' && (
            <div className="rounded-lg bg-green-50 border-2 border-green-500 p-4">
              <p className="text-green-700 font-semibold text-center">✓ Query Received!</p>
              <p className="text-green-600 text-sm text-center mt-2">Our expert team will contact you shortly. Thank you for reaching out.</p>
            </div>
          )}
          {status === 'error' && !phoneError && (
            <div className="rounded-lg bg-red-50 border-2 border-red-500 p-4">
              <p className="text-red-700 font-semibold text-center">⚠ Error</p>
              <p className="text-red-600 text-sm text-center mt-2">{generalError}</p>
            </div>
          )}
          <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : 'Submit'}
          </Button>
        </form>
      </div>
    </section>
  );
}
