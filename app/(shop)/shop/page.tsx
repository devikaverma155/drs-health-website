import type { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/woocommerce';
import { ProductCard } from '@/components/product/ProductCard';
import { ShopFilters } from './ShopFilters';
import { ShopBannerSlideshow } from '@/sections/ShopBannerSlideshow';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { ShopTrustBar } from '@/sections/ShopTrustBar';

// ISR + request-time fetching for product data
// Revalidate every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Shop authentic Ayurvedic products from DRS Health—weight management, liver care, immunity, diabetes support and more.',
  openGraph: {
    title: 'Shop | DRS Health',
    description: 'Ayurvedic wellness products from DRS Health.',
  },
};

type SearchParams = { category?: string; minPrice?: string; maxPrice?: string; new?: string };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const category = params.category ?? undefined;
  const minPrice = params.minPrice ? parseInt(params.minPrice, 10) : undefined;
  const maxPrice = params.maxPrice ? parseInt(params.maxPrice, 10) : undefined;
  const newOnly = params.new === '1';

  const [products, categories] = await Promise.all([
    getProducts({
      limit: 1000,
      category,
      minPrice,
      maxPrice,
      newOnly,
    }),
    getCategories(),
  ]);

  return (
    <>
      {/* <ShopBannerSlideshow /> */}
      <div className="section-padding">
        <div className="container-tight">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
              {category
                ? categories.find((c) => c.slug === category)?.label ?? category
                : 'All Products'}
            </h1>
            <p className="text-body-muted">
              {category
                ? `Showing products in ${categories.find((c) => c.slug === category)?.label ?? category}`
                : 'Authentic Ayurvedic formulations for wellness.'}
            </p>
          </div>

          {/* Mobile: filter button + count in a row */}
          <div className="flex items-center justify-between mb-4 md:hidden">
            <ShopFilters categories={categories} />
            <p className="text-sm text-body-muted">{products.length} products</p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar — hidden on mobile */}
            <div className="hidden md:block">
              <ShopFilters categories={categories} />
            </div>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              {products.length === 0 ? (
                <p className="text-body-muted py-12">No products found. Try adjusting filters.</p>
              ) : (
                <>
                  <p className="text-sm text-body-muted mb-4 hidden md:block">{products.length} products</p>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <TestimonialsSection />
      <ShopTrustBar />
    </>
  );
}
