'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/ui/FileUpload';
import { FileList } from '@/components/ui/FileList';
import { deleteClientDocument } from '../actions';
import type { ClientDocument } from '@prisma/client';

interface ClientFileSectionProps {
  clientId: string;
  documents: ClientDocument[];
}

export function ClientFileSection({ clientId, documents: initialDocuments }: ClientFileSectionProps) {
  const [documents, setDocuments] = useState(initialDocuments);

  function handleUploadSuccess(file: {
    id: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    uploadedAt: string;
  }) {
    setDocuments([
      {
        id: file.id,
        clientId,
        fileName: file.fileName,
        fileUrl: file.fileUrl,
        fileSize: file.fileSize,
        fileType: null,
        fileData: null,
        mimeType: null,
        notes: null,
        uploadedAt: new Date(file.uploadedAt),
      },
      ...documents,
    ]);
  }

  async function handleDelete(fileId: string) {
    await deleteClientDocument(fileId, clientId);
    setDocuments(documents.filter((d) => d.id !== fileId));
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-medium text-slate-900 mb-3">Documents</h2>
        <FileUpload
          entityId={clientId}
          type="client"
          onUploadSuccess={handleUploadSuccess}
        />
      </div>
      <div className="pt-4 border-t border-slate-200">
        <FileList
          files={documents}
          onDelete={handleDelete}
          entityType="client"
        />
      </div>
    </div>
  );
}
