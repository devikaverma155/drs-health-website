import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BestSellersEditor } from './BestSellersEditor';

export const dynamic = 'force-dynamic';

export default async function BestSellersContentPage() {
  const [configs, products] = await Promise.all([
    prisma.bestSellerConfig.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.product.findMany({ where: { active: true }, orderBy: { title: 'asc' } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/content" className="text-sm text-slate-500 hover:text-slate-900">
          ← Content
        </Link>
        <h1 className="text-2xl font-semibold text-slate-900 mt-1">Best sellers</h1>
      </div>
      <p className="text-sm text-slate-500">
        Choose and order featured products for the homepage. Products are from the Products list (mock); storefront products come from WooCommerce.
      </p>
      <BestSellersEditor configs={configs} products={products} />
    </div>
  );
}
