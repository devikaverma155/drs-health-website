import type { ProductRequirement } from '@prisma/client';
import type { Decimal } from '@prisma/client/runtime/library';

type Req = ProductRequirement & {
  rawMaterial?: { id: string; name: string | null; purchaseRate?: Decimal | null } | null;
  packagingMaterial?: { id: string; name: string | null; costPerUnit?: Decimal | null } | null;
};

export function ProductRequirementsSummary({ requirements }: { requirements: Req[] }) {
  if (requirements.length === 0) {
    return (
      <p className="text-sm text-slate-500 rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-3 py-2.5">
        No materials added yet. Use <span className="font-medium text-slate-700">Edit material requirements</span> below to add RM and PM per unit.
      </p>
    );
  }

  const rawList = requirements.filter((r) => r.rawMaterial);
  const pmList = requirements.filter((r) => r.packagingMaterial);

  return (
    <div className="space-y-4">
      {rawList.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Raw materials (RM)</h3>
          <ul className="rounded-lg border border-slate-200 divide-y divide-slate-100 bg-white text-sm">
            {rawList.map((req) => (
              <li key={req.id} className="px-3 py-2 flex justify-between gap-2">
                <span className="font-medium text-slate-900">{req.rawMaterial?.name ?? '—'}</span>
                <span className="text-slate-600 tabular-nums shrink-0">
                  {req.quantityPerUnit?.toString()} {req.unit}
                  <span className="text-slate-400"> / unit</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {pmList.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Packaging (PM)</h3>
          <ul className="rounded-lg border border-slate-200 divide-y divide-slate-100 bg-white text-sm">
            {pmList.map((req) => (
              <li key={req.id} className="px-3 py-2 flex justify-between gap-2">
                <span className="font-medium text-slate-900">{req.packagingMaterial?.name ?? '—'}</span>
                <span className="text-slate-600 tabular-nums shrink-0">
                  {req.quantityPerUnit?.toString()} {req.unit}
                  <span className="text-slate-400"> / unit</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
