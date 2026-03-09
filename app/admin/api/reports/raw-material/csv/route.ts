import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { buildCsv } from '../../csv-utils';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const materials = await prisma.rawMaterial.findMany({
    orderBy: { name: 'asc' },
    include: { batches: true, supplier: true },
  });

  const withTotals = materials.map((m) => {
    const totalQty = m.batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
    const min = Number(m.minStock ?? 0);
    const isLow = min > 0 && totalQty < min;
    return { ...m, totalQty, status: isLow ? 'Low stock' : 'OK' };
  });

  const header = ['Code', 'Name', 'Unit', 'Supplier', 'Total stock', 'Min stock', 'Status'];
  const rows = withTotals.map((m) => [
    m.materialCode ?? '',
    m.name ?? '',
    m.unit ?? '',
    m.supplier?.name ?? '',
    m.totalQty,
    m.minStock != null ? String(m.minStock) : '',
    m.status,
  ]);
  const csv = buildCsv([header, ...rows]);

  const filename = `raw-material-inventory-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
