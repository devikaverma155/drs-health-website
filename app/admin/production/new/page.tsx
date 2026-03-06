import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductionBatchForm } from '../ProductionBatchForm';

export const dynamic = 'force-dynamic';

export default async function NewProductionPage() {
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });
  return (
    <div className="space-y-6">
      <Link href="/admin/production" className="text-sm text-slate-500 hover:text-slate-900">← Production</Link>
      <h1 className="text-2xl font-semibold text-slate-900">New Production Batch</h1>
      <ProductionBatchForm products={products} />
    </div>
  );
}
