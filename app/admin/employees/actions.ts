'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createEmployee(data: {
  name: string;
  email?: string;
  phone?: string;
  designation?: string;
  department?: string;
  joiningDate?: string;
  salary?: string;
  status?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  if (!data.name?.trim()) throw new Error('Name is required.');

  const employee = await prisma.employee.create({
    data: {
      name: data.name.trim(),
      email: data.email?.trim() || null,
      phone: data.phone?.trim() || null,
      designation: data.designation?.trim() || null,
      department: data.department?.trim() || null,
      joiningDate: data.joiningDate ? new Date(data.joiningDate) : null,
      salary: data.salary ? parseFloat(data.salary) : null,
      status: data.status || 'active',
    },
  });

  revalidatePath('/admin/employees');
  return employee.id;
}

export async function updateEmployee(id: string, data: {
  name?: string;
  email?: string;
  phone?: string;
  designation?: string;
  department?: string;
  joiningDate?: string;
  salary?: string;
  status?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.employee.update({
    where: { id },
    data: {
      name: data.name?.trim(),
      email: data.email?.trim() || null,
      phone: data.phone?.trim() || null,
      designation: data.designation?.trim() || null,
      department: data.department?.trim() || null,
      joiningDate: data.joiningDate ? new Date(data.joiningDate) : null,
      salary: data.salary ? parseFloat(data.salary) : null,
      status: data.status,
    },
  });

  revalidatePath('/admin/employees');
  revalidatePath(`/admin/employees/${id}`);
}

export async function deleteEmployee(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.employee.delete({ where: { id } });
  revalidatePath('/admin/employees');
}
