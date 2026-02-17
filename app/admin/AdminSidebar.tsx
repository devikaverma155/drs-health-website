import Link from 'next/link';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/automations', label: 'Automations' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/content', label: 'Content' },
  { href: '/admin/settings', label: 'Settings' },
];

export function AdminSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-white flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <Link href="/admin" className="font-semibold text-slate-900">
          DRS Health
        </Link>
      </div>
      <nav className="p-2 flex-1">
        {NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
