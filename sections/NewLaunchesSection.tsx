import Link from 'next/link';
import { getNewLaunches } from '@/lib/woocommerce';
import { ProductCard } from '@/components/product/ProductCard';

export async function NewLaunchesSection() {
  const products = await getNewLaunches();
  const displayProducts = [...products, ...products];

  return (
    <section className="section-padding bg-soft-bg border-y border-border panel-accent-mint overflow-hidden">
      <div className="container-tight">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">New</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mt-1">
              Newly Launched
            </h2>
          </div>
          <Link
            href="/shop?new=1"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all new arrivals
          </Link>
        </div>
      </div>

      {/* Slider carousel — scrolls left */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-6 animate-marquee pause-on-hover no-scrollbar"
          style={{ width: 'max-content', willChange: 'transform' }}
        >
          {displayProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="w-[280px] md:w-[320px] flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
