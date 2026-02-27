import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function FooterCTASection() {
  return (
    <section className="section-padding relative overflow-hidden bg-primary text-white">
      {/* Premium glow effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-tl from-amber-100/10 to-transparent blur-3xl"></div>
      </div>
      <div className="container-tight text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Ready to Start Your Wellness Journey?
        </h2>
        <p className="mt-4 text-white/90 leading-relaxed">
          Browse our range of Ayurvedic products or book a free consultation with our experts.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/shop" variant="inverted">
            Shop Products
          </Button>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-xl text-primary-dark px-6 py-3 text-sm font-semibold bg-white transition-all duration-200 hover:-translate-y-0.5 shadow-card"
          >
            Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
