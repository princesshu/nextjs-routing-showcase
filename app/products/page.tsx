import Link from 'next/link';
import { products } from '@/lib/data';

export default function Products() {
  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
        <li>
          <Link href="/products/999">/products/999 → triggers notFound()</Link>
        </li>
      </ul>
    </main>
  );
}
