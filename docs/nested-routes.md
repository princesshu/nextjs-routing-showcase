# Nested Dynamic Routes

Multi-level dynamic routes nested within each other.

## How it works

You can nest dynamic folders inside each other:

```
app/
└─ products/
   └─ [id]/
      ├─ page.tsx              → /products/123
      └─ reviews/
         └─ [reviewId]/
            └─ page.tsx        → /products/123/reviews/456
```

## Example

```tsx
// app/products/[id]/reviews/[reviewId]/page.tsx
export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string; reviewId: string }>;
}) {
  const { id, reviewId } = await params;
  return (
    <div>
      <h1>Product: {id}</h1>
      <h2>Review: {reviewId}</h2>
    </div>
  );
}
```

> **Note**: Since Next.js 15, `params` is a Promise and must be awaited.

## Diagram

```
URL: /products/123/reviews/456
         │
         ▼
   [id] = "123"
   [reviewId] = "456"
         │
         ▼
   params = { id: "123", reviewId: "456" }
```

## When to use

- Product reviews
- Comment threads
- Category > Subcategory > Product structures
- Hierarchical content
