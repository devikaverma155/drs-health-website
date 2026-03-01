import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const document = await prisma.employeeDocument.findUnique({
      where: { id },
      select: { fileData: true, fileName: true, mimeType: true },
    });

    if (!document || !document.fileData) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Extract original filename from display name for Content-Disposition
    // Display name format: "Document Name (original.pdf)" or just "original.pdf"
    const match = document.fileName?.match(/\(([^)]+)\)$/);
    const downloadName = match ? match[1] : (document.fileName || 'download');

    const headers = new Headers();
    headers.set('Content-Type', document.mimeType || 'application/octet-stream');
    headers.set('Content-Disposition', `inline; filename="${downloadName}"`);
    headers.set('Content-Length', String(document.fileData.length));
    headers.set('Cache-Control', 'private, max-age=3600');

    return new NextResponse(new Uint8Array(document.fileData), { headers });
  } catch (error) {
    console.error('File serve error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
