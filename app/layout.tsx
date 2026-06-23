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

export default function RootLayout({
  children,
  analytics,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <section aria-label="analytics-slot">{analytics}</section>
      </body>
    </html>
  );
}
