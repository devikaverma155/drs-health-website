import Link from 'next/link';
import { RawMaterialBuyerForm } from '../RawMaterialBuyerForm';

export default function NewRawMaterialBuyerPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/raw-materials" className="text-sm text-slate-500 hover:text-slate-900">
        ← Raw Materials
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add Buyer</h1>
      <RawMaterialBuyerForm />
    </div>
  );
}
