import { forbidden, unauthorized } from 'next/navigation';

// Demonstrates the authInterrupts special files. The ?as= query param simulates
// a session so the behaviour is deterministic and clickable:
//   /account?as=admin → renders the page
//   /account?as=user  → forbidden()    → app/forbidden.tsx (403)
//   /account          → unauthorized() → app/unauthorized.tsx (401)
// The status codes are real because no loading.tsx sits above this route: once
// a response is streaming, the status is already 200 and Next.js can only add
// a noindex tag.
export default async function Account({ searchParams }: PageProps<'/account'>) {
  const { as } = await searchParams;

  if (!as) unauthorized();
  if (as !== 'admin') forbidden();

  return (
    <main>
      <h1>Account</h1>
      <p>Welcome back, admin.</p>
    </main>
  );
}
