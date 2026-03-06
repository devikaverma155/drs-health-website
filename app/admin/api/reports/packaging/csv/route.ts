import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { buildCsv } from '../../csv-utils';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const materials = await prisma.packagingMaterial.findMany({
    orderBy: { name: 'asc' },
    include: { batches: true, supplier: true },
  });

  const header = ['Code', 'Name', 'Unit', 'Supplier', 'Quantity', 'Batches'];
  const rows = materials.map((m) => {
    const batchQty = m.batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
    const total = batchQty || Number(m.quantity ?? 0);
    return [
      m.packagingCode ?? '',
      m.name ?? '',
      m.unit ?? '',
      m.supplier?.name ?? '',
      total,
      m.batches.length,
    ];
  });
  const csv = buildCsv([header, ...rows]);

  const filename = `packaging-inventory-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
