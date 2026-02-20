import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function ServicesSection() {
  return (
    <section className="section-padding bg-soft-bg border-y border-border">
      <div className="container-tight">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center mb-12 ">
          Our Services
        </h2>
        <p className="text-body-muted text-center mb-12 max-w-2xl mx-auto">
          From personalised consultations to authentic Ayurvedic formulations, we offer a range of services to support your health journey.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Consultation */}
          <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1">
            <div className="relative h-48 bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 flex items-center justify-center overflow-hidden">
              <Image
                src="https://drshealth.in/wp-content/uploads/2024/11/Syadwad-Combo.webp"
                alt="Health consultation"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-lg font-semibold text-foreground">Free Health Consultation</h3>
              <p className="mt-3 text-body-muted leading-relaxed">
                Speak with our Ayurvedic experts for personalised advice on diet, lifestyle and product selection. No charge.
              </p>
              <Button href="/consultation" variant="primary" className="mt-6">
                Book Free Consultation
              </Button>
            </div>
          </div>

          {/* Product Guidance */}
          <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1">
            <div className="relative h-48 bg-gradient-to-br from-accent-green/10 to-accent-green/5 flex items-center justify-center overflow-hidden">
              <Image
                src="https://drshealth.in/wp-content/uploads/2024/12/Herbalis-Shampoo-scaled.webp"
                alt="Product guidance"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-lg font-semibold text-foreground">Product Guidance</h3>
              <p className="mt-3 text-body-muted leading-relaxed">
                Not sure which formulation suits you? Our team helps you choose the right products for your health goals.
              </p>
              <Link href="/contact" className="inline-block mt-6 text-sm font-medium text-primary hover:underline transition-colors duration-200">
                Get in touch
              </Link>
            </div>
          </div>

          {/* Authentic Formulations */}
          <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1">
            <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
              <img
                src="https://drshealth.in/wp-content/uploads/2026/02/manu.png"
                alt="Manufacturing facility"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
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
      </div>
    </section>
  );
}
