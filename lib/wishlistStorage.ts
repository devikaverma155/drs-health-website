/**
 * Wishlist storage utilities
 * Manages wishlist data in localStorage (client-side)
 */

import type { Wishlist, WishlistItem } from '@/types/wishlist';

const WISHLIST_STORAGE_KEY = 'drs-health-wishlist';

function emptyWishlist(): Wishlist {
  return { items: [], updatedAt: new Date().toISOString() };
}

/**
 * Get wishlist from localStorage
 */
export function getWishlistFromStorage(): Wishlist {
  if (typeof window === 'undefined') return emptyWishlist();

  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!stored) return emptyWishlist();
    return JSON.parse(stored);
  } catch {
    console.error('Error reading wishlist from storage');
    return emptyWishlist();
  }
}

/**
 * Save wishlist to localStorage
 */
function saveWishlistToStorage(wishlist: Wishlist): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  } catch {
    console.error('Error saving wishlist to storage');
  }
}

/**
 * Add an item to the wishlist (no duplicates)
 */
export function addWishlistItem(
  wishlist: Wishlist,
  item: Omit<WishlistItem, 'addedAt'>
): Wishlist {
  const exists = wishlist.items.some((i) => i.productId === item.productId);
  if (exists) return wishlist;

  const updated: Wishlist = {
    items: [...wishlist.items, { ...item, addedAt: new Date().toISOString() }],
    updatedAt: new Date().toISOString(),
  };
  saveWishlistToStorage(updated);
  return updated;
}

/**
 * Remove an item from the wishlist
 */
export function removeWishlistItem(wishlist: Wishlist, productId: string): Wishlist {
  const updated: Wishlist = {
    items: wishlist.items.filter((i) => i.productId !== productId),
    updatedAt: new Date().toISOString(),
  };
  saveWishlistToStorage(updated);
  return updated;
}

/**
 * Check if a product is in the wishlist
 */
export function isInWishlist(wishlist: Wishlist, productId: string): boolean {
  return wishlist.items.some((i) => i.productId === productId);
}

/**
 * Clear the entire wishlist
 */
export function clearWishlist(): Wishlist {
  const empty = emptyWishlist();
  saveWishlistToStorage(empty);
  return empty;
}
