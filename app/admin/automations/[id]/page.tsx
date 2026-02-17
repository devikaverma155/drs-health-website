import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AutomationRuleForm } from '../AutomationRuleForm';

export const dynamic = 'force-dynamic';

export default async function EditAutomationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rule = await prisma.automationRule.findUnique({ where: { id } });
  if (!rule) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin/automations" className="text-sm text-slate-500 hover:text-slate-900">
        ← Automations
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900">Edit automation rule</h1>
      <AutomationRuleForm rule={rule} />
    </div>
  );
}
