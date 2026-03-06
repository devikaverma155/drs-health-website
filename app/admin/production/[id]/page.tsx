import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductionBatchForm } from '../ProductionBatchForm';
import { deleteProductionBatch } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function ProductionBatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const batch = await prisma.productionBatch.findUnique({ where: { id } });
  if (!batch) notFound();
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });

  return (
    <div className="space-y-6">
      <Link href="/admin/production" className="text-sm text-slate-500 hover:text-slate-900">← Production</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Production Batch</h1>
            <ProductionBatchForm batch={batch} products={products} />
          </div>
        </div>
        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <DeleteButton action={deleteProductionBatch.bind(null, batch.id)} label="Delete Batch" redirectPath="/admin/production" />
          </div>
        </div>
      </div>
    </div>
  );
}
