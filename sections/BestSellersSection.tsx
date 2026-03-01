import Link from 'next/link';
import { getProducts } from '@/lib/woocommerce';
import { ProductCard } from '@/components/product/ProductCard';

// Revalidate every 60 seconds for ISR (Incremental Static Regeneration)
export const revalidate = 60;

export async function BestSellersSection() {
  try {
    const products = await getProducts({ limit: 8 });
    
    // We double the array to create a seamless infinite loop
    const displayProducts = [...products, ...products];

    return (
      <section
        className="section-padding overflow-hidden relative"
        style={{
      background: '#FFF5EB',
    }}
      >
        {/* Warm decorative glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-bl from-[#A3261A]/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-tr from-[#C46A3A]/10 to-transparent blur-3xl" />
        </div>

        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Best Sellers
            </h2>
            <p className="text-lg text-body-muted max-w-2xl mx-auto mb-4">
              Our most loved Ayurvedic formulations — trusted by thousands for real results
            </p>
            <Link
              href="/shop"
              className="text-sm font-semibold text-primary hover:underline transition-colors duration-200"
            >
              View all →
            </Link>
          </div>
        </div>

        {/* Slider carousel — scrolls right (opposite to other product carousels) */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-6 animate-marquee-reverse pause-on-hover no-scrollbar"
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
  } catch (error) {
    console.error('Failed to load best sellers:', error);
    // Return empty section instead of crashing
    return (
      <section
        className="section-padding overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #FFF0ED 0%, #F9DDD6 40%, #F2CBC2 100%)' }}
      >
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Best Sellers
            </h2>
            <p className="text-lg text-body-muted max-w-2xl mx-auto mb-4">
              Our most loved Ayurvedic formulations — trusted by thousands for real results
            </p>
            <Link
              href="/shop"
              className="text-sm font-semibold text-primary hover:underline transition-colors duration-200"
            >
              View all →
            </Link>
          </div>
          <p className="text-center text-body-muted">Loading products...</p>
        </div>
      </section>
    );
  }
}