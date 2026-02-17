import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/woocommerce';
import { AddToCartForm } from './AddToCartForm';
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

  return (
    <div className="section-padding">
      <ProductSchema product={product} />
      <div className="container-tight">
        <Link href="/shop" className="text-sm text-body-muted hover:text-foreground mb-6 inline-block">
          ← Shop
        </Link>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            {product.featuredImage?.url ? (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText ?? product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-body-muted">
                No image
              </div>
            )}
          </div>
          <div>
            {product.category && (
              <p className="text-sm text-body-muted uppercase tracking-wider">{product.category}</p>
            )}
            <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-foreground">
              {product.title}
            </h1>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-semibold">₹{price}</span>
              {comparePrice && parseFloat(comparePrice) > parseFloat(price) && (
                <span className="text-body-muted line-through">₹{comparePrice}</span>
              )}
            </div>
            <p className="mt-6 text-body-muted leading-relaxed">
              {product.description}
            </p>
            <AddToCartForm product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
