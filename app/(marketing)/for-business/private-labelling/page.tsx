import type { Metadata } from 'next';
import Image from 'next/image';
import { PrivateLabellingForm } from '../PrivateLabellingForm';

export const metadata: Metadata = {
  title: 'Private Labelling Solutions',
  description:
    'Launch your own branded Ayurvedic products with DRS Health. Our formula + your brand. Custom packaging available.',
  openGraph: {
    title: 'Private Labelling | DRS Health',
    description: 'Create your own branded products with our formulations and expertise.',
  },
};

export default function PrivateLabellingPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-accent-blue/10 to-accent-navy/10 h-[400px] flex items-center justify-center border border-border md:order-2">
            <div className="text-center text-body-muted">
              <Image
                src="https://drshealth.in/wp-content/uploads/2024/11/SW-Products.png"
                alt="Private labelling packaging design"
                width={500}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:order-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Private Labelling
            </h1>
            <p className="text-lg text-body-muted mb-6 leading-relaxed">
              Our formula + your brand. Create your own line of Ayurvedic products with custom packaging and labelling.
            </p>
            <ul className="space-y-3 text-body-muted mb-8">
              <li className="flex items-start gap-3">
                <span className="text-accent-blue font-bold mt-1">✓</span>
                <span>Proven classical and modern formulations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue font-bold mt-1">✓</span>
                <span>Full customization options for packaging</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue font-bold mt-1">✓</span>
                <span>Regulatory compliance support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue font-bold mt-1">✓</span>
                <span>Scalable production capabilities</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-soft-bg rounded-2xl p-8 md:p-12 border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Start your private label brand
          </h2>
          <PrivateLabellingForm />
        </div>
      </div>
    </div>
  );
}
