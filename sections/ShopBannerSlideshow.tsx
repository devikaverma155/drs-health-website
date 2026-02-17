'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export interface ShopBannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: 'primary' | 'accent';
}

const DEFAULT_SLIDES: ShopBannerSlide[] = [
  {
    id: '1',
    title: 'New Arrivals',
    subtitle: 'Discover our latest wellness formulations',
    ctaLabel: 'Shop new',
    ctaHref: '/shop?new=1',
    variant: 'primary',
  },
  {
    id: '2',
    title: 'Free Consultation',
    subtitle: 'Book a session with our Ayurvedic experts',
    ctaLabel: 'Book now',
    ctaHref: '/consultation',
    variant: 'accent',
  },
  {
    id: '3',
    title: 'Authentic Ayurvedic Care',
    subtitle: 'Weight management, liver care, immunity & more',
    ctaLabel: 'Shop all',
    ctaHref: '/shop',
    variant: 'primary',
  },
];

export function ShopBannerSlideshow({ slides = DEFAULT_SLIDES }: { slides?: ShopBannerSlide[] }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index % slides.length];

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[200px] md:h-[260px] overflow-hidden bg-soft-bg border-b border-border">
      <div
        key={slide.id}
        className="absolute inset-0 flex items-center transition-opacity duration-500"
        style={{ opacity: 1 }}
      >
        <div className="container-tight flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="mt-1 text-body-muted">{slide.subtitle}</p>
            )}
          </div>
          {slide.ctaHref && (
            <Link
              href={slide.ctaHref}
              className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 shrink-0 ${
                slide.variant === 'accent'
                  ? 'bg-accent-orange text-foreground hover:opacity-90'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {slide.ctaLabel}
            </Link>
          )}
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index % slides.length ? 'w-8 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/50'
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
