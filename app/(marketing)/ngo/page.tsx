import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NGO',
  description:
    'Jeev Daya Parmarth Jan Kalyan Samiti — a compassionate initiative by DRS Health Solutions dedicated to serving humanity through care, kindness, and social responsibility.',
  openGraph: {
    title: 'NGO | DRS Health',
    description: 'Jeev Daya Parmarth Jan Kalyan Samiti — health camps, free medicines, school programs, and humanitarian service.',
  },
};

const INITIATIVES = [
  {
    title: 'Health Camps',
    description: 'Actively organizes health camps providing free check-ups and Ayurvedic guidance in underserved communities.',
    icon: '🏥',
  },
  {
    title: 'Free Medicines',
    description: 'Provides free medicines to those in need, ensuring access to quality Ayurvedic care for all.',
    icon: '💊',
  },
  {
    title: 'School Health Programs',
    description: 'Conducts school health programs for children, promoting early wellness education and preventive care.',
    icon: '🏫',
  },
  {
    title: 'Orphan & Elder Care',
    description: 'Extends support to orphans and residents of old age homes — fulfilling essential needs including food, medicines, emotional care and dignity.',
    icon: '🤝',
  },
];

export default function NGOPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent-green/5">
        <div className="container-tight max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* NGO Logo */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-border shadow-card bg-white">
                <Image
                  src="https://drshealth.in/wp-content/uploads/2026/02/PHOTO-2026-02-27-12-48-07.jpg"
                  alt="Jeev Daya Parmarth Jan Kalyan Samiti Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold text-foreground mb-4">
                Jeev Daya Parmarth Jan Kalyan Samiti
              </h1>
              <p className="text-lg text-body-muted">
                A compassionate initiative associated with DRS Health Solutions Pvt. Ltd., dedicated to serving humanity through care, kindness, and social responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About the NGO */}
      <section className="section-padding">
        <div className="container-tight max-w-4xl">
          <div className="bg-white rounded-2xl border border-border shadow-card p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-body-muted leading-relaxed mb-6">
              Jeev Daya Parmarth Jan Kalyan Samiti is a compassionate initiative associated with DRS Health Solutions Pvt. Ltd., dedicated to serving humanity through care, kindness, and social responsibility. With its main center located in <strong>Rajakhedi, Sagar (M.P.)</strong>, the NGO actively organizes health camps, provides free medicines to those in need, conducts school health programs for children, and extends support to orphans and residents of old age homes by fulfilling their essential needs — not only food and medicines but also emotional care and dignity.
            </p>
            <p className="text-body-muted leading-relaxed mb-6">
              With a growing network of <strong>20,000+ volunteers</strong> across India, the organization believes in the power of collective humanity to bring meaningful change to society.
            </p>
            <p className="text-body-muted leading-relaxed font-medium">
              Everyone who believes in making a positive difference is warmly invited to join this noble mission and become a part of spreading health, hope, and compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 border-y border-border bg-soft-bg">
        <div className="container-tight grid md:grid-cols-3 text-center gap-8">
          <div>
            <p className="text-3xl font-bold text-primary">20,000+</p>
            <p className="text-sm text-body-muted mt-1">Volunteers across India</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Rajakhedi, Sagar</p>
            <p className="text-sm text-body-muted mt-1">Main center (Madhya Pradesh)</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">Since 2003</p>
            <p className="text-sm text-body-muted mt-1">Serving communities</p>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="section-padding">
        <div className="container-tight">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-12 text-center">
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {INITIATIVES.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all p-8">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-body-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-soft-bg border-y border-border">
        <div className="container-tight max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Join Our Mission
          </h2>
          <p className="text-body-muted mb-8">
            Everyone who believes in making a positive difference is warmly invited to join this noble mission and become a part of spreading health, hope, and compassion. If you would like to support our work, partner with us, or volunteer, please get in touch.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Contact Us to Join
          </Link>
        </div>
      </section>
    </div>
  );
}
