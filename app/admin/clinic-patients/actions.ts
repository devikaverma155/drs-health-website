'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/supabase';

export async function createClinicPatient(data: {
  name: string;
  phone?: string;
  email?: string;
  age?: string;
  gender?: string;
  condition?: string;
  assignedDoctor?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  if (!data.name?.trim()) throw new Error('Name is required.');

  const patient = await prisma.clinicPatient.create({
    data: {
      name: data.name.trim(),
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      age: data.age ? parseInt(data.age) : null,
      gender: data.gender?.trim() || null,
      condition: data.condition?.trim() || null,
      assignedDoctor: data.assignedDoctor?.trim() || null,
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath('/admin/clinic-patients');
  return patient.id;
}

export async function updateClinicPatient(id: string, data: {
  name?: string;
  phone?: string;
  email?: string;
  age?: string;
  gender?: string;
  condition?: string;
  assignedDoctor?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.clinicPatient.update({
    where: { id },
    data: {
      name: data.name?.trim(),
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      age: data.age ? parseInt(data.age) : null,
      gender: data.gender?.trim() || null,
      condition: data.condition?.trim() || null,
      assignedDoctor: data.assignedDoctor?.trim() || null,
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath('/admin/clinic-patients');
  revalidatePath(`/admin/clinic-patients/${id}`);
}

export async function deleteClinicPatient(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.clinicPatient.delete({ where: { id } });
  revalidatePath('/admin/clinic-patients');
}

export async function createPatientDocument(data: {
  patientId: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  filePath?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  const document = await prisma.patientDocument.create({
    data: {
      patientId: data.patientId,
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      fileSize: data.fileSize || null,
    },
  });

  revalidatePath(`/admin/clinic-patients/${data.patientId}`);
  return document;
}

export async function deletePatientDocument(id: string, fileUrl: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  // Delete from database
  const document = await prisma.patientDocument.findUnique({ where: { id } });
  if (!document) throw new Error('Document not found');

  await prisma.patientDocument.delete({ where: { id } });

  // Delete from Supabase Storage
  try {
    const bucket = 'documents';
    // Extract path from URL if it's a full URL
    const path = fileUrl.includes('/storage/v1/object/public/')
      ? fileUrl.split('/storage/v1/object/public/documents/')[1]
      : fileUrl.replace(`/${bucket}/`, '');
    
    await deleteFile(bucket, path);
  } catch (error) {
    console.error('Error deleting file from storage:', error);
    // Don't throw - file might already be deleted
  }

  revalidatePath(`/admin/clinic-patients/${document.patientId}`);
}
