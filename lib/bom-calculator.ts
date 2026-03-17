/**
 * Bill of Material (BOM) calculator
 * Handles auto-calculation based on product requirements
 */

import { prisma } from '@/lib/prisma';

export interface MaterialRequirement {
  id: string;
  name: string;
  type: 'raw' | 'packaging';
  quantityRequired: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
  currentStock: number;
  minStock: number;
  isShortage: boolean;
  shortage: number; // negative if shortage
}

export interface BOMCalculationResult {
  productId: string;
  productName: string;
  quantity: number;
  rawMaterials: MaterialRequirement[];
  packagingMaterials: MaterialRequirement[];
  totalMaterialsCost: number;
  hasShortage: boolean;
  shortageWarnings: string[];
}

/**
 * Calculate BOM automatically from ProductRequirements
 * @param productId Product ID
 * @param quantity Number of units to produce
 */
export async function calculateBOM(
  productId: string,
  quantity: number
): Promise<BOMCalculationResult> {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      requirements: {
        include: {
          rawMaterial: true,
          packagingMaterial: true,
        },
      },
    },
  });

  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  const rawMaterials: MaterialRequirement[] = [];
  const packagingMaterials: MaterialRequirement[] = [];
  const shortageWarnings: string[] = [];
  let totalMaterialsCost = 0;
  let hasShortage = false;

  // Process each requirement
  for (const req of product.requirements) {
    if (req.rawMaterialId && req.rawMaterial) {
      const quantityRequired = Number(req.quantityPerUnit || 0) * quantity;
      const currentStock = Number(req.rawMaterial.currentStock || 0);
      const minStock = Number(req.rawMaterial.minStock || 0);
      const costPerUnit = Number(req.rawMaterial.costPerUnit || 0);
      const totalCost = quantityRequired * costPerUnit;

      const shortage = currentStock - quantityRequired;
      const isShortage = shortage < 0;

      if (isShortage) {
        hasShortage = true;
        shortageWarnings.push(
          `⚠️ ${req.rawMaterial.name}: Need ${quantityRequired} ${req.rawMaterial.unit}, Only have ${currentStock} (Short by ${Math.abs(shortage)} ${req.rawMaterial.unit})`
        );
      }

      rawMaterials.push({
        id: req.rawMaterial.id,
        name: req.rawMaterial.name || '',
        type: 'raw',
        quantityRequired,
        unit: req.rawMaterial.unit || '',
        costPerUnit,
        totalCost,
        currentStock,
        minStock,
        isShortage,
        shortage,
      });

      totalMaterialsCost += totalCost;
    }

    if (req.packagingMaterialId && req.packagingMaterial) {
      const quantityRequired = Number(req.quantityPerUnit || 0) * quantity;
      const currentStock = Number(req.packagingMaterial.currentStock || 0);
      const minStock = Number(req.packagingMaterial.minStock || 0);
      const costPerUnit = Number(req.packagingMaterial.costPerUnit || 0);
      const totalCost = quantityRequired * costPerUnit;

      const shortage = currentStock - quantityRequired;
      const isShortage = shortage < 0;

      if (isShortage) {
        hasShortage = true;
        shortageWarnings.push(
          `⚠️ ${req.packagingMaterial.name}: Need ${quantityRequired} ${req.packagingMaterial.unit}, Only have ${currentStock} (Short by ${Math.abs(shortage)} ${req.packagingMaterial.unit})`
        );
      }

      packagingMaterials.push({
        id: req.packagingMaterial.id,
        name: req.packagingMaterial.name || '',
        type: 'packaging',
        quantityRequired,
        unit: req.packagingMaterial.unit || '',
        costPerUnit,
        totalCost,
        currentStock,
        minStock,
        isShortage,
        shortage,
      });

      totalMaterialsCost += totalCost;
    }
  }

  return {
    productId,
    productName: product.name,
    quantity,
    rawMaterials,
    packagingMaterials,
    totalMaterialsCost,
    hasShortage,
    shortageWarnings,
  };
}

/**
 * Get inventory status for a product's requirements
 */
export async function getProductInventoryStatus(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      requirements: {
        include: {
          rawMaterial: true,
          packagingMaterial: true,
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  const status = {
    productId,
    productName: product.name,
    canProduceUnits: 0,
    limitingFactor: null as string | null,
    requirements: [] as any[],
  };

  let minUnitsCanProduce = Infinity;

  for (const req of product.requirements) {
    if (req.rawMaterial) {
      const currentStock = Number(req.rawMaterial.currentStock || 0);
      const quantityPerUnit = Number(req.quantityPerUnit || 0);
      const unitsCanProduce = Math.floor(currentStock / quantityPerUnit);

      if (unitsCanProduce < minUnitsCanProduce) {
        minUnitsCanProduce = unitsCanProduce;
        status.limitingFactor = `${req.rawMaterial.name} (${unitsCanProduce} units)`;
      }

      status.requirements.push({
        name: req.rawMaterial.name,
        type: 'raw',
        available: currentStock,
        perUnit: quantityPerUnit,
        canProduce: unitsCanProduce,
      });
    }

    if (req.packagingMaterial) {
      const currentStock = Number(req.packagingMaterial.currentStock || 0);
      const quantityPerUnit = Number(req.quantityPerUnit || 0);
      const unitsCanProduce = Math.floor(currentStock / quantityPerUnit);

      if (unitsCanProduce < minUnitsCanProduce) {
        minUnitsCanProduce = unitsCanProduce;
        status.limitingFactor = `${req.packagingMaterial.name} (${unitsCanProduce} units)`;
      }

      status.requirements.push({
        name: req.packagingMaterial.name,
        type: 'packaging',
        available: currentStock,
        perUnit: quantityPerUnit,
        canProduce: unitsCanProduce,
      });
    }
  }

  status.canProduceUnits = minUnitsCanProduce === Infinity ? 0 : minUnitsCanProduce;

  return status;
}
