'use client';

import { ImageAutoSlider } from '@/components/ui/image-auto-slider';

const certificationImages = [
  {
    src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80',
    alt: 'ISO 9001:2015 — Quality Management System',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    alt: 'WHO GMP — World Health Organization GMP',
  },
  {
    src: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80',
    alt: 'ISO 13485:2016 — Medical Devices Quality',
  },
  {
    src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80',
    alt: 'FSSAI — Food Safety & Standards',
  },
  {
    src: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&q=80',
    alt: 'EIC Certification — Environment Protection',
  },
  {
    src: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
    alt: 'ISO 14001:2015 — Environmental Management',
  },
  {
    src: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80',
    alt: 'Ayurvedic Herbal Standards',
  },
  {
    src: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    alt: 'Pharmaceutical Quality Control',
  },
];

const certifications = [
  { name: 'ISO 9001:2015', description: 'Quality Management System' },
  { name: 'WHO GMP', description: 'World Health Organization GMP' },
  { name: 'ISO 13485:2016', description: 'Medical Devices Quality' },
  { name: 'FSSAI', description: 'Food Safety & Standards' },
  { name: 'EIC Certification', description: 'Environment Protection' },
  { name: 'ISO 14001:2015', description: 'Environmental Management' },
];

export function CertificationsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Subtle organic background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-50 blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-50 blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">
            Trusted Quality
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Certifications & Standards
          </h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            Committed to the highest international standards of quality, safety, and compliance
          </p>
        </div>

        {/* Auto-scrolling image slider */}
        <div className="mb-14">
          <ImageAutoSlider
            images={certificationImages}
            speed={25}
            imageSize="md"
          />
        </div>

        {/* Certification badges grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-background border border-border hover:border-primary/20 hover:bg-primary/5 transition-all group"
            >
              <span className="text-2xl text-primary mb-2 group-hover:scale-110 transition-transform">✓</span>
              <h3 className="font-heading text-sm font-semibold text-foreground">{cert.name}</h3>
              <p className="text-xs text-body-muted mt-1">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="p-6 bg-background rounded-xl border border-border">
          <p className="text-center text-body-muted">
            <span className="font-semibold text-foreground">Our Commitment:</span> We maintain
            the highest international standards of quality, safety, and environmental
            responsibility in all our operations.
          </p>
        </div>
      </div>
    </section>
  );
}
