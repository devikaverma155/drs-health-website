'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from './LoadingSpinner';

export function DeleteButton({
  action,
  label,
  redirectPath,
}: {
  action: () => Promise<void>;
  label: string;
  redirectPath: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  async function handleDelete() {
    if (!confirm) {
      setConfirm(true);
      return;
    }

    setLoading(true);
    try {
      await action();
      router.push(redirectPath);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
      setLoading(false);
      setConfirm(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className={`w-full rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2 ${
        confirm
          ? 'bg-red-600 text-white hover:bg-red-700'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {loading && <LoadingSpinner size="sm" />}
      {loading ? 'Deleting…' : confirm ? `Confirm ${label}` : label}
    </button>
  );
}
