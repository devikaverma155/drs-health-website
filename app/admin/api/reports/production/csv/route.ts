import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { buildCsv } from '../../csv-utils';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const batches = await prisma.productionBatch.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true },
  });

  const header = ['Batch', 'Product', 'Quantity', 'Status', 'Mfg date', 'Created'];
  const rows = batches.map((b) => [
    b.batchNumber ?? b.id.slice(0, 8),
    b.product?.name ?? '',
    b.quantityProduced ?? '',
    b.status ?? '',
    b.manufacturingDate ? new Date(b.manufacturingDate).toISOString().slice(0, 10) : '',
    b.createdAt ? new Date(b.createdAt).toISOString().slice(0, 10) : '',
  ]);
  const csv = buildCsv([header, ...rows]);

  const filename = `production-batch-history-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
