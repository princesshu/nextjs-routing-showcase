export default function PhotoPage({ params }: { params: { id: string } }) {
  return <h1>Photo {params.id}</h1>;
}
