'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function ConsultationPageContent() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

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

      if (!res.ok) throw new Error();

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container-tight grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight">
              Speak with an Ayurvedic Expert — Free Consultation
            </h1>

            <p className="mt-6 text-lg text-body-muted">
              Get personalised Ayurvedic guidance for your health concerns,
              diet, and lifestyle from experienced practitioners.
              Online or clinic visit — completely free.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button href="#consultation-form" variant="primary">
                Book Free Consultation
              </Button>

              <p className="text-sm text-body-muted">
                ✓ No fees · ✓ Expert advice · ✓ Personalised care
              </p>
            </div>
          </div>

          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-card">
            <img
              src="https://drshealth.in/wp-content/uploads/2026/02/consult.png"
              alt="Ayurvedic consultation"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="py-10 border-y border-border bg-soft-bg">
        <div className="container-tight grid md:grid-cols-3 text-center gap-6">
          <div>
            <p className="text-2xl font-semibold">90+ Years</p>
            <p className="text-sm text-body-muted">Ayurvedic legacy</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">10,000+</p>
            <p className="text-sm text-body-muted">Patients guided</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">Certified Experts</p>
            <p className="text-sm text-body-muted">Personalised consultation</p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-primary-dark" >
        <div className="container-tight">
          <h2 className="text-3xl font-semibold text-center mb-12 text-white">
            How Your Consultation Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              'Submit your health details',
              'Our expert contacts you to schedule',
              'Receive personalised Ayurvedic guidance',
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-white">
                  {i + 1}
                </div>
                <p className="text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONDITIONS ================= */}
      <section className="py-20 bg-soft-bg border-y border-border">
        <div className="container-tight">
          <h2 className="text-3xl font-semibold text-center mb-10">
            We Help With
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              'Digestive Issues',
              'Stress & Sleep',
              'Weight Management',
              'Skin & Hair Problems',
              'Joint Pain',
              'Immunity Support',
              'Hormonal Balance',
              'Lifestyle Disorders',
            ].map((item) => (
              <div
                key={item}
                className="bg-white p-5 rounded-xl border shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DOCTOR TRUST ================= */}
      <section className="py-20">
        <div className="container-tight max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Guided by Experienced Ayurvedic Practitioners
          </h2>

          <p className="text-body-muted leading-relaxed">
            Our consultations are conducted by qualified Ayurvedic experts
            trained in holistic diagnosis combining traditional Ayurvedic
            wisdom with modern lifestyle understanding. We focus on identifying
            root causes and providing sustainable health solutions.
          </p>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section
        id="consultation-form"
        className="py-20 bg-slate-50/50 scroll-mt-24"
      >
        <div className="container-tight max-w-xl">
          <h2 className="text-3xl font-semibold text-center mb-2">
            Request Your Free Consultation
          </h2>

          <p className="text-center text-body-muted mb-10">
            Submit your details and our team will contact you shortly to confirm
            your booking slot.
          </p>

          {status === 'success' ? (
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-8 text-center">
              <p className="text-lg font-semibold">
                Thank you for your request!
              </p>
              <p className="mt-2 text-body-muted">
                Our team will contact you soon with your consultation schedule.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name"
                name="name"
                required
                placeholder="Full name"
              />

              <Input
                label="Email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />

              <Input
                label="Phone"
                name="phone"
                type="tel"
                required
                placeholder="10-digit mobile number"
              />

              <Textarea
                label="Your Message"
                name="message"
                placeholder="Briefly describe your health concern (optional)"
              />

              {status === 'error' && (
                <p className="text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={status === 'loading'}
              >
                {status === 'loading'
                  ? 'Submitting…'
                  : 'Submit & Get My Slot'}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 border-t border-border">
        <div className="container-tight max-w-3xl">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 text-body-muted">
            <div>
              <h3 className="font-semibold text-foreground">
                Is the consultation really free?
              </h3>
              <p>
                Yes. You receive expert Ayurvedic guidance with absolutely no
                consultation fee.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Do I need to visit the clinic?
              </h3>
              <p>
                You can choose between an online consultation or an in-clinic
                visit based on your preference.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                Is there any obligation to buy products?
              </h3>
              <p>
                No. Our experts provide unbiased guidance. Any recommendation is
                completely optional.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
