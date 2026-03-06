import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { RawMaterialForm } from '../RawMaterialForm';
import { deleteRawMaterial } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function RawMaterialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const material = await prisma.rawMaterial.findUnique({ where: { id } });
  if (!material) notFound();
  const vendors = await prisma.vendor.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });

  return (
    <div className="space-y-6">
      <Link href="/admin/raw-material-inventory" className="text-sm text-slate-500 hover:text-slate-900">← Raw Material Inventory</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Raw Material</h1>
            <RawMaterialForm material={material} vendorIds={vendors} />
          </div>
        </div>
        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <DeleteButton action={deleteRawMaterial.bind(null, material.id)} label="Delete Material" redirectPath="/admin/raw-material-inventory" />
          </div>
        </div>
      </div>
    </div>
  );
}
