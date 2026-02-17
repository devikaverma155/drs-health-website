import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about DRS Health—our legacy in Ayurvedic wellness, expert team, Private Labelling, contract manufacturing, and quality care.',
  openGraph: {
    title: 'About Us | DRS Health',
    description:
      'Learn about DRS Health—our legacy in Ayurvedic wellness, Private Labelling, and contract manufacturing.',
  },
};


export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
          About DRS Health
        </h1>
        <p className="text-body-muted leading-relaxed">
          DRS Health is built on a legacy of authentic Ayurvedic practice. Our formulations draw on classical texts and the expertise of experienced practitioners to bring you safe, effective wellness solutions.
        </p>
        <p className="mt-6 text-body-muted leading-relaxed">
          We believe in making Ayurveda accessible without compromising on quality. From weight management and liver care to immunity and diabetes support, our range addresses real health concerns with time-tested ingredients and transparent manufacturing.
        </p>
        <p className="mt-6 text-body-muted leading-relaxed">
          Our team includes qualified Ayurvedic consultants who offer free health guidance. Whether you are new to Ayurveda or looking for targeted support, we are here to help you find the right path to wellness.
        </p>
      </div>

      {/* Founder / Legacy – Dr. Rajendra Kumar Jain */}
      <section className="mt-20 overflow-hidden">
        <div className="container-tight">
          <div className="relative rounded-2xl bg-soft-bg border border-border overflow-hidden shadow-card">
            <div className="grid md:grid-cols-2 gap-0 min-h-[320px]">
              {/* Portrait side with decorative shapes */}
              <div className="relative flex items-center justify-center p-8 md:p-12">
                <div className="relative z-10 w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg bg-primary/5 flex items-center justify-center">
                  <span className="text-body-muted text-sm text-center px-4">Portrait</span>
                </div>
                {/* Soft curved shapes – primary and accent (no harsh black/red) */}
                <div className="absolute top-0 left-0 w-40 h-40 md:w-52 md:h-52 rounded-full bg-primary/15 -translate-x-1/2 -translate-y-1/2" aria-hidden />
                <div className="absolute bottom-0 right-0 w-36 h-36 md:w-44 md:h-44 rounded-full bg-accent-orange/20 translate-x-1/3 translate-y-1/3" aria-hidden />
                <div className="absolute top-1/2 right-0 w-24 h-24 rounded-full bg-accent-mint/30 translate-x-1/2" aria-hidden />
              </div>
              {/* Text side */}
              <div className="flex flex-col justify-center p-8 md:p-10">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                  स्व. डॉ. राजेन्द्र कुमार जैन
                </h2>
                <p className="text-sm text-primary font-medium mt-1">(B.I.M.S., H.P.A.)</p>
                <p className="text-sm text-body-muted mt-2">
                  Former Consulting Physician and Consultant at Dhanyarasashala
                </p>
                <p className="text-body-muted text-sm leading-relaxed mt-4 line-clamp-4">
                  A distinguished Ayurvedic physician honoured with titles such as &quot;Shreshtha Ayuredajna&quot; and &quot;Ayurveda Visharad&quot;. He established Mahaoushadhi Rudanti as a medicine for immune support and worked with AIIMS Delhi. His expertise extended to challenging cases including hydrophobia and urine analysis for diagnosis. He brought relief to many patients suffering from cancer, leprosy, heart disease and other conditions. His association with Dhanyarasashala remains a matter of pride for us.
                </p>
                <Link
                  href="/information"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors w-fit"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Link to Basic Principles & Ayurveda */}
      <section className="mt-16">
        <div className="container-tight max-w-3xl text-center">
          <p className="text-body-muted mb-4">
            Explore the basic principles of Ayurveda—Panchamahabhut, Prakriti, Tridosha, and more.
          </p>
          <Link href="/information" className="text-primary font-medium hover:underline">
            Basic Principles &amp; History of Ayurveda →
          </Link>
        </div>
      </section>
    </div>
  );
}
