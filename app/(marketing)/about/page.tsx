import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { LeadershipCarouselSection } from '@/sections/LeadershipCarouselSection';
import { BrandHistorySection } from '@/sections/BrandHistorySection';

export const metadata: Metadata = {
  title: 'About Us | DRS Health',
  description:
    'Learn about DRS Health—our mission to bring wellness to every home through authentic Ayurvedic solutions and expert guidance.',
  openGraph: {
    title: 'About Us | DRS Health',
    description:
      "Discover DRS Health's mission, vision, and commitment to authentic Ayurvedic wellness.",
  },
};

const VALUES = [
  {
    icon: '🏥',
    title: 'Expert Guidance',
    description:
      'Team of Ayurvedic and nutritionist experts available for free consultation.',
    gradient: 'from-primary/12 to-primary/4',
    iconBg: 'bg-primary/15',
  },
  {
    icon: '🌿',
    title: 'Science-Based',
    description:
      "Research-backed answers and solutions harnessed from nature's wealth.",
    gradient: 'from-accent-green/12 to-accent-green/4',
    iconBg: 'bg-accent-green/15',
  },
  {
    icon: '🌍',
    title: 'Eco-Friendly',
    description: 'Seed-to-shelf policy with rigorous eco-friendly practices.',
    gradient: 'from-accent-blue/12 to-accent-blue/4',
    iconBg: 'bg-accent-blue/15',
  },
  {
    icon: '💚',
    title: 'Community First',
    description:
      'Respecting and collaborating with local communities and partners.',
    gradient: 'from-accent-lime/12 to-accent-lime/4',
    iconBg: 'bg-accent-lime/15',
  },
];

const SERVICES = [
  { title: 'Ask Dr. DRS Health', description: 'Get prompt, research-backed answers to all your health-related queries.', image: 'https://drshealth.in/wp-content/uploads/2026/02/consultation.jpg' },
  { title: 'Disease Information', description: 'Comprehensive insights about various health conditions and their management.', image: 'https://drshealth.in/wp-content/uploads/2026/02/consultation.jpg' },
  { title: 'Herbal Efficacy', description: 'Latest research-backed information about herbs and their therapeutic benefits.', image: 'https://drshealth.in/wp-content/uploads/2024/11/Syadwad-Combo.webp' },
  { title: 'Lifestyle Guidance', description: 'Learn about dietary and lifestyle changes to improve your wellbeing.', image: 'https://drshealth.in/wp-content/uploads/2026/02/consultation.jpg' },
];

const QUALITY_ITEMS = [
  { title: 'Good Manufacturing Practice (GMP)', desc: 'GMP compliant facilities meeting international standards', color: 'text-accent-green' },
  { title: 'Quality Testing', desc: 'Testing of raw materials and finished products', color: 'text-accent-blue' },
  { title: 'Traditional + Modern', desc: 'Classical Ayurvedic formulations with modern quality control', color: 'text-primary' },
  { title: 'Transparent Sourcing', desc: 'Open sourcing and production practices', color: 'text-accent-green' },
  { title: 'Documented Processes', desc: 'Full traceability and safety documentation', color: 'text-accent-blue' },
  { title: 'Safety Standards', desc: 'Every step designed to maintain product integrity', color: 'text-primary' },
];

