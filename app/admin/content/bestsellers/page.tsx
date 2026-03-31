import { prisma } from '@/lib/prisma';
import { getProducts } from '@/lib/woocommerce';
import BestSellersManager from './BestSellersManager';

export const dynamic = 'force-dynamic';

export default async function BestSellersAdminPage() {
  // Fetch all WooCommerce products for the picker
  let allProducts: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    allProducts = await getProducts({ limit: 200 });
  } catch {
    // WooCommerce unavailable — admin will see an empty product list
  }

  // Fetch current featured products from DB
  let currentFeatured: {
    wooProductId: string | null;
    wooProductSlug: string | null;
    productName: string | null;
    productImage: string | null;
    sortOrder: number;
  }[] = [];
  try {
    currentFeatured = await prisma.featuredProduct.findMany({
      where: { section: 'bestsellers' },
      orderBy: { sortOrder: 'asc' },
      select: { wooProductId: true, wooProductSlug: true, productName: true, productImage: true, sortOrder: true },
    });
  } catch {
    // DB unavailable
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Best Sellers Picker</h1>
          <p className="text-sm text-slate-500 mt-1">
            Choose which products appear in the Best Sellers carousel on the homepage.
            {allProducts.length === 0 && (
              <span className="text-amber-600"> (WooCommerce unavailable — product list empty)</span>
            )}
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          View homepage →
        </a>
      </div>

      <BestSellersManager allProducts={allProducts} currentFeatured={currentFeatured} />
    </div>
  );
}
