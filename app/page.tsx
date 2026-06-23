import Link from 'next/link';

type Item = { href: string; label: string; note?: string };
type Group = { title: string; items: Item[] };

const groups: Group[] = [
  {
    title: 'Static & dynamic',
    items: [
      { href: '/about', label: '/about', note: 'static' },
      { href: '/products', label: '/products', note: 'static list' },
      { href: '/products/1', label: '/products/[id]', note: 'dynamic + SSG' },
      {
        href: '/products/1/reviews/1',
        label: '/products/[id]/reviews/[reviewId]',
        note: 'nested dynamic',
      },
      { href: '/blog/hello-world', label: '/blog/[slug]', note: 'dynamic' },
    ],
  },
  {
    title: 'Catch-all',
    items: [
      { href: '/help/a/b/c', label: '/help/[...slug]', note: 'required' },
      { href: '/docs', label: '/docs/[[...slug]]', note: 'optional' },
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
      { href: '/photo/1', label: '/photo/[id]', note: 'full page' },
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
      { href: '/api/posts/1', label: '/api/posts/[id]' },
      { href: '/sitemap.xml', label: '/sitemap.xml' },
      { href: '/robots.txt', label: '/robots.txt' },
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
