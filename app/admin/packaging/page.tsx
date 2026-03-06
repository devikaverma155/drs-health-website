import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PackagingPage() {
  const materials = await prisma.packagingMaterial.findMany({
    orderBy: { name: 'asc' },
    include: { batches: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Packaging Materials</h1>
        <Link
          href="/admin/packaging/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add Packaging
        </Link>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {materials.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No packaging materials yet. Add bottles, labels, cartons, etc.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Batches</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/packaging/${m.id}`} className="font-medium text-primary hover:underline">
                      {m.packagingCode || '-'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{m.name || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{m.quantity != null ? String(m.quantity) : '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{m.unit || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{m.batches.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
