import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { WebsiteContentForm } from '../WebsiteContentForm';
import { deleteWebsiteContent } from '../actions';
import { DeleteButton } from '@/components/ui/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function WebsiteContentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const content = await prisma.websiteContent.findUnique({
    where: { id },
  });

  if (!content) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/content/website" className="text-sm text-slate-500 hover:text-slate-900">
          ← Website Content
        </Link>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 p-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-6">Edit Content</h1>
        <WebsiteContentForm content={content} />
        <div className="mt-6 pt-6 border-t border-slate-200">
          <DeleteButton
            action={deleteWebsiteContent.bind(null, content.id)}
            label="Delete Content"
            redirectPath="/admin/content/website"
          />
        </div>
      </div>
    </div>
  );
}
