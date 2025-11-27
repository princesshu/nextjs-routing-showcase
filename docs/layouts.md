# Layouts

Shared UI elements that preserve state across navigation.

## How it works

The `layout.tsx` file wraps all child pages.

```
app/
├─ layout.tsx           → Root layout (required)
└─ dashboard/
   ├─ layout.tsx        → Dashboard layout
   ├─ page.tsx          → /dashboard
   └─ settings/
      └─ page.tsx       → /dashboard/settings
```

## Root Layout (required)

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## Nested Layout

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </div>
  );
}
```

## Diagram

```
/dashboard/settings

┌─────────────────────────────┐
│ Root Layout                 │
│ ┌─────────────────────────┐ │
│ │ Dashboard Layout        │ │
│ │ ┌─────────────────────┐ │ │
│ │ │ Settings Page       │ │ │
│ │ └─────────────────────┘ │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

## Key properties

- **Do not re-render** during navigation
- **Preserve state** (e.g., scroll position, form data)
- **Can be nested** to any depth

## When to use

- Navigation bars
- Sidebars
- Footers
- Authentication wrappers
