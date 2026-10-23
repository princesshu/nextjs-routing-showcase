// Required catch-all: matches /help/a, /help/a/b, ... but not /help itself.
export default async function Help({ params }: PageProps<'/help/[...slug]'>) {
  const { slug } = await params;
  return (
    <main>
      <h1>Help path: {slug.join('/')}</h1>
    </main>
  );
}
