# Shared layouts

`SiteLayout.tsx` provides the common page frame: `SiteHeader`, main content outlet and `SiteFooter`. The router mounts it as the shared parent route. The layout retains the keyboard-visible skip link, focusable main target and loading state. A collapsed Development tools area below the footer exposes the development index/style sample only in Vite development mode.

Shared spacing, typography and focus styles are imported through `src/index.css`. Branded desktop navigation is E03-T02, mobile navigation E03-T03, and the full footer/route transitions E03-T04.

`RouteTransitions` mounts one React Router `ScrollRestoration` instance. Completed page changes focus the new H1/main with `preventScroll`; new query-only updates preserve position/focus, while Back/Forward retain saved scroll positions. Fragment targets receive programmatic focus. Initial non-fragment loads do not steal focus. Mobile-menu link navigation ends at the page heading; menu dismissal without navigation still returns focus to its toggle.

Page-specific sections belong in `pages`; reusable UI belongs in `components`.
