# Dynamic Routes

Handle dynamic URL segments using square brackets.

## How it works

Wrap the folder name in square brackets: `[param]`

```
app/
├─ products/
│  └─ [id]/
│     └─ page.tsx    → /products/123, /products/abc
├─ blog/
│  └─ [slug]/
│     └─ page.tsx    → /blog/my-post
```

## Example

```tsx
// app/products/[id]/page.tsx
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <h1>Product: {id}</h1>;
}
```

> **Note**: Since Next.js 15, `params` is a Promise and must be awaited.

## TypeScript: `PageProps`

Instead of writing the `params` type by hand, use the global `PageProps` helper (Next.js 15.5+). It is generated from the folder structure by `next dev`, `next build` or `next typegen`:

```tsx
// app/products/[id]/page.tsx
export default async function ProductPage({
  params,
}: PageProps<'/products/[id]'>) {
  const { id } = await params; // id: string
  return <h1>Product: {id}</h1>;
}
```

With `typedRoutes: true` in `next.config.ts`, `<Link href>` is checked against the same route tree: `href="/products/1"` compiles, `href="/prodcts/1"` is a type error.

## Diagram

```
URL: /products/123
         │
         ▼
   [id] = "123"
         │
         ▼
   app/products/[id]/page.tsx
         │
         ▼
   params.id → "123"
```

## When to use

- Product pages
- Blog posts
- User profiles
- Any content with unique identifiers
