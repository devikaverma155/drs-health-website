'use client';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1995',
    title: 'Foundation',
    description: 'Started with a vision to provide quality healthcare solutions to millions',
    icon: '🌱',
  },
  {
    year: '2005',
    title: 'Expansion Era',
    description: 'Expanded across India with state-of-the-art manufacturing facilities',
    icon: '🏭',
  },
  {
    year: '2015',
    title: 'Innovation',
    description: 'Launched innovative product lines and digital transformation initiatives',
    icon: '💡',
  },
  {
    year: '2023',
    title: 'Global Presence',
    description: 'Established international partnerships and global distribution network',
    icon: '🌍',
  },
];

export function BrandHistorySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-soft-bg to-accent-green/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-semibold text-foreground mb-4">Our Brand History</h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            A journey of innovation, commitment, and healthcare excellence spanning decades
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline Line - Horizontal */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent-blue to-primary hidden md:block"></div>

          {/* Timeline Items - Horizontal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative">
                {/* Timeline Circle - positioned above the line on desktop */}
                <div className="hidden md:flex items-center justify-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent-blue rounded-full border-4 border-white shadow-card flex items-center justify-center text-white text-lg font-bold relative z-10">
                    {event.year.slice(-2)}
                  </div>
                </div>

                {/* Content Card */}
                <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all border border-border">
                  <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {event.year}
                  </span>
                  
                  <span className="text-3xl block mb-3">{event.icon}</span>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-body-muted text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">28+</p>
            <p className="text-body-muted">Years of Excellence</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">500+</p>
            <p className="text-body-muted">Products Offered</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">1000+</p>
            <p className="text-body-muted">Retail Partners</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">Millions</p>
            <p className="text-body-muted">Lives Impacted</p>
          </div>
        </div>
      </div>
    </section>
  );
}
