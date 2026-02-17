'use client';

import Link from 'next/link';
import { useRef } from 'react';

export interface CategoryItem {
  slug: string;
  label: string;
}

export function CategoryCarousel({ categories }: { categories: CategoryItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const step = 280;
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  };

  if (!categories.length) return null;

  return (
    <section className="border-y border-border bg-white py-6">
      <div className="container-tight">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll categories left"
            className="flex-shrink-0 w-10 h-10 rounded-full border border-border bg-white text-foreground hover:bg-soft-bg hover:border-primary/30 transition-all duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={scrollRef}
            className="flex flex-1 gap-2 md:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1"
          >
            {categories.map(({ slug, label }) => (
              <Link
                key={slug}
                href={`/shop?category=${slug}`}
                className="flex-shrink-0 px-4 py-2 rounded-xl border border-border text-sm text-foreground bg-white hover:bg-accent-mint/30 hover:border-primary/30 transition-all duration-200 whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll categories right"
            className="flex-shrink-0 w-10 h-10 rounded-full border border-border bg-white text-foreground hover:bg-soft-bg hover:border-primary/30 transition-all duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
