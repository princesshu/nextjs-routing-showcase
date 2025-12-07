# Catch-All & Optional Catch-All Routes

Handle URL segments of varying depth.

## Catch-All: `[...slug]`

Catches all segments beyond the specified point.

```
app/help/[...slug]/page.tsx

/help/a        → slug = ["a"]
/help/a/b      → slug = ["a", "b"]
/help/a/b/c    → slug = ["a", "b", "c"]
/help          → 404 (does not match!)
```

## Optional Catch-All: `[[...slug]]`

Same as above, but also matches the empty case.

```
app/help/[[...slug]]/page.tsx

/help          → slug = undefined
/help/a        → slug = ["a"]
/help/a/b      → slug = ["a", "b"]
```

## Example

```tsx
// app/help/[[...slug]]/page.tsx
export default async function HelpPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const path = slug?.join('/') || 'index';
  return <h1>Help: {path}</h1>;
}
```

> **Note**: Since Next.js 15, `params` is a Promise and must be awaited.

## Diagram

```
URL: /help/getting-started/installation
              │
              ▼
   [[...slug]] = ["getting-started", "installation"]
              │
              ▼
   Breadcrumb: Help > Getting Started > Installation
```

## When to use

- Help centers
- Documentation sites
- File browsers
- CMS content hierarchies
- Wiki systems
