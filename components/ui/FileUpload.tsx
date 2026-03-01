'use client';

import { useState, useRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface FileUploadProps {
  entityId: string;
  type: 'employee' | 'patient';
  onUploadSuccess?: (file: { fileUrl: string; fileName: string; fileSize: number; filePath: string }) => void;
  disabled?: boolean;
}

export function FileUpload({ entityId, type, onUploadSuccess, disabled }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('entityId', entityId);

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload file');
      }

      if (onUploadSuccess) {
        onUploadSuccess({
          fileUrl: data.fileUrl,
          fileName: data.fileName,
          fileSize: data.fileSize,
          filePath: data.filePath,
        });
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        disabled={disabled || uploading}
        className="hidden"
        id={`file-upload-${entityId}`}
        accept="*/*"
      />
      <label
        htmlFor={`file-upload-${entityId}`}
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border cursor-pointer transition-colors ${
          disabled || uploading
            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
        }`}
      >
        {uploading ? (
          <>
            <LoadingSpinner size="sm" />
            Uploading...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload File
          </>
        )}
      </label>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
