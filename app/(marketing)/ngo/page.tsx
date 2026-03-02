import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NGOProductsSection } from '@/sections/NGOProductsSection';

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
    gradient: 'from-primary/15 to-primary/5',
    iconBg: 'bg-primary/15',
  },
  {
    title: 'Free Medicines',
    description: 'Provides free medicines to those in need, ensuring access to quality Ayurvedic care for all.',
    icon: '💊',
    gradient: 'from-accent-green/15 to-accent-green/5',
    iconBg: 'bg-accent-green/15',
  },
  {
    title: 'School Health Programs',
    description: 'Conducts school health programs for children, promoting early wellness education and preventive care.',
    icon: '🏫',
    gradient: 'from-accent-blue/15 to-accent-blue/5',
    iconBg: 'bg-accent-blue/15',
  },
  {
    title: 'Orphan & Elder Care',
    description: 'Extends support to orphans and residents of old age homes — fulfilling essential needs including food, medicines, emotional care and dignity.',
    icon: '🤝',
    gradient: 'from-gold-soft/15 to-gold-soft/5',
    iconBg: 'bg-gold-soft/15',
  },
];

const IMPACT_AREAS = [
  { icon: '🩺', label: 'Free Health Check-ups' },
  { icon: '📚', label: 'Awareness Workshops' },
  { icon: '🍽️', label: 'Nutrition Drives' },
  { icon: '🧓', label: 'Elder Care Visits' },
  { icon: '👶', label: 'Child Welfare' },
  { icon: '🌱', label: 'Herbal Education' },
];

