import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function fmtInr(n: number) {
  return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

type MaterialRow = {
  id: string;
  category: 'Raw Material' | 'Packaging';
  code: string | null;
  name: string | null;
  unit: string | null;
  editHref: string;
  batchCount?: number;
  totalQty?: number;
  minStock?: string | null;
  costPerUnit: number | null;
};

export default async function MaterialsPage() {
  const [rawMaterials, packagingMaterials] = await Promise.all([
    prisma.rawMaterial.findMany({
      orderBy: { name: 'asc' },
      include: { batches: true },
    }),
    prisma.packagingMaterial.findMany({
      orderBy: { name: 'asc' },
      include: { batches: true },
    }),
  ]);
  
  const rows: MaterialRow[] = [
    ...rawMaterials.map((m) => ({
      id: m.id,
      category: 'Raw Material' as const,
      code: m.materialCode,
      name: m.name,
      unit: m.unit,
      editHref: `/admin/raw-material-inventory/${m.id}`,
      batchCount: m.batches.length,
      totalQty: m.batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0),
      minStock: m.minStock != null ? String(m.minStock) : null,
      costPerUnit: m.costPerUnit != null ? Number(m.costPerUnit) : null,
    })),
    ...packagingMaterials.map((m) => ({
      id: m.id,
      category: 'Packaging' as const,
      code: m.packagingCode,
      name: m.name,
      unit: m.unit,
      editHref: `/admin/packaging/${m.id}`,
      batchCount: m.batches.length,
      totalQty: m.batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0),
      minStock: null,
      costPerUnit: m.costPerUnit != null ? Number(m.costPerUnit) : null,
    })),
  ].sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Materials (RM & PM)</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/raw-material-inventory/new"
            className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
          >
            Add Raw Material
          </Link>
          <Link
            href="/admin/packaging/new"
            className="rounded-lg border border-slate-300 text-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Add Packaging
          </Link>
        </div>
      </div>
      <p className="text-sm text-slate-600 max-w-3xl">
        <strong>Total in stock</strong> is the sum of all batches (increases when a vendor order is <strong>Delivered</strong>; decreases when production completes).
        <strong className="font-medium"> Cost / unit</strong> is set from the order line total ÷ quantity on delivery (for BOM pricing); you can also edit it on each material.
      </p>

      <div className="rounded-xl bg-white border h-[600px] overflow-auto border-slate-200">
        {rows.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No materials yet. Add raw materials or packaging from the buttons above.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">In stock (batches)</th>
                <th className="px-4 py-3 font-medium text-right">Cost / unit</th>
                <th className="px-4 py-3 font-medium">Min stock</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      r.category === 'Raw Material' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {r.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{r.code || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{r.name || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{r.unit || '-'}</td>
                  <td className="px-4 py-3 text-slate-600 tabular-nums">
                    {r.totalQty != null ? (
                      <span>
                        <span className="font-medium text-slate-900">{r.totalQty}</span>
                        {r.batchCount != null ? (
                          <span className="text-slate-400 text-xs ml-1">({r.batchCount} batches)</span>
                        ) : null}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {r.costPerUnit != null && r.costPerUnit > 0 ? fmtInr(r.costPerUnit) : '—'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.minStock ?? '-'}</td>
                  <td className="px-4 py-3">
                    <Link href={r.editHref} className="text-primary font-medium hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
