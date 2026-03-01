'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/ui/FileUpload';
import { FileList } from '@/components/ui/FileList';
import { createEmployeeDocument, deleteEmployeeDocument } from '../actions';
import type { EmployeeDocument } from '@prisma/client';

interface FileSectionProps {
  employeeId: string;
  documents: EmployeeDocument[];
}

export function FileSection({ employeeId, documents: initialDocuments }: FileSectionProps) {
  const [documents, setDocuments] = useState(initialDocuments);

  async function handleUploadSuccess(file: {
    fileUrl: string;
    fileName: string;
    fileSize: number;
    filePath: string;
  }) {
    try {
      const newDoc = await createEmployeeDocument({
        employeeId,
        fileName: file.fileName,
        fileUrl: file.fileUrl,
        fileSize: file.fileSize,
        filePath: file.filePath,
      });
      setDocuments([...documents, newDoc]);
    } catch (error) {
      console.error('Failed to save document:', error);
      alert('Failed to save document record');
    }
  }

  async function handleDelete(fileId: string) {
    const doc = documents.find((d) => d.id === fileId);
    if (!doc) return;

    await deleteEmployeeDocument(fileId, doc.fileUrl || '');
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
