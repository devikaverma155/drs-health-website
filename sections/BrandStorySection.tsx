import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function BrandStorySection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #D97706 0%, #A3261A 100%)'
    }}>
      {/* Enhanced glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-white/20 to-transparent blur-3xl"></div>
      </div>
      <div className="container-tight relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">
              Our Story: Ayurveda Meets Modern Care
            </h2>
            <p className="mt-4 text-white/90 leading-relaxed">
              DRS Health is built on a legacy of authentic Ayurvedic practice. We bring classical formulations and expert guidance to your doorstep—so you can experience trusted wellness without compromise.
            </p>
            <p className="mt-4 text-white/90 leading-relaxed">
              From weight management and liver care to immunity and diabetes support, our range is designed to address real health concerns with time-tested ingredients and transparent quality.
            </p>
            <Button href="/about" variant="secondary" className="mt-8">
              Discover our story
            </Button>
          </div>
          <div className="bg-soft-bg rounded-xl aspect-[5/3] flex items-center justify-center text-body-muted border border-border">
          <img src="https://9gk.22b.myftpupload.com/wp-content/uploads/2024/11/Haircare-2.webp" alt="Brand Story" width={700} height={1000} className="rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
