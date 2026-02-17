import type { Metadata } from 'next';
import Image from 'next/image';
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
    image: 'https://images.unsplash.com/photo-1579154204601-01d82e503057?w=600&h=400&fit=crop',
  },
  {
    title: 'Wellness awareness',
    description: 'Workshops and talks on preventive care, diet, and lifestyle using Ayurvedic principles.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
  {
    title: 'Support for the needy',
    description: 'Access to quality Ayurvedic care and formulations for those who cannot afford them.',
    image: 'https://images.unsplash.com/photo-1631217174715-fbe16acafc77?w=600&h=400&fit=crop',
  },
  {
    title: 'Education and training',
    description: 'Spreading awareness about traditional medicine and training local volunteers where possible.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
];

export default function NGOPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent-green/5">
        <div className="container-tight max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Our NGO Initiative
          </h1>
          <p className="text-lg text-body-muted">
            DRS Health is committed to giving back. Through our NGO, we run several initiatives aimed at bringing Ayurvedic wellness and health awareness to communities that need it most.
          </p>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="section-padding">
        <div className="container-tight">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12">
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {INITIATIVES.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all">
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-body-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-soft-bg border-y border-border">
        <div className="container-tight max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Support Our Mission
          </h2>
          <p className="text-body-muted mb-8">
            If you would like to support our work, partner with us, or learn more about specific programmes, please get in touch.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
