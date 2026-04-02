"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPackagingMaterial, updatePackagingMaterial } from "./actions";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import type { PackagingMaterial } from "@prisma/client";

export function PackagingForm({
  packaging,
  vendorIds,
}: {
  packaging?: PackagingMaterial | null;
  vendorIds: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [packagingCode, setPackagingCode] = useState(
    packaging?.packagingCode ?? "",
  );
  const [name, setName] = useState(packaging?.name ?? "");
  const [costPerUnit, setCostPerUnit] = useState(
    packaging?.costPerUnit?.toString() ?? "",
  );
  const [supplierId, setSupplierId] = useState(packaging?.supplierId ?? "");
  const [quantity, setQuantity] = useState(
    packaging?.quantity?.toString() ?? "",
  );
  const [unit, setUnit] = useState(packaging?.unit ?? "");
  const [minStock, setMinStock] = useState(
    packaging?.minStock?.toString() ?? "",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (packaging) {
        await updatePackagingMaterial(packaging.id, {
          packagingCode,
          name,
          costPerUnit,
          supplierId: supplierId || undefined,
          quantity,
          unit,
          minStock,
        });
      } else {
        await createPackagingMaterial({
          packagingCode,
          name,
          costPerUnit,
          supplierId: supplierId || undefined,
          quantity,
          unit,
          minStock,
        });
      }
      router.push("/admin/packaging");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200 p-6 relative"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Packaging code
          </label>
          <input
            type="text"
            value={packagingCode}
            onChange={(e) => setPackagingCode(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Cost per unit
          </label>
          <input
            type="number"
            step="0.01"
            value={costPerUnit}
            onChange={(e) => setCostPerUnit(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Supplier
          </label>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">— Select —</option>
            {vendorIds.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            step="0.01"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Unit
          </label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Min stock
          </label>
          <input
            type="number"
            step="0.01"
            value={minStock}
            onChange={(e) => setMinStock(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <LoadingSpinner size="sm" />}
          {loading ? "Saving…" : packaging ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <LoadingSpinner size="lg" />
        </div>
      )}
    </form>
  );
}
