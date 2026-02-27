import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/woocommerce';
import { AddToCartForm } from './AddToCartForm';
import { ProductTabs } from './ProductTabs';
import { WishlistButtonWrapper } from './WishlistButtonWrapper';
import { ProductSchema } from '@/components/StructuredData';

export const revalidate = 60;

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductBySlug(handle);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} | DRS Health`,
      description: product.description.slice(0, 160),
      images: product.featuredImage?.url ? [product.featuredImage.url] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductBySlug(handle);
  if (!product) notFound();

  const variant = product.variants[0];
  const price = variant?.price ?? product.priceRange.minVariantPrice.amount;
  const comparePrice = variant?.compareAtPrice ?? product.compareAtPriceRange?.minVariantPrice.amount;
  const hasDiscount = comparePrice && parseFloat(comparePrice) > parseFloat(price);
  const discountPercent = hasDiscount
    ? Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100)
    : 0;

  return (
    <div className="bg-white min-h-screen">
      <ProductSchema product={product} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-4 text-sm text-body-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          {product.category && product.categorySlug ? (
            <>
              <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-foreground transition-colors">
                {product.category}
              </Link>
              <span>/</span>
            </>
          ) : (
            <>
              <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{product.title}</span>
        </nav>

        {/* Product hero section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 pb-12">
          {/* Image section */}
          <div className="relative">
            <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden shadow-sm">
              {product.featuredImage?.url ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText ?? product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-body-muted text-lg">
                  No image available
                </div>
              )}

              {/* Discount badge */}
              {discountPercent > 0 && (
                <div className="absolute top-4 right-4 w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  -{discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.slice(0, 5).map((img, i) => (
                  <div key={i} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer bg-gray-50">
                    <Image
                      src={img.url}
                      alt={img.altText ?? `${product.title} - ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="flex flex-col">
            {/* Category badge */}
            {product.category && (
              <Link
                href={`/shop?category=${product.categorySlug || ''}`}
                className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full w-fit mb-3 hover:bg-primary/10 transition-colors"
              >
                {product.category}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              {hasDiscount && (
                <span className="text-lg text-body-muted line-through">₹{parseFloat(comparePrice).toFixed(2)}</span>
              )}
              <span className={`text-2xl sm:text-3xl font-bold ${hasDiscount ? 'text-green-600' : 'text-foreground'}`}>
                ₹{parseFloat(price).toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-border mt-5 pt-5" />

            {/* Short description */}
            {product.shortDescriptionHtml ? (
              <div
                className="text-body-muted leading-relaxed prose prose-sm max-w-none
                  prose-p:my-1.5 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5
                  prose-strong:text-foreground prose-em:text-body-muted"
                dangerouslySetInnerHTML={{ __html: product.shortDescriptionHtml }}
              />
            ) : product.shortDescription ? (
              <p className="text-body-muted leading-relaxed">{product.shortDescription}</p>
            ) : product.description ? (
              <p className="text-body-muted leading-relaxed line-clamp-4">{product.description}</p>
            ) : null}

            {/* Stock status */}
            <div className="mt-4 flex items-center gap-2">
              {variant?.available !== false ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-green-700 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Add to cart form */}
            <AddToCartForm product={product} />

            {/* Wishlist */}
            <div className="mt-5">
              <WishlistButtonWrapper product={product} />
            </div>

            {/* Category & meta */}
            <div className="mt-8 pt-6 border-t border-border space-y-2 text-sm text-body-muted">
              {product.category && (
                <p>
                  <span className="font-semibold text-foreground">Category:</span>{' '}
                  <Link href={`/shop?category=${product.categorySlug || ''}`} className="hover:text-primary transition-colors">
                    {product.category}
                  </Link>
                </p>
              )}
            </div>

            {/* Trust indicators */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-green-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs font-medium text-foreground">100% Ayurvedic</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-blue-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-medium text-foreground">Quality Tested</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-amber-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium text-foreground">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description | Shipping */}
        <ProductTabs
          descriptionHtml={product.descriptionHtml}
          description={product.description}
        />
      </div>
    </div>
  );
}
