import Image from 'next/image';

export const metadata = {
  title: 'Pandit Barelal Ji Jain - 170 Year Ayurvedic Legacy | DRS Health',
  description: 'Discover the remarkable story of Pandit Barelal Ji Jain and the 170-year-old Ayurvedic legacy of Syadwad Wellness, revived by Bimbsar Jain.',
};

export default function PanditBarelaJiPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-white to-accent-blue/10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Pandit Barelal Ji Jain
          </h1>
          <p className="text-xl text-primary font-semibold mb-6">
            The Visionary Who Established a 170-Year Ayurvedic Legacy
          </p>
        </div>
      </section>

      {/* Image and Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="relative h-96 md:h-[28rem] w-full mb-12 rounded-xl overflow-hidden shadow-card">
            <Image
              src="https://drshealth.in/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-02-at-15.45.56.jpeg"
              alt="Pandit Barelal Ji Jain - Founder of Ayurvedic Legacy"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-body-muted leading-relaxed space-y-6">
            <section>
              <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">
                Reviving a 170-Year-Old Ayurvedic Legacy
              </h2>
              <p>
                Syadwad Wellness is a proud revival of a 170-year-old Ayurvedic legacy established by the visionary <strong>Pandit Barelal Ji Jain</strong>, whose contributions to Ayurveda, Jain philosophy, and community development have left an indelible mark in Bundelkhand and beyond. Today, his great-grandson, <strong>Bimbsar Jain</strong>, is reviving this rich heritage through Syadwad Wellness, bringing back the time-tested traditions of natural healing and wellness for the modern world.
              </p>
            </section>

            <section>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                The Foundation: Syadwad Jain Aushadhalay
              </h3>
              <p>
                The roots of Syadwad Wellness trace back to the establishment of <strong>Syadwad Jain Aushadhalay</strong> in the historic village of Patha, Tikamgarh district. Pandit Barelal Ji, honored with the prestigious title of <strong>"Raj Vaidya"</strong> by the King of Tikamgarh for his unparalleled contributions to Ayurveda, was a revered figure in his time.
              </p>
              <p>
                His expertise earned him international recognition, and he was invited to deliver guest lectures at <strong>Washington University</strong> on two occasions, where he shared his profound knowledge of Ayurveda and holistic healing with a global audience. This remarkable achievement demonstrated the universal relevance and efficacy of Ayurvedic wisdom.
              </p>
            </section>

            <section>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                Beyond Medicine: A Custodian of Culture
              </h3>
              <p>
                Beyond his medical expertise, Pandit Barelal Ji was also the first administrator of <strong>Aharji</strong>, a 1000-year-old Jain temple town in Tikamgarh district. Under his stewardship, Aharji was meticulously rebuilt to its former glory and became a hub of education and community services, gaining national prominence.
              </p>
              <p>
                His dedication to societal betterment and cultural preservation remains a source of inspiration for generations to come. Pandit Barelal Ji was not just a healer, but a visionary who understood that true wellness encompasses physical health, spiritual growth, and community development.
              </p>
            </section>

            <section>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                Syadwad Wellness: Honoring the Legacy
              </h3>
              <p>
                Building on this remarkable foundation, <strong>Syadwad Wellness</strong> embodies the principles of holistic health and natural healing. Every product is crafted with authenticity and care, using traditional Ayurvedic wisdom combined with modern innovation. From herbal remedies to personal care, each offering reflects a commitment to purity, sustainability, and the betterment of humanity.
              </p>
              <p>
                Through Syadwad Wellness, Bimbsar Jain carries forward the vision of his great-grandfather, making Ayurvedic wellness accessible to all while honoring a legacy that has stood the test of time.
              </p>
            </section>

            <section>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                Join the Journey
              </h3>
              <p>
                Join us in this journey towards health, harmony, and holistic living—a path illuminated by 170 years of Ayurvedic excellence and wisdom. At DRS Health Solutions and Syadwad Wellness, we honor the legacy of Pandit Barelal Ji Jain by delivering authentic, time-tested Ayurvedic solutions for modern wellness.
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent-blue/10 rounded-xl border border-primary/20">
            <h4 className="font-heading text-2xl font-semibold text-foreground mb-3">
              Experience the Legacy
            </h4>
            <p className="text-body-muted mb-6">
              Discover authentic Ayurvedic products and wellness solutions rooted in 170 years of proven tradition.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="/shop"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:shadow-card-hover transition-all font-semibold"
              >
                Explore Products
              </a>
              <a
                href="/contact"
                className="px-6 py-3 bg-white border border-primary text-primary rounded-lg hover:bg-primary/5 transition-all font-semibold"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