export default function NGOPage() {
  return (
    <div className="bg-background relative">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent-green/10 to-transparent blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-primary/6 to-transparent blur-[100px]" />
        <div className="absolute -bottom-40 right-1/3 w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-gold-soft/8 to-transparent blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-green/8 via-soft-bg to-primary/5" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-gold-soft/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-primary/8 to-transparent rounded-full blur-3xl" />
        <div className="relative section-padding">
          <div className="container-tight max-w-4xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* NGO Logo */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-accent-green/20 shadow-card bg-white">
                  <Image
                    src="https://drshealth.in/wp-content/uploads/2026/02/PHOTO-2026-02-27-12-48-07.jpg"
                    alt="Jeev Daya Parmarth Jan Kalyan Samiti Logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent-green/10 text-accent-green text-xs font-semibold uppercase tracking-wider mb-4">
                  Our Initiative
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Jeev Daya Parmarth <br className="hidden md:block" />
                  <span className="text-primary">Jan Kalyan Samiti</span>
                </h1>
                <p className="text-lg text-body-muted">
                  A compassionate initiative associated with DRS Health Solutions Pvt. Ltd., dedicated to serving humanity through care, kindness, and social responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-6 bg-gradient-to-r from-accent-green via-primary to-accent-green text-white">
        <div className="container-tight grid grid-cols-3 text-center gap-6">
          <div>
            <p className="text-2xl md:text-3xl font-bold">20,000+</p>
            <p className="text-xs md:text-sm text-white/80 mt-0.5">Volunteers across India</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold">Sagar, M.P.</p>
            <p className="text-xs md:text-sm text-white/80 mt-0.5">Main Centre</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold">Since 2003</p>
            <p className="text-xs md:text-sm text-white/80 mt-0.5">Serving Communities</p>
          </div>
        </div>
      </section>

      {/* Image + quote divider */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://drshealth.in/wp-content/uploads/2026/03/ngo.jpg"
            alt="NGO community work"
            fill
            className="object-cover scale-110"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="container-tight relative z-10 text-center text-white max-w-3xl mx-auto">
          <p className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            &ldquo;Compassion is the foundation of true wellness.&rdquo;
          </p>
          <p className="text-white/70 text-sm">— Jeev Daya Parmarth Jan Kalyan Samiti</p>
        </div>
      </section>

      {/* About the NGO */}
      <section className="py-12 md:py-16">
        <div className="container-tight max-w-5xl">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Decorative sidebar accent */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 max-w-[40px] bg-accent-green/40" />
                <span className="text-sm font-semibold uppercase tracking-wider text-accent-green">Our Purpose</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-body-muted leading-relaxed mb-5">
                Jeev Daya Parmarth Jan Kalyan Samiti is a compassionate initiative associated with DRS Health Solutions Pvt. Ltd., dedicated to serving humanity through care, kindness, and social responsibility. With its main center located in <strong>Rajakhedi, Sagar (M.P.)</strong>, the NGO actively organizes health camps, provides free medicines to those in need, conducts school health programs for children, and extends support to orphans and residents of old age homes by fulfilling their essential needs — not only food and medicines but also emotional care and dignity.
              </p>
              <p className="text-body-muted leading-relaxed mb-5">
                With a growing network of <strong>20,000+ volunteers</strong> across India, the organization believes in the power of collective humanity to bring meaningful change to society.
              </p>
              <p className="text-body-muted leading-relaxed font-medium">
                Everyone who believes in making a positive difference is warmly invited to join this noble mission and become a part of spreading health, hope, and compassion.
              </p>
            </div>

            {/* Impact area sidebar */}
            <div className="md:col-span-2">
              <div className="bg-gradient-to-br from-accent-green/8 via-white to-primary/5 rounded-2xl border border-border p-6 shadow-card">
                <h3 className="font-bold text-foreground mb-5 text-lg">Impact Areas</h3>
                <div className="grid grid-cols-2 gap-3">
                  {IMPACT_AREAS.map((area) => (
                    <div key={area.label} className="flex items-center gap-2.5 bg-white/80 rounded-xl p-3 border border-border/50">
                      <span className="text-xl flex-shrink-0">{area.icon}</span>
                      <span className="text-xs font-medium text-foreground leading-tight">{area.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Our Programs
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              What We Do
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {INITIATIVES.map((item) => (
              <div key={item.title} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                {/* Gradient accent stripe */}
                <div className={`h-1.5 bg-gradient-to-r ${item.gradient}`} />
                <div className="p-8">
                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 rounded-2xl ${item.iconBg} flex items-center justify-center text-3xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-body-muted leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join / Volunteer Section */}
      <section className="section-padding relative overflow-hidden border-y border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-green/4 via-soft-bg to-primary/4" />
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-accent-green/8 blur-3xl" />
        <div className="container-tight max-w-4xl relative z-10">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-green/10 text-accent-green text-xs font-semibold uppercase tracking-wider mb-4">
              Get Involved
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              How You Can Help
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Volunteer',
                desc: 'Join our 20,000+ volunteers and contribute your time and skills to community health camps and programs.',
                color: 'text-primary bg-primary/10',
              },
              {
                step: '02',
                title: 'Donate',
                desc: 'Support our initiatives with contributions for medicines, supplies, and community welfare activities.',
                color: 'text-accent-green bg-accent-green/10',
              },
              {
                step: '03',
                title: 'Spread the Word',
                desc: 'Share our mission with your network. Every voice helps us reach more communities in need.',
                color: 'text-accent-blue bg-accent-blue/10',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border p-6 shadow-card text-center">
                <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-lg font-bold mx-auto mb-4`}>
                  {item.step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-body-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NGO Products Section */}
      <NGOProductsSection />

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight max-w-3xl">
          <div className="relative bg-gradient-to-br from-accent-green/12 via-primary/6 to-gold-soft/12 rounded-3xl border border-accent-green/15 p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent-green/8 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gold-soft/8 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Join Our Mission
              </h2>
              <p className="text-lg text-body-muted mb-8 font-medium max-w-xl mx-auto">
                Everyone who believes in making a positive difference is warmly invited to join and spread health, hope, and compassion.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-sm"
              >
                Contact Us to Join
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
