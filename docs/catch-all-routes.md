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
app/docs/[[...slug]]/page.tsx

/docs          → slug = undefined
/docs/a        → slug = ["a"]
/docs/a/b      → slug = ["a", "b"]
```

> **Heads up:** Don't place a required `[...slug]` and an optional `[[...slug]]` as siblings under the same parent — they both match non-empty paths and Next.js 16.2.3+ rejects this at build time (`InvariantError: Unexpected empty path segments match`). Put them under different parents (here: `help/[...slug]` and `docs/[[...slug]]`).

## Example

```tsx
// app/docs/[[...slug]]/page.tsx
export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const path = slug?.join('/') || 'index';
  return <h1>Docs: {path}</h1>;
}
```

> **Note**: Since Next.js 15, `params` is a Promise and must be awaited.

## Diagram

```
URL: /docs/getting-started/installation
              │
              ▼
   [[...slug]] = ["getting-started", "installation"]
              │
              ▼
   Breadcrumb: Docs > Getting Started > Installation
```

## When to use

- Help centers
- Documentation sites
- File browsers
- CMS content hierarchies
- Wiki systems
