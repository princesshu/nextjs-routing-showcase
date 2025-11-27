# API Routes

RESTful API endpoints within your Next.js application.

## How it works

The `app/api/` directory contains `route.ts` files that define endpoints.

```
app/
└─ api/
   ├─ hello/
   │  └─ route.ts        → /api/hello
   └─ posts/
      ├─ route.ts        → /api/posts
      └─ [id]/
         └─ route.ts     → /api/posts/123
```

## HTTP Methods

```tsx
// app/api/posts/route.ts
export async function GET(request: Request) {
  const posts = await getPosts();
  return Response.json(posts);
}

export async function POST(request: Request) {
  const data = await request.json();
  const post = await createPost(data);
  return Response.json(post, { status: 201 });
}
```

## Dynamic API Route

```tsx
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await getPost(params.id);

  if (!post) {
    return Response.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  return Response.json(post);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await deletePost(params.id);
  return new Response(null, { status: 204 });
}
```

## Diagram

```
GET /api/posts/123
         │
         ▼
   app/api/posts/[id]/route.ts
         │
         ▼
   GET() handler
         │
         ▼
   Response.json({ ... })
```

## Supported methods

- `GET` - Retrieve data
- `POST` - Create new data
- `PUT` - Full data update
- `PATCH` - Partial update
- `DELETE` - Delete
- `HEAD` - Headers only
- `OPTIONS` - CORS preflight

## When to use

- Backend API for frontend
- Receiving webhooks
- Form submission handling
- Proxying external APIs
- Authentication endpoints
