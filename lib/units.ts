/**
 * Unit conversion utilities for materials and production.
 * Base units are Grams (for mass) and Milliliters (for volume).
 */

export const UNIT_CONVERSIONS: Record<string, number> = {
  // Mass
  kg: 1000,
  kgs: 1000,
  kilogram: 1000,
  kilograms: 1000,
  g: 1,
  gram: 1,
  grams: 1,
  mg: 0.001,
  milligram: 0.001,
  milligrams: 0.001,
  
  // Volume
  l: 1000,
  liter: 1000,
  liters: 1000,
  ml: 1,
  milliliter: 1,
  milliliters: 1,
  
  // Count / Discrete
  unit: 1,
  units: 1,
  pc: 1,
  pcs: 1,
  piece: 1,
  pieces: 1,
  pack: 1,
  packs: 1,
  box: 1,
  boxes: 1,
  bottle: 1,
  bottles: 1,
};

/**
 * Returns the conversion factor to the base unit (Gram or ML).
 */
export function getConversionFactor(unit?: string | null): number {
  if (!unit) return 1;
  const normalized = unit.toLowerCase().trim();
  return UNIT_CONVERSIONS[normalized] || 1;
}

/**
 * Converts a quantity from one unit to another.
 * @param quantity The quantity to convert
 * @param fromUnit The source unit (e.g., 'g')
 * @param toUnit The target unit (e.g., 'kg')
 */
export function convertQuantity(quantity: number, fromUnit: string, toUnit: string): number {
  if (!fromUnit || !toUnit || fromUnit === toUnit) return quantity;
  
  const fromFactor = getConversionFactor(fromUnit);
  const toFactor = getConversionFactor(toUnit);
  
  // Convert to base unit first (e.g. 10g -> 10, or 1kg -> 1000)
  const baseValue = quantity * fromFactor;
  
  // Then convert to target unit (e.g. 1000 / 1000 -> 1kg)
  return baseValue / toFactor;
}

/**
 * Calculates the cost for a given quantity and unit, relative to a price defined in another unit.
 * Example: 10g of a material priced at ₹100/kg.
 * @param quantity The amount being used
 * @param quantityUnit The unit of the amount used (e.g., 'g')
 * @param price The price of the material
 * @param priceUnit The unit the price is based on (e.g., 'kg')
 */
export function calculateCost(quantity: number, quantityUnit: string, price: number, priceUnit: string): number {
  const normalizedQuantity = convertQuantity(quantity, quantityUnit, priceUnit);
  return normalizedQuantity * price;
}
