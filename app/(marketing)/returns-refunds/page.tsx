import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Returns and Refunds',
  description: 'Return and refund policy for DRS Health. Conditions and process for returns.',
  openGraph: {
    title: 'Returns and Refunds | DRS Health',
  },
};

export default function ReturnsRefundsPage() {
  return (
    <div className="section-padding bg-white">
      <div className="container-tight max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
          Return and Refund Policy
        </h1>
        <p className="text-sm text-body-muted mb-10">
          Last updated: October 20, 2022
        </p>

        <div className="space-y-8 text-body-muted leading-relaxed">
          <p>
            Thank you for shopping at DRS Health. If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Interpretation and Definitions</h2>
            <p><strong className="text-foreground">Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;) refers to DRS Health.</p>
            <p className="mt-2"><strong className="text-foreground">Goods</strong> refer to the items offered for sale on the Service.</p>
            <p className="mt-2"><strong className="text-foreground">Orders</strong> mean a request by You to purchase Goods from Us.</p>
            <p className="mt-2"><strong className="text-foreground">Service</strong> refers to the Website.</p>
            <p className="mt-2"><strong className="text-foreground">Website</strong> refers to DRS Health, accessible from <a href="https://drshealth.in/" className="text-primary hover:underline">https://drshealth.in/</a>.</p>
            <p className="mt-2"><strong className="text-foreground">You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Your Order Cancellation Rights</h2>
            <p>You are entitled to cancel Your Order within 7 days without giving any reason for doing so.</p>
            <p className="mt-3">The deadline for cancelling an Order is 7 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.</p>
            <p className="mt-3">In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by visiting our <Link href="/contact" className="text-primary hover:underline">contact page</Link>.</p>
            <p className="mt-3">We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Conditions for Returns</h2>
            <p>In order for the Goods to be eligible for a return, please make sure that:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>The Goods were purchased in the last 7 days</li>
              <li>The Goods are in the original packaging</li>
            </ul>
            <p className="mt-4">The following Goods cannot be returned:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>The supply of Goods made to Your specifications or clearly personalized.</li>
              <li>The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</li>
              <li>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
              <li>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
            </ul>
            <p className="mt-4">We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion. Only regular priced Goods may be refunded. Unfortunately, Goods on sale cannot be refunded. This exclusion may not apply to You if it is not permitted by applicable law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Returning Goods</h2>
            <p>You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods to the address mentioned on our <Link href="/contact" className="text-primary hover:underline">contact page</Link>.</p>
            <p className="mt-3">We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Gifts</h2>
            <p>If the Goods were marked as a gift when purchased and then shipped directly to you, You&apos;ll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.</p>
            <p className="mt-3">If the Goods weren&apos;t marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give to You later, We will send the refund to the gift giver.</p>
          </section>
        </div>

        <p className="mt-12 text-body-muted text-sm">
          If you have any questions about our Returns and Refunds Policy, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
