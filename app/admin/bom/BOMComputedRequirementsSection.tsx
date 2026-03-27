import Link from 'next/link';
import { calculateBOM, formatBomQuantity } from '@/lib/bom-calculator';

function fmtInr(n: number) {
  return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function qtyWithUnit(q: number, unit: string) {
  const u = unit?.trim();
  return `${formatBomQuantity(q)}${u ? ` ${u}` : ''}`;
}

interface Props {
  productId: string | null;
  productName: string | null;
  quantity: number | null;
}

export async function BOMComputedRequirementsSection({ productId, productName, quantity }: Props) {
  if (!productId || quantity == null || quantity < 1) {
    return (
      <div className="rounded-xl bg-white border border-slate-200 p-6">
        <h2 className="font-medium text-slate-900 mb-2">Material requirements</h2>
        <p className="text-sm text-slate-500">Select a product and quantity above. Requirements are taken from Product Master (per unit) × quantity.</p>
      </div>
    );
  }

  let result;
  try {
    result = await calculateBOM(productId, quantity);
  } catch (e) {
    return (
      <div className="rounded-xl bg-white border border-slate-200 p-6">
        <h2 className="font-medium text-slate-900 mb-2">Material requirements</h2>
        <p className="text-sm text-red-600">Product not found or error loading requirements.</p>
      </div>
    );
  }

  const hasRequirements = result.rawMaterials.length > 0 || result.packagingMaterials.length > 0;
  if (!hasRequirements) {
    return (
      <div className="rounded-xl bg-white border border-slate-200 p-6">
        <h2 className="font-medium text-slate-900 mb-2">Material requirements for {quantity} unit(s)</h2>
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
          No raw or packaging materials defined for this product. Add them in{' '}
          <Link href={`/admin/products/${productId}/requirements`} className="font-medium text-primary underline">
            Product Master → {productName || 'Product'} → Material Requirements
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-6">
      <h2 className="font-medium text-slate-900 mb-2">
        Material requirements for {quantity} unit(s) of {result.productName}
      </h2>
      <p className="text-xs text-slate-500 mb-4">
        <strong>Required</strong> = per-unit quantity (Product Master) × {quantity} (BOM quantity). <strong>In stock</strong> = sum of batches for that material. <strong>Rate / unit</strong> = raw or packaging material master.
      </p>

      {result.hasShortage && result.shortageWarnings.length > 0 && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm font-medium text-red-800 mb-2">⚠️ Insufficient stock</p>
          <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
            {result.shortageWarnings.map((w, i) => (
              <li key={i}>{w.replace(/^⚠️\s*/, '')}</li>
            ))}
          </ul>
          <p className="text-xs text-red-600 mt-2">Restock before completing production, or reduce quantity.</p>
        </div>
      )}

      {result.rawMaterials.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-slate-700 mb-2">Raw materials</h3>
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-3 py-2 font-medium text-slate-700">Material</th>
                <th className="px-3 py-2 font-medium text-slate-700">Required</th>
                <th className="px-3 py-2 font-medium text-slate-700 text-right">Rate / unit</th>
                <th className="px-3 py-2 font-medium text-slate-700 text-right">Line total</th>
                <th className="px-3 py-2 font-medium text-slate-700">In stock</th>
                <th className="px-3 py-2 font-medium text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.rawMaterials.map((m) => (
                <tr key={m.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">{m.name}</td>
                  <td className="px-3 py-2 tabular-nums">{qtyWithUnit(m.quantityRequired, m.unit)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-slate-700">{fmtInr(m.costPerUnit)}</td>
                  <td className="px-3 py-2 text-right tabular-nums font-medium text-slate-900">{fmtInr(m.totalCost)}</td>
                  <td className="px-3 py-2 tabular-nums">{qtyWithUnit(m.currentStock, m.unit)}</td>
                  <td className="px-3 py-2">
                    {m.isShortage ? (
                      <span className="text-red-600 font-medium">
                        Short by {qtyWithUnit(Math.abs(m.shortage), m.unit)}
                      </span>
                    ) : (
                      <span className="text-green-600">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {result.packagingMaterials.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-2">Packaging materials</h3>
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-3 py-2 font-medium text-slate-700">Material</th>
                <th className="px-3 py-2 font-medium text-slate-700">Required</th>
                <th className="px-3 py-2 font-medium text-slate-700 text-right">Rate / unit</th>
                <th className="px-3 py-2 font-medium text-slate-700 text-right">Line total</th>
                <th className="px-3 py-2 font-medium text-slate-700">In stock</th>
                <th className="px-3 py-2 font-medium text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {result.packagingMaterials.map((m) => (
                <tr key={m.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">{m.name}</td>
                  <td className="px-3 py-2 tabular-nums">{qtyWithUnit(m.quantityRequired, m.unit)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-slate-700">{fmtInr(m.costPerUnit)}</td>
                  <td className="px-3 py-2 text-right tabular-nums font-medium text-slate-900">{fmtInr(m.totalCost)}</td>
                  <td className="px-3 py-2 tabular-nums">{qtyWithUnit(m.currentStock, m.unit)}</td>
                  <td className="px-3 py-2">
                    {m.isShortage ? (
                      <span className="text-red-600 font-medium">
                        Short by {qtyWithUnit(Math.abs(m.shortage), m.unit)}
                      </span>
                    ) : (
                      <span className="text-green-600">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-4 py-3">
        <span className="text-sm font-medium text-slate-800">Total materials cost ({quantity} units)</span>
        <span className="text-base font-semibold tabular-nums text-slate-900">{fmtInr(result.totalMaterialsCost)}</span>
      </div>

      <p className="text-xs text-slate-500 mt-4">
        To change per-unit requirements, go to{' '}
        <Link href={`/admin/products/${productId}/requirements`} className="text-primary underline">
          Product Master → {productName} → Material Requirements
        </Link>
        .
      </p>
    </div>
  );
}
