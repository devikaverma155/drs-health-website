import Link from 'next/link';
import { RoleForm } from '../RoleForm';

export default function NewRolePage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/roles" className="text-sm text-slate-500 hover:text-slate-900">← User Roles</Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add Role</h1>
      <RoleForm />
    </div>
  );
}
