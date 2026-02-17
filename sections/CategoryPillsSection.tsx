import Link from 'next/link';
import { CATEGORIES } from '@/lib/shopify';

export function CategoryPillsSection() {
  return (
    <section className="border-y border-border bg-white py-6">
      <div className="container-tight">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {CATEGORIES.map(({ slug, label }) => (
            <Link
              key={slug}
              href={`/shop?category=${slug}`}
              className="px-4 py-2 rounded-xl border border-border text-sm text-foreground bg-white hover:bg-accent-mint/30 hover:border-primary/30 transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
