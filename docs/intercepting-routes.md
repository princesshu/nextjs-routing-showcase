# Intercepting Routes

"Intercept" routes - display one route within the current context.

## How it works

Special syntax in the folder name:

- `(.)` - same level
- `(..)` - one level up
- `(..)(..)` - two levels up
- `(...)` - from the root app directory

## Classic example: Modal

```
app/
├─ feed/
│  ├─ page.tsx                    → /feed
│  └─ @modal/
│     └─ (..)photo/
│        └─ [id]/
│           └─ page.tsx           → Modal overlay
└─ photo/
   └─ [id]/
      └─ page.tsx                 → /photo/123 (full page)
```

## Behavior

**Click in the feed:**
```
/feed → click → /photo/123
                    ↓
            Modal appears (intercepted)
            Feed remains visible behind it
```

**Direct URL or refresh:**
```
/photo/123 → Full photo page renders
```

## Diagram

```
Soft Navigation (Link):
┌─────────────────────────────┐
│ /feed                       │
│ ┌─────────────────────────┐ │
│ │ Modal (@modal)          │ │
│ │ ┌─────────────────────┐ │ │
│ │ │ Photo Content       │ │ │
│ │ └─────────────────────┘ │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘

Hard Navigation (URL/Refresh):
┌─────────────────────────────┐
│ /photo/123                  │
│                             │
│    Full Photo Page          │
│                             │
└─────────────────────────────┘
```

## When to use

- Image gallery modals (Instagram-style)
- Login/Register modal overlay
- Quick view product details
- Modals with shareable URLs
