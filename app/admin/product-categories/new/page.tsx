import Link from 'next/link';
import { ProductCategoryForm } from '../ProductCategoryForm';

export default function NewProductCategoryPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/product-categories" className="text-sm text-slate-500 hover:text-slate-900">← Product Categories</Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add Category</h1>
      <ProductCategoryForm />
    </div>
  );
}
