import Link from 'next/link';

const WP_ADMIN_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/wp-admin`
  : 'https://9gk.22b.myftpupload.com/wp-admin';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/leads', label: 'Leads (CRM)', icon: '📋' },
  { href: '/admin/clients', label: 'Clients', icon: '🏢' },
  { href: '/admin/clinic-patients', label: 'Clinic Patients', icon: '🩺' },
  { href: '/admin/employees', label: 'Employees', icon: '👥' },
  { href: '/admin/materials', label: 'Materials (RM & PM)', icon: '📦' },
  { href: '/admin/vendor-orders', label: 'RM & PM Vendor Orders', icon: '🧪' },
  { href: '/admin/products', label: 'Product Master', icon: '🏷️' },
  { href: '/admin/product-categories', label: 'Product Categories', icon: '📂' },
  { href: '/admin/bom', label: 'Bill of Material (BOM)', icon: '📄' },
  { href: '/admin/production', label: 'Production', icon: '⚙️' },
  { href: '/admin/finished-goods', label: 'Finished Goods', icon: '✅' },
  { href: '/admin/orders', label: 'Orders & Dispatch', icon: '🚚' },
  { href: '/admin/reports', label: 'Reports', icon: '📈' },
  { href: '/admin/roles', label: 'User Roles', icon: '🔐' },
  { href: '/admin/content', label: 'Content', icon: '📝' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

const WP_LINKS = [
  {
    href: `${WP_ADMIN_URL}/edit.php?post_type=shop_order`,
    label: 'Orders',
    icon: '🛒',
    description: 'View & manage orders',
  },
  {
    href: `${WP_ADMIN_URL}/edit.php?post_type=product`,
    label: 'Products',
    icon: '📦',
    description: 'Add or edit products',
  },
  {
    href: `${WP_ADMIN_URL}`,
    label: 'WP Dashboard',
    icon: '🌐',
    description: 'Full WordPress admin',
  },
];

export function AdminSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-white flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <Link href="/admin" className="font-semibold text-slate-900">
          DRS Health
        </Link>
      </div>
      <nav className="p-2 flex-1 overflow-y-auto">
        {NAV.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <span className="text-base leading-none">{icon}</span>
            {label}
          </Link>
        ))}

        {/* WooCommerce / WordPress section */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            WooCommerce
          </p>
          {WP_LINKS.map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 group"
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
              <svg className="w-3 h-3 ml-auto text-slate-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
