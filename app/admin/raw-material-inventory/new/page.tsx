import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { RawMaterialForm } from '../RawMaterialForm';

export const dynamic = 'force-dynamic';

export default async function NewRawMaterialPage() {
  const vendors = await prisma.vendor.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });
  return (
    <div className="space-y-6">
      <Link href="/admin/raw-material-inventory" className="text-sm text-slate-500 hover:text-slate-900">← Raw Material Inventory</Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add Raw Material</h1>
      <RawMaterialForm vendorIds={vendors} />
    </div>
  );
}
