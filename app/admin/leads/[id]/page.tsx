import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { LeadDetail } from '../LeadDetail';
import { LeadNotesTimeline } from '../LeadNotesTimeline';
import { LeadStatusDropdown } from '../LeadStatusDropdown';
import { SendWhatsAppPanel } from '../SendWhatsAppPanel';
import { LeadSamplesSection } from '../LeadSamplesSection';

export const dynamic = 'force-dynamic';

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      notes: { orderBy: { createdAt: 'desc' } },
      samples: { orderBy: { createdAt: 'desc' } },
    },
  });
  if (!lead) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/leads" className="text-sm text-slate-500 hover:text-slate-900">
          ← Leads
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <LeadDetail lead={lead} />
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-1">Status</p>
              <LeadStatusDropdown leadId={lead.id} currentStatus={lead.status} />
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h2 className="font-medium text-slate-900 mb-4">Sample tracking</h2>
            <LeadSamplesSection leadId={lead.id} samples={lead.samples} />
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h2 className="font-medium text-slate-900 mb-4">Notes</h2>
            <LeadNotesTimeline leadId={lead.id} notes={lead.notes} />
          </div>
        </div>

        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <SendWhatsAppPanel leadId={lead.id} phone={lead.phone} />
          </div>
        </div>
      </div>
    </div>
  );
}
