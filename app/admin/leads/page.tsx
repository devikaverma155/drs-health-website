import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { LeadSource, LeadStatus, Prisma } from '@prisma/client';
import { LeadsTable } from './LeadsTable';
import { LeadFilters } from './LeadFilters';

export const dynamic = 'force-dynamic';

const SOURCES: LeadSource[] = [
  'contact_form',
  'consultation',
  'b2b',
  'private_labelling',
  'manufacturer',
  'pcd',
  'whatsapp',
  'ads',
];

const STATUSES: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'];

type SearchParams = { source?: string; status?: string; q?: string };

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const source = params.source as LeadSource | undefined;
  const status = params.status as LeadStatus | undefined;
  const q = params.q?.trim();

  const where: Prisma.LeadWhereInput = {};
  if (source) where.source = source;
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q } },
    ];
  }

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { notes: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>
        <Link
          href="/admin/leads/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add lead
        </Link>
      </div>

      <LeadFilters sources={SOURCES} statuses={STATUSES} defaultSource={source} defaultStatus={status} defaultQ={q} />

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
