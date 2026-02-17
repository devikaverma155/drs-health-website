import type { Metadata } from 'next';
import { ConsultationPageContent } from './ConsultationPageContent';

export const metadata: Metadata = {
  title: 'Free Consultation',
  description:
    'Book a free Ayurvedic consultation with DRS Health. Visit our clinic or consult online. Personalised care and expert guidance.',
  openGraph: {
    title: 'Free Consultation | DRS Health',
    description: 'Book a free consultation—in clinic or online. Expert Ayurvedic care.',
  },
};

export default function ConsultationPage() {
  return (
    <div className="min-h-screen">
      <ConsultationPageContent />
    </div>
  );
}
