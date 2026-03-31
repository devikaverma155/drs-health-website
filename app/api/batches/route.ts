import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { materialId, batchNumber, quantity, manufacturingDate, expiryDate } = await request.json();

        if (!materialId || !batchNumber || quantity === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const batch = await prisma.rawMaterialBatch.create({
            data: {
                materialId,
                batchNumber,
                quantity: parseFloat(quantity),
                manufacturingDate: manufacturingDate ? new Date(manufacturingDate) : null,
                expiryDate: expiryDate ? new Date(expiryDate) : null,
            },
        });

        return NextResponse.json(batch);
    } catch (error) {
        console.error('[Batches API] POST error:', error);
        return NextResponse.json({ error: 'Failed to create batch' }, { status: 500 });
    }
}
