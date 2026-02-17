import type { Metadata } from 'next';
import { B2BForm } from './B2BForm';
import { ManufacturerForm } from './ManufacturerForm';
import { PrivateLabellingForm } from './PrivateLabellingForm';
import { PCDForm } from './PCDForm';

export const metadata: Metadata = {
  title: 'For Business',
  description:
    'B2B, Private Labelling, Contract Manufacturing, and PCD enquiries. Partner with DRS Health. Each enquiry has its own form.',
  openGraph: {
    title: 'For Business | DRS Health',
    description: 'B2B, Private Labelling, Contract Manufacturing, and PCD. Partner with DRS Health.',
  },
};

export default function ForBusinessPage() {
  return (
    <div className="section-padding">
      <div className="container-tight max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          For Business
        </h1>
        <p className="text-body-muted mb-12">
          Retailers, private label partners, contract manufacturing clients, and PCD partners can use the relevant form below. Each enquiry type has its own form.
        </p>

        <div className="space-y-16">
          <section id="b2b" className="scroll-mt-20">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Retailers & B2B Customers
            </h2>
            <p className="text-body-muted text-sm mb-6">
              Interested in stocking or selling DRS Health products? Share your details and we will get back to you.
            </p>
            <B2BForm />
          </section>

          <section id="private-labelling" className="scroll-mt-20 border-t border-border pt-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Private Labelling
            </h2>
            <p className="text-body-muted text-sm mb-6">
              Our formula + your brand. Enquire for private labelling and custom packaging.
            </p>
            <PrivateLabellingForm />
          </section>

          <section id="contract-manufacturing" className="scroll-mt-20 border-t border-border pt-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Third-Party Contract Manufacturing
            </h2>
            <p className="text-body-muted text-sm mb-6">
              Your concept + our manufacturing. For contract manufacturing, bulk supply, or custom formulations.
            </p>
            <ManufacturerForm />
          </section>

          <section id="pcd" className="scroll-mt-20 border-t border-border pt-12">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              PCD (Propaganda Cum Distribution)
            </h2>
            <p className="text-body-muted text-sm mb-6">
              Interested in our PCD programme? Submit your details and we will get back to you.
            </p>
            <PCDForm />
          </section>
        </div>
      </div>
    </div>
  );
}
