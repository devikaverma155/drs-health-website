# Shopping Cart & Checkout Implementation Guide

## Overview
This guide covers the complete shopping cart system that has been integrated into the DRS Health frontend using WooCommerce as the backend.

## Architecture

### Components & Files Created

#### 1. **Cart Types** (`types/cart.ts`)
Defines TypeScript interfaces for:
- `CartItem`: Individual product in cart
- `Cart`: Complete cart state
- Request/Response types for API communication

#### 2. **Cart Storage** (`lib/cartStorage.ts`)
Utility functions for managing cart state in localStorage:
- `getCartFromStorage()`: Retrieve cart from browser storage
- `saveCartToStorage()`: Persist cart data
- `addOrUpdateItem()`: Add or increment product quantity
- `removeItem()`: Remove product from cart
- `updateItemQuantity()`: Change product quantity
- `clearCart()`: Empty the entire cart
- `calculateCartTotals()`: Calculate total items and price

#### 3. **Cart Context** (`lib/cartContext.tsx`)
React Context Provider with:
- Global cart state management
- localStorage synchronization on mount
- Methods for adding, removing, and updating items
- Loading state to prevent hydration mismatches

Usage:
```tsx
const { cart, addToCart, removeFromCart, updateQuantity, clearAllItems } = useCart();
```

#### 4. **Cart Components**

**CartIcon** (`components/CartIcon.tsx`)
- Displays cart icon with item count badge
- Shows in header navigation
- Links to `/cart` page

**AddToCartButton** (`components/AddToCartButton.tsx`)
- Quantity selector
- Add to cart functionality
- Success notification

**CartItemComponent** (`app/(shop)/cart/page.tsx`)
- Displays individual cart items
- Quantity adjustment
- Remove from cart
- Price calculation

#### 5. **Pages**

**Cart Page** (`app/(shop)/cart/page.tsx`)
- View all cart items
- Adjust quantities
- Remove items
- Clear entire cart
- Proceed to checkout

**Checkout Page** (`app/(shop)/checkout/page.tsx`)
- Customer information form
- Order summary
- Order creation via WooCommerce API
- Payment integration (Razorpay ready)

#### 6. **API Routes**

**Cart API** (`app/api/cart/route.ts`)
- `GET`: Cart endpoint status
- `POST`: Validate and retrieve product data

**Checkout/Order API** (`app/api/checkout/create-order.ts`)
- `POST`: Create order in WooCommerce
- Handles customer info and line items
- Returns order data and payment URL

## Flow Diagram

```
Product Page → Add to Cart Button
                     ↓
            Cart Context (useCart)
                     ↓
         localStorage (persistent)
                     ↓
            Cart Icon (header badge)
                     ↓
         Cart Page (/cart)
         - View items
         - Adjust quantities
         - Remove items
                     ↓
        Checkout Page (/checkout)
         - Customer info form
         - Order summary
                     ↓
     Create Order API (/api/checkout)
                     ↓
         WooCommerce Order Creation
                     ↓
           Razorpay Payment Gateway
                     ↓
         Order Confirmation
```

## Implementation Details

### 1. Adding Items to Cart

In any client component:

```tsx
import { useCart } from '@/lib/cartContext';

function MyComponent() {
  const { addToCart } = useCart();
  
  const handleAddProduct = () => {
    addToCart({
      productId: '123',
      productName: 'Product Name',
      price: '499.00',
      image: 'https://...',
      quantity: 1,
      permalink: 'https://...',
    });
  };
  
  return <button onClick={handleAddProduct}>Add to Cart</button>;
}
```

### 2. Cart State Management

Cart data is:
- **Stored** in browser's localStorage under key `drs-health-cart`
- **Synced** to React Context on component mount
- **Updated** automatically on any cart changes
- **Persistent** across browser sessions

### 3. API Endpoints

#### Validate Product & Add to Cart
```
POST /api/cart
{
  "productId": "123",
  "quantity": 2
}

Response:
{
  "success": true,
  "cart": {
    "items": [...],
    "totalItems": 2,
    "totalPrice": "998.00",
    "createdAt": "2025-02-19T...",
    "updatedAt": "2025-02-19T..."
  }
}
```

#### Create Order
```
POST /api/checkout/create-order
{
  "billing": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "+91...",
    "address_1": "123 Main St",
    "city": "Delhi",
    "state": "DL",
    "postcode": "110001",
    "country": "IN"
  },
  "shipping": {...},
  "line_items": [
    {
      "product_id": "123",
      "quantity": 2,
      "price": "499.00"
    }
  ]
}

Response:
{
  "success": true,
  "order": {
    "id": 456,
    "total": "998.00",
    ...
  },
  "paymentUrl": "/payment?orderId=456&amount=99800"
}
```

## Integration with WooCommerce

