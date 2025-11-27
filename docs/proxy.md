# Proxy (Next.js 16)

Request interception at the server level. In Next.js 16, we use `proxy.ts` instead of the previous `middleware.ts`.

## How it works

The `proxy.ts` file is located at the project root and runs before every request.

```
project/
├─ proxy.ts          → Request interceptor
├─ app/
│  └─ ...
```

## Example

```tsx
// proxy.ts
import { NextResponse } from 'next/server';

export function proxy(req) {
  // Protect admin pages
  if (req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Auth check
  const token = req.cookies.get('token');
  if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
```

## Matcher configuration

```tsx
// proxy.ts
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
```

## Diagram

```
Request: /dashboard/settings
         │
         ▼
    ┌─────────┐
    │ proxy() │ ← Token check
    └────┬────┘
         │
    Token OK? ──No──→ Redirect /login
         │
        Yes
         │
         ▼
    Route Handler
```

## Changes in Next.js 16

| Next.js 15 | Next.js 16 |
|------------|------------|
| `middleware.ts` | `proxy.ts` |
| `middleware()` | `proxy()` |
| Edge runtime (optional) | Node.js runtime (fixed) |

## When to use

- Authentication checks
- Role-based access control
- Geolocation-based redirects
- A/B testing
- Request logging
- Header manipulation
