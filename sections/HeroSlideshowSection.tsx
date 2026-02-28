'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { DEFAULT_HERO_SLIDES } from '@/lib/heroSlides';
import type { HeroSlideConfig } from '@/lib/heroSlides';

export type HeroSlide = HeroSlideConfig;

// Map DB slide format to component format
function mapDbSlide(s: Record<string, unknown>): HeroSlide {
  return {
    id: (s.id as string) || '',
    headline: (s.headline as string) || '',
    subtext: (s.subtext as string) || undefined,
    ctaLabel: (s.ctaLabel as string) || undefined,
    ctaHref: (s.ctaHref as string) || undefined,
    secondaryCtaLabel: (s.secondaryCtaLabel as string) || undefined,
    secondaryCtaHref: (s.secondaryCtaHref as string) || undefined,
    image: (s.imageUrl as string) || (s.image as string) || undefined,
    imageAlt: (s.imageAlt as string) || undefined,
  };
}

export function HeroSlideshowSection({ slides: propSlides }: { slides?: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>(propSlides || DEFAULT_HERO_SLIDES);

  // Fetch from API on mount (if no prop slides given)
  useEffect(() => {
    if (propSlides) return;
    fetch('/api/content/hero-slides')
      .then((r) => r.json())
      .then((data: Record<string, unknown>[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data.map(mapDbSlide));
        }
      })
      .catch(() => {/* keep defaults */});
  }, [propSlides]);

  const current = slides[index % slides.length];

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[520px] md:min-h-[680px] flex items-center bg-[#F7F6F1] overflow-hidden">
      {/* Organic shape backgrounds (wellness premium) */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-green-200 blur-[120px] opacity-20 pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-100 blur-[140px] opacity-25 pointer-events-none" aria-hidden />
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
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
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
