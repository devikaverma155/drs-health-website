import Link from 'next/link';
import { ProductForm } from '../ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="text-sm text-slate-500 hover:text-slate-900">
        ← Products
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900">New product</h1>
      <ProductForm />
    </div>
  );
}
