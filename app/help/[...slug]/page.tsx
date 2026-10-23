export default async function Docs({ params }: PageProps<'/help/[...slug]'>) {
  const { slug } = await params;
  return <h1>Docs Path: {slug.join('/')}</h1>;
}
