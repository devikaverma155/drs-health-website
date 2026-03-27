import { redirect } from 'next/navigation';

/**
 * /account/orders – redirect to My Account with Orders tab and optional placed=1 for success message
 */
export default function AccountOrdersPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const placed = searchParams.placed ?? '';
  const order = searchParams.order ?? '';
  const query = new URLSearchParams();
  query.set('tab', 'orders');
  if (placed) query.set('placed', String(placed));
  if (order) query.set('order', String(order));
  redirect(`/account?${query.toString()}`);
}
