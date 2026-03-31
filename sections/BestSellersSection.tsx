import Link from 'next/link';
import { getProducts, getProductBySlug, getProductsByIds } from '@/lib/woocommerce';
import { ProductCard } from '@/components/product/ProductCard';
import { prisma } from '@/lib/prisma';
import type { Product } from '@/lib/woocommerce/types';

// Revalidate immediately when cache is invalidated by admin actions
export const revalidate = 0;

async function getFeaturedProducts(): Promise<Product[]> {
  // 1. Check DB for admin-curated bestsellers list
  try {
    const featured = await prisma.featuredProduct.findMany({
      where: { isActive: true, section: 'bestsellers' },
      orderBy: { sortOrder: 'asc' },
      select: { wooProductId: true, wooProductSlug: true },
    });

    console.log('[BestSellersSection] Found featured products in DB:', featured.length);
    console.log('[BestSellersSection] Featured products data:', JSON.stringify(featured, null, 2));

    if (featured.length > 0) {
      // Use wooProductId if available (more reliable than slug)
      const productIds = featured
        .map((f: any) => f.wooProductId)
        .filter((id: any) => id);

      if (productIds.length > 0) {
        console.log('[BestSellersSection] Using product IDs:', productIds);
        const products = await getProductsByIds(productIds);
        console.log('[BestSellersSection] Successfully fetched products from WC by ID:', products.length);
        if (products.length > 0) return products;
      }

      // Fallback: try by slug if IDs didn't work
      const results = await Promise.all(
        featured.map((f: any) => {
          if (f.wooProductSlug) {
            console.log('[BestSellersSection] Fetching by slug:', f.wooProductSlug);
            return getProductBySlug(f.wooProductSlug);
          }
          return null;
        })
      );
      const products = results.filter((p: any): p is Product => p !== null);
      console.log('[BestSellersSection] Fetched by slug - count:', products.length);
      if (products.length > 0) return products;
    }
  } catch (e) {
    console.error('[BestSellersSection] Error fetching featured products:', e);
  }

  // 2. Fallback: fetch 8 products from WooCommerce (original behaviour)
  console.log('[BestSellersSection] Using fallback - fetching 8 random products');
  return getProducts({ limit: 8 });
}

export async function BestSellersSection() {
  try {
    const products = await getFeaturedProducts();

    // Double the array to create a seamless infinite scroll loop
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
