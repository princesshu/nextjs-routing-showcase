// Optional catch-all: params.slug is typed as string[] | undefined.
export default async function DocsOptional({
  params,
}: PageProps<'/docs/[[...slug]]'>) {
  const { slug } = await params;
  return <h1>Optional Docs Path: {slug?.join('/') || 'index'}</h1>;
}
