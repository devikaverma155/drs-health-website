import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductCategoryForm } from '../ProductCategoryForm';
import { deleteProductCategory } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function ProductCategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await prisma.productCategory.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/product-categories" className="text-sm text-slate-500 hover:text-slate-900">← Product Categories</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Category</h1>
            <ProductCategoryForm category={category} />
          </div>
        </div>
        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <DeleteButton action={deleteProductCategory.bind(null, category.id)} label="Delete Category" redirectPath="/admin/product-categories" />
          </div>
        </div>
      </div>
    </div>
  );
}
