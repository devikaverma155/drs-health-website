import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteComboButton } from './DeleteComboButton';

const DEFAULT_COMBOS = [
  {
    id: 'default-1', title: 'Wellness Combo',
    description: 'Complete health package for daily wellness',
    image: 'https://9gk.22b.myftpupload.com/wp-content/uploads/2024/11/Syadwad-Combo.webp',
    price: '₹1,499', originalPrice: '₹1,999', discount: '25%',
  },
  {
    id: 'default-2', title: 'Immunity Booster',
    description: 'Strengthen your immunity with our premium combo',
    image: 'https://9gk.22b.myftpupload.com/wp-content/uploads/2024/11/SW-Products.png',
    price: '₹1,799', originalPrice: '₹2,399', discount: '25%',
  },
  {
    id: 'default-3', title: 'Skincare Essential',
    description: 'Complete skincare routine in one combo',
    image: 'https://9gk.22b.myftpupload.com/wp-content/uploads/2024/12/Herbalis-Shampoo-scaled.webp',
    price: '₹2,099', originalPrice: '₹2,899', discount: '28%',
  },
];

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

      {/* Database Combos */}
      {combos.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Your Custom Combos</h2>
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
        </div>
      )}

      {/* Default Hardcoded Combos */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
            {combos.length > 0 ? 'Default Combos (Fallback)' : 'Default Combos (Currently Active)'}
          </h2>
          <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
            Hardcoded
          </span>
        </div>
        {combos.length === 0 && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-sm text-amber-700">
              ⚡ These default combos are currently showing on the website. Add your own combos above to replace them.
            </p>
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEFAULT_COMBOS.map((combo, idx) => (
            <div
              key={combo.id}
              className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden opacity-75"
            >
              <div className="relative h-32 bg-slate-100">
                {combo.image ? (
                  <Image
                    src={combo.image}
                    alt={combo.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs bg-gradient-to-br from-primary/5 to-primary/10">
                    🎁
                  </div>
                )}
                {combo.discount && (
                  <span className="absolute top-2 right-2 bg-slate-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {combo.discount} OFF
                  </span>
                )}
                <span className="absolute top-2 left-2 inline-flex px-2 py-0.5 rounded text-xs font-medium bg-slate-200 text-slate-500">
                  Default
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-slate-700 text-sm">{combo.title}</h3>
                {combo.description && (
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{combo.description}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  {combo.price && <span className="text-sm font-bold text-slate-600">{combo.price}</span>}
                  {combo.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">{combo.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
        <p className="text-sm text-blue-700">
          <strong>💡 Tip:</strong> The default combos above are hardcoded in the codebase.
          {combos.length === 0 
            ? ' They are currently being shown on the website. Add your own combos to replace them.'
            : ' Your custom combos are being shown instead. The defaults are only used as fallback if all custom combos are removed.'}
        </p>
      </div>
    </div>
  );
}
