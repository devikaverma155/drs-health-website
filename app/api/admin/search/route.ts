import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { AdminSearchRecord } from '@/lib/admin-search-types';

export const dynamic = 'force-dynamic';

const TAKE = 5;

function contains(q: string) {
  return { contains: q, mode: 'insensitive' as const };
}

/**
 * GET /api/admin/search?q=...
 * Global admin search across CRM and inventory (authenticated admins only).
 */
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';
  if (q.length < 2) {
    return NextResponse.json({ records: [] as AdminSearchRecord[] });
  }

  const records: AdminSearchRecord[] = [];

  try {
    const [
      leads,
      clients,
      patients,
      employees,
      products,
      categories,
      rawMaterials,
      packagingMaterials,
      vendors,
      productionBatches,
    ] = await Promise.all([
      prisma.lead.findMany({
        where: {
          OR: [
            { name: contains(q) },
            { email: contains(q) },
            { phone: contains(q) },
            { companyName: contains(q) },
            { city: contains(q) },
            { source: contains(q) },
          ],
        },
        take: TAKE,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.client.findMany({
        where: {
          OR: [
            { companyName: contains(q) },
            { contactPerson: contains(q) },
            { email: contains(q) },
            { phone: contains(q) },
            { city: contains(q) },
            { gstNumber: contains(q) },
          ],
        },
        take: TAKE,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.clinicPatient.findMany({
        where: {
          OR: [
            { name: contains(q) },
            { email: contains(q) },
            { phone: contains(q) },
            { condition: contains(q) },
            { assignedDoctor: contains(q) },
          ],
        },
        take: TAKE,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.employee.findMany({
        where: {
          OR: [
            { name: contains(q) },
            { email: contains(q) },
            { phone: contains(q) },
            { designation: contains(q) },
            { department: contains(q) },
          ],
        },
        take: TAKE,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.findMany({
        where: {
          OR: [{ name: contains(q) }, { packSize: contains(q) }],
        },
        take: TAKE,
        orderBy: { name: 'asc' },
      }),
      prisma.productCategory.findMany({
        where: { name: contains(q) },
        take: TAKE,
        orderBy: { name: 'asc' },
      }),
      prisma.rawMaterial.findMany({
        where: {
          OR: [{ name: contains(q) }, { materialCode: contains(q) }],
        },
        take: TAKE,
        orderBy: { name: 'asc' },
      }),
      prisma.packagingMaterial.findMany({
        where: {
          OR: [{ name: contains(q) }, { packagingCode: contains(q) }],
        },
        take: TAKE,
        orderBy: { name: 'asc' },
      }),
      prisma.vendor.findMany({
        where: {
          OR: [
            { name: contains(q) },
            { contactPerson: contains(q) },
            { email: contains(q) },
            { phone: contains(q) },
          ],
        },
        take: TAKE,
        orderBy: { name: 'asc' },
      }),
      prisma.productionBatch.findMany({
        where: { batchNumber: contains(q) },
        include: { product: { select: { name: true } } },
        take: TAKE,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    for (const l of leads) {
      records.push({
        kind: 'Lead',
        id: l.id,
        title: l.name || l.companyName || 'Lead',
        subtitle: [l.email, l.phone, l.companyName].filter(Boolean).join(' · ') || l.status || '',
        href: `/admin/leads/${l.id}`,
      });
    }
    for (const c of clients) {
      records.push({
        kind: 'Client',
        id: c.id,
        title: c.companyName,
        subtitle: [c.contactPerson, c.email, c.phone].filter(Boolean).join(' · '),
        href: `/admin/clients/${c.id}`,
      });
    }
    for (const p of patients) {
      records.push({
        kind: 'Patient',
        id: p.id,
        title: p.name || 'Patient',
        subtitle: [p.email, p.phone, p.condition].filter(Boolean).join(' · '),
        href: `/admin/clinic-patients/${p.id}`,
      });
    }
    for (const e of employees) {
      records.push({
        kind: 'Employee',
        id: e.id,
        title: e.name || 'Employee',
        subtitle: [e.designation, e.department, e.email].filter(Boolean).join(' · '),
        href: `/admin/employees/${e.id}`,
      });
    }
    for (const p of products) {
      records.push({
        kind: 'Product',
        id: p.id,
        title: p.name,
        subtitle: p.packSize ? `Pack: ${p.packSize}` : 'Product Master',
        href: `/admin/products/${p.id}`,
      });
    }
    for (const c of categories) {
      records.push({
        kind: 'Category',
        id: c.id,
        title: c.name,
        subtitle: 'Product category',
        href: `/admin/product-categories/${c.id}`,
      });
    }
    for (const r of rawMaterials) {
      records.push({
        kind: 'Raw material',
        id: r.id,
        title: r.name || r.materialCode || 'Material',
        subtitle: r.materialCode ? `Code: ${r.materialCode}` : 'RM',
        href: '/admin/materials',
      });
    }
    for (const p of packagingMaterials) {
      records.push({
        kind: 'Packaging',
        id: p.id,
        title: p.name || p.packagingCode || 'Packaging',
        subtitle: p.packagingCode ? `Code: ${p.packagingCode}` : 'PM',
        href: '/admin/materials',
      });
    }
    for (const v of vendors) {
      records.push({
        kind: 'Vendor',
        id: v.id,
        title: v.name,
        subtitle: [v.contactPerson, v.phone, v.email].filter(Boolean).join(' · '),
        href: '/admin/vendor-orders',
      });
    }
    for (const b of productionBatches) {
      records.push({
        kind: 'Production',
        id: b.id,
        title: b.batchNumber || `Batch ${b.id.slice(0, 8)}`,
        subtitle: b.product?.name ? `Product: ${b.product.name}` : 'Production batch',
        href: `/admin/production/${b.id}`,
      });
    }
  } catch (e) {
    console.error('[admin/search]', e);
    return NextResponse.json({ error: 'Search failed', records: [] }, { status: 500 });
  }

  return NextResponse.json({ records });
}
