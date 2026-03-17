# Order System Updates

## What's Changed

### 1. **New CustomerOrder Database Model** (`prisma/schema.prisma`)
Added a new `CustomerOrder` model to store e-commerce customer orders locally:
- Stores order details: email, phone, name, total amount, status
- Tracks WooCommerce order ID and Razorpay payment info
- Stores order items, shipping/billing addresses
- Indexed by email, status, and createdAt for efficient queries

### 2. **Email Sending Utility** (`lib/email.ts`)
Created comprehensive email utilities:
- `sendEmail()` - Generic email sender
- `sendOrderConfirmationEmail()` - Sends HTML formatted order confirmation
- `sendOrderShippedEmail()` - Sends shipping notification

**Currently logs to console.** To enable real emails, update with your email service:
- Resend
- SendGrid  
- Nodemailer
- AWS SES
- etc.

### 3. **Order Creation with Database Storage** (`app/api/checkout/create-order/route.ts`)
- Creates order in WooCommerce as before
- **NEW**: Also stores order in local database for instant availability
- If DB save fails, still completes WooCommerce order (graceful fallback)

### 4. **Payment Verification with Email** (`app/api/razorpay/verify/route.ts`)
- Verifies Razorpay payment signature
- Updates WooCommerce order to "processing"
- **NEW**: Updates database order status
- **NEW**: Sends order confirmation email to customer

### 5. **Improved Orders API** (`app/api/orders/route.ts`)
Now implements a two-tier fetch strategy:
1. **First**: Fetches from local database (fast, reliable)
2. **Fallback**: Queries WooCommerce API if DB has no orders
3. Returns consistent format regardless of source

## How to Use

### Setup

1. **Run Prisma migration**:
```bash
npx prisma migrate dev --name add_customer_orders
```

2. **Optional: Enable Email Sending**
Update `lib/email.ts` with your email service provider. Example with Resend:
```typescript
export async function sendEmail(options: EmailOptions) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM_EMAIL || 'orders@drshealth.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
    }),
  });
  return { ok: response.ok };
}
```

3. **Set environment variables**:
```env
# Optional for email service
MAIL_FROM_EMAIL=orders@drshealth.com
NEXT_PUBLIC_SITE_URL=https://drshealth.com
RESEND_API_KEY=your_api_key  # If using Resend
```

### Flow

**When customer places an order:**
1. ✅ Order created in WooCommerce
2. ✅ Order stored in local database
3. ✅ Razorpay order created

**When payment is verified:**
1. ✅ WooCommerce order updated to "processing"
2. ✅ Local database order updated with payment ID
3. ✅ **Confirmation email sent to customer** 🎉

**When customer views their orders:**
1. ✅ API checks database first (instant)
2. ✅ Falls back to WooCommerce if needed
3. ✅ Customer sees all orders immediately

## Benefits

- **Instant order visibility** - No waiting for WooCommerce sync
- **Customer confirmation** - Email receipt after payment
- **Fallback protection** - Works even if WooCommerce API fails
- **Local tracking** - All orders stored in your database
- **Flexible emails** - Easy to customize and send notifications

## Testing

1. **Create a test order** through the checkout flow
2. **Check console logs** to see email content (if not configured with real service)
3. **Query database**:
```typescript
const orders = await prisma.customerOrder.findMany({
  where: { email: 'customer@example.com' }
});
```
4. **Check account/orders page** - Should show order immediately after payment verification

## Notes

- If email service fails, it won't block order processing
- Orders are always created even if email fails
- All errors are logged for debugging
- Database stores items/addresses as JSON for flexibility
