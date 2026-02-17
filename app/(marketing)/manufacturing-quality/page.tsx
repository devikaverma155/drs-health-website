import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manufacturing & Quality',
  description:
    'DRS Health manufacturing standards: GMP-certified facilities, quality testing, and transparent sourcing for safe Ayurvedic products.',
  openGraph: {
    title: 'Manufacturing & Quality | DRS Health',
    description: 'GMP-certified manufacturing and quality assurance for our Ayurvedic formulations.',
  },
};

const POINTS = [
  'Good Manufacturing Practice (GMP) compliant facilities',
  'Quality testing of raw materials and finished products',
  'Traditional formulations with modern quality control',
  'Transparent sourcing and production practices',
  'Documented processes for traceability and safety',
];

export default function ManufacturingQualityPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
          Manufacturing & Quality
        </h1>
        <p className="text-body-muted leading-relaxed">
          At DRS Health, we combine classical Ayurvedic wisdom with rigorous quality standards. Our formulations are produced in facilities that follow Good Manufacturing Practice (GMP) guidelines, so you receive safe, effective products you can trust.
        </p>
        <h2 className="text-xl font-semibold text-foreground mt-10 mb-4">
          Our Commitment
        </h2>
        <ul className="space-y-3">
          {POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
              <span className="text-body-muted">{point}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-body-muted leading-relaxed">
          We believe quality is non-negotiable. From sourcing herbs to packaging and dispatch, every step is designed to maintain the integrity and efficacy of our products.
        </p>
      </div>
    </div>
  );
}
