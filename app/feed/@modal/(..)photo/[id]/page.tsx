export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div style={{ background: '#eee', padding: 20 }}>
      <h1>Photo Modal {id}</h1>
    </div>
  );
}
