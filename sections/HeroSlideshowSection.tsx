'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export interface HeroSlide {
  id: string;
  headline: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image?: string;
  imageAlt?: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: '1',
    headline: 'Authentic Ayurvedic Wellness, Delivered',
    subtext: 'Trusted formulations for weight management, liver care, immunity and more. Get free expert consultation.',
    ctaLabel: 'Shop Products',
    ctaHref: '/shop',
    secondaryCtaLabel: 'Free Consultation',
    secondaryCtaHref: '/consultation',
  },
  {
    id: '2',
    headline: 'New Launches: Formulations You Can Trust',
    subtext: 'Discover our latest products, made with the same commitment to quality and tradition.',
    ctaLabel: 'See New Arrivals',
    ctaHref: '/shop?new=1',
    secondaryCtaLabel: 'Book a Consultation',
    secondaryCtaHref: '/consultation',
  },
  {
    id: '3',
    headline: 'Visit Our Clinic or Consult Online',
    subtext: 'Personalised care from our experts. In-clinic visits or online consultation—your choice.',
    ctaLabel: 'Book Your Slot',
    ctaHref: '/consultation',
    secondaryCtaLabel: 'Shop Now',
    secondaryCtaHref: '/shop',
  },
];

export function HeroSlideshowSection({ slides = DEFAULT_SLIDES }: { slides?: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const current = slides[index % slides.length];

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[420px] md:min-h-[520px] flex items-center bg-slate-100 overflow-hidden">
      <div className="absolute inset-0">
        {current.image ? (
          <Image
            src={current.image}
            alt={current.imageAlt ?? current.headline}
            fill
            className="object-cover opacity-90"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-soft-bg to-accent-mint/20" />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="container-tight relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
            {current.headline}
          </h1>
          {current.subtext && (
            <p className="mt-6 text-lg text-body-muted leading-relaxed">
              {current.subtext}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            {current.ctaHref && (
              <Button href={current.ctaHref} variant="primary">
                {current.ctaLabel ?? 'Learn more'}
              </Button>
            )}
            {current.secondaryCtaHref && (
              <Button href={current.secondaryCtaHref} variant="secondary">
                {current.secondaryCtaLabel ?? 'Learn more'}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10" aria-label="Slide navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index % slides.length}
            className={`h-2 rounded-full transition-all ${
              i === index % slides.length ? 'w-8 bg-primary' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
