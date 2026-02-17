import Link from 'next/link';

const POINTS = [
  'GMP-certified manufacturing facilities',
  'Quality-tested raw materials and finished products',
  'Traditional formulations with modern quality control',
  'Transparent sourcing and production practices',
];

export function ManufacturingQualitySection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Manufacturing & Quality You Can Trust
          </h2>
          <p className="mt-4 text-body-muted leading-relaxed">
            Our formulations are produced in facilities that follow Good Manufacturing Practice (GMP) guidelines. We combine time-tested Ayurvedic wisdom with rigorous quality checks so you get safe, effective products.
          </p>
          <ul className="mt-8 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                <span className="text-body-muted">{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/manufacturing-quality"
            className="inline-block mt-8 text-sm font-medium text-primary hover:underline transition-colors duration-200"
          >
            Learn more about our quality standards
          </Link>
        </div>
      </div>
    </section>
  );
}
