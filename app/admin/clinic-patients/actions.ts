'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
