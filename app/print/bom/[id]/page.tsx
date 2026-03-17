import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { calculateBOM } from '@/lib/bom-calculator';
import { PrintProductionListClient } from '@/app/admin/bom/[id]/print/PrintProductionListClient';

export const dynamic = 'force-dynamic';

export default async function BOMPrintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bom = await prisma.billOfMaterial.findUnique({
    where: { id },
    include: { product: true },
  });
  if (!bom || !bom.productId || !bom.product) notFound();

  const quantity = bom.quantity != null ? Number(bom.quantity) : 1;
  let result;
  try {
    result = await calculateBOM(bom.productId, quantity);
  } catch {
    notFound();
  }

  const hasRequirements = result.rawMaterials.length > 0 || result.packagingMaterials.length > 0;
  if (!hasRequirements) {
    return (
      <div className="p-8 text-slate-700">
        <p>No material requirements defined for this product. Add them in Product Master → Material Requirements.</p>
      </div>
    );
  }

  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <PrintProductionListClient />
      <div id="production-list-content" className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold border-b border-slate-300 pb-2 mb-6">
          Production Material List
        </h1>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm mb-6">
          <div><span className="font-medium text-slate-600">Product:</span> {result.productName}</div>
          <div><span className="font-medium text-slate-600">Quantity to produce:</span> {quantity} units</div>
          <div><span className="font-medium text-slate-600">Date:</span> {dateStr}</div>
        </div>

        {result.hasShortage && result.shortageWarnings.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-sm text-red-800 print:border-red-300">
            <p className="font-semibold mb-2">Insufficient stock</p>
            <ul className="list-disc list-inside space-y-1">
              {result.shortageWarnings.map((w, i) => (
                <li key={i}>{w.replace(/^⚠️\s*/, '')}</li>
              ))}
            </ul>
          </div>
        )}

        {result.rawMaterials.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Raw materials</h2>
            <table className="w-full border border-slate-300 text-sm print:text-xs">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-3 py-2 text-left font-medium">Material</th>
                  <th className="border border-slate-300 px-3 py-2 text-right font-medium">Per unit</th>
                  <th className="border border-slate-300 px-3 py-2 text-left font-medium">Unit</th>
                  <th className="border border-slate-300 px-3 py-2 text-right font-medium">Total required</th>
                  <th className="border border-slate-300 px-3 py-2 text-right font-medium">In stock</th>
                  <th className="border border-slate-300 px-3 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {result.rawMaterials.map((m) => (
                  <tr key={m.id}>
                    <td className="border border-slate-300 px-3 py-2">{m.name}</td>
                    <td className="border border-slate-300 px-3 py-2 text-right">{(quantity > 0 ? m.quantityRequired / quantity : 0).toFixed(4)}</td>
                    <td className="border border-slate-300 px-3 py-2">{m.unit}</td>
                    <td className="border border-slate-300 px-3 py-2 text-right">{m.quantityRequired} {m.unit}</td>
                    <td className="border border-slate-300 px-3 py-2 text-right">{m.currentStock} {m.unit}</td>
                    <td className="border border-slate-300 px-3 py-2">{m.isShortage ? `Short by ${Math.abs(m.shortage)}` : 'OK'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {result.packagingMaterials.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-3">Packaging materials</h2>
            <table className="w-full border border-slate-300 text-sm print:text-xs">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 px-3 py-2 text-left font-medium">Material</th>
                  <th className="border border-slate-300 px-3 py-2 text-right font-medium">Per unit</th>
                  <th className="border border-slate-300 px-3 py-2 text-left font-medium">Unit</th>
                  <th className="border border-slate-300 px-3 py-2 text-right font-medium">Total required</th>
                  <th className="border border-slate-300 px-3 py-2 text-right font-medium">In stock</th>
                  <th className="border border-slate-300 px-3 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {result.packagingMaterials.map((m) => (
                  <tr key={m.id}>
                    <td className="border border-slate-300 px-3 py-2">{m.name}</td>
                    <td className="border border-slate-300 px-3 py-2 text-right">{(quantity > 0 ? m.quantityRequired / quantity : 0).toFixed(4)}</td>
                    <td className="border border-slate-300 px-3 py-2">{m.unit}</td>
                    <td className="border border-slate-300 px-3 py-2 text-right">{m.quantityRequired} {m.unit}</td>
                    <td className="border border-slate-300 px-3 py-2 text-right">{m.currentStock} {m.unit}</td>
                    <td className="border border-slate-300 px-3 py-2">{m.isShortage ? `Short by ${Math.abs(m.shortage)}` : 'OK'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <p className="mt-8 text-xs text-slate-500 print:hidden">
          Generated from Product Master (per-unit requirements × quantity). Use &quot;Print / Save as PDF&quot; above or browser Print.
        </p>
      </div>
    </>
  );
}
