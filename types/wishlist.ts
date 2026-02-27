/**
 * Wishlist types
 */

export interface WishlistItem {
  productId: string;
  productName: string;
  price: string;
  compareAtPrice?: string;
  image?: string;
  handle: string;
  category?: string;
  addedAt: string; // ISO date string
}

export interface Wishlist {
  items: WishlistItem[];
  updatedAt: string;
}
