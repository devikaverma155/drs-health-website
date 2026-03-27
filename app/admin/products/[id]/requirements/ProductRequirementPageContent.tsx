'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductRequirementForm, ProductRequirementList } from './RequirementForm';
import type { Product, ProductRequirement } from '@prisma/client';
import type { Decimal } from '@prisma/client/runtime/library';

type RawMaterialOption = { id: string; name: string | null; purchaseRate?: Decimal | null; unit?: string | null };
type PackagingMaterialOption = { id: string; name: string | null; costPerUnit?: Decimal | null; unit?: string | null };

type ProductWithReqs = Product & {
  requirements: (ProductRequirement & {
    rawMaterial?: RawMaterialOption | null;
    packagingMaterial?: PackagingMaterialOption | null;
  })[];
};

interface ProductRequirementPageContentProps {
  productId: string;
  product: ProductWithReqs;
  rawMaterials: RawMaterialOption[];
  packagingMaterials: PackagingMaterialOption[];
}

export function ProductRequirementPageContent({
  productId,
  product,
  rawMaterials,
  packagingMaterials,
}: ProductRequirementPageContentProps) {
  const router = useRouter();
  const [editingRequirement, setEditingRequirement] = useState<(ProductRequirement & {
    rawMaterial?: RawMaterialOption | null;
    packagingMaterial?: PackagingMaterialOption | null;
  }) | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  function handleSuccess() {
    setEditingRequirement(null);
    setShowAddForm(false);
    router.refresh();
  }

  // Compute total cost per unit across all requirements
  const totalCostPerUnit = product.requirements.reduce((sum, req) => {
    const qty = Number(req.quantityPerUnit ?? 0);
    const rate = req.rawMaterial
      ? Number(req.rawMaterial.purchaseRate ?? 0)
      : Number(req.packagingMaterial?.costPerUnit ?? 0);
    return sum + qty * rate;
  }, 0);

  return (
    <div className="space-y-6">
      {product.requirements.length > 0 && (
        <div className="rounded-lg bg-primary/5 border border-primary/20 px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-slate-700 font-medium">Estimated cost per unit</span>
          <span className="text-lg font-bold text-primary">₹{totalCostPerUnit.toFixed(4)}</span>
        </div>
      )}

      <ProductRequirementList
        productId={productId}
        requirements={product.requirements}
        onEdit={(req) => {
          setShowAddForm(false);
          setEditingRequirement(req);
        }}
        onDeleteSuccess={() => router.refresh()}
      />

      {editingRequirement ? (
        <div className="rounded-xl bg-white border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Edit requirement</h2>
          <ProductRequirementForm
            productId={productId}
            requirement={editingRequirement}
            rawMaterials={rawMaterials}
            packagingMaterials={packagingMaterials}
            onSuccess={handleSuccess}
            onCancel={() => setEditingRequirement(null)}
          />
        </div>
      ) : showAddForm ? (
        <div className="rounded-xl bg-white border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Add material requirement</h2>
          <ProductRequirementForm
            productId={productId}
            rawMaterials={rawMaterials}
            packagingMaterials={packagingMaterials}
            onSuccess={handleSuccess}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
          >
            Add raw or packaging material
          </button>
        </div>
      )}
    </div>
  );
}
