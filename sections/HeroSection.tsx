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
    <section className="relative section-padding section-with-glow">
      {/* Organic gradient glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-green-100/20 to-transparent blur-3xl opacity-40 -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-tl from-amber-100/15 to-transparent blur-3xl opacity-40 -mr-32 -mb-32"></div>
      </div>
      <div className="container-tight text-center max-w-3xl mx-auto relative z-10">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
          {headline}
        </h1>
        <p className="mt-6 text-lg text-body-muted leading-relaxed max-w-2xl mx-auto">
          {subtext}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
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
