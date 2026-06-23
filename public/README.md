# public/

Static assets served from the site root (e.g. `/logo.png` → `public/logo.png`).

This folder is kept in the repo so the `Dockerfile` `COPY ... /app/public` step
succeeds on a fresh clone. Drop any static files you need here.
