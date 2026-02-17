'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

const BENEFITS = [
  {
    title: 'Personalised care',
    description: 'One-on-one time with our Ayurvedic experts to understand your health concerns and goals.',
  },
  {
    title: 'Clinic or online',
    description: 'Visit us in person or book an online consultation—whatever suits you.',
  },
  {
    title: 'No obligation',
    description: 'Free consultation. Get advice, ask questions, and decide your next steps with no pressure.',
  },
  {
    title: 'Expert guidance',
    description: 'Our practitioners help with diet, lifestyle, and product choices tailored to you.',
  },
];

export function ConsultationPageContent() {
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
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container-tight text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
            Free Ayurvedic Consultation
          </h1>
          <p className="mt-6 text-lg text-body-muted leading-relaxed">
            Visit our clinic or consult online. Get personalised care from our experts—at no cost.
          </p>
        </div>
      </section>

      {/* Why consult */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container-tight">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-12">
            Why Book a Consultation?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((b) => (
              <div key={b.title} className="text-center">
                <h3 className="text-lg font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-body-muted text-sm">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit clinic / online */}
      <section className="py-16 md:py-20 bg-soft-bg border-y border-border">
        <div className="container-tight max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-8">
            Visit Our Clinic or Consult Online
          </h2>
          <p className="text-body-muted text-center leading-relaxed">
            We welcome you to our clinic for a face-to-face consultation. If you prefer to stay at home,
            we also offer online sessions so you can speak with our experts from anywhere. After you submit
            the form below, we will get in touch to confirm your preferred mode and schedule your slot.
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-16 md:py-20 border-b border-border">
        <div className="container-tight">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
            What to Expect
          </h2>
          <ul className="max-w-2xl mx-auto space-y-4 text-body-muted">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              Fill in the form below with your details and a brief note about your health concern.
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              Our team will contact you to confirm your consultation and booking slot.
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              Attend your session at the clinic or join online—personalised advice and product guidance included.
            </li>
          </ul>
        </div>
      </section>

      {/* Form */}
      <section id="consultation-form" className="py-16 md:py-24 bg-slate-50/50 scroll-mt-20">
        <div className="container-tight max-w-xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-2">
            Request Your Free Consultation
          </h2>
          <p className="text-center text-body-muted mb-10">
            Submit the form and we will schedule your consult. You will receive your booking slot shortly.
          </p>

          {status === 'success' ? (
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-8 text-center">
              <p className="text-lg font-semibold text-foreground">
                Thank you for your request.
              </p>
              <p className="mt-2 text-body-muted">
                We have received your details. You will get your consultation schedule and booking slot shortly via phone or email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Your Name" name="name" required placeholder="Full name" />
              <Input label="Email" name="email" type="email" required placeholder="you@example.com" />
              <Input label="Phone" name="phone" type="tel" required placeholder="10-digit mobile number" />
              <Textarea
                label="Your Message"
                name="message"
                placeholder="Briefly describe your health concern or what you would like to discuss (optional)"
              />
              {status === 'error' && (
                <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
              )}
              <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting…' : 'Submit & get my slot'}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Why Use Our Free Health Advisory Services? – bottom of page */}
      <section className="py-16 md:py-20 bg-soft-bg border-t border-border">
        <div className="container-tight">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
            Why Use Our Free Health Advisory Services?
          </h2>
          <ul className="max-w-2xl mx-auto space-y-6 text-body-muted leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="mt-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">✓</span>
              </span>
              <span>Get a holistic and custom solution for all your health concerns!</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">✓</span>
              </span>
              <span>Get tips &amp; advice to get benefit from Ayurveda &amp; alternative therapy</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">✓</span>
              </span>
              <span>Get FREE diet, health and lifestyle advice from certified doctors!</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
