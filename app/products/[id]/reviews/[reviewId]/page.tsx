export default async function Review({
  params,
}: {
  params: Promise<{ id: string; reviewId: string }>;
}) {
  const { id, reviewId } = await params;
  return (
    <h1>
      Product {id} Review {reviewId}
    </h1>
  );
}
