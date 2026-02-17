import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'For Business',
  description:
    'B2B partnerships, Private Labelling, Contract Manufacturing, and PCD opportunities. Grow your business with DRS Health.',
  openGraph: {
    title: 'For Business | DRS Health',
    description: 'Business partnerships and distribution opportunities with DRS Health.',
  },
};

export default function ForBusinessPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Business Opportunities
          </h1>
          <p className="text-lg text-body-muted max-w-3xl mx-auto">
            Partner with DRS Health and grow your business. Whether you&apos;re a retailer, brand owner, or distributor, we have the right opportunity for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* B2B Card */}
          <Link href="/for-business/b2b" className="group">
            <div className="bg-white rounded-2xl border border-border p-8 h-full shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center text-accent-green text-xl mb-4 group-hover:bg-accent-green/20 transition-colors">
                🏪
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                B2B & Retail
              </h2>
              <p className="text-body-muted mb-6 leading-relaxed">
                Stock DRS Health products in your retail store or business. Competitive wholesale pricing and dedicated support.
              </p>
              <div className="text-accent-green font-semibold group-hover:underline">
                Explore →
              </div>
            </div>
          </Link>

          {/* Private Labelling Card */}
          <Link href="/for-business/private-labelling" className="group">
            <div className="bg-white rounded-2xl border border-border p-8 h-full shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue text-xl mb-4 group-hover:bg-accent-blue/20 transition-colors">
                🎨
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Private Labelling
              </h2>
              <p className="text-body-muted mb-6 leading-relaxed">
                Launch your own brand with our proven formulations. Custom packaging and full brand support.
              </p>
              <div className="text-accent-blue font-semibold group-hover:underline">
                Explore →
              </div>
            </div>
          </Link>

          {/* Contract Manufacturing Card */}
          <Link href="/for-business/contract-manufacturing" className="group">
            <div className="bg-white rounded-2xl border border-border p-8 h-full shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xl mb-4 group-hover:bg-primary/20 transition-colors">
                🏭
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Contract Manufacturing
              </h2>
              <p className="text-body-muted mb-6 leading-relaxed">
                Your concept, our expertise. Custom formulations and bulk production with quality assurance.
              </p>
              <div className="text-primary font-semibold group-hover:underline">
                Explore →
              </div>
            </div>
          </Link>

          {/* PCD Card */}
          <Link href="/for-business/pcd" className="group">
            <div className="bg-white rounded-2xl border border-border p-8 h-full shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-accent-lime/10 flex items-center justify-center text-primary text-xl mb-4 group-hover:bg-accent-lime/20 transition-colors">
                📍
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                PCD Programme
              </h2>
              <p className="text-body-muted mb-6 leading-relaxed">
                Exclusive territorial distribution rights. Expand your pharmaceutical business with our product line.
              </p>
              <div className="text-primary font-semibold group-hover:underline">
                Explore →
              </div>
            </div>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/5 to-accent-green/5 rounded-2xl border border-border p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Not sure which opportunity is right for you?
          </h2>
          <p className="text-body-muted mb-8 max-w-2xl mx-auto">
            Talk to our partnership team. We&apos;ll help you find the best way to work with DRS Health.
          </p>
          <Button href="/contact" variant="primary">
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
}
