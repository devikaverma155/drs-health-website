/**
 * RM & PM vendor orders: one canonical status for "received into stock".
 * Legacy rows may still have `complete` until migrated.
 */
export const VENDOR_ORDER_RECEIVED_STATUS = 'delivered' as const;

export function isVendorOrderReceivedStatus(s: string | null | undefined): boolean {
  return s === 'delivered' || s === 'complete';
}

/** Map legacy DB value so the status dropdown always matches an option. */
export function normalizeVendorOrderStatusForForm(s: string | null | undefined): string {
  if (!s) return 'pending';
  if (s === 'complete') return 'delivered';
  return s;
}
