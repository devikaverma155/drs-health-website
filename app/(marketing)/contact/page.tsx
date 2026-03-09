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

const ADDRESSES = [
  {
    title: 'Head Office',
    type: 'Corporate Office',
    address: 'Shed 06, Sector - I, Govindpura industrial area, Bhopal M.P, 462023',
  },
  {
    title: 'Manufacturing Unit',
    type: 'Manufacturing Facility',
    address: 'Shed 06, Sector - I, Govindpura industrial area, Bhopal M.P, 462023',
  },
  {
    title: 'Clinic',
    type: 'Wellness Clinic',
    address: 'HIG- 53, Sector A, Ayodhya nagar, Bhopal M.P 462041',
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="section-padding">
        <div className="container-tight max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-body-muted mb-12">
            Have a question or want to book a free consultation? Fill in the form below and our team will get back to you.
          </p>
          <ConsultationFormSection />
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Other ways to reach us</h2>
            <p className="text-body-muted text-sm mb-8">
              You can also reach us via the contact details available on our main website. We typically respond within 24–48 hours.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ADDRESSES.map((loc) => (
                <div
                  key={loc.title}
                  className="rounded-xl border border-border bg-white p-6 shadow-sm flex flex-col"
                >
                  <span className="inline-block bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-semibold mb-3">
                    {loc.type}
                  </span>
                  <h3 className="font-semibold text-foreground mb-2">{loc.title}</h3>
                  <p className="text-body-muted text-sm flex gap-2 mb-4">
                    <span className="shrink-0">📍</span>
                    <span>{loc.address}</span>
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                  >
                    Get directions
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
