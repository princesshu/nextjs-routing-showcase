import { notFound } from 'next/navigation';
import { getProduct, getSpecs } from '@/lib/data';

// No loading.tsx here on purpose. This dynamic route renders on each request,
// so a client navigation waits for the server before the URL changes: that
// wait is what useLinkStatus reports as `pending` on the clicked link.
export default async function Specs({
  params,
}: PageProps<'/products/[id]/specs'>) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) notFound();

  const specs = await getSpecs(id);

  return (
    <main>
      <h1>{product.name} · Specs</h1>
      <dl>
        <dt>Warranty</dt>
        <dd>{specs.warranty}</dd>
        <dt>Ships in</dt>
        <dd>{specs.shipsIn}</dd>
      </dl>
    </main>
  );
}
