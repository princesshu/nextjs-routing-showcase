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
export default function ProductPage({ params }) {
  return <h1>Product: {params.id}</h1>;
}
```

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
