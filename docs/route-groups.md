# Route Groups

Organize routes without affecting the URL structure.

## How it works

Folders wrapped in parentheses `(groupName)` do not appear in the URL.

```
app/
├─ (marketing)/
│  ├─ home/page.tsx      → /home
│  └─ about/page.tsx     → /about
├─ (auth)/
│  ├─ login/page.tsx     → /login
│  └─ register/page.tsx  → /register
└─ (dashboard)/
   └─ settings/page.tsx  → /settings
```

## Benefits

- **Organization**: Logical grouping of related routes
- **Separate layouts**: Each group can have its own layout
- **Clean code**: Easier navigation in the project

## Example: Separate layouts

```
app/
├─ (marketing)/
│  ├─ layout.tsx    → Marketing layout (navbar, footer)
│  └─ home/page.tsx
├─ (auth)/
│  ├─ layout.tsx    → Auth layout (centered, minimal)
│  └─ login/page.tsx
```

## Diagram

```
File system:                URL:
(marketing)/home/page.tsx  →  /home
(auth)/login/page.tsx      →  /login

Parentheses disappear from the URL!
```

## When to use

- Marketing vs App sections
- Public vs Authenticated areas
- Admin vs User interfaces
- Different design systems within one project
