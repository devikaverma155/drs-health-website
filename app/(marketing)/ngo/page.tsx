import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NGO',
  description:
    'DRS Health runs an NGO dedicated to community health, wellness outreach, and Ayurvedic awareness. Learn about our initiatives.',
  openGraph: {
    title: 'NGO | DRS Health',
    description: 'Community health and wellness initiatives by DRS Health.',
  },
};

const INITIATIVES = [
  {
    title: 'Community health camps',
    description: 'Free health check-ups and basic Ayurvedic guidance in underserved areas.',
  },
  {
    title: 'Wellness awareness',
    description: 'Workshops and talks on preventive care, diet, and lifestyle using Ayurvedic principles.',
  },
  {
    title: 'Support for the needy',
    description: 'Access to quality Ayurvedic care and formulations for those who cannot afford them.',
  },
  {
    title: 'Education and training',
    description: 'Spreading awareness about traditional medicine and training local volunteers where possible.',
  },
];

export default function NGOPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
          Our NGO Initiative
        </h1>
        <p className="text-body-muted leading-relaxed">
          DRS Health is committed to giving back. Through our NGO, we run several initiatives aimed at
          bringing Ayurvedic wellness and health awareness to communities that need it most.
        </p>

        <h2 className="text-xl font-semibold text-foreground mt-12 mb-4">
          What We Do
        </h2>
        <ul className="space-y-6">
          {INITIATIVES.map((item) => (
            <li key={item.title}>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-body-muted text-sm">{item.description}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-body-muted leading-relaxed">
          If you would like to support our work, partner with us, or learn more about specific programmes,
          please get in touch through our contact page.
        </p>
        <Link
          href="/contact"
          className="inline-block mt-6 text-primary font-medium hover:underline"
        >
          Contact us →
        </Link>
      </div>
    </div>
  );
}
