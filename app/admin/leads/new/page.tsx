import Link from 'next/link';
import { AddLeadForm } from '../AddLeadForm';

export const dynamic = 'force-dynamic';

const SOURCES = [
  'contact',
  'b2b',
  'private-labelling',
  'contract-manufacturing',
  'pcd',
  'whatsapp',
  'ads',
] as const;

export default function NewLeadPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/leads" className="text-sm text-slate-500 hover:text-slate-900">
        ← Leads
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add lead</h1>
      <AddLeadForm sources={SOURCES} />
    </div>
  );
}
