import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProduct, products } from '@/lib/data';

// Pre-render one static page per product at build time.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

// Per-route dynamic metadata — resolved from the same async params.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return { title: product ? product.name : 'Product not found' };
}

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);

  // Calling notFound() renders the nearest not-found.tsx (404).
  if (!product) notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">${product.price}</p>
      <Link
        href={`/products/${id}/reviews/1`}
        className="text-blue-600 underline"
      >
        Read review #1
      </Link>
    </main>
  );
}
