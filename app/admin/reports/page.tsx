import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ReportsPage() {
  const reportLinks = [
    { href: '/admin/reports/raw-material', label: 'Raw material inventory report' },
    { href: '/admin/reports/packaging', label: 'Packaging inventory report' },
    { href: '/admin/reports/finished-goods', label: 'Finished goods stock report' },
    { href: '/admin/reports/production', label: 'Production batch history' },
    { href: '/admin/reports/leads', label: 'Lead conversion reports' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Reports</h1>
      <p className="text-slate-600">
        View inventory, production, and lead analytics. Click a report below to see data.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reportLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="block rounded-xl border border-slate-200 bg-white p-5 text-slate-800 hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <span className="font-medium">{label}</span>
            <span className="mt-1 block text-sm text-slate-500">View report →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
