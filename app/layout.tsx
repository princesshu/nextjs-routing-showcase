import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Next.js Routing Showcase',
    // Child routes that set a string title are wrapped in this template.
    template: '%s · Routing Showcase',
  },
  description:
    'A comprehensive showcase of all Next.js 16 App Router routing patterns',
};

// LayoutProps<'/'> is generated from the route tree, so it already types the
// @analytics slot (a misspelled slot name is a type error). It can't check
// that the slot is actually rendered — that is still up to the JSX below.
export default function RootLayout({ children, analytics }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        {children}
        <section aria-label="analytics-slot">{analytics}</section>
      </body>
    </html>
  );
}
