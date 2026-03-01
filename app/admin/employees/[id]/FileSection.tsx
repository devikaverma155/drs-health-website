'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/ui/FileUpload';
import { FileList } from '@/components/ui/FileList';
import { deleteEmployeeDocument } from '../actions';

interface DocumentMeta {
  id: string;
  employeeId: string | null;
  fileName: string | null;
  fileUrl: string | null;
  fileSize: number | null;
  uploadedAt: Date | null;
}

interface FileSectionProps {
  employeeId: string;
  documents: DocumentMeta[];
}

export function FileSection({ employeeId, documents: initialDocuments }: FileSectionProps) {
  const [documents, setDocuments] = useState(initialDocuments);

  function handleUploadSuccess(file: {
    id: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    uploadedAt: string;
  }) {
    // Upload API already saved to DB — just update local state
    setDocuments([
      {
        id: file.id,
        employeeId,
        fileName: file.fileName,
        fileUrl: file.fileUrl,
        fileSize: file.fileSize,
        uploadedAt: new Date(file.uploadedAt),
      },
      ...documents,
    ]);
  }

  async function handleDelete(fileId: string) {
    await deleteEmployeeDocument(fileId);
    setDocuments(documents.filter((d) => d.id !== fileId));
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-medium text-slate-900 mb-3">Documents</h2>
        <FileUpload
          entityId={employeeId}
          type="employee"
          onUploadSuccess={handleUploadSuccess}
        />
      </div>
      <div className="pt-4 border-t border-slate-200">
        <FileList
          files={documents}
          onDelete={handleDelete}
          entityType="employee"
        />
      </div>
    </div>
  );
}
