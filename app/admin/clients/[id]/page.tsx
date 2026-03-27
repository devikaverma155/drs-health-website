import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ClientForm } from '../ClientForm';
import { deleteClient } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';
import { ClientFileSection } from './ClientFileSection';

export const dynamic = 'force-dynamic';

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Omit file_data / mime_type from query until DB migration is applied (avoids errors if columns missing).
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      documents: {
        orderBy: { uploadedAt: 'desc' },
        select: {
          id: true,
          clientId: true,
          fileName: true,
          fileUrl: true,
          fileSize: true,
          fileType: true,
          notes: true,
          uploadedAt: true,
        },
      },
    },
  });
  if (!client) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/clients" className="text-sm text-slate-500 hover:text-slate-900">← Clients</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Client</h1>
            <ClientForm client={client} />
          </div>
        </div>
        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6 space-y-6">
            <ClientFileSection clientId={client.id} documents={client.documents} />
            <div className="pt-6 border-t border-slate-200">
              <DeleteButton action={deleteClient.bind(null, client.id)} label="Delete Client" redirectPath="/admin/clients" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
