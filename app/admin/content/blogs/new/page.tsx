import Link from 'next/link';
import { BlogPostForm } from '../BlogPostForm';

export default function NewContentBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/content/blogs" className="text-sm text-slate-500 hover:text-slate-700">
          ← Back to Blog Posts
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900">Add Blog Post</h1>
      <BlogPostForm />
    </div>
  );
}
