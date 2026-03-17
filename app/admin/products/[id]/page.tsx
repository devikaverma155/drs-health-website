import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '../ProductForm';
import { deleteProduct } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  const categories = await prisma.productCategory.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });

  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="text-sm text-slate-500 hover:text-slate-900">← Product Master</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Product</h1>
            <ProductForm product={product} categories={categories} />
          </div>
        </div>
        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6 space-y-6">
            <div>
              <h2 className="font-medium text-slate-900 mb-2">Material requirements (per unit)</h2>
              <p className="text-sm text-slate-600 mb-3">Define raw materials and packaging needed per unit of this product. Used by BOM and production for deductions.</p>
              <Link href={`/admin/products/${id}/requirements`} className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark inline-block">
                Edit material requirements
              </Link>
            </div>
            <div className="pt-6 border-t border-slate-200">
              <DeleteButton action={deleteProduct.bind(null, product.id)} label="Delete Product" redirectPath="/admin/products" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
