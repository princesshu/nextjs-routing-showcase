import type { Route } from 'next';
import Link from 'next/link';

// With typedRoutes, every href below is checked against the real route tree.
// Static literals check directly as Route; dynamic ones ('/products/1') only
// check when the literal type is inferred — route() does that, then widens.
const route = <T extends string>(href: Route<T>): Route => href as Route;

type Item = { href: Route; label: string; note?: string };
type Group = { title: string; items: Item[] };

const groups: Group[] = [
  {
    title: 'Static & dynamic',
    items: [
      { href: '/about', label: '/about', note: 'static' },
      { href: '/products', label: '/products', note: 'static list' },
      {
        href: route('/products/1'),
        label: '/products/[id]',
        note: 'dynamic + SSG',
      },
      {
        href: route('/products/1/reviews/1'),
        label: '/products/[id]/reviews/[reviewId]',
        note: 'nested dynamic',
      },
      {
        href: route('/blog/hello-world'),
        label: '/blog/[slug]',
        note: 'dynamic',
      },
    ],
  },
  {
    title: 'Catch-all',
    items: [
      {
        href: route('/help/a/b/c'),
        label: '/help/[...slug]',
        note: 'required',
      },
      // The generated route types (checked on Next.js 16.2 and 16.4) only cover
      // /docs/<slug> for an optional catch-all, not the bare /docs URL.
      { href: '/docs' as Route, label: '/docs/[[...slug]]', note: 'optional' },
    ],
  },
  {
    title: 'Route groups',
    items: [
      { href: '/home', label: '(marketing)/home' },
      { href: '/contact', label: '(marketing)/contact', note: 'server action' },
      { href: '/login', label: '(auth)/login' },
      { href: '/register', label: '(auth)/register' },
    ],
  },
  {
    title: 'Layouts & parallel routes',
    items: [
      { href: '/dashboard', label: '/dashboard', note: '@sidebar slot' },
      { href: '/dashboard/settings', label: '/dashboard/settings' },
    ],
  },
  {
    title: 'Intercepting routes',
    items: [
      { href: '/feed', label: '/feed', note: 'open photo in a modal' },
      { href: route('/photo/1'), label: '/photo/[id]', note: 'full page' },
    ],
  },
  {
    title: 'Auth interrupts',
    items: [
      { href: '/account?as=admin', label: '/account?as=admin', note: 'ok' },
      { href: '/account?as=user', label: '/account?as=user', note: '403' },
      { href: '/account', label: '/account', note: '401' },
    ],
  },
  {
    title: 'API & metadata files',
    items: [
      { href: '/api/hello', label: '/api/hello' },
      { href: route('/api/posts/1'), label: '/api/posts/[id]' },
      // Metadata routes aren't part of the typed route list, so cast them.
      { href: '/sitemap.xml' as Route, label: '/sitemap.xml' },
      { href: '/robots.txt' as Route, label: '/robots.txt' },
    ],
  },
];

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="mb-2 text-4xl font-bold">Next.js Routing Showcase</h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
        Every major Next.js 16 App Router pattern — click through to see each
        one.
      </p>

      <div className="space-y-8">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-2 text-sm font-semibold tracking-wide text-gray-400 uppercase">
              {group.title}
            </h2>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.href} className="flex items-baseline gap-2">
                  <Link
                    href={item.href}
                    className="font-mono text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {item.label}
                  </Link>
                  {item.note && (
                    <span className="text-xs text-gray-400">{item.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
