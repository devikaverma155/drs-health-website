'use client';

import { useState, useRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface FileUploadProps {
  entityId: string;
  type: 'employee' | 'patient';
  onUploadSuccess?: (file: { id: string; fileUrl: string; fileName: string; fileSize: number; uploadedAt: string }) => void;
  disabled?: boolean;
}

export function FileUpload({ entityId, type, onUploadSuccess, disabled }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setSelectedFile(file);
    // Pre-fill with original file name (without extension) as suggestion
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
    setDocumentName(nameWithoutExt);
  }

  function handleCancel() {
    setSelectedFile(null);
    setDocumentName('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleUpload() {
    if (!selectedFile) return;

    const label = documentName.trim();
    if (!label) {
      setError('Please enter a document name');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', type);
      formData.append('entityId', entityId);
      formData.append('documentName', label);

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
          id: data.id,
          fileUrl: data.fileUrl,
          fileName: data.fileName,
          fileSize: data.fileSize,
          uploadedAt: data.uploadedAt,
        });
      }

      // Reset state
      setSelectedFile(null);
      setDocumentName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {!selectedFile ? (
        <>
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
              disabled
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Select File
          </label>
        </>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span className="truncate">{selectedFile.name}</span>
            <span className="text-xs text-slate-400 flex-shrink-0">
              ({(selectedFile.size / 1024).toFixed(0)} KB)
            </span>
          </div>

          <div>
            <label htmlFor={`doc-name-${entityId}`} className="block text-xs font-medium text-slate-700 mb-1">
              Document Name <span className="text-red-500">*</span>
            </label>
            <input
              id={`doc-name-${entityId}`}
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="e.g. Aadhaar Card, Offer Letter, PAN Card..."
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              disabled={uploading}
              autoFocus
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleUpload}
              disabled={uploading || !documentName.trim()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={uploading}
              className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
