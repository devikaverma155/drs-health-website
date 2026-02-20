'use client';

import Link from 'next/link';

const MARQUEE_ITEMS = [
  '🚚 Free shipping on all orders',
  'Free consultation with our Ayurvedic experts — Book now',
  'New launches: Discover our latest wellness formulations',
  'Visit our clinic or consult online — Get personalised care',
];

export function MarqueeBar() {
  return (
    <div className="relative overflow-hidden bg-primary text-white py-2.5 border-b border-primary-dark/20">
      <div className="flex whitespace-nowrap w-max animate-marquee-scroll" style={{ willChange: 'transform' }}>
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, i) => (
          <span key={i} className="mx-10 text-sm font-medium">
            {text}
          </span>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 flex items-center z-10 bg-gradient-to-l from-primary via-primary to-transparent pl-12 pr-4">
        <Link
          href="/consultation"
          className="text-sm font-semibold text-white bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1.5 transition-colors duration-200"
        >
          Book consultation
        </Link>
      </div>
    </div>
  );
}
