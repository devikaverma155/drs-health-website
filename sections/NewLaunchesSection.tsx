import Link from 'next/link';
import { getNewLaunches } from '@/lib/shopify';
import { ProductCard } from '@/components/product/ProductCard';

export async function NewLaunchesSection() {
  const products = await getNewLaunches();

  return (
    <section className="section-padding bg-soft-bg border-y border-border panel-accent-mint">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
