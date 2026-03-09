import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BOMForm } from '../BOMForm';
import { BOMRawItemsSection } from '../BOMRawItemsSection';
import { BOMPackagingItemsSection } from '../BOMPackagingItemsSection';
import { deleteBOM } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function BOMDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bom = await prisma.billOfMaterial.findUnique({
    where: { id },
    include: {
      product: true,
      rawItems: { include: { rawMaterial: true } },
      packagingItems: { include: { packaging: true } },
    },
  });
  if (!bom) notFound();
  const [products, rawMaterials, packagingMaterials] = await Promise.all([
    prisma.product.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.rawMaterial.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, unit: true } }),
    prisma.packagingMaterial.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, unit: true } }),
  ]);

  return (
    <div className="space-y-6">
      <Link href="/admin/bom" className="text-sm text-slate-500 hover:text-slate-900">← Bill of Material</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit BOM</h1>
            <BOMForm bom={bom} products={products} />
          </div>
          {bom.status === 'complete' && bom.productId && (
            <div className="rounded-xl bg-white border border-slate-200 p-6">
              <p className="text-sm text-slate-600 mb-2">BOM is complete. Add to Production to produce units; RM & PM will be deducted when you mark the batch completed.</p>
              <Link href={`/admin/production/new?productId=${bom.productId}`} className="rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700 inline-block">
                Add to Production
              </Link>
            </div>
          )}
          <BOMRawItemsSection bomId={bom.id} items={bom.rawItems} rawMaterials={rawMaterials} />
          <BOMPackagingItemsSection bomId={bom.id} items={bom.packagingItems} packagingMaterials={packagingMaterials} />
        </div>
        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <DeleteButton action={deleteBOM.bind(null, bom.id)} label="Delete BOM" redirectPath="/admin/bom" />
          </div>
        </div>
      </div>
    </div>
  );
}
