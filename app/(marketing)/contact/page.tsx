import { submitContact } from './actions';

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Contact</h1>
      {sent ? (
        <p className="text-green-600">Thanks — we&apos;ll be in touch.</p>
      ) : (
        <form action={submitContact} className="flex max-w-sm flex-col gap-2">
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="rounded border px-3 py-2"
          />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Send
          </button>
        </form>
      )}
    </main>
  );
}
