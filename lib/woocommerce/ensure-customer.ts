import crypto from 'crypto';

type BillingForCustomer = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address_1?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
};

/**
 * Find or create a WooCommerce customer by billing email so guest checkout orders
 * are linked to an account (My Account login + orders list work).
 */
export async function ensureWooCommerceCustomer(
  baseUrl: string,
  authHeaderBasic: string,
  billing: BillingForCustomer
): Promise<{ id: number } | null> {
  const email = billing.email?.trim().toLowerCase();
  if (!email) return null;

  const listRes = await fetch(`${baseUrl}/customers?email=${encodeURIComponent(email)}`, {
    headers: {
      Authorization: `Basic ${authHeaderBasic}`,
      'Content-Type': 'application/json',
    },
  });

  if (!listRes.ok) {
    console.error('[ensureWooCommerceCustomer] List customers failed:', listRes.status, await listRes.text());
    return null;
  }

  const existing = (await listRes.json()) as { id: number }[];
  if (Array.isArray(existing) && existing.length > 0) {
    return { id: existing[0].id };
  }

  const username = `${email.split('@')[0]}_${Date.now()}`;
  const tempPassword = crypto.randomBytes(12).toString('hex');

  const createRes = await fetch(`${baseUrl}/customers`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeaderBasic}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      username,
      password: tempPassword,
      first_name: billing.first_name,
      last_name: billing.last_name || '',
      billing: {
        first_name: billing.first_name,
        last_name: billing.last_name || '',
        email,
        phone: billing.phone || '',
        address_1: billing.address_1 || '',
        city: billing.city || '',
        state: billing.state || '',
        postcode: billing.postcode || '',
        country: billing.country || 'IN',
      },
      shipping: {
        first_name: billing.first_name,
        last_name: billing.last_name || '',
      },
    }),
  });

  if (!createRes.ok) {
    console.error('[ensureWooCommerceCustomer] Create customer failed:', createRes.status, await createRes.text());
    return null;
  }

  const customer = (await createRes.json()) as { id: number };
  if (!customer?.id) return null;
  return { id: customer.id };
}
