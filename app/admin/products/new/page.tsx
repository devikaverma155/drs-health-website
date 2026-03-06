import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '../ProductForm';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await prisma.productCategory.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });
  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="text-sm text-slate-500 hover:text-slate-900">← Product Master</Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
