import type { Metadata } from 'next';
import Image from 'next/image';
import { B2BForm } from '../B2BForm';

export const metadata: Metadata = {
  title: 'B2B Retail Partners',
  description:
    'Partner with DRS Health as a retailer or B2B customer. Interested in stocking our Ayurvedic products? Get in touch with our team.',
  openGraph: {
    title: 'B2B Retail Partners | DRS Health',
    description: 'Partner with DRS Health. Stock authentic Ayurvedic products in your retail.',
  },
};

export default function B2BPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Retailers & B2B Customers
            </h1>
            <p className="text-lg text-body-muted mb-6 leading-relaxed">
              Interested in stocking or selling DRS Health products? Partner with us and bring authentic Ayurvedic wellness to your customers.
            </p>
            <ul className="space-y-3 text-body-muted mb-8">
              <li className="flex items-start gap-3">
                <span className="text-accent-green font-bold mt-1">✓</span>
                <span>Competitive wholesale pricing and margins</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-green font-bold mt-1">✓</span>
                <span>Marketing support and product training</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-green font-bold mt-1">✓</span>
                <span>Flexible order quantities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-green font-bold mt-1">✓</span>
                <span>Dedicated account support</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent-green/10 h-[400px] flex items-center justify-center border border-border">
            <div className="text-center text-body-muted">
              <Image
                src="https://drshealth.in/wp-content/uploads/2026/02/consultation.jpg"
                alt="B2B partnership illustration"
                width={500}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-soft-bg rounded-2xl p-8 md:p-12 border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Tell us about your retail business
          </h2>
          <B2BForm />
        </div>
      </div>
    </div>
  );
}
