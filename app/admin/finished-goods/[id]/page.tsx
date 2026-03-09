import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FinishedGoodsBatchForm } from '../FinishedGoodsBatchForm';

export const dynamic = 'force-dynamic';

export default async function FinishedGoodsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const batch = await prisma.finishedGoodsBatch.findUnique({
    where: { id },
    include: { product: true },
  });
  if (!batch) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/finished-goods" className="text-sm text-slate-500 hover:text-slate-900">← Finished Goods</Link>
      <div className="rounded-xl bg-white border border-slate-200 p-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Finished Goods Batch</h1>
        <FinishedGoodsBatchForm batch={batch} />
      </div>
    </div>
  );
}
