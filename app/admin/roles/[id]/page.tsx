import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { RoleForm } from '../RoleForm';
import { deleteRole } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function RoleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const role = await prisma.role.findUnique({ where: { id } });
  if (!role) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/roles" className="text-sm text-slate-500 hover:text-slate-900">← User Roles</Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-white border border-slate-200 p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Role</h1>
            <RoleForm role={role} />
          </div>
        </div>
        <div>
          <div className="rounded-xl bg-white border border-slate-200 p-6 sticky top-6">
            <DeleteButton action={deleteRole.bind(null, role.id)} label="Delete Role" redirectPath="/admin/roles" />
          </div>
        </div>
      </div>
    </div>
  );
}
