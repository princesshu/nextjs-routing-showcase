'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// A folder prefixed with "_" is a private folder: it is opted out of routing,
// so this component never becomes a URL segment. Client navigation hooks like
// usePathname require the "use client" directive.
export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-500">
      <Link href="/">home</Link>
      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        return (
          <span key={href}>
            {' / '}
            <Link href={href}>{segment}</Link>
          </span>
        );
      })}
    </nav>
  );
}
