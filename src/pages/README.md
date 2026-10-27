# Route pages

The 17 required destinations use 14 default-exported page modules, loaded lazily by the router. Each composes `PagePlaceholder` with its own title and a visible development label.

`ArticlePage` adds a lazy `/blog/:slug` placeholder displaying the slug as React text, with a link back to Blog. It does not fetch WordPress or verify that an article exists yet. `NotFoundPage` handles the catch-all `*` route and unknown room/service slugs via the route error boundary. The recovery page is eagerly available so an error does not require another page download. It includes Home and Contact links and renders inside the shared layout. These client views do not generate static route files or HTTP statuses on GitHub Pages; hosted routing remains an E11 check.

`RoomDetailsPage` serves `/rooms/:roomSlug`, selecting Basic, Standard or Deluxe from `content/rooms.ts`. `ServiceDetailsPage` serves `/services/:serviceSlug`, selecting Lounge or Massage Chair from `content/services.ts`. Both reject missing or unknown slugs with a route 404 error, to be handled by the router error boundary. These shared modules give each detail URL its own content while reusing its category's layout; they do not create separate chunks per slug.

Compose pages from shared components and local content. Keep the shared site frame in `layouts` and route definitions in `app`.
