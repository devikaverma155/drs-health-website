import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { LeadsTable } from './LeadsTable';
import { LeadFilters } from './LeadFilters';

export const dynamic = 'force-dynamic';

const SOURCES: string[] = [
  'contact',
  'b2b',
  'private-labelling',
  'contract-manufacturing',
  'pcd',
  'whatsapp',
  'ads',
];

const STATUSES: string[] = ['new', 'contacted', 'qualified', 'converted', 'closed'];

type SearchParams = { source?: string; status?: string; q?: string };

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const source = params.source;
  const status = params.status;
  const q = params.q?.trim();

  const where: Prisma.LeadWhereInput = {};
  if (source) (where as Record<string, unknown>).source = source;
  if (status) (where as Record<string, unknown>).status = status;
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
        <LeadsTable leads={leads} loading={false} />
      </div>
    </div>
  );
}
