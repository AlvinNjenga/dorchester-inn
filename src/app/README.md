# Application wiring

`router.tsx` creates the browser router once outside React rendering. It mounts `SiteLayout`, with 14 lazy page modules covering the 17 required destinations, a lazy article placeholder, an eagerly available catch-all recovery page, a loading fallback and route error boundaries. The basename follows Vite's configured base.

Keep property content, reusable UI and WordPress request logic in their respective directories.
