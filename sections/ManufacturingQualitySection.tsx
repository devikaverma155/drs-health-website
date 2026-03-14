import Image from 'next/image';
import Link from 'next/link';

const POINTS = [
  'GMP-certified manufacturing facilities',
  'Quality-tested raw materials and finished products',
  'Traditional formulations with modern quality control',
  'Transparent sourcing and production practices',
];

export function ManufacturingQualitySection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #D97706 0%, #A3261A 100%)'
    }}>
      {/* Enhanced glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-bl from-white/20 to-transparent blur-3xl"></div>
      </div>
      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">
              Manufacturing & Quality You Can Trust
            </h2>
            <p className="mt-4 text-white/90 leading-relaxed">
              Our formulations are produced in facilities that follow Good Manufacturing Practice (GMP) guidelines. We combine time-tested Ayurvedic wisdom with rigorous quality checks so you get safe, effective products.
            </p>
            <ul className="mt-8 space-y-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white shrink-0" aria-hidden />
                  <span className="text-white/90">{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/manufacturing-quality"
              className="inline-block mt-8 text-sm font-medium text-white hover:text-white/80 transition-colors duration-200"
            >
              Learn more about our quality standards
            </Link>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent-green/10 border border-border">
            <Image
              src="https://9gk.22b.myftpupload.com/wp-content/uploads/2026/02/manufactor.jpg"
              alt="Manufacturing facility"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
