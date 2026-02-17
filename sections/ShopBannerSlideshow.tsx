'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { DEFAULT_SHOP_BANNER_SLIDES } from '@/lib/heroSlides';
import type { ShopBannerSlideConfig } from '@/lib/heroSlides';

export type ShopBannerSlide = ShopBannerSlideConfig;

export function ShopBannerSlideshow({ slides = DEFAULT_SHOP_BANNER_SLIDES }: { slides?: ShopBannerSlide[] }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index % slides.length];

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[200px] md:h-[280px] overflow-hidden bg-soft-bg border-b border-border">
      {slide.imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={slide.imageUrl}
            alt={slide.imageAlt ?? slide.title}
            fill
            className="object-cover opacity-85"
            sizes="100vw"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      )}
      <div
        key={slide.id}
        className="absolute inset-0 flex items-center transition-opacity duration-500 z-[1]"
        style={{ opacity: 1 }}
      >
        <div className="container-tight flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground drop-shadow-sm">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="mt-1 text-body-muted drop-shadow-sm">{slide.subtitle}</p>
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
