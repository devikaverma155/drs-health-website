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
    year: '1995',
    title: 'Foundation',
    description: 'Started with a vision to provide quality healthcare solutions to millions',
    icon: '🌱',
    accent: 'from-primary to-primary-dark',
  },
  {
    year: '2005',
    title: 'Expansion Era',
    description: 'Expanded across India with state-of-the-art manufacturing facilities',
    icon: '🏭',
    accent: 'from-accent-green to-accent-blue',
  },
  {
    year: '2015',
    title: 'Innovation',
    description: 'Launched innovative product lines and digital transformation initiatives',
    icon: '💡',
    accent: 'from-accent-blue to-accent-navy',
  },
  {
    year: '2023',
    title: 'Global Presence',
    description: 'Established international partnerships and global distribution network',
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
        {/* Section Header */}
        <div className="mb-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5">
            Our Journey
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Brand History
          </h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            A journey of innovation, commitment, and healthcare excellence spanning decades
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline Line - Horizontal, thicker and more visible */}
          <div className="absolute top-[60px] left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-primary/30 via-accent-green/30 to-primary/30 hidden md:block rounded-full" />
          {/* Glowing overlay on the line */}
          <div className="absolute top-[58px] left-[12.5%] right-[12.5%] h-[5px] bg-gradient-to-r from-primary/15 via-accent-blue/15 to-primary/15 hidden md:block rounded-full blur-sm" />

          {/* Timeline Items - Horizontal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative group">
                {/* Timeline Node - large, prominent, with ring */}
                <div className="hidden md:flex flex-col items-center mb-6">
                  {/* Outer glow ring */}
                  <div className={`w-[120px] h-[120px] rounded-full bg-gradient-to-br ${event.accent} p-[3px] shadow-lg relative z-10`}>
                    <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center">
                      <span className="text-2xl mb-0.5">{event.icon}</span>
                      <span className="text-lg font-bold text-foreground leading-none">{event.year}</span>
                    </div>
                  </div>
                  {/* Connector line from circle to card */}
                  <div className={`w-0.5 h-5 bg-gradient-to-b ${event.accent} opacity-40`} />
                </div>

                {/* Content Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border overflow-hidden hover:-translate-y-1">
                  {/* Top accent stripe */}
                  <div className={`h-1.5 bg-gradient-to-r ${event.accent}`} />
                  <div className="p-6">
                    {/* Mobile year + icon (hidden on desktop since circle shows it) */}
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
                <p className="text-3xl md:text-4xl font-bold mb-1">28+</p>
                <p className="text-white/75 text-sm">Years of Excellence</p>
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
