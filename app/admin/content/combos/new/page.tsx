import Link from 'next/link';
import { ComboOfferForm } from '../ComboOfferForm';

export default function NewComboPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/content/combos" className="text-sm text-slate-500 hover:text-slate-700">
          ← Back to Combos
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900">Add New Combo Offer</h1>
      <ComboOfferForm />
    </div>
  );
}
