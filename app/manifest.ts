import type { MetadataRoute } from 'next';

// app/manifest.ts is served at /manifest.webmanifest (PWA metadata).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js Routing Showcase',
    short_name: 'Routing',
    description: 'All major Next.js 16 App Router routing patterns',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
  };
}
