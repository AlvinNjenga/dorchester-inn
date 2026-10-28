# Shared layouts

`SiteLayout.tsx` provides the common page frame: `SiteHeader`, main content outlet and development footer. The router mounts it as the shared parent route. Header markup/navigation belongs to `src/components/SiteHeader.tsx`; the layout retains the keyboard-visible skip link, focusable main target, loading state and footer.

Shared spacing, typography and focus styles are imported through `src/index.css`. Branded desktop navigation is E03-T02, mobile navigation E03-T03, and the full footer/route transitions E03-T04.

Page-specific sections belong in `pages`; reusable UI belongs in `components`.
