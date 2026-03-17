import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BOMForm } from '../BOMForm';
import { BOMComputedRequirementsSection } from '../BOMComputedRequirementsSection';
import { deleteBOM } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function BOMDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bom = await prisma.billOfMaterial.findUnique({
    where: { id },
    include: { product: true },
  });
  if (!bom) notFound();
  const products = await prisma.product.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } });
  const quantity = bom.quantity != null ? Number(bom.quantity) : 1;

  return (
    <div className="space-y-6">
      <Link href="/admin/bom" className="text-sm text-slate-500 hover:text-slate-900">← Bill of Material</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit BOM</h1>
            <BOMForm bom={bom} products={products} />
          </div>
          <BOMComputedRequirementsSection
            productId={bom.productId}
            productName={bom.product?.name ?? null}
            quantity={quantity}
          />
          {bom.productId && quantity >= 1 && (
            <div className="rounded-xl bg-white border border-slate-200 p-6">
              <h2 className="font-medium text-slate-900 mb-2">Production list (print / download)</h2>
              <p className="text-sm text-slate-600 mb-3">Get a print-friendly material list to give to production. You can print or save as PDF from the browser.</p>
              <Link
                href={`/print/bom/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-800 text-white px-4 py-2 text-sm font-medium hover:bg-slate-700"
              >
                <span aria-hidden>🖨️</span>
                Print / Download production list
              </Link>
            </div>
          )}
          {bom.status === 'complete' && bom.productId && (
            <div className="rounded-xl bg-white border border-slate-200 p-6">
              <p className="text-sm text-slate-600 mb-2">BOM is complete. Add to Production; raw &amp; packaging (from Product Master × quantity produced) will be deducted when you mark the batch completed.</p>
              <Link href={`/admin/production/new?productId=${bom.productId}&quantity=${quantity}`} className="rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700 inline-block">
                Add to Production
              </Link>
            </div>
          )}
        </div>
        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <DeleteButton action={deleteBOM.bind(null, bom.id)} label="Delete BOM" redirectPath="/admin/bom" />
          </div>
        </div>
      </div>
    </div>
  );
}
