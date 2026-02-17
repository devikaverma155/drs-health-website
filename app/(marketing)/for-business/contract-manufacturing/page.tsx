import type { Metadata } from 'next';
import Image from 'next/image';
import { ManufacturerForm } from '../ManufacturerForm';

export const metadata: Metadata = {
  title: 'Contract Manufacturing',
  description:
    'Your concept + our manufacturing expertise. Custom formulations and bulk supply for healthcare brands.',
  openGraph: {
    title: 'Contract Manufacturing | DRS Health',
    description: 'Partner with us for custom Ayurvedic formulations and third-party manufacturing.',
  },
};

export default function ContractManufacturingPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Third-Party Contract Manufacturing
            </h1>
            <p className="text-lg text-body-muted mb-6 leading-relaxed">
              Your concept + our manufacturing expertise. We provide full manufacturing services including custom formulations, bulk production, and quality assurance.
            </p>
            <ul className="space-y-3 text-body-muted mb-8">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Custom formulation development</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>ISO certified manufacturing facility</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Scalable production from small to large batches</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>Quality testing and regulatory support</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent-green/10 h-[400px] flex items-center justify-center border border-border">
            <div className="text-center text-body-muted">
              <Image
                src="https://images.unsplash.com/photo-1581092162562-40038f592154?w=500&h=400&fit=crop"
                alt="Manufacturing facility"
                width={500}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-soft-bg rounded-2xl p-8 md:p-12 border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Tell us about your manufacturing needs
          </h2>
          <ManufacturerForm />
        </div>
      </div>
    </div>
  );
}
