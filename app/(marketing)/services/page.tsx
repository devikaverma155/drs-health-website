import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Free Ayurvedic consultation, product guidance, Private Labelling, contract manufacturing, and PCD from DRS Health.',
  openGraph: {
    title: 'Services | DRS Health',
    description: 'Free consultation, product guidance, and business solutions from DRS Health.',
  },
};

const CONSUMER_SERVICES = [
  {
    title: 'Free Health Consultation',
    description: 'Book a session with our Ayurvedic experts. Get personalised advice on diet, lifestyle and product selection—at no cost.',
    cta: 'Book Free Consultation',
    href: '/consultation',
    variant: 'primary' as const,
    icon: 'consultation',
  },
  {
    title: 'Product Guidance',
    description: 'Not sure which product is right for you? Our team helps you choose formulations that align with your health goals.',
    cta: 'Contact us',
    href: '/contact',
    variant: 'secondary' as const,
    icon: 'guidance',
  },
  {
    title: 'Authentic Formulations',
    description: 'Classical and modern Ayurvedic products, manufactured under strict quality standards for your safety.',
    cta: 'Manufacturing & Quality',
    href: '/manufacturing-quality',
    variant: 'secondary' as const,
    icon: 'quality',
  },
];

const BUSINESS_SERVICES = [
  {
    id: 'b2b',
    title: 'Retailers & B2B',
    tagline: 'Stock and sell DRS Health products',
    description: 'Interested in stocking or distributing our products? We support retailers and B2B partners with reliable supply and terms.',
    href: '/for-business#b2b',
    cta: 'B2B Enquiry',
  },
  {
    id: 'private-labelling',
    title: 'Private Labelling',
    tagline: 'Our Formula + Your Brand = Valuable Product',
    description: 'Wide range of herbal & Ayurvedic products for private labelling. Own R&D, label design, certification, and quality-checked at our lab.',
    href: '/for-business#private-labelling',
    cta: 'Enquire for Private Labelling',
  },
  {
    id: 'contract-manufacturing',
    title: 'Contract Manufacturing',
    tagline: 'Your Concept + Our Manufacturing = Your Product',
    description: 'Modify our formulations or bring your own. R&D support, timelines, advanced packaging, and dispatch to your location.',
    href: '/for-business#contract-manufacturing',
    cta: 'Enquire for Contract Manufacturing',
  },
  {
    id: 'pcd',
    title: 'PCD (Propaganda Cum Distribution)',
    tagline: 'Partner with us',
    description: 'Quality Ayurvedic and herbal products, marketing support, and reliable supply for PCD partners.',
    href: '/for-business#pcd',
    cta: 'Enquire for PCD',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16 bg-soft-bg border-b border-border">
        <div className="container-tight text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground">
            Our Services
          </h1>
          <p className="mt-4 text-body-muted leading-relaxed">
            From free personal consultation to business solutions—we offer end-to-end Ayurvedic wellness and partnership options.
          </p>
        </div>
      </section>

      {/* For You – Consumer services */}
      <section className="py-16 md:py-20">
        <div className="container-tight">
          <h2 className="text-xl font-semibold text-foreground mb-1 uppercase tracking-wider text-primary">
            For You
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-10">
            Personal health & wellness
          </p>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {CONSUMER_SERVICES.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-border bg-white p-8 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-body-muted text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6">
                  {service.variant === 'primary' ? (
                    <Button href={service.href} variant="primary">
                      {service.cta}
                    </Button>
                  ) : (
                    <Link
                      href={service.href}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {service.cta} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Business – B2B, Private Label, Contract, PCD */}
      <section className="py-16 md:py-20 bg-soft-bg border-y border-border">
        <div className="container-tight">
          <h2 className="text-xl font-semibold text-foreground mb-1 uppercase tracking-wider text-primary">
            For Business
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-10">
            Partnership & manufacturing solutions
          </p>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {BUSINESS_SERVICES.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-border bg-white p-8 shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {service.tagline}
                </p>
                <p className="mt-4 text-body-muted text-sm leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-body-muted text-sm">
            Each business service has its own enquiry form on our{' '}
            <Link href="/for-business" className="text-primary font-medium hover:underline">
              For Business
            </Link>{' '}
            page.
          </p>
        </div>
      </section>

      {/* Single CTA strip */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container-tight text-center">
          <p className="text-foreground font-medium mb-4">
            Not sure which service fits? We can help.
          </p>
          <Button href="/contact" variant="secondary">
            Get in touch
          </Button>
        </div>
      </section>
    </div>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const className = 'w-6 h-6';
  switch (name) {
    case 'consultation':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'guidance':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'quality':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    default:
      return null;
  }
}
