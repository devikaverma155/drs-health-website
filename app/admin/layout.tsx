import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AdminSidebar } from './AdminSidebar';
import { SignOutButton } from './SignOutButton';
import { AdminSearch } from './AdminSearch';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Login page has no sidebar
  if (typeof window !== 'undefined') {
    // avoid flash; middleware already redirects unauthenticated
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {session ? (
        <>
          <AdminSidebar />
          <main className="flex-1 flex flex-col min-w-0">
            <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 gap-4">
              <span className="text-sm text-slate-500 shrink-0">DRS Health Admin</span>
              <AdminSearch />
              <SignOutButton />
            </header>
            <div className="flex-1 p-6 overflow-auto">
              {children}
            </div>
          </main>
        </>
      ) : (
        <main className="flex-1">{children}</main>
      )}
    </div>
  );
}
