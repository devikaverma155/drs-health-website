'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createRole(data: { roleName: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!data.roleName?.trim()) throw new Error('Role name is required.');

  await prisma.role.create({
    data: { roleName: data.roleName.trim() },
  });
  revalidatePath('/admin/roles');
}

export async function updateRole(id: string, data: { roleName: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!data.roleName?.trim()) throw new Error('Role name is required.');

  await prisma.role.update({
    where: { id },
    data: { roleName: data.roleName.trim() },
  });
  revalidatePath('/admin/roles');
  revalidatePath(`/admin/roles/${id}`);
}

export async function deleteRole(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.role.delete({ where: { id } });
  revalidatePath('/admin/roles');
}
