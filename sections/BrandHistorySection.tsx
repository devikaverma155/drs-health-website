'use client';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1853',
    title: 'The Vision of a Rajvaidya',
    description: 'Our legacy began in 1853 when Rajvaidya Pandit Barelal Jain founded Syadwad Jain Aushadalaya to provide authentic Ayurvedic treatments. His deep knowledge of herbs and traditional formulations laid the strong foundation of our healing tradition.',
    icon: '🌿',
    accent: 'from-primary to-primary-dark',
  },
  {
    year: '2003',
    title: 'Establishment of Dhanya Ras Shala',
    description: 'In 2003, Dr. (Vaidya) D.K. Jain founded Dhanya Ras Shala as a sole proprietorship firm. He also started an Ayurvedic clinic in Tikamgarh, offering personalized treatments based on traditional Ayurvedic principles.',
    icon: '🏥',
    accent: 'from-accent-green to-accent-blue',
  },
  {
    year: '2019',
    title: 'Expansion to the Heart of India',
    description: 'In 2019, we expanded to Bhopal to serve a larger community seeking trusted Ayurvedic healthcare. A dedicated clinic and manufacturing unit were established to ensure quality medicines and better patient care.',
    icon: '🏭',
    accent: 'from-accent-blue to-accent-navy',
  },
  {
    year: '2025',
    title: 'Evolution into DRS Health Solutions Pvt. Ltd.',
    description: 'In 2025, our journey progressed with the incorporation of DRS Health Solutions Pvt. Ltd. This milestone reflects our commitment to global quality standards while preserving our rich Ayurvedic heritage.',
    icon: '🌍',
    accent: 'from-primary to-accent-green',
  },
];

export function BrandHistorySection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-y border-border">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-soft-bg to-accent-green/6" />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-[100px]" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-accent-green/10 to-transparent blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gold-soft/6 to-transparent blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mission block */}
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
            Our Mission
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-body-muted text-lg leading-relaxed max-w-4xl mx-auto">
            Our mission is to develop high-quality Ayurvedic formulations that promote natural healing and long-term well-being. We are committed to maintaining the highest standards of purity, quality, and authenticity in every product we create. By empowering healthcare professionals, partners, and communities, we aim to expand the reach of Ayurveda across India and the world. At DRS Health Solutions, we work with dedication to build trust, improve lives, and carry forward our legacy of holistic healthcare.
          </p>
        </div>

        {/* Section Header for Timeline */}
        <div className="mb-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
            Our Journey
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Heritage Timeline
          </h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            From a Rajvaidya&apos;s vision to a global commitment to holistic healthcare
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          <div className="absolute top-[60px] left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-primary/30 via-accent-green/30 to-primary/30 hidden md:block rounded-full" />
          <div className="absolute top-[58px] left-[12.5%] right-[12.5%] h-[5px] bg-gradient-to-r from-primary/15 via-accent-blue/15 to-primary/15 hidden md:block rounded-full blur-sm" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative group">
                <div className="hidden md:flex flex-col items-center mb-6">
                  <div className={`w-[120px] h-[120px] rounded-full bg-gradient-to-br ${event.accent} p-[3px] shadow-lg relative z-10`}>
                    <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
                      <span className="text-2xl mb-0.5">{event.icon}</span>
                      <span className="text-lg font-bold text-foreground leading-none">{event.year}</span>
                    </div>
                  </div>
                  <div className={`w-0.5 h-5 bg-gradient-to-b ${event.accent} opacity-40`} />
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border overflow-hidden hover:-translate-y-1">
                  <div className={`h-1.5 bg-gradient-to-r ${event.accent}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 md:hidden">
                      <span className="text-2xl">{event.icon}</span>
                      <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                        {event.year}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {event.title}
                    </h3>

                    <p className="text-body-muted text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-20 pt-0">
          <div className="rounded-2xl bg-gradient-to-r from-primary via-primary-dark to-primary p-8 md:p-10 shadow-premium">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <p className="text-3xl md:text-4xl font-bold mb-1">170+</p>
                <p className="text-white/75 text-sm">Years of Legacy</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold mb-1">500+</p>
                <p className="text-white/75 text-sm">Products Offered</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold mb-1">1000+</p>
                <p className="text-white/75 text-sm">Retail Partners</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold mb-1">Millions</p>
                <p className="text-white/75 text-sm">Lives Impacted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
