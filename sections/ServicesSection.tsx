import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function ServicesSection() {
  return (
    <section className="section-padding bg-soft-bg border-y border-border">
      <div className="container-tight">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-12">
          Our Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-border shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 panel-accent-blue">
            <h3 className="text-lg font-semibold text-foreground">Free Health Consultation</h3>
            <p className="mt-3 text-body-muted leading-relaxed">
              Speak with our Ayurvedic experts for personalised advice on diet, lifestyle and product selection. No charge.
            </p>
            <Button href="/consultation" variant="primary" className="mt-6">
              Book Free Consultation
            </Button>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-border shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 panel-accent-mint">
            <h3 className="text-lg font-semibold text-foreground">Product Guidance</h3>
            <p className="mt-3 text-body-muted leading-relaxed">
              Not sure which formulation suits you? Our team helps you choose the right products for your health goals.
            </p>
            <Link href="/contact" className="inline-block mt-6 text-sm font-medium text-primary hover:underline transition-colors duration-200">
              Get in touch
            </Link>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-border shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 panel-accent-lavender">
            <h3 className="text-lg font-semibold text-foreground">Authentic Formulations</h3>
            <p className="mt-3 text-body-muted leading-relaxed">
              Classical and modern Ayurvedic formulations, manufactured under strict quality standards for your safety.
            </p>
            <Link href="/manufacturing-quality" className="inline-block mt-6 text-sm font-medium text-primary hover:underline transition-colors duration-200">
              Manufacturing & Quality
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
