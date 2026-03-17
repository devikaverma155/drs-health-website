'use client';

import { useState } from 'react';
import { createProductRequirement, updateProductRequirement, deleteProductRequirement } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { ProductRequirement } from '@prisma/client';

interface RequirementFormProps {
  productId: string;
  requirement?: (ProductRequirement & {
    rawMaterial?: { id: string; name: string | null } | null;
    packagingMaterial?: { id: string; name: string | null } | null;
  }) | null;
  rawMaterials: { id: string; name: string | null }[];
  packagingMaterials: { id: string; name: string | null }[];
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductRequirementForm({
  productId,
  requirement,
  rawMaterials,
  packagingMaterials,
  onSuccess,
  onCancel,
}: RequirementFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [materialType, setMaterialType] = useState<'raw' | 'packaging'>(
    requirement?.rawMaterial ? 'raw' : 'packaging'
  );
  const [materialId, setMaterialId] = useState(
    requirement?.rawMaterial?.id || requirement?.packagingMaterial?.id || ''
  );
  const [quantityPerUnit, setQuantityPerUnit] = useState(
    requirement?.quantityPerUnit?.toString() || ''
  );
  const [unit, setUnit] = useState(requirement?.unit || '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    
    if (!materialId || !quantityPerUnit || !unit) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      if (requirement) {
        await updateProductRequirement(requirement.id, {
          quantityPerUnit: parseFloat(quantityPerUnit),
          unit,
        });
      } else {
        await createProductRequirement(productId, {
          rawMaterialId: materialType === 'raw' ? materialId : undefined,
          packagingMaterialId: materialType === 'packaging' ? materialId : undefined,
          quantityPerUnit: parseFloat(quantityPerUnit),
          unit,
        });
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setLoading(false);
    }
  }

  const materials = materialType === 'raw' ? rawMaterials : packagingMaterials;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white border border-slate-200 p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Material Type *
          </label>
          <select
            value={materialType}
            onChange={(e) => {
              setMaterialType(e.target.value as 'raw' | 'packaging');
              setMaterialId('');
            }}
            disabled={loading || !!requirement}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="raw">Raw Material</option>
            <option value="packaging">Packaging Material</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Material *
          </label>
          <select
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value)}
            disabled={loading || !!requirement}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">— Select material —</option>
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Quantity per Unit *
          </label>
          <input
            type="number"
            step="0.0001"
            value={quantityPerUnit}
            onChange={(e) => setQuantityPerUnit(e.target.value)}
            disabled={loading}
            required
            placeholder="e.g., 0.5"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Unit *
          </label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            disabled={loading}
            required
            placeholder="e.g., kg, pieces, L"
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
          {loading ? 'Saving…' : requirement ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

interface RequirementListProps {
  productId: string;
  requirements: (ProductRequirement & {
    rawMaterial?: { id: string; name: string | null } | null;
    packagingMaterial?: { id: string; name: string | null } | null;
  })[];
  onEdit: (req: any) => void;
  onDeleteSuccess?: () => void;
}

export function ProductRequirementList({
  productId,
  requirements,
  onEdit,
  onDeleteSuccess,
}: RequirementListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function handleDelete(requirementId: string) {
    setError('');
    setDeleting(requirementId);
    try {
      await deleteProductRequirement(requirementId);
      onDeleteSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setDeleting(null);
    }
  }

  if (requirements.length === 0) {
    return (
      <div className="rounded-xl bg-white border border-slate-200 p-6 text-center text-slate-500">
        No materials added yet. Add raw materials or packaging materials required per unit.
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
      {error && (
        <div className="bg-red-50 border-b border-red-200 p-4 text-sm text-red-600">
          {error}
        </div>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Material</th>
            <th className="px-4 py-3 font-medium">Per Unit</th>
            <th className="px-4 py-3 font-medium">Unit</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req) => {
            const materialName = req.rawMaterial?.name || req.packagingMaterial?.name || 'Unknown';
            const type = req.rawMaterial ? 'Raw' : 'Packaging';

            return (
              <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    req.rawMaterial ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {type}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{materialName}</td>
                <td className="px-4 py-3 text-slate-600">{req.quantityPerUnit?.toString()}</td>
                <td className="px-4 py-3 text-slate-600">{req.unit}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(req)}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(req.id)}
                      disabled={deleting === req.id}
                      className="text-sm text-red-600 hover:underline disabled:opacity-50"
                    >
                      {deleting === req.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
