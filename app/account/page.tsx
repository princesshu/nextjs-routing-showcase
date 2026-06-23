import { forbidden, unauthorized } from 'next/navigation';

// Demonstrates the authInterrupts special files. The ?as= query param simulates
// a session so the behaviour is deterministic and clickable:
//   /account?as=admin → renders the page
//   /account?as=user  → forbidden()    → app/forbidden.tsx (403)
//   /account          → unauthorized() → app/unauthorized.tsx (401)
export default async function Account({
  searchParams,
}: {
  searchParams: Promise<{ as?: string }>;
}) {
  const { as } = await searchParams;

  if (!as) unauthorized();
  if (as !== 'admin') forbidden();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Account</h1>
      <p>Welcome back, admin.</p>
    </main>
  );
}
