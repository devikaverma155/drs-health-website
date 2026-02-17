import Link from 'next/link';
import { getProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/product/ProductCard';

export async function BestSellersSection() {
  const products = await getProducts({ limit: 8 });
  
  // We double the array to create a seamless infinite loop
  const displayProducts = [...products, ...products];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-tight">
        <div className="flex items-end justify-between gap-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Best Sellers
          </h2>
          <Link
            href="/shop"
            className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
          >
            View all
          </Link>
        </div>
      </div>

      {/* The Carousel Container */}
      <div className="relative w-full overflow-hidden">
        <div 
          className="flex gap-6 animate-marquee pause-on-hover no-scrollbar"
          style={{ width: 'max-content' }}
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