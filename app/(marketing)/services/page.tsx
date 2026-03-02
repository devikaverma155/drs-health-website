import type { Metadata } from 'next';
import Image from 'next/image';
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
    accent: 'from-primary/15 to-primary/5',
    iconBg: 'bg-primary/10 text-primary',
  },
  {
    title: 'Product Guidance',
    description: 'Not sure which product is right for you? Our team helps you choose formulations that align with your health goals.',
    cta: 'Contact us',
    href: '/contact',
    variant: 'secondary' as const,
    icon: 'guidance',
    accent: 'from-accent-green/15 to-accent-green/5',
    iconBg: 'bg-accent-green/10 text-accent-green',
  },
  {
    title: 'Authentic Formulations',
    description: 'Classical and modern Ayurvedic products, manufactured under strict quality standards for your safety.',
    cta: 'Manufacturing & Quality',
    href: '/manufacturing-quality',
    variant: 'secondary' as const,
    icon: 'quality',
    accent: 'from-accent-blue/15 to-accent-blue/5',
    iconBg: 'bg-accent-blue/10 text-accent-blue',
  },
];

const BUSINESS_SERVICES = [
  {
    id: 'b2b',
    title: 'Retailers & B2B',
    tagline: 'Stock and sell DRS Health products',
    description: 'Interested in stocking or distributing our products? We support retailers and B2B partners with reliable supply and terms.',
    href: '/for-business/b2b#enquiry-form',
    cta: 'B2B Enquiry',
    emoji: '🏪',
    accentColor: 'border-l-accent-green',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&q=80',
    imageAlt: 'Retail store with shelves of health and wellness products',
  },
  {
    id: 'private-labelling',
    title: 'Private Labelling',
    tagline: 'Our Formula + Your Brand = Valuable Product',
    description: 'Wide range of herbal & Ayurvedic products for private labelling. Own R&D, label design, certification, and quality-checked at our lab.',
    href: '/for-business/private-labelling#enquiry-form',
    cta: 'Enquire for Private Labelling',
    emoji: '🎨',
    accentColor: 'border-l-accent-blue',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80',
    imageAlt: 'Private label herbal supplement bottles',
  },
  {
    id: 'contract-manufacturing',
    title: 'Contract Manufacturing',
    tagline: 'Your Concept + Our Manufacturing = Your Product',
    description: 'Modify our formulations or bring your own. R&D support, timelines, advanced packaging, and dispatch to your location.',
    href: '/for-business/contract-manufacturing#enquiry-form',
    cta: 'Enquire for Contract Manufacturing',
    emoji: '🏭',
    accentColor: 'border-l-primary',
    image: 'https://drshealth.in/wp-content/uploads/2026/03/PHOTO-2026-03-02-15-59-08.jpg',
    imageAlt: 'Manufacturing production line in a factory',
  },
  {
    id: 'pcd',
    title: 'PCD (Propaganda Cum Distribution)',
    tagline: 'Partner with us',
    description: 'Quality Ayurvedic and herbal products, marketing support, and reliable supply for PCD partners.',
    href: '/for-business/pcd#enquiry-form',
    cta: 'Enquire for PCD',
    emoji: '🤝',
    accentColor: 'border-l-gold-soft',
    image: 'https://drshealth.in/wp-content/uploads/2026/03/PHOTO-2026-03-02-16-08-38.jpg',
    imageAlt: 'Distribution and logistics network',
  },
];

const TRUST_STATS = [
  { value: '90+', label: 'Years of Legacy' },
  { value: '500+', label: 'Products' },
  { value: 'GMP', label: 'Certified Manufacturing' },
  { value: '24/7', label: 'Expert Support' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-[100px]" />
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-accent-green/8 to-transparent blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-gold-soft/6 to-transparent blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="relative pt-16 pb-14 md:pt-20 md:pb-18 overflow-hidden border-b border-border">
        {/* Hero gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-soft-bg to-accent-green/6" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-gold-soft/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-accent-green/8 to-transparent rounded-full blur-3xl" />

        <div className="container-tight text-center max-w-3xl mx-auto relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
            Our Services
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need for <br className="hidden md:block" />
            <span className="text-primary">Holistic Wellness</span>
          </h1>
          <p className="text-lg text-body-muted leading-relaxed max-w-2xl mx-auto">
            From free personal consultation to business solutions—we offer end-to-end Ayurvedic wellness and partnership options.
          </p>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="py-6 bg-gradient-to-r from-primary via-primary-dark to-primary text-white">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs md:text-sm text-white/80 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For You – Consumer services */}
      <section className="py-16 md:py-20">
        <div className="container-tight">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 max-w-[40px] bg-primary/40" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
              For You
            </h2>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            Personal Health &amp; Wellness
          </p>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {CONSUMER_SERVICES.map((service) => (
              <div
                key={service.title}
                className="group relative rounded-2xl border border-border bg-white overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                {/* Gradient top accent stripe */}
                <div className={`h-1.5 bg-gradient-to-r ${service.accent}`} />
                <div className="p-8">
                  <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
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
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline transition-all group-hover:gap-2.5"
                      >
                        {service.cta}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image + quote divider */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://drshealth.in/wp-content/uploads/2026/02/image-1771828228498-e1771838762263.png"
            alt="Ayurvedic consultation"
            fill
            className="object-cover"
            
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="container-tight relative z-10 text-center text-white max-w-3xl mx-auto">
          <p className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            &ldquo;Wellness is not a destination — it&rsquo;s a daily practice.&rdquo;
          </p>
          <p className="text-white/70 text-sm">— The DRS Health Philosophy</p>
        </div>
      </section>

      {/* For Business – B2B, Private Label, Contract, PCD */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-soft-bg via-white to-soft-bg opacity-60" />
        <div className="container-tight relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 max-w-[40px] bg-primary/40" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
              For Business
            </h2>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            Partnership &amp; Manufacturing Solutions
          </p>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {BUSINESS_SERVICES.map((service) => (
              <div
                key={service.id}
                className={`rounded-2xl border border-border border-l-4 ${service.accentColor} bg-white/80 backdrop-blur-sm overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1`}
              >
                {/* Photo */}
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-2xl drop-shadow-md">{service.emoji}</span>
                </div>
                {/* Content */}
                <div className="p-8">
                  <h3 className="text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {service.tagline}
                  </p>
                  <p className="mt-3 text-body-muted text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
                  >
                    {service.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-body-muted text-sm">
            Each button above takes you directly to the enquiry form for that service.
          </p>
        </div>
      </section>

      {/* Single CTA strip */}
      <section className="py-14 md:py-20 border-t border-border">
        <div className="container-tight max-w-3xl">
          <div className="relative bg-gradient-to-br from-primary/12 via-accent-green/6 to-gold-soft/12 rounded-3xl border border-primary/15 p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent-green/8 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gold-soft/8 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Not sure which service fits?
              </h2>
              <p className="text-body-muted mb-6">We&rsquo;re here to help you find the right solution.</p>
              <Button href="/contact" variant="primary">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const className = 'w-7 h-7';
  switch (name) {
    case 'consultation':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'guidance':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'quality':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    default:
      return null;
  }
}
