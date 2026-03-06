import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BOMPage() {
  const boms = await prisma.billOfMaterial.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      product: true,
      rawItems: { include: { rawMaterial: true } },
      packagingItems: { include: { packaging: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Bill of Material (BOM)</h1>
        <Link
          href="/admin/bom/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add BOM
        </Link>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {boms.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No BOMs yet. Define raw and packaging materials required per product batch.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Raw items</th>
                <th className="px-4 py-3 font-medium">Packaging items</th>
              </tr>
            </thead>
            <tbody>
              {boms.map((bom) => (
                <tr key={bom.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/bom/${bom.id}`} className="font-medium text-primary hover:underline">
                      {bom.product?.name ?? 'Unknown product'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{bom.rawItems.length}</td>
                  <td className="px-4 py-3 text-slate-600">{bom.packagingItems.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