export default function AboutPage() {
  return (
    <div className="bg-background relative">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-[120px]" />
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent-green/8 to-transparent blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-gold-soft/8 to-transparent blur-[120px]" />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-soft-bg to-accent-green/8" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-gold-soft/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent-green/10 to-transparent rounded-full blur-3xl" />
        <div className="relative section-padding">
          <div className="container-tight max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Mission: <span className="text-primary">Wellness</span> in Every Home
            </h1>
            <p className="text-lg text-body-muted max-w-2xl mx-auto">
              DRS Health has been on a mission to make wellness a part of every
              home for nine decades, bringing authentic Ayurvedic solutions and
              expert guidance to millions.
            </p>
          </div>
        </div>
      </section>

      {/* Quick stats bar */}
      <section className="py-6 bg-gradient-to-r from-primary via-primary-dark to-primary text-white">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold">170+</p>
              <p className="text-xs md:text-sm text-white/80">Years of Legacy</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">500+</p>
              <p className="text-xs md:text-sm text-white/80">Products</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">10,000+</p>
              <p className="text-xs md:text-sm text-white/80">Happy Customers</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">GMP</p>
              <p className="text-xs md:text-sm text-white/80">Certified Facilities</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">Fassai</p>
              <p className="text-xs md:text-sm text-white/80">Certified</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">Ayush</p>
              <p className="text-xs md:text-sm text-white/80">Approved</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-padding">
        <div className="container-tight max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[40px] bg-primary/40" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Our Story</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">Why DRS Health?</h2>
            <p className="text-body-muted mb-4">
              Most people seek trustworthy alternative opinions about their
              personal health issues but have nowhere to turn for quick and
              accurate advice.
            </p>
            <p className="text-body-muted mb-4">
              Our Ayurvedic and nutritionist experts provide free consultations
              offering research-backed guidance on diseases, herbs, lifestyle,
              and dietary improvements.
            </p>
            <p className="text-body-muted">
              This free advisory is a critical component of our mission to educate individuals about living longer, healthier lives through authentic Ayurvedic wellness.
            </p>

            <Link
              href="/information"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
            >
              Read more
            </Link>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden border border-border shadow-card">
            <Image
              src="https://drshealth.in/wp-content/uploads/2026/02/consultation.jpg"
              alt="Health consultation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* VISION, MISSION & CORE VALUES — Combined */}
      <section className="relative py-20 md:py-24 overflow-hidden border-y border-border">
        {/* Rich layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-soft-bg to-accent-green/6" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-accent-green/10 to-transparent blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gold-soft/6 to-transparent blur-[120px]" />

        <div className="container-tight max-w-6xl relative z-10">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Vision, Mission &amp; Values
            </h2>
            <p className="mt-4 text-body-muted max-w-2xl mx-auto">
              Guided by purpose, rooted in science, and driven by community.
            </p>
          </div>

          {/* Vision & Mission — side by side */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Vision */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-accent-lime/50 to-accent-green/50" />
              <div className="p-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-accent-lime/15 flex items-center justify-center text-2xl flex-shrink-0">
                    🎯
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-body-muted leading-relaxed text-[15px]">
                  Bring wellness and joy to every home via herbal solutions based on science.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="h-1.5 bg-gradient-to-r from-accent-blue/50 to-primary/50" />
              <div className="p-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-accent-blue/15 flex items-center justify-center text-2xl flex-shrink-0">
                    🚀
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-body-muted leading-relaxed text-[15px]">
                  To develop high-quality Ayurvedic formulations that promote natural healing and long-term well-being. We are committed to the highest standards of purity, quality, and authenticity in every product. By empowering healthcare professionals, partners, and communities, we aim to expand the reach of Ayurveda across India and the world. At DRS Health Solutions, we work with dedication to build trust, improve lives, and carry forward our legacy of holistic healthcare.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values — 4 compact cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((value) => (
              <div key={value.title} className="group bg-white/85 backdrop-blur-sm rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className={`h-1 bg-gradient-to-r ${value.gradient}`} />
                <div className="p-5 text-center">
                  <div className={`w-14 h-14 rounded-2xl ${value.iconBg} flex items-center justify-center text-2xl mx-auto mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    {value.icon}
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{value.title}</h3>
                  <p className="text-body-muted text-xs leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image quote divider */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
            alt="DRS Health products"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/85 to-primary-dark/90" />
        </div>
        <div className="container-tight relative z-10 text-center text-white max-w-3xl mx-auto">
          <p className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            &ldquo;Nature has the answer to every ailment — we simply help you find it.&rdquo;
          </p>
          <p className="text-white/70 text-sm">— DRS Health Philosophy</p>
        </div>
      </section>

      <section className="mt-20 overflow-hidden">
        <div className="container-tight">
          <LeadershipCarouselSection />
        </div>
      </section>

      <BrandHistorySection />

      {/* GLOBAL VISION */}
      <section className="section-padding relative overflow-hidden border-y border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/4 via-soft-bg to-accent-green/4" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent-green/8 blur-3xl" />
        <div className="container-tight max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-semibold uppercase tracking-wider mb-4">
              Going Global
            </span>
            <h2 className="text-3xl font-bold text-foreground">
              Building a Global Legacy
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden border border-border shadow-card">
              <Image
                src="https://drshealth.in/wp-content/uploads/2022/11/IMG_1074-e1772171437239.jpg"
                alt="Global expansion"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />
            </div>
            <div>
              <p className="text-body-muted leading-relaxed mb-4">
                We are developing markets worldwide with an in-depth and long-term approach, maintaining at each step the highest ethical standards.
              </p>
              <p className="text-body-muted leading-relaxed mb-4">
                We respect, collaborate with, and utilize the talents of each member of the DRS Health family and the local communities to drive our seed-to-shelf policy and rigorously adopt eco-friendly practices to support the environment we inhabit.
              </p>
              <p className="text-body-muted leading-relaxed">
                Our commitment extends beyond products—it&apos;s about creating a sustainable, ethical, and community-first wellness ecosystem that benefits generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING & QUALITY */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #D97706 0%, #A3261A 100%)' }}>
        <div className="container-tight max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
              Quality Assurance
            </span>
            <h2 className="text-3xl font-bold text-foreground text-white">
              Manufacturing &amp; Quality
            </h2>
            <p className="mt-4 text-body-muted max-w-2xl mx-auto text-white">
              At DRS Health, we combine classical Ayurvedic wisdom with rigorous quality standards. Our formulations are produced in GMP-certified facilities.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-border shadow-card">
            <div className="h-1.5 bg-gradient-to-r from-primary/40 via-accent-green/40 to-accent-blue/40" />
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {QUALITY_ITEMS.map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className={`w-8 h-8 rounded-full bg-accent-green/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <svg className={`w-4 h-4 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">{item.title}</p>
                      <p className="text-body-muted text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 text-body-muted leading-relaxed text-center text-sm">
            We believe quality is non-negotiable. From sourcing herbs to packaging and dispatch, every step is designed to maintain the integrity and efficacy of our products.
          </p>
        </div>
      </section>

      {/* AYURVEDA INFO LINK */}
      <section className="section-padding">
        <div className="container-tight max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-accent-green/8 via-white to-primary/5 rounded-2xl border border-border p-8 text-center shadow-card">
            <div className="w-14 h-14 rounded-2xl bg-accent-green/15 flex items-center justify-center text-2xl mx-auto mb-4">
              🌿
            </div>
            <p className="text-body-muted mb-4">
              Explore the basic principles of Ayurveda—Panchamahabhut,
              Prakriti, Tridosha, and more.
            </p>
            <Link
              href="/information"
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline"
            >
              Basic Principles &amp; History of Ayurveda
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" >
        <div className="container-tight max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary/12 via-accent-green/6 to-gold-soft/12 rounded-3xl border border-primary/15 p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent-green/8 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gold-soft/8 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Wellness Community
              </h2>
              <p className="text-lg text-body-muted mb-8 font-medium">
                Experience authentic Ayurvedic wellness with expert guidance.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <Button href="/consultation" variant="primary">
                  Book Free Consultation
                </Button>

                <Button href="/contact" variant="secondary">
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
