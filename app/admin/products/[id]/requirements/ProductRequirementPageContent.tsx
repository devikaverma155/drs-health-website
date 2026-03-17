'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductRequirementForm, ProductRequirementList } from './RequirementForm';
import type { Product, ProductRequirement } from '@prisma/client';

type ProductWithReqs = Product & {
  requirements: (ProductRequirement & {
    rawMaterial?: { id: string; name: string | null } | null;
    packagingMaterial?: { id: string; name: string | null } | null;
  })[];
};

interface ProductRequirementPageContentProps {
  productId: string;
  product: ProductWithReqs;
  rawMaterials: { id: string; name: string | null }[];
  packagingMaterials: { id: string; name: string | null }[];
}

export function ProductRequirementPageContent({
  productId,
  product,
  rawMaterials,
  packagingMaterials,
}: ProductRequirementPageContentProps) {
  const router = useRouter();
  const [editingRequirement, setEditingRequirement] = useState<(ProductRequirement & {
    rawMaterial?: { id: string; name: string | null } | null;
    packagingMaterial?: { id: string; name: string | null } | null;
  }) | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  function handleSuccess() {
    setEditingRequirement(null);
    setShowAddForm(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
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
