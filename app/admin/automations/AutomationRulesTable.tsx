import Link from 'next/link';
import type { AutomationRule } from '@prisma/client';

export function AutomationRulesTable({ rules }: { rules: AutomationRule[] }) {
  if (rules.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 text-sm">
        No automation rules yet. <Link href="/admin/automations/new" className="text-primary hover:underline">Add one</Link>.
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
          <th className="px-4 py-3 font-medium">Trigger</th>
          <th className="px-4 py-3 font-medium">Source filter</th>
          <th className="px-4 py-3 font-medium">Message template</th>
          <th className="px-4 py-3 font-medium">Enabled</th>
          <th className="px-4 py-3 font-medium"></th>
        </tr>
      </thead>
      <tbody>
        {rules.map((rule) => (
          <tr key={rule.id} className="border-b border-slate-100 hover:bg-slate-50/50">
            <td className="px-4 py-3 text-slate-700">{rule.trigger}</td>
            <td className="px-4 py-3 text-slate-600">{rule.source ?? '—'}</td>
            <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{rule.messageTemplate}</td>
            <td className="px-4 py-3">
              {rule.enabled ? (
                <span className="text-green-600">Yes</span>
              ) : (
                <span className="text-slate-400">No</span>
              )}
            </td>
            <td className="px-4 py-3">
              <Link href={`/admin/automations/${rule.id}`} className="text-primary hover:underline">
                Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
