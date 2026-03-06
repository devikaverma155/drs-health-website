import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PackagingForm } from '../PackagingForm';
import { deletePackagingMaterial } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function PackagingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const packaging = await prisma.packagingMaterial.findUnique({ where: { id } });
  if (!packaging) notFound();
  const vendors = await prisma.vendor.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });

  return (
    <div className="space-y-6">
      <Link href="/admin/packaging" className="text-sm text-slate-500 hover:text-slate-900">← Packaging Materials</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Packaging Material</h1>
            <PackagingForm packaging={packaging} vendorIds={vendors} />
          </div>
        </div>
        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <DeleteButton action={deletePackagingMaterial.bind(null, packaging.id)} label="Delete Packaging" redirectPath="/admin/packaging" />
          </div>
        </div>
      </div>
    </div>
  );
}
