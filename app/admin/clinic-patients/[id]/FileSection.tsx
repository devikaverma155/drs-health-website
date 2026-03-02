'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/ui/FileUpload';
import { FileList } from '@/components/ui/FileList';
import { createPatientDocument, deletePatientDocument } from '../actions';
import type { PatientDocument } from '@prisma/client';

interface FileSectionProps {
  patientId: string;
  documents: PatientDocument[];
}

export function FileSection({ patientId, documents: initialDocuments }: FileSectionProps) {
  const [documents, setDocuments] = useState(initialDocuments);

  async function handleUploadSuccess(file: {
    id: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    uploadedAt: string;
  }) {
    try {
      const newDoc = await createPatientDocument({
        patientId,
        fileName: file.fileName,
        fileUrl: file.fileUrl,
        fileSize: file.fileSize,
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

    await deletePatientDocument(fileId, doc.fileUrl || '');
    setDocuments(documents.filter((d) => d.id !== fileId));
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-medium text-slate-900 mb-3">Documents</h2>
        <FileUpload
          entityId={patientId}
          type="patient"
          onUploadSuccess={handleUploadSuccess}
        />
      </div>
      <div className="pt-4 border-t border-slate-200">
        <FileList
          files={documents}
          onDelete={handleDelete}
          entityType="patient"
        />
      </div>
    </div>
  );
}
