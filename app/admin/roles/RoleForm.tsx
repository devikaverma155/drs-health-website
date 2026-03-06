'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRole, updateRole } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { Role } from '@prisma/client';

export function RoleForm({ role }: { role?: Role | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roleName, setRoleName] = useState(role?.roleName ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (role) {
        await updateRole(role.id, { roleName });
      } else {
        await createRole({ roleName });
      }
      router.push('/admin/roles');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 rounded-xl bg-white border border-slate-200 p-6 relative">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Role name *</label>
        <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)} required disabled={loading} placeholder="e.g. Admin, Production manager" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : role ? 'Update Role' : 'Create Role'}
        </button>
        <button type="button" onClick={() => router.back()} disabled={loading} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Cancel</button>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <LoadingSpinner size="lg" />
        </div>
      )}
    </form>
  );
}
