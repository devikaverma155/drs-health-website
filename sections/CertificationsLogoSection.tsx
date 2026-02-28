import { LogoCloud } from "@/components/ui/logo-cloud";

export function CertificationsLogoSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      {/* Subtle organic background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-green-50 blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-50 blur-3xl opacity-50" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Section Header — matching existing typography */}
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">
            Trusted Quality
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Certifications &{" "}
            <span className="text-primary">Standards</span>
          </h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            Committed to the highest international standards of quality, safety,
            and compliance
          </p>
        </div>

        {/* Logo Cloud Grid */}
        <LogoCloud />
      </div>
    </section>
  );
}
