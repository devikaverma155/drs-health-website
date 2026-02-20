/**
 * Cart types for shopping cart functionality
 */

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: string;
  image?: string;
  quantity: number;
  permalink?: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  productId: string;
  quantity: number;
}

export interface CartResponse {
  success: boolean;
  message: string;
  cart?: Cart;
  error?: string;
}
