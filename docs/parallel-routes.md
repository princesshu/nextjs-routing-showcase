# Parallel Routes

Render multiple UI components simultaneously on the same page.

## How it works

The `@folder` syntax creates "slots" that are passed as props to the layout.

```
app/
├─ layout.tsx
├─ page.tsx
├─ @analytics/
│  └─ page.tsx
└─ dashboard/
   ├─ layout.tsx
   ├─ page.tsx
   └─ @sidebar/
      └─ page.tsx
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

If a slot doesn't have a matching page, `default.tsx` renders:

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
