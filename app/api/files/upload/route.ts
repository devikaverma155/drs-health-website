import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'employee' | 'patient' | 'client'
    const entityId = formData.get('entityId') as string;
    const documentName = formData.get('documentName') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!type || !entityId) {
      return NextResponse.json({ error: 'Type and entityId are required' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    // Use custom document name if provided, otherwise use original filename
    const displayName = documentName?.trim()
      ? `${documentName.trim()} (${file.name})`
      : file.name;

    // Read file as buffer and store directly in PostgreSQL
    const buffer = Buffer.from(await file.arrayBuffer());

    if (type === 'employee') {
      const document = await prisma.employeeDocument.create({
        data: {
          employeeId: entityId,
          fileName: displayName,
          fileSize: file.size,
          fileData: buffer,
          mimeType: file.type || 'application/octet-stream',
        },
      });

      await prisma.employeeDocument.update({
        where: { id: document.id },
        data: { fileUrl: `/api/files/${document.id}` },
      });

      return NextResponse.json({
        success: true,
        id: document.id,
        fileUrl: `/api/files/${document.id}`,
        fileName: displayName,
        fileSize: file.size,
        uploadedAt: document.uploadedAt?.toISOString() ?? new Date().toISOString(),
      });
    }

    if (type === 'client') {
      const document = await prisma.clientDocument.create({
        data: {
          clientId: entityId,
          fileName: displayName,
          fileSize: file.size,
          fileType: file.type?.split('/')[0] || 'application',
          fileData: buffer,
          mimeType: file.type || 'application/octet-stream',
        },
      });

      await prisma.clientDocument.update({
        where: { id: document.id },
        data: { fileUrl: `/api/files/client/${document.id}` },
      });

      return NextResponse.json({
        success: true,
        id: document.id,
        fileUrl: `/api/files/client/${document.id}`,
        fileName: displayName,
        fileSize: file.size,
        uploadedAt: document.uploadedAt?.toISOString() ?? new Date().toISOString(),
      });
    }

    return NextResponse.json({ error: 'Unsupported type' }, { status: 400 });
  } catch (error) {
    console.error('Upload route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
