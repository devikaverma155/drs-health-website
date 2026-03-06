import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RolesPage() {
  const roles = await prisma.role.findMany({
    orderBy: { roleName: 'asc' },
    include: { _count: { select: { userRoles: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">User Roles</h1>
        <Link
          href="/admin/roles/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add Role
        </Link>
      </div>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {roles.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No roles yet. Add Admin, Production manager, Sales team, Inventory manager, etc.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Role name</th>
                <th className="px-4 py-3 font-medium">Users assigned</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/roles/${r.id}`} className="font-medium text-primary hover:underline">
                      {r.roleName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r._count.userRoles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
