import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteComboButton } from './DeleteComboButton';

export const dynamic = 'force-dynamic';

export default async function CombosPage() {
  const combos = await prisma.comboOffer.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Combo Offers</h1>
          <p className="text-sm text-slate-500 mt-1">Manage the &quot;Best Selling Combos&quot; section on the homepage</p>
        </div>
        <Link
          href="/admin/content/combos/new"
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark"
        >
          + Add Combo
        </Link>
      </div>

      {combos.length === 0 ? (
        <div className="rounded-xl bg-white border border-slate-200 p-12 text-center">
          <div className="text-4xl mb-3">🎁</div>
          <p className="text-slate-500 text-sm">No combo offers yet. Default combos from code will be used.</p>
          <Link
            href="/admin/content/combos/new"
            className="inline-block mt-4 text-sm text-primary hover:underline"
          >
            Create your first combo →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {combos.map((combo, idx) => (
            <div
              key={combo.id}
              className="rounded-xl bg-white border border-slate-200 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-44 bg-slate-100">
                {combo.imageUrl ? (
                  <Image
                    src={combo.imageUrl}
                    alt={combo.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                    No image
                  </div>
                )}
                {combo.discount && (
                  <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {combo.discount} OFF
                  </span>
                )}
                <span className={`absolute top-3 left-3 inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                  combo.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {combo.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="absolute bottom-3 left-3 text-xs font-mono text-white/80 bg-black/40 px-2 py-0.5 rounded">
                  #{idx + 1}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{combo.title}</h3>
                {combo.description && (
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{combo.description}</p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  {combo.price && <span className="text-lg font-bold text-primary">{combo.price}</span>}
                  {combo.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">{combo.originalPrice}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/admin/content/combos/${combo.id}`}
                    className="flex-1 text-center rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </Link>
                  <DeleteComboButton id={combo.id} title={combo.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
        <p className="text-sm text-blue-700">
          <strong>💡 Tip:</strong> If no combos are added here, the website will use the default combos from the code.
          Once you add at least one combo here, only the combos you create will be shown on the homepage.
        </p>
      </div>
    </div>
  );
}
