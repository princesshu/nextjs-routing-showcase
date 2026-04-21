export default async function DocsOptional({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return <h1>Optional Docs Path: {slug?.join('/') || 'index'}</h1>;
}