The system uses:
- **WooCommerce REST API** for product fetching (`/products` endpoint)
- **Consumer Key/Secret** for authentication
- **Order creation** via POST `/orders` endpoint

Environment variables required:
```
NEXT_PUBLIC_WC_API_URL=https://drshealth.in/wp-json/wc/v3
WC_CONSUMER_KEY=ck_xxx...
WC_CONSUMER_SECRET=cs_xxx...
NEXT_PUBLIC_WC_CHECKOUT_URL=https://drshealth.in/checkout
```

## Razorpay Integration (Ready for Implementation)

The checkout page is prepared for Razorpay integration:

1. Order is created in WooCommerce with status `pending`
2. Redirect to Razorpay payment page
3. Upon successful payment, update order status to `processing`
4. Send confirmation emails

### Next Steps for Razorpay:
1. Create `/api/payment/razorpay` endpoint
2. Initialize Razorpay session with order amount
3. Implement payment verification webhook
4. Update WooCommerce order status after successful payment

## Header Integration

The `CartIcon` component is already integrated into the Header:
- Shows current cart item count
- Displays as badge on cart icon
- Responsive for mobile and desktop
- Located in top navigation

## Usage Examples

### Example 1: Adding Product from Product Page
```tsx
// Already integrated in AddToCartForm.tsx
const { addToCart } = useCart();
addToCart({
  productId: product.id,
  productName: product.title,
  price: product.priceRange.minVariantPrice.amount,
  image: product.featuredImage?.url,
  quantity: selectedQuantity,
});
```

### Example 2: Accessing Cart from Any Component
```tsx
import { useCart } from '@/lib/cartContext';

function MyComponent() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  
  return (
    <div>
      <p>Total Items: {cart.totalItems}</p>
      <p>Total Price: ₹{cart.totalPrice}</p>
      {cart.items.map(item => (
        <div key={item.id}>
          <h3>{item.productName}</h3>
          <p>₹{item.price} x {item.quantity}</p>
          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
            Increase
          </button>
          <button onClick={() => removeFromCart(item.productId)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
```

## Testing the Cart

1. **Add to Cart**: Go to any product page, select quantity, click "Add to Cart"
2. **View Cart**: Click cart icon in header or go to `/cart`
3. **Modify Quantity**: Use input field on cart page
4. **Remove Items**: Click "Remove" button
5. **Checkout**: Click "Proceed to Checkout"
6. **Fill Form**: Enter billing information
7. **Create Order**: System creates order in WooCommerce

## Error Handling

- **Invalid Product**: Returns 404 with error message
- **API Failure**: Falls back to graceful error messages
- **Missing Fields**: Validates required information
- **Network Issues**: Catches and logs errors, shows user-friendly messages

## Performance Considerations

1. **localStorage**: Cart is persisted locally, reducing server calls
2. **Context**: Prevents unnecessary re-renders with React Context
3. **Image Optimization**: Uses Next.js Image component for product images
4. **API Caching**: WooCommerce product API can be cached on fetch

## Security Notes

1. **API Credentials**: Consumer Key/Secret are server-side only
2. **Order Creation**: Validated on server before WooCommerce call
3. **Cart Data**: Stored client-side, no sensitive data
4. **Validation**: All customer input validated before API calls

## Troubleshooting

### Cart Not Persisting
- Check browser localStorage is enabled
- Verify CartProvider wraps entire app
- Check browser console for errors

### Order Creation Fails
- Verify WooCommerce API credentials are correct
- Check API endpoint is accessible
- Ensure customer billing data is complete

### CartIcon Not Showing Count
- Verify CartProvider is rendered
- Check if isLoading flag is true
- Inspect browser console for context errors

## Next Steps

1. **Implement Razorpay Payment**: Create payment endpoint
2. **Order Confirmation Email**: Integrate email service
3. **Order Tracking**: Create order history page
4. **Guest Checkout**: Allow checkout without account
5. **Coupon/Discount**: Add discount code functionality
6. **Shipping Calculation**: Integrate shipping API
7. **Tax Calculation**: Add tax based on location

## Files Summary

| File | Purpose |
|------|---------|
| `types/cart.ts` | Cart TypeScript types |
| `lib/cartStorage.ts` | localStorage utilities |
| `lib/cartContext.tsx` | React Context Provider |
| `components/CartIcon.tsx` | Header cart icon |
| `components/AddToCartButton.tsx` | Add to cart button |
| `app/(shop)/cart/page.tsx` | Cart view page |
| `app/(shop)/checkout/page.tsx` | Checkout page |
| `app/api/cart/route.ts` | Cart API endpoint |
| `app/api/checkout/create-order.ts` | Order creation endpoint |
| `app/layout.tsx` | Root layout with CartProvider |
| `layout/Header.tsx` | Updated header with CartIcon |

## Support

For issues or questions:
1. Check browser console for errors
2. Verify WooCommerce API configuration
3. Ensure all environment variables are set
4. Review this documentation
