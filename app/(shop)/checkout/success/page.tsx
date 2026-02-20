import Link from 'next/link';

export const metadata = {
  title: 'Order Confirmed | DRS Health',
  description: 'Thank you for your order.',
};

const MESSAGE =
  'Thank you for shopping with us. Your account has been charged and your transaction is successful. We will be processing your order soon.';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 flex items-center justify-center">
      <div className="card-soft p-8 max-w-lg w-full text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-3">Order Confirmed</h1>
        <p className="text-body-muted mb-8">{MESSAGE}</p>
        <Link
          href="/shop"
          className="inline-block w-full py-3 bg-primary text-white rounded-xl hover:bg-primary-dark font-medium transition-colors"
        >
          Continue Shopping
        </Link>
        <Link href="/account" className="block mt-4 text-primary hover:underline text-sm font-medium">
          View order in My Account
        </Link>
      </div>
    </div>
  );
}
