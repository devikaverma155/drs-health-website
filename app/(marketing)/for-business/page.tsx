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
    <div className="min-h-screen relative">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-[100px]" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent-green/8 to-transparent blur-[100px]" />
        <div className="absolute -bottom-40 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-gold-soft/8 to-transparent blur-[120px]" />
      </div>

      <div className="section-padding">
        <div className="container-tight max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">For Business</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Business Opportunities
            </h1>
            <p className="text-lg text-body-muted max-w-3xl mx-auto">
              Partner with DRS Health and grow your business. Whether you&apos;re a retailer, brand owner, or distributor, we have the right opportunity for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* B2B Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border p-8 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center text-accent-green text-xl mb-4">
                🏪
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Retailers & B2B
              </h2>
              <p className="text-sm font-medium text-primary mb-3">Stock and sell DRS Health products</p>
              <p className="text-body-muted mb-6 leading-relaxed">
                Interested in stocking or distributing our products? We support retailers and B2B partners with reliable supply and terms.
              </p>
              <Link
                href="/for-business/b2b#enquiry-form"
                className="inline-flex items-center justify-center rounded-xl bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
              >
                B2B Enquiry
              </Link>
            </div>

            {/* Private Labelling Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border p-8 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-accent-blue/10 flex items-center justify-center text-accent-blue text-xl mb-4">
                🎨
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Private Labelling
              </h2>
              <p className="text-sm font-medium text-primary mb-3">Our Formula + Your Brand = Valuable Product</p>
              <p className="text-body-muted mb-6 leading-relaxed">
                Wide range of herbal &amp; Ayurvedic products for private labelling. Own R&amp;D, label design, certification, and quality-checked at our lab.
              </p>
              <Link
                href="/for-business/private-labelling#enquiry-form"
                className="inline-flex items-center justify-center rounded-xl bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
              >
                Enquire for Private Labelling
              </Link>
            </div>

            {/* Contract Manufacturing Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border p-8 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xl mb-4">
                🏭
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Contract Manufacturing
              </h2>
              <p className="text-sm font-medium text-primary mb-3">Your Concept + Our Manufacturing = Your Product</p>
              <p className="text-body-muted mb-6 leading-relaxed">
                Modify our formulations or bring your own. R&amp;D support, timelines, advanced packaging, and dispatch to your location.
              </p>
              <Link
                href="/for-business/contract-manufacturing#enquiry-form"
                className="inline-flex items-center justify-center rounded-xl bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
              >
                Enquire for Contract Manufacturing
              </Link>
            </div>

            {/* PCD Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border p-8 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-accent-lime/10 flex items-center justify-center text-primary text-xl mb-4">
                📍
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                PCD (Propaganda Cum Distribution)
              </h2>
              <p className="text-sm font-medium text-primary mb-3">Partner with us</p>
              <p className="text-body-muted mb-6 leading-relaxed">
                Quality Ayurvedic and herbal products, marketing support, and reliable supply for PCD partners.
              </p>
              <Link
                href="/for-business/pcd#enquiry-form"
                className="inline-flex items-center justify-center rounded-xl bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
              >
                Enquire for PCD
              </Link>
            </div>
          </div>

          {/* CTA Section — bolder */}
          <div className="relative bg-gradient-to-br from-primary/10 via-accent-green/5 to-gold-soft/10 rounded-3xl border border-primary/15 p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent-green/5 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Not sure which opportunity is right for you?
              </h2>
              <p className="text-lg text-body-muted mb-8 max-w-2xl mx-auto font-medium">
                Talk to our partnership team. We&apos;ll help you find the best way to work with DRS Health.
              </p>
              <Button href="/contact" variant="primary">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
