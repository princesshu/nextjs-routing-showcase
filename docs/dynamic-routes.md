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
