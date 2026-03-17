'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createProductRequirement(
  productId: string,
  data: {
    rawMaterialId?: string;
    packagingMaterialId?: string;
    quantityPerUnit: number;
    unit: string;
  }
) {
  try {
    if (!data.rawMaterialId && !data.packagingMaterialId) {
      throw new Error('Must select either raw material or packaging material');
    }

    const requirement = await prisma.productRequirement.create({
      data: {
        productId,
        rawMaterialId: data.rawMaterialId || null,
        packagingMaterialId: data.packagingMaterialId || null,
        quantityPerUnit: data.quantityPerUnit,
        unit: data.unit,
      },
    });

    revalidatePath(`/admin/products/${productId}/requirements`);
    return requirement;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to create requirement'
    );
  }
}

export async function updateProductRequirement(
  requirementId: string,
  data: {
    quantityPerUnit?: number;
    unit?: string;
  }
) {
  try {
    const requirement = await prisma.productRequirement.update({
      where: { id: requirementId },
      data,
    });

    revalidatePath(`/admin/products/${requirement.productId}/requirements`);
    return requirement;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to update requirement'
    );
  }
}

export async function deleteProductRequirement(requirementId: string) {
  try {
    const requirement = await prisma.productRequirement.findUnique({
      where: { id: requirementId },
    });

    if (!requirement) throw new Error('Requirement not found');

    await prisma.productRequirement.delete({
      where: { id: requirementId },
    });

    revalidatePath(`/admin/products/${requirement.productId}/requirements`);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to delete requirement'
    );
  }
}
