import { getReview } from '@/lib/data';

export default async function Review({
  params,
}: PageProps<'/products/[id]/reviews/[reviewId]'>) {
  const { id, reviewId } = await params;
  const review = await getReview(id, reviewId);

  return (
    <main>
      <h1>
        Product {review.productId} · Review {review.reviewId}
      </h1>
      <p>{review.text}</p>
    </main>
  );
}
