import type { Metadata } from 'next';
import { ConsultationFormSection } from '@/sections/ConsultationFormSection';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact DRS Health for product enquiries, free Ayurvedic consultation, or support. We are here to help.',
  openGraph: {
    title: 'Contact | DRS Health',
    description: 'Get in touch for free consultation and product support.',
  },
};

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          Contact Us
        </h1>
        <p className="text-body-muted mb-12">
          Have a question or want to book a free consultation? Fill in the form below and our team will get back to you.
        </p>
        <ConsultationFormSection />
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-foreground mb-2">Other ways to reach us</h2>
          <p className="text-body-muted text-sm">
            You can also reach us via the contact details available on our main website. We typically respond within 24–48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
