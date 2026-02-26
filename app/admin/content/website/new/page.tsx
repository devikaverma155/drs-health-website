import Link from 'next/link';
import { WebsiteContentForm } from '../WebsiteContentForm';

export default function NewWebsiteContentPage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/content/website" className="text-sm text-slate-500 hover:text-slate-900">
        ← Website Content
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900">Add Content</h1>
      <WebsiteContentForm />
    </div>
  );
}
