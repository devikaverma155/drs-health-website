'use client';

import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface FileItem {
  id: string;
  fileName: string | null;
  fileUrl: string | null;
  fileSize?: number | null;
  uploadedAt?: Date | string | null;
}

interface FileListProps {
  files: FileItem[];
  onDelete?: (fileId: string) => Promise<void>;
  entityType: 'employee' | 'patient';
}

export function FileList({ files, onDelete, entityType }: FileListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(fileId: string, fileUrl: string | null) {
    if (!onDelete || !fileUrl) return;
    
    if (!confirm('Are you sure you want to delete this file?')) return;

    setDeletingId(fileId);
    try {
      await onDelete(fileId);
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete file');
    } finally {
      setDeletingId(null);
    }
  }

  function formatFileSize(bytes: number | null | undefined): string {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatDate(date: Date | string | null | undefined): string {
    if (!date) return 'Unknown date';
    return new Date(date).toLocaleDateString();
  }

  if (files.length === 0) {
    return <p className="text-sm text-slate-500">No files uploaded yet.</p>;
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="flex-1 min-w-0">
              <a
                href={file.fileUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline block truncate"
                title={file.fileName || 'File'}
              >
                {file.fileName || 'Untitled File'}
              </a>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span>{formatFileSize(file.fileSize)}</span>
                <span>•</span>
                <span>{formatDate(file.uploadedAt)}</span>
              </div>
            </div>
          </div>
          {onDelete && (
            <button
              onClick={() => handleDelete(file.id, file.fileUrl)}
              disabled={deletingId === file.id}
              className="ml-3 p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
              title="Delete file"
            >
              {deletingId === file.id ? (
                <LoadingSpinner size="sm" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
