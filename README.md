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
├─ help/[[...slug]]/page.tsx                    → /help OR /help/a/b
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
├─ dashboard/layout.tsx                         → layout for /dashboard/*
├─ dashboard/page.tsx                           → /dashboard
├─ dashboard/settings/page.tsx                  → /dashboard/settings
├─ dashboard/@sidebar/page.tsx                  → parallel sidebar
├─ dashboard/@sidebar/default.tsx               → parallel route fallback
├─ @analytics/page.tsx                          → parallel route
```

</details>

<details>
<summary><strong>Intercepting Routes</strong></summary>

```
app/
├─ feed/page.tsx                                → /feed
├─ feed/@modal/(..)photo/[id]/page.tsx          → modal (intercepting)
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
- `/help/[[...slug]]` → also matches `/help` (optional)

### 5. Route Groups

`(marketing)` and `(auth)` → group folders for organizational purposes, do not appear in URL.

### 6. Layouts

Layouts wrap a subtree and preserve state across navigation. Example: `dashboard/layout.tsx`

### 7. Parallel Routes

`@analytics` or `@sidebar` → render multiple UI slots simultaneously in the same layout.

### 8. Intercepting Routes

`(..)` syntax overlays one route inside another, perfect for modal windows that preserve context.

### 9. Proxy (Next.js 16)

`proxy.ts` → intercept requests for auth checks, redirects, headers. Replaces `middleware.ts` from earlier versions.

### 10. API Routes

`app/api/*/route.ts` → handle RESTful endpoints with GET, POST, PUT, DELETE handlers.

---

## 📊 Routing Flow Diagrams

> **📱 Mobile users**: If diagrams don't render, expand the "Text view" sections below each diagram.

### Static Routes

```mermaid
graph LR
    A(app/) --> B(about/page.tsx)
    A --> C(page.tsx)
    B --> D(/about)
    C --> E(/)
```

<details>
<summary>📱 Text view</summary>

```
app/
├── about/page.tsx  →  /about
└── page.tsx        →  /
```
</details>

### Dynamic Routes Flow

```mermaid
graph LR
    A(/products) --> B("/products/[id]")
    B --> C(/products/123)
    B --> D(/products/456)
    C --> E("/products/123/reviews/[reviewId]")
    E --> F(/products/123/reviews/789)
```

<details>
<summary>📱 Text view</summary>

```
/products
    └── /products/[id]
            ├── /products/123
            │       └── /products/123/reviews/[reviewId]
            │               └── /products/123/reviews/789
            └── /products/456
```
</details>

### Catch-All Routes

```mermaid
graph TD
    A("help/[...slug]") --> B(/help/a)
    A --> C(/help/a/b)
    A --> D(/help/a/b/c)
    E("help/[[...slug]]") --> F(/help)
    E --> G(/help/x)
    E --> H(/help/x/y)
```

<details>
<summary>📱 Text view</summary>

```
[...slug] (required)          [[...slug]] (optional)
├── /help/a                   ├── /help          ← also matches!
├── /help/a/b                 ├── /help/x
└── /help/a/b/c               └── /help/x/y
```
</details>

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

<details>
<summary>📱 Text view</summary>

```
app/
├── (marketing)/      ← group, not in URL
│   ├── home/    →  /home
│   └── contact/ →  /contact
└── (auth)/           ← group, not in URL
    ├── login/   →  /login
    └── register/→  /register
```
</details>

### Layout Nesting

```mermaid
graph TD
    A(Root Layout) --> B(Dashboard Layout)
    B --> C(/dashboard)
    B --> D(/dashboard/settings)
```

<details>
<summary>📱 Text view</summary>

```
┌─────────────────────────────┐
│ Root Layout                 │
│ ┌─────────────────────────┐ │
│ │ Dashboard Layout        │ │
│ │   /dashboard            │ │
│ │   /dashboard/settings   │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```
</details>

### Parallel Routes

```mermaid
graph TD
    A(layout.tsx) --> B(children)
    A --> C("@sidebar")
    A --> D("@analytics")
```

<details>
<summary>📱 Text view</summary>

```
layout.tsx receives:
├── children     ← main page content
├── @sidebar     ← parallel slot
└── @analytics   ← parallel slot
```
</details>

### Intercepting Routes Flow

```mermaid
graph LR
    A(/feed) --> B(Modal)
    B --> C(/photo/123)
    C --> D(Full Page)
```

<details>
<summary>📱 Text view</summary>

```
Soft nav (Link):  /feed → click → Modal overlay (photo visible)
Hard nav (URL):   /photo/123 → Full page render
```
</details>

### Request Flow with Proxy

```mermaid
graph TD
    A(Request) --> B(proxy.ts)
    B --> C(Route Handler)
    B --> D(Redirect)
    C --> E(Response)
```

<details>
<summary>📱 Text view</summary>

```
Request
   ↓
proxy.ts ──→ auth check
   ↓              ↓
   OK          FAIL → Redirect
   ↓
Route Handler
   ↓
Response
```
</details>

### API Routes

```mermaid
graph LR
    A(Client) --> B(api/posts)
    A --> C("api/posts/[id]")
    B --> D(List/Create)
    C --> E(Get/Delete)
```

<details>
<summary>📱 Text view</summary>

```
Client
├── GET/POST api/posts      → List / Create
└── GET/DELETE api/posts/123 → Read / Delete
```
</details>

---

## 📄 Special Files

| File | Purpose |
|------|---------|
| `layout.tsx` | Shared UI wrapper, preserves state |
| `template.tsx` | Like layout, but re-mounts on navigation |
| `loading.tsx` | Loading UI shown during navigation |
| `error.tsx` | Error boundary for route segments |
| `not-found.tsx` | Custom 404 page |
| `forbidden.tsx` | Custom 403 page (Next.js 15+, **experimental**) |
| `unauthorized.tsx` | Custom 401 page (Next.js 15+, **experimental**) |
| `global-error.tsx` | Root-level error boundary |
| `default.tsx` | Fallback for parallel routes |

> **Note**: `forbidden.tsx` and `unauthorized.tsx` require the experimental `authInterrupts` flag in `next.config.js`:
> ```js
> experimental: { authInterrupts: true }
> ```

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

Add to `next.config.js`:

```js
module.exports = {
  output: 'standalone',
};
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

```js
// next.config.js
module.exports = {
  output: 'export',
};
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
