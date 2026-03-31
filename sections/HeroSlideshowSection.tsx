'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
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
    mobileImage: (s.mobileImageUrl as string) || undefined,
    imageAlt: (s.imageAlt as string) || undefined,
    textColor: (s.textColor as string) || undefined,
    headlineBold: typeof s.headlineBold === 'boolean' ? s.headlineBold : undefined,
    subtextBold: typeof s.subtextBold === 'boolean' ? s.subtextBold : undefined,
  };
}

export function HeroSlideshowSection({ slides: propSlides }: { slides?: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<HeroSlide[]>(propSlides || DEFAULT_HERO_SLIDES);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  const imageToUse = isMobile && current.mobileImage ? current.mobileImage : current.image;

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, []);

  const handleBannerClick = () => {
    if (current.ctaHref) {
      window.location.href = current.ctaHref;
    }
  };

  return (
    <section 
      className="relative min-h-[320px] sm:min-h-[450px] md:min-h-[620px] flex items-center bg-[#F7F6F1] overflow-hidden cursor-pointer group"
      onClick={handleBannerClick}
      role={current.ctaHref ? 'button' : undefined}
      tabIndex={current.ctaHref ? 0 : undefined}
      onKeyDown={(e) => {
        if (current.ctaHref && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleBannerClick();
        }
      }}
    >
      <div className="absolute inset-0">
        {imageToUse ? (
          <Image
            src={imageToUse}
            alt={current.imageAlt ?? current.headline}
            fill
            className="object-cover group-hover:opacity-90 transition-opacity"
            priority
            sizes="(max-width: 640px) 1080px, (max-width: 1024px) 1536px, 1920px"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-soft-bg to-accent-mint/20" />
        )}
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
