import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { buildCsv } from '../../csv-utils';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const [bySource, byStatus] = await Promise.all([
    prisma.lead.groupBy({ by: ['source'], _count: { id: true } }),
    prisma.lead.groupBy({ by: ['status'], _count: { id: true } }),
  ]);

  const header = ['Type', 'Name', 'Count'];
  const sourceRows = bySource.map((r) => ['Source', r.source?.replace(/_/g, ' ') ?? 'Unknown', r._count.id]);
  const statusRows = byStatus.map((r) => ['Status', r.status?.replace(/_/g, ' ') ?? 'Unknown', r._count.id]);
  const rows = [...sourceRows, [], ...statusRows];
  const csv = buildCsv([header, ...rows]);

  const filename = `lead-conversion-report-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
