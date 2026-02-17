import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProduct } from '@/lib/shopify-admin';
import { ProductForm } from '../ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="text-sm text-slate-500 hover:text-slate-900">
        ← Products
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900">Edit product</h1>
      <ProductForm product={product} />
    </div>
  );
}
