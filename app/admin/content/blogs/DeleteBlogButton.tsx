'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteBlogPost } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export function DeleteBlogButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteBlogPost(id);
      router.push('/admin/content/blogs');
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  if (!confirm) {
    return (
      <button
        type="button"
        onClick={() => setConfirm(true)}
        className="rounded-lg border border-red-200 text-red-700 px-4 py-2 text-sm font-medium hover:bg-red-50"
      >
        Delete
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600">Delete &quot;{title}&quot;?</span>
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="rounded-lg bg-red-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-red-700 disabled:opacity-50 flex items-center gap-1"
      >
        {loading && <LoadingSpinner size="sm" />}
        Yes, delete
      </button>
      <button
        type="button"
        onClick={() => setConfirm(false)}
        disabled={loading}
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        Cancel
      </button>
    </div>
  );
}
