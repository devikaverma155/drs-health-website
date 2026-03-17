import { redirect } from 'next/navigation';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const LOGO_URL = 'https://9gk.22b.myftpupload.com/wp-content/uploads/2025/01/DRS-Logo.png';

export default async function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect('/admin/login?callbackUrl=/print');
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="px-8 pt-6 print:pt-4 border-b border-slate-200 pb-4 mb-6">
        <Image
          src={LOGO_URL}
          alt="DRS Health Solutions"
          width={180}
          height={56}
          className="h-12 w-auto object-contain"
          unoptimized
        />
      </header>
      {children}
    </div>
  );
}
