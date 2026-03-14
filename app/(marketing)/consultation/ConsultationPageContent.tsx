'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

const DOCTORS = [
  {
    name: 'Vaidya Dhanya Kumar Jain (DNYS)',
    title: 'Ayurvedacharya & Founder',
    image: 'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/02/PHOTO-2026-02-27-13-01-10-e1772191818188.jpg',
    description:
      'With 25+ years of experience in Ayurveda, Vaidya Dhanya Kumar Jain founded DRS Health Solutions (Dhanya Ras Shala) in 2003 in Tikamgarh (M.P.) to carry forward the rich legacy of his grandfather, Rajvaidya Pandit Barelal Ji. With a powerful vision to take Ayurveda to every home across the world, he is a dedicated practitioner and formulation expert who creates authentic and result-oriented Ayurvedic medicines while actively treating patients at his clinic with holistic care, and has also been serving Jeev Daya Parmarth Jan Kalyan Samiti (NGO) for several years as the Secretary of the community, actively contributing towards social welfare and humanitarian service. His mission continues to guide our commitment to purity, effectiveness, and true Ayurvedic principles.',
  },
  {
    name: 'Vd. Dr. Manoj Jain (BAMS)',
    title: 'Ayurvedacharya',
    image: 'https://9gk.22b.myftpupload.com/wp-content/uploads/2026/02/PHOTO-2026-02-27-13-00-16.jpg',
    description:
      'Dr. Manoj Jain (BAMS) is an experienced Ayurvedic physician with 20+ years of expertise in holistic healing. He focuses on treating the root cause of health concerns through personalized Ayurvedic treatments, combining classical wisdom with modern clinical understanding. His compassionate approach and commitment to authentic Ayurveda have helped numerous patients achieve lasting wellness.',
  },
  
];

function DoctorCarousel() {
  const [current, setCurrent] = useState(0);
  const doctor = DOCTORS[current];

  return (
    <section className="py-20">
      <div className="container-tight max-w-5xl">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Guided by Experienced Ayurvedic Practitioners
        </h2>

        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 h-[32rem]">
            {/* Full image on the left */}
            <div className="relative h-80 md:h-full">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Content on the right */}
            <div className="flex flex-col justify-center p-8 lg:p-10 overflow-y-auto">
              <h3 className="text-2xl font-semibold text-foreground mb-1">
                {doctor.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-5">
                {doctor.title}
              </p>
              <p className="text-body-muted leading-relaxed text-sm mb-8 line-clamp-[10]">
                {doctor.description}
              </p>

              {/* Controls — pinned to bottom */}
              <div className="flex items-center gap-3 mt-auto pt-4">
                <button
                  onClick={() => setCurrent((p) => (p - 1 + DOCTORS.length) % DOCTORS.length)}
                  aria-label="Previous doctor"
                  className="p-2.5 rounded-full border border-border bg-white shadow-sm hover:shadow-card transition-all"
                >
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrent((p) => (p + 1) % DOCTORS.length)}
                  aria-label="Next doctor"
                  className="p-2.5 rounded-full border border-border bg-white shadow-sm hover:shadow-card transition-all"
                >
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="flex gap-2 ml-auto">
                  {DOCTORS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === current ? 'w-8 bg-primary' : 'w-2 bg-border'
                      }`}
                      aria-label={`Go to doctor ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
            <Image
              src="https://9gk.22b.myftpupload.com/wp-content/uploads/2026/02/consult.png"
              alt="Ayurvedic consultation"
              className="object-cover w-full h-full"
              fill
            />
          </div>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="py-10 border-y border-border bg-soft-bg">
        <div className="container-tight grid md:grid-cols-3 text-center gap-6">
          <div>
            <p className="text-2xl font-semibold">170+ Years</p>
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
          <h5 className="text-xl font-semibold text-center text-red-600 mt-8 mb-10">
            And many more...
          </h5>
        </div>
      </section>

      {/* ================= DOCTOR TRUST ================= */}
      <DoctorCarousel />

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
