import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BOMForm } from '../BOMForm';

export const dynamic = 'force-dynamic';

export default async function NewBOMPage() {
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });
  return (
    <div className="space-y-6">
      <Link href="/admin/bom" className="text-sm text-slate-500 hover:text-slate-900">← Bill of Material</Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add BOM</h1>
      <p className="text-sm text-slate-600">Create a BOM for a product. Add raw materials and packaging items on the next screen.</p>
      <BOMForm products={products} />
    </div>
  );
}
