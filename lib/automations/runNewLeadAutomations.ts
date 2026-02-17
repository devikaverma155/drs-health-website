import { prisma } from '@/lib/prisma';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

/**
 * Run automation rules for trigger "new_lead".
 * Call after creating a lead. Message template can use {{name}}, {{phone}}, {{email}}.
 */
export async function runNewLeadAutomations(lead: {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
}) {
  const rules = await prisma.automationRule.findMany({
    where: {
      trigger: 'new_lead',
      enabled: true,
      OR: [{ source: null }, { source: lead.source }],
    },
  });

  const replaceVars = (text: string) =>
    text
      .replace(/\{\{name\}\}/g, lead.name)
      .replace(/\{\{phone\}\}/g, lead.phone)
      .replace(/\{\{email\}\}/g, lead.email);

  for (const rule of rules) {
    const message = replaceVars(rule.messageTemplate);
    await sendWhatsAppMessage(lead.phone, message).catch((e) =>
      console.error('[runNewLeadAutomations]', rule.id, e)
    );
  }
}
