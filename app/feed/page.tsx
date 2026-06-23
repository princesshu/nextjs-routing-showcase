import Link from 'next/link';

// Clicking these links is a client-side navigation, so the (..)photo
// intercepting route renders the photo inside the @modal slot (overlay).
// Refreshing /photo/1 directly bypasses the interception and shows the full page.
export default function Feed() {
  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Feed</h1>
      <ul className="space-y-1">
        {[1, 2, 3].map((id) => (
          <li key={id}>
            <Link href={`/photo/${id}`} className="text-blue-600 underline">
              Open photo {id} (modal)
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
