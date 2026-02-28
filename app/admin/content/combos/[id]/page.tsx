import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ComboOfferForm } from '../ComboOfferForm';

export const dynamic = 'force-dynamic';

export default async function EditComboPage({ params }: { params: { id: string } }) {
  const combo = await prisma.comboOffer.findUnique({ where: { id: params.id } });
  if (!combo) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/content/combos" className="text-sm text-slate-500 hover:text-slate-700">
          ← Back to Combos
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900">Edit Combo Offer</h1>
      <ComboOfferForm combo={combo} />
    </div>
  );
}
