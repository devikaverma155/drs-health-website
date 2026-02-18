import type { Metadata } from 'next';
import { getProducts } from '@/lib/woocommerce';
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

  const products = await getProducts({
    limit: 50,
    category,
    minPrice,
    maxPrice,
    newOnly,
  });

  return (
    <>
      <ShopBannerSlideshow />
      <div className="section-padding">
        <div className="container-tight">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
            Shop
          </h1>
          <p className="text-body-muted mb-4">
            Authentic Ayurvedic formulations for wellness.
          </p>
          <ShopFilters />
          {products.length === 0 ? (
            <p className="text-body-muted py-12">No products found. Try adjusting filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <TestimonialsSection />
      <ShopTrustBar />
    </>
  );
}
