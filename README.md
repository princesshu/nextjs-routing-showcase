# Next.js Full Routing Showcase

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)

This repository demonstrates all major routing patterns in modern Next.js (App Router) using **Next.js 16**.

---

## 📑 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Routing Patterns](#-routing-patterns)
- [Routing Flow Diagrams](#-routing-flow-diagrams)
- [Special Files](#-special-files)
- [Deployment](#-deployment)
- [Learn More](#-learn-more)
- [License](#-license)

---

## ✨ Features

- Static pages
- Dynamic pages
- Nested dynamic pages
- Catch-all & optional catch-all
- Route groups
- Layout & nested layouts
- Parallel routes
- Intercepting routes
- Proxy (formerly Middleware)
- API routes
- Special files: `loading.tsx`, `error.tsx`, `not-found.tsx`, `global-error.tsx`

---

## 📁 Project Structure Examples

<details>
<summary><strong>Static & Dynamic Routes</strong></summary>

```
app/
├─ page.tsx                                     → /
├─ about/page.tsx                               → /about
├─ products/page.tsx                            → /products
├─ products/[id]/page.tsx                       → /products/123
├─ products/[id]/reviews/[reviewId]/page.tsx    → /products/123/reviews/456
├─ blog/[slug]/page.tsx                         → /blog/my-post
```

</details>

<details>
<summary><strong>Catch-All Routes</strong></summary>

```
app/
├─ help/[...slug]/page.tsx                      → /help/a/b/c
├─ docs/[[...slug]]/page.tsx                    → /docs OR /docs/a/b
```

</details>

<details>
<summary><strong>Route Groups</strong></summary>

```
app/
├─ (marketing)/home/page.tsx                    → /home
├─ (marketing)/contact/page.tsx                 → /contact
├─ (auth)/login/page.tsx                        → /login
├─ (auth)/register/page.tsx                     → /register
```

</details>

<details>
<summary><strong>Layouts & Parallel Routes</strong></summary>

```
app/
├─ layout.tsx                                   → root layout (accepts `analytics` slot)
├─ dashboard/layout.tsx                         → layout for /dashboard/*
├─ dashboard/page.tsx                           → /dashboard
├─ dashboard/settings/page.tsx                  → /dashboard/settings
├─ dashboard/@sidebar/page.tsx                  → parallel sidebar
├─ dashboard/@sidebar/default.tsx               → parallel route fallback
├─ @analytics/page.tsx                          → root-level parallel route
├─ @analytics/default.tsx                       → fallback for unmatched siblings
```

</details>

<details>
<summary><strong>Intercepting Routes</strong></summary>

```
app/
├─ feed/layout.tsx                              → accepts `modal` slot
├─ feed/page.tsx                                → /feed
├─ feed/@modal/(..)photo/[id]/page.tsx          → modal (intercepting)
├─ feed/@modal/default.tsx                      → fallback when no modal is open
├─ photo/[id]/page.tsx                          → /photo/123 (full page)
```

</details>

<details>
<summary><strong>API Routes</strong></summary>

```
app/
├─ api/hello/route.ts                           → /api/hello
├─ api/posts/[id]/route.ts                      → /api/posts/:id
```

</details>

<details>
<summary><strong>Special Files</strong></summary>

```
app/
├─ layout.tsx                                   → root layout
├─ template.tsx                                 → re-mounts on navigation
├─ loading.tsx                                  → loading skeleton
├─ error.tsx                                    → error boundary
├─ not-found.tsx                                → custom 404
├─ forbidden.tsx                                → custom 403 (experimental)
├─ unauthorized.tsx                             → custom 401 (experimental)
├─ global-error.tsx                             → global error boundary
proxy.ts                                        → global proxy
```

</details>

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

---

## 🛤️ Routing Patterns

### 1. Static Routes

`/about`, `/contact`, `/`

Simple, file-based routes. Create a folder with a `page.tsx` file and you have a route.

### 2. Dynamic Routes

`/products/[id]`, `/blog/[slug]`

Use square brackets to create dynamic segments that capture URL parameters.

### 3. Nested Dynamic

`/products/[id]/reviews/[reviewId]`

Combine multiple dynamic segments for deeply nested routes.

### 4. Catch-All & Optional Catch-All

- `/help/[...slug]` → matches `/help/a`, `/help/a/b`, `/help/a/b/c`
- `/docs/[[...slug]]` → also matches `/docs` (optional)

> **Why two different parents?** A required `[...slug]` and an optional `[[...slug]]` as siblings under the same parent create an ambiguous match for non-empty paths (e.g. `/help/a` would match both). Next.js 16.2.3+ rejects this at build time. Separate parents — one `help/`, one `docs/` — is the idiomatic fix.

### 5. Route Groups

`(marketing)` and `(auth)` → group folders for organizational purposes, do not appear in URL.

### 6. Layouts

Layouts wrap a subtree and preserve state across navigation. Example: `dashboard/layout.tsx`

### 7. Parallel Routes

`@analytics` or `@sidebar` → render multiple UI slots simultaneously in the same layout.

> A slot is only rendered if the enclosing `layout.tsx` receives it as a prop and places it in the JSX. Every named slot also needs a `default.tsx` fallback so sibling routes don't 404.

Example — root-level `@analytics` wired into the root layout:

```tsx
// app/layout.tsx
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
```

### 8. Intercepting Routes

`(..)` syntax overlays one route inside another, perfect for modal windows that preserve context.

> Intercepting into a slot requires a matching layout. The `feed/@modal/(..)photo/[id]` slot only renders if `app/feed/layout.tsx` accepts a `modal` prop and renders it. The slot also needs `app/feed/@modal/default.tsx` for when no modal is active.

### 9. Proxy (Next.js 16)

`proxy.ts` → intercept requests for auth checks, redirects, headers. Replaces `middleware.ts` from earlier versions.

### 10. API Routes

`app/api/*/route.ts` → handle RESTful endpoints with GET, POST, PUT, DELETE handlers.

---

## 📊 Routing Flow Diagrams

### Static Routes

```mermaid
graph LR
    A(app/) --> B(about/page.tsx)
    A --> C(page.tsx)
    B --> D(/about)
    C --> E(/)
```

### Dynamic Routes Flow

```mermaid
graph LR
    A(/products) --> B("/products/[id]")
    B --> C(/products/123)
    B --> D(/products/456)
    C --> E("/products/123/reviews/[reviewId]")
    E --> F(/products/123/reviews/789)
```

### Catch-All Routes

```mermaid
graph TD
    A("help/[...slug]") --> B(/help/a)
    A --> C(/help/a/b)
    A --> D(/help/a/b/c)
    E("docs/[[...slug]]") --> F(/docs)
    E --> G(/docs/x)
    E --> H(/docs/x/y)
```

### Route Groups Flow

```mermaid
graph TD
    A(app/) --> B("(marketing)")
    A --> C("(auth)")
    B --> D(/home)
    B --> E(/contact)
    C --> F(/login)
    C --> G(/register)
```

### Layout Nesting

```mermaid
graph TD
    A(Root Layout) --> B(Dashboard Layout)
    B --> C(/dashboard)
    B --> D(/dashboard/settings)
```

### Parallel Routes

```mermaid
graph TD
    A(layout.tsx) --> B(children)
    A --> C("@sidebar")
    A --> D("@analytics")
```

### Intercepting Routes Flow

```mermaid
graph LR
    A(/feed) --> B(Modal)
    B --> C(/photo/123)
    C --> D(Full Page)
```

### Request Flow with Proxy

```mermaid
graph TD
    A(Request) --> B(proxy.ts)
    B --> C(Route Handler)
    B --> D(Redirect)
    C --> E(Response)
```

### API Routes

```mermaid
graph LR
    A(Client) --> B(api/posts)
    A --> C("api/posts/[id]")
    B --> D(List/Create)
    C --> E(Get/Delete)
```

---

## 📄 Special Files

| File               | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `layout.tsx`       | Shared UI wrapper, preserves state              |
| `template.tsx`     | Like layout, but re-mounts on navigation        |
| `loading.tsx`      | Loading UI shown during navigation              |
| `error.tsx`        | Error boundary for route segments               |
| `not-found.tsx`    | Custom 404 page                                 |
| `forbidden.tsx`    | Custom 403 page (Next.js 15+, **experimental**) |
| `unauthorized.tsx` | Custom 401 page (Next.js 15+, **experimental**) |
| `global-error.tsx` | Root-level error boundary                       |
| `default.tsx`      | Fallback for parallel routes                    |

> **Note**: `forbidden.tsx` and `unauthorized.tsx` require the experimental `authInterrupts` flag in `next.config.ts`:
>
> ```ts
> const nextConfig: NextConfig = {
>   experimental: { authInterrupts: true },
> };
> ```
>
> They only render when your code calls `forbidden()` / `unauthorized()` from `next/navigation`.

---

## 🚢 Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```

### Standalone Mode

Add to `next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

```bash
npm run build
node .next/standalone/server.js
```

### Node.js Server

```bash
npm run build
npm run start
```

### Static Export

For static sites without server-side features:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
};

export default nextConfig;
```

```bash
npm run build
# Output in /out folder - deploy to any static host
```

---

## 📚 Learn More

Check out the `/docs` folder for detailed explanations and diagrams of each routing pattern.

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Self-Hosting Guide](https://nextjs.org/docs/app/guides/self-hosting)

---

## 📜 License

MIT - See [LICENSE](LICENSE) for details.
