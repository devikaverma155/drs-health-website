import { prisma } from '@/lib/prisma';
import { AutomationRulesTable } from './AutomationRulesTable';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AutomationsPage() {
  const rules = await prisma.automationRule.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Automation Rules</h1>
        <Link
          href="/admin/automations/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add rule
        </Link>
      </div>
      <p className="text-sm text-slate-500">
        When a lead is created, enabled rules matching the lead source can send WhatsApp messages (provider integration coming soon).
      </p>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        <AutomationRulesTable rules={rules} />
      </div>
    </div>
  );
}
