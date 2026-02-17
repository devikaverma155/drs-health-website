import { Button } from '@/components/ui/Button';

export interface HeroSectionProps {
  headline?: string;
  subtext?: string;
  shopCtaLabel?: string;
  consultationCtaLabel?: string;
}

export function HeroSection({
  headline = 'Authentic Ayurvedic Wellness, Delivered',
  subtext = 'Trusted formulations for weight management, liver care, immunity and more. Get free expert consultation and discover natural health solutions.',
  shopCtaLabel = 'Shop Products',
  consultationCtaLabel = 'Free Consultation',
}: HeroSectionProps) {
  return (
    <section className="relative bg-background section-padding">
      <div className="container-tight text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
          {headline}
        </h1>
        <p className="mt-6 text-lg text-body-muted leading-relaxed">
          {subtext}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/shop" variant="primary">
            {shopCtaLabel}
          </Button>
          <Button href="/contact#consultation" variant="secondary">
            {consultationCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
