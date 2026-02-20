import type { Metadata } from 'next';
import Image from 'next/image';
import { PCDForm } from '../PCDForm';

export const metadata: Metadata = {
  title: 'PCD Programme',
  description:
    'Propaganda Cum Distribution (PCD) opportunity with DRS Health. Expand your pharmaceutical business with our products.',
  openGraph: {
    title: 'PCD Programme | DRS Health',
    description: 'Join our PCD programme and distribute authentic Ayurvedic products in your region.',
  },
};

export default function PCDPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-accent-lime/10 to-accent-green/10 h-[400px] flex items-center justify-center border border-border md:order-2">
            <div className="text-center text-body-muted">
              <Image
                src="https://drshealth.in/wp-content/uploads/2024/11/Syadwad-Combo.webp"
                alt="PCD distribution network"
                width={500}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:order-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              PCD (Propaganda Cum Distribution)
            </h1>
            <p className="text-lg text-body-muted mb-6 leading-relaxed">
              Become our distribution partner and expand your pharmaceutical business with our range of authentic Ayurvedic products.
            </p>
            <ul className="space-y-3 text-body-muted mb-8">
              <li className="flex items-start gap-3">
                <span className="text-accent-lime font-bold mt-1">✓</span>
                <span>Exclusive territorial rights</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-lime font-bold mt-1">✓</span>
                <span>Attractive profit margins</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-lime font-bold mt-1">✓</span>
                <span>Marketing and promotional support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-lime font-bold mt-1">✓</span>
                <span>Training and product knowledge</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-soft-bg rounded-2xl p-8 md:p-12 border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Apply for PCD partnership
          </h2>
          <PCDForm />
        </div>
      </div>
    </div>
  );
}
