import Link from 'next/link';
import { products } from '@/lib/data';

export default function Products() {
  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <ul className="space-y-1">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className="text-blue-600 underline"
            >
              {product.name}
            </Link>
          </li>
        ))}
        <li className="text-gray-400">
          <Link href="/products/999">/products/999 → triggers notFound()</Link>
        </li>
      </ul>
    </main>
  );
}
