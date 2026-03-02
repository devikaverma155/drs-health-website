import { sendWhatsAppMessage } from '@/lib/whatsapp';

/**
 * Run automation rules for trigger "new_lead".
 * Call after creating a lead. Message template can use {{name}}, {{phone}}, {{email}}.
 *
 * NOTE: AutomationRule model is not yet in the Prisma schema.
 * This is a placeholder that will be enabled once the model is added.
 */
export async function runNewLeadAutomations(lead: {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
}) {
  try {
    // Dynamic import to avoid build-time errors when AutomationRule model doesn't exist yet
    const { prisma } = await import('@/lib/prisma');
    const db = prisma as unknown as {
      automationRule: {
        findMany: (args: {
          where: { trigger: string; enabled: boolean; OR: Array<{ source: string | null }> };
        }) => Promise<Array<{ id: string; messageTemplate: string }>>;
      };
    };

    const rules = await db.automationRule.findMany({
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
  } catch (e) {
    // AutomationRule table may not exist yet – silently skip
    console.warn('[runNewLeadAutomations] skipped – automation table not available', e);
  }
}
