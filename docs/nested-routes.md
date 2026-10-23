# Nested dynamic segments

Dynamic folders can be nested. The page receives the params of every dynamic segment from the root down.

**In this repo:** `app/products/[id]/reviews/[reviewId]/page.tsx` → `/products/1/reviews/1`.

## How it works

```
app/
└─ products/
   └─ [id]/
      ├─ page.tsx              → /products/1
      └─ reviews/
         └─ [reviewId]/
            ├─ loading.tsx     → shown while the page loads
            └─ page.tsx        → /products/1/reviews/1
```

## Example

```tsx
// app/products/[id]/reviews/[reviewId]/page.tsx
import { getReview } from '@/lib/data';

export default async function Review({
  params,
}: PageProps<'/products/[id]/reviews/[reviewId]'>) {
  const { id, reviewId } = await params; // both strings
  const review = await getReview(id, reviewId);

  return <h1>{review.text}</h1>;
}
```

## Loading state

`getReview()` waits 800 ms to simulate a slow fetch. The `loading.tsx` next to the page wraps it in a Suspense boundary, so navigating from `/products/1` shows "Loading review…" at once and then streams in the review.

This is the only `loading.tsx` in the repo on purpose. A `loading.tsx` makes the response stream, and a streamed response keeps its 200 status even if `notFound()`, `forbidden()` or `unauthorized()` runs later. Placed at the root, it would cost `/account` its real 401 and 403 status codes. See [Streaming fixes the status code](../README.md#streaming-fixes-the-status-code).

Reference: [Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes), [loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
