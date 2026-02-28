'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteComboOffer } from './actions';

export function DeleteComboButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete combo "${title}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deleteComboOffer(id);
      router.refresh();
    } catch {
      alert('Failed to delete combo.');
      setDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {deleting ? '…' : 'Delete'}
    </button>
  );
}
