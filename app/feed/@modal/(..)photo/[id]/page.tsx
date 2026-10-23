// An intercepting route renders the URL it intercepts, so it is typed with
// that route ('/photo/[id]'), not with its folder path.
export default async function PhotoModal({ params }: PageProps<'/photo/[id]'>) {
  const { id } = await params;
  return (
    <div style={{ background: '#eee', padding: 20 }}>
      <h1>Photo Modal {id}</h1>
    </div>
  );
}
