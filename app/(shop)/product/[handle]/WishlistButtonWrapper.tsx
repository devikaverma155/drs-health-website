'use client';

import { WishlistButton } from '@/components/WishlistButton';
import type { Product } from '@/lib/woocommerce';

export function WishlistButtonWrapper({ product }: { product: Product }) {
  return <WishlistButton product={product} variant="full" />;
}
