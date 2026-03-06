import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BOMForm } from '../BOMForm';
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
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });

  return (
    <div className="space-y-6">
      <Link href="/admin/bom" className="text-sm text-slate-500 hover:text-slate-900">← Bill of Material</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit BOM</h1>
            <BOMForm bom={bom} products={products} />
          </div>
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h2 className="font-medium text-slate-900 mb-4">Raw materials</h2>
            {bom.rawItems.length === 0 ? (
              <p className="text-sm text-slate-500">No raw materials in this BOM.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {bom.rawItems.map((item) => (
                  <li key={item.id}>{item.rawMaterial?.name ?? 'Material'} — qty: {item.quantity != null ? String(item.quantity) : 0}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h2 className="font-medium text-slate-900 mb-4">Packaging items</h2>
            {bom.packagingItems.length === 0 ? (
              <p className="text-sm text-slate-500">No packaging items in this BOM.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {bom.packagingItems.map((item) => (
                  <li key={item.id}>{item.packaging?.name ?? 'Packaging'} — qty: {item.quantity != null ? String(item.quantity) : 0}</li>
                ))}
              </ul>
            )}
          </div>
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
