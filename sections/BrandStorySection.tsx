import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function BrandStorySection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Our Story: Ayurveda Meets Modern Care
            </h2>
            <p className="mt-4 text-body-muted leading-relaxed">
              DRS Health is built on a legacy of authentic Ayurvedic practice. We bring classical formulations and expert guidance to your doorstep—so you can experience trusted wellness without compromise.
            </p>
            <p className="mt-4 text-body-muted leading-relaxed">
              From weight management and liver care to immunity and diabetes support, our range is designed to address real health concerns with time-tested ingredients and transparent quality.
            </p>
            <Button href="/about" variant="secondary" className="mt-8">
              Discover our story
            </Button>
          </div>
          <div className="bg-soft-bg rounded-xl aspect-[5/3] flex items-center justify-center text-body-muted border border-border">
          <img src="https://drshealth.in/wp-content/uploads/2024/11/Haircare-2.webp" alt="Brand Story" width={700} height={1000} className="rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
