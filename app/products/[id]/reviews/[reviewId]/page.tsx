export default async function Review({
  params,
}: PageProps<'/products/[id]/reviews/[reviewId]'>) {
  const { id, reviewId } = await params;
  return (
    <h1>
      Product {id} Review {reviewId}
    </h1>
  );
}
