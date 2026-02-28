import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function WebsiteContentPage() {
  const contents = await prisma.websiteContent.findMany({
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Website Content</h1>
        <Link
          href="/admin/content/website/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          Add Content
        </Link>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {contents.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No content sections yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Section Key</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Subtitle</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => (
                <tr key={content.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/content/website/${content.id}`} className="font-medium text-primary hover:underline">
                      {content.sectionKey || '-'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{content.title || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{content.subtitle || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      content.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {content.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{new Date(content.updatedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/content/website/${content.id}`} className="text-sm text-primary hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
