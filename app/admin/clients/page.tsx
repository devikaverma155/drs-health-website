import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function isConnectionError(e: unknown): boolean {
  if (e && typeof e === 'object' && 'code' in e) {
    const code = (e as { code?: string }).code;
    if (code && ['P1001', 'P1017', 'P2024'].includes(code)) return true;
  }
  const msg = e instanceof Error ? e.message : String(e);
  return /MaxClients|connection|timeout|ECONNREFUSED|pool/i.test(msg);
}

export default async function ClientsPage() {
  let clients: Awaited<ReturnType<typeof prisma.client.findMany>>;
  let loadError: string | null = null;

  try {
    clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.error('[admin/clients] prisma.client.findMany failed:', e);
    if (isConnectionError(e)) {
      loadError =
        'Could not connect to the database. If you use Supabase, set DATABASE_URL to the Transaction pooler (port 6543) with ?pgbouncer=true (not Session pool on 5432).';
    } else {
      loadError = e instanceof Error ? e.message : 'Failed to load clients.';
    }
    clients = [];
  }

  if (loadError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Clients</h1>
          <Link
            href="/admin/clients/new"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 cursor-not-allowed pointer-events-none"
            aria-disabled
          >
            Add Client
          </Link>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-950">
          <p className="font-medium mb-2">Unable to load clients</p>
          <p className="text-amber-900/90 mb-3">{loadError}</p>
          <p className="text-xs text-amber-800/80">
            Check DATABASE_URL in your environment (and Vercel), then redeploy or restart the dev server.
          </p>
        </div>
      </div>
    );
  }

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
                <th className="px-4 py-3 font-medium">Category</th>
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
                  <td className="px-4 py-3">
                    {c.category ? (
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {c.category}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
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
