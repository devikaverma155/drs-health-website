import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PackagingForm } from '../PackagingForm';

export const dynamic = 'force-dynamic';

export default async function NewPackagingPage() {
  const vendors = await prisma.vendor.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });
  return (
    <div className="space-y-6">
      <Link href="/admin/packaging" className="text-sm text-slate-500 hover:text-slate-900">← Packaging Materials</Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add Packaging Material</h1>
      <PackagingForm vendorIds={vendors} />
    </div>
  );
}
