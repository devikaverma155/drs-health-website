import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ayurveda at DRS Health',
  description:
    'Basic principles of Ayurveda: Panchamahabhut, Prakriti, Tridosha, history of Ayurveda, and Ayurvedic herbs at DRS Health.',
  openGraph: {
    title: 'Ayurveda & Information | DRS Health',
  },
};

export default function InformationPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-3xl">
        <Link href="/about" className="text-sm text-primary hover:underline mb-8 inline-block">
          ← About Us
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
          Ayurveda &amp; Our Foundation
        </h1>

        {/* Basic Principles */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Basic Principles
          </h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Panchamahabhut</h3>
              <p className="text-body-muted leading-relaxed">
                Every human being is composed of a unique proportion of the five elements (Panchmahabhutas)—earth (prithvi), water (jala), fire (tejas), air (vaayu), and space (akasha). They govern the same properties in our body as in nature. These five elements integrate to form three dynamic forces, the biological humors or Tridosha, namely Vata, Pitta and Kapha.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Prakriti</h3>
              <p className="text-body-muted leading-relaxed">
                According to Ayurveda, every individual is born with a unique combination of doshas termed as PRAKRITI (body&apos;s physical constitution) that is determined at the moment of conception and influenced by seasonal variations and several other internal and external factors. We are all different; everyone has their unique inherent strength and weakness. If you know yours and know how your constitution causes them, you can adjust for them and make your life happier and healthier.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Tridosha</h3>
              <p className="text-body-muted leading-relaxed">
                Vata, Pitta and Kapha are the three doshas which govern all our human characteristics, activities and patterns of health and illness. Vata dosha, woven from the elements of Space and Air, regulates movement and change in our minds and bodies. Pitta dosha, comprised of Fire and Water, governs digestion and metabolism. Kapha dosha, made from Earth and Water, maintains and protects the integrity and structure of our mind and body. The doshas determine certain qualities or attributes of our body. One can remain healthy as long as these doshas are in a state of equilibrium in the body. Once aggravated or diminished they can lead to disease conditions. How you feel inside depends on how these doshas work within your system.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Vata Prakruti</h3>
              <p className="text-body-muted leading-relaxed">
                Vata people are quick to learn, to forget, to become enthused. They walk, talk, and change their minds and moods quickly. Their normal body functions also tend to change quickly. Their energy levels are very high. Vata people often have trouble making decisions; suffer from gas, constipation, and cold extremities. Their body is dry and often rough. They have imaginative minds and irregular habits. It&apos;s the most difficult constitution to keep healthy.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Pitta Prakruti</h3>
              <p className="text-body-muted leading-relaxed">
                Pitta people are efficient, precise and orderly. They hate hot climate and prefer cooling food. Their skin tends to be warm and soft with freckles, pimples, rashes and wrinkles. Their hair grays early and they also suffer from hairfall. These people get easily irritated and are impatient.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Kapha Prakruti</h3>
              <p className="text-body-muted leading-relaxed">
                Kapha people like slow and relaxed life. The qualities of Kapha are slow, steady, heavy, oily, and cold. When Kapha is in balance, Kapha people are caring, nurturing and grounded. Their stamina is superior to the other types. Their body tissues are firm, well-nourished and healthy. When out of balance, they are needy, lazy, feel heavy in body and mind and tend to gain weight easily and lose it with difficulty.
              </p>
            </div>
          </div>
        </section>

        {/* Explore History of Ayurveda */}
        <section className="mb-16 py-10 border-t border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Explore History of Ayurveda
          </h2>
          <p className="text-body-muted leading-relaxed">
            Ayurveda, most commonly defined as the practice of ancient Hindu or Indian medicine, originates with the Vedas, the earliest Indian literature, dating from ca. 1500 B.C. Originally transmitted orally, Ayurveda was codified into major treatises including Charaka, Sushruta and Vagbhatta samhita (medical transcripts). These texts continue to be the most important classical reference even today. Ayurveda consists of eight branches: general medicine (kayachikitsa), surgery (Shalya), disease of ear, nose and throat (Shalakya), pediatrics (Kaumarbhrutya), toxicology (Agadatantra), psychiatry (Manas roga), rejuvenation (Rasayana) and sexual vitality (Vajikaran). Over 80% of the population opts for alternative therapy as curative and preventive healing. Ayurveda has stood the test of time and continues to be a complete healing system to offer ancient understanding and wisdom to the modern world.
          </p>
        </section>

        {/* Ayurvedic Herbs */}
        <section className="py-10 border-t border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Ayurvedic Herbs
          </h2>
          <p className="text-body-muted leading-relaxed">
            The naturally growing herbs are used in the Ayurvedic system of medicine to bring the imbalance in dosha back to normal. These herbs are processed into various forms like churna (powders), kadha (decoctions), vati (tablets), etc., and used as required in specific disease conditions. Every herb has its own individual properties and works accordingly while breaking the disease pathology. These herbs are not just known for providing symptomatic relief but also treat the disease from its root cause.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/about" className="text-primary font-medium hover:underline">
            ← Back to About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
