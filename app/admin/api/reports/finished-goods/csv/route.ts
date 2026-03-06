import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { buildCsv } from '../../csv-utils';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const batches = await prisma.finishedGoodsBatch.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true },
  });

  const header = ['Batch', 'Product', 'Qty available', 'Mfg date', 'Expiry date'];
  const rows = batches.map((b) => [
    b.batchNumber ?? b.id.slice(0, 8),
    b.product?.name ?? '',
    b.quantityAvailable ?? '',
    b.manufacturingDate ? new Date(b.manufacturingDate).toISOString().slice(0, 10) : '',
    b.expiryDate ? new Date(b.expiryDate).toISOString().slice(0, 10) : '',
  ]);
  const csv = buildCsv([header, ...rows]);

  const filename = `finished-goods-stock-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
