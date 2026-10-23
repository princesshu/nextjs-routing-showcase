# Parallel Routes

Render multiple UI components simultaneously on the same page.

## How it works

The `@folder` syntax creates "slots" that are passed as props to the **nearest enclosing layout**. A slot only renders if the layout destructures it and places it in the JSX — otherwise the files in `@folder` are silently ignored.

```
app/
├─ layout.tsx           ← must accept `analytics` prop
├─ page.tsx
├─ @analytics/
│  ├─ page.tsx          → renders when the URL matches `/`
│  └─ default.tsx       → required fallback for every other URL
└─ dashboard/
   ├─ layout.tsx        ← must accept `sidebar` prop
   ├─ page.tsx
   └─ @sidebar/
      ├─ page.tsx
      └─ default.tsx
```

## Example: Dashboard Layout

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}
```

> **TypeScript**: `LayoutProps<'/dashboard'>` (Next.js 15.5+) is generated from the route tree and already includes the `sidebar` slot, so a misspelled slot name is a type error. It does not check that the slot is rendered: leaving `{sidebar}` out of the JSX still compiles. This repo's layouts use it.

## Example: Root-level slot

A parallel slot can also live directly under `app/`. The root layout must then accept it:

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

## Diagram

```
/dashboard

┌────────────────────────────────┐
│ Dashboard Layout               │
│ ┌──────────┐ ┌───────────────┐ │
│ │ @sidebar │ │   children    │ │
│ │          │ │   (page.tsx)  │ │
│ │          │ │               │ │
│ └──────────┘ └───────────────┘ │
└────────────────────────────────┘
```

## default.tsx

If a slot doesn't have a page matching the current URL, `default.tsx` renders instead. Without it, the whole route 404s on sibling paths — so `default.tsx` is effectively **mandatory** for every named slot.

```
app/dashboard/@sidebar/
├─ page.tsx           → /dashboard
├─ settings/page.tsx  → /dashboard/settings
└─ default.tsx        → fallback for all other routes
```

## When to use

- Dashboard layouts (sidebar + main content)
- Split view interfaces
- Conditional UI sections
- Analytics panels
