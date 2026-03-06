import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Clients</h1>
        <Link
          href="/admin/clients/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add Client
        </Link>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {clients.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No clients yet. Add a client to manage orders and dispatch.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">GST No.</th>
                <th className="px-4 py-3 font-medium">City</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/clients/${c.id}`} className="font-medium text-primary hover:underline">
                      {c.companyName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{c.contactPerson || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{c.phone || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{c.gstNumber || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{c.city || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
