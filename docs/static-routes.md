# Static Routes

The simplest routing pattern in Next.js.

## How it works

Create a folder inside the `app/` directory and place a `page.tsx` file in it.

```
app/
├─ about/
│  └─ page.tsx    → /about
├─ contact/
│  └─ page.tsx    → /contact
└─ page.tsx       → /
```

## Example

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return <h1>About Us</h1>;
}
```

## Diagram

```
URL: /about
         │
         ▼
   app/about/page.tsx
         │
         ▼
   React Component renders
```

## When to use

- Fixed content pages (About, Contact, Home)
- Marketing pages
- Legal information (Privacy, Terms)
