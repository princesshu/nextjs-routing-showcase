export default async function Photo({ params }: PageProps<'/photo/[id]'>) {
  const { id } = await params;
  return <h1>Photo {id}</h1>;
}
