import Link from 'next/link';
import { ClientForm } from '../ClientForm';

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/clients" className="text-sm text-slate-500 hover:text-slate-900">← Clients</Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add Client</h1>
      <ClientForm />
    </div>
  );
}
