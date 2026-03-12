import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import BusinessEnquiryForm from './BusinessEnquiryForm';

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
              Partner with DRS Health and grow your business. Select one or multiple opportunities below and tell us more about your business.
            </p>
          </div>

          {/* Unified Business Enquiry Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border p-8 md:p-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Business Enquiry Form</h2>
            <BusinessEnquiryForm />
          </div>

          {/* CTA Section — More Information */}
          <div className="relative bg-gradient-to-br from-primary/10 via-accent-green/5 to-gold-soft/10 rounded-3xl border border-primary/15 p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent-green/5 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Need More Information?
              </h2>
              <p className="text-lg text-body-muted mb-8 max-w-2xl mx-auto font-medium">
                Have questions about our business opportunities? Reach out to our partnership team.
              </p>
              <Button href="/contact">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
