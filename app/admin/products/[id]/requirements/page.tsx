import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductRequirementPageContent } from './ProductRequirementPageContent';

export const dynamic = 'force-dynamic';

export default async function ProductRequirementsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      requirements: {
        include: {
          rawMaterial: { select: { id: true, name: true } },
          packagingMaterial: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!product) notFound();

  const [rawMaterials, packagingMaterials] = await Promise.all([
    prisma.rawMaterial.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
    prisma.packagingMaterial.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  return (
    <div className="space-y-6">
      <Link href={`/admin/products/${id}`} className="text-sm text-slate-500 hover:text-slate-900">
        ← {product.name}
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Material Requirements</h1>
        <p className="text-sm text-slate-500">Define materials needed per unit</p>
      </div>

      <ProductRequirementPageContent
        productId={id}
        product={product}
        rawMaterials={rawMaterials}
        packagingMaterials={packagingMaterials}
      />
    </div>
  );
}
