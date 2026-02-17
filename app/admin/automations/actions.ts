'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type SaveInput = {
  id?: string;
  trigger: string;
  source: string | null;
  messageTemplate: string;
  enabled: boolean;
};

export async function saveAutomationRule(input: SaveInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!input.messageTemplate.trim()) throw new Error('Message template is required.');

  if (input.id) {
    await prisma.automationRule.update({
      where: { id: input.id },
      data: {
        trigger: input.trigger,
        source: input.source,
        messageTemplate: input.messageTemplate,
        enabled: input.enabled,
      },
    });
  } else {
    await prisma.automationRule.create({
      data: {
        trigger: input.trigger,
        source: input.source,
        messageTemplate: input.messageTemplate,
        enabled: input.enabled,
      },
    });
  }
  revalidatePath('/admin/automations');
}

export async function deleteAutomationRule(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.automationRule.delete({ where: { id } });
  revalidatePath('/admin/automations');
}
