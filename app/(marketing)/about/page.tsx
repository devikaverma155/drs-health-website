import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

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
  },
  {
    icon: '🌿',
    title: 'Science-Based',
    description:
      "Research-backed answers and solutions harnessed from nature's wealth.",
  },
  {
    icon: '🌍',
    title: 'Eco-Friendly',
    description: 'Seed-to-shelf policy with rigorous eco-friendly practices.',
  },
  {
    icon: '💚',
    title: 'Community First',
    description:
      'Respecting and collaborating with local communities and partners.',
  },
];

const SERVICES = [
  {
    title: 'Ask Dr. DRS Health',
    description:
      'Get prompt, research-backed answers to all your health-related queries.',
    image:
      'https://images.unsplash.com/photo-1579154204601-01d82e503057?w=600&h=400&fit=crop',
  },
  {
    title: 'Disease Information',
    description:
      'Comprehensive insights about various health conditions and their management.',
    image:
      'https://images.unsplash.com/photo-1631217174715-fbe16acafc77?w=600&h=400&fit=crop',
  },
  {
    title: 'Herbal Efficacy',
    description:
      'Latest research-backed information about herbs and their therapeutic benefits.',
    image:
      'https://images.unsplash.com/photo-1597318972826-8f1a0e1d6010?w=600&h=400&fit=crop',
  },
  {
    title: 'Lifestyle Guidance',
    description:
      'Learn about dietary and lifestyle changes to improve your wellbeing.',
    image:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary/5 via-soft-bg to-accent-green/5 section-padding">
        <div className="container-tight max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Our Mission: Wellness in Every Home
          </h1>
          <p className="text-lg text-body-muted">
            DRS Health has been on a mission to make wellness a part of every
            home for nine decades, bringing authentic Ayurvedic solutions and
            expert guidance to millions.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-padding">
        <div className="container-tight max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Why DRS Health?</h2>
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
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Read more
            </Link>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden border shadow-card bg-gradient-to-br from-primary/10 to-accent-green/10">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173f7f869?w=600&h=500&fit=crop"
              alt="Health consultation"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="section-padding bg-soft-bg border-y border-border">
        <div className="container-tight max-w-5xl">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">
            Our Vision & Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-lg bg-accent-lime/10 flex items-center justify-center text-2xl mb-4">
                🎯
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Our Vision</h3>
              <p className="text-body-muted leading-relaxed">
                Bring wellness and joy to every home via herbal solutions based on science.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-lg bg-accent-blue/10 flex items-center justify-center text-2xl mb-4">
                🚀
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h3>
              <p className="text-body-muted leading-relaxed mb-4">
                Establish DRS Health as a science-based, problem-solving, head-to-heel brand, harnessed from nature&apos;s wealth and characterized by trust and healthy lives.
              </p>
              <p className="text-body-muted leading-relaxed text-sm">
                Develop markets worldwide with an in-depth approach, maintaining the highest ethical standards at each step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="section-padding">
        <div className="container-tight">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-body-muted text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 <section className="mt-20 overflow-hidden">
        <div className="container-tight">
          <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">
            Our Leadership & Legacy
          </h2>
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/5 to-accent-green/5 border border-border overflow-hidden shadow-card">
            <div className="grid md:grid-cols-2 gap-0 min-h-[400px]">
              {/* Portrait side with decorative shapes */}
              <div className="relative flex items-center justify-center p-8 md:p-12">
                <div className="relative z-10 w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-primary/5 flex items-center justify-center">
                  <Image
                    src="https://drshealth.in/wp-content/uploads/2022/12/img.png"
                    alt="Founder - Dr. Rajendra Kumar Jain"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Soft curved shapes */}
                <div className="absolute top-0 left-0 w-40 h-40 md:w-52 md:h-52 rounded-full bg-primary/15 -translate-x-1/2 -translate-y-1/2" aria-hidden />
                <div className="absolute bottom-0 right-0 w-36 h-36 md:w-44 md:h-44 rounded-full bg-accent-green/20 translate-x-1/3 translate-y-1/3" aria-hidden />
                <div className="absolute top-1/2 right-0 w-24 h-24 rounded-full bg-accent-lime/30 translate-x-1/2" aria-hidden />
              </div>
              {/* Text side */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                  स्व. डॉ. राजेन्द्र कुमार जैन
                </h2>
                <p className="text-sm text-primary font-medium mb-3">(B.I.M.S., H.P.A.)</p>
                <p className="text-sm text-body-muted mb-4">
                  Former Consulting Physician and Consultant at Dhanyarasashala
                </p>
                <p className="text-body-muted leading-relaxed mb-4">
                  A distinguished Ayurvedic physician honoured with titles such as &quot;Shreshtha Ayurvednaja&quot; and &quot;Ayurveda Visharad&quot;. He established groundbreaking medicines for immune support and worked with AIIMS Delhi.
                </p>
                <p className="text-body-muted leading-relaxed mb-4">
                  His expertise extended to challenging cases including hydrophobia and urine analysis for diagnosis. He brought relief to many patients suffering from cancer, leprosy, heart disease and other conditions.
                </p>
                <p className="text-body-muted leading-relaxed">
                  His legacy continues to inspire our unwavering commitment to authentic, science-backed Ayurvedic wellness and expert guidance for every individual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL VISION */}
      <section className="section-padding bg-soft-bg border-y border-border">
        <div className="container-tight max-w-5xl">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">
            Building a Global Legacy
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-accent-blue/10 to-primary/10 border border-border shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop"
                alt="Global expansion"
                fill
                className="object-cover"
              />
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

      {/* SERVICES */}
      <section className="section-padding bg-soft-bg border-y">
        <div className="container-tight">
          <h2 className="text-3xl font-semibold text-center mb-12">
            How We Help
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl overflow-hidden border shadow-card"
              >
                <div className="relative h-40">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-body-muted">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AYURVEDA INFO LINK */}
      <section className="section-padding text-center">
        <div className="container-tight max-w-3xl mx-auto">
          <p className="text-body-muted mb-4">
            Explore the basic principles of Ayurveda—Panchamahabhut,
            Prakriti, Tridosha, and more.
          </p>

          <Link
            href="/information"
            className="text-primary font-medium hover:underline"
          >
            Basic Principles &amp; History of Ayurveda →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="container-tight max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">
            Join Our Wellness Community
          </h2>
          <p className="text-body-muted mb-8">
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
      </section>
    </div>
  );
}
