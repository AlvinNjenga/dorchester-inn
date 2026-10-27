# Shared layouts

`SiteLayout.tsx` provides the common page frame: header, basic router navigation, main content outlet and footer. Tailwind utilities handle its spacing, wrapping navigation and keyboard-visible skip link. The main region is focusable as the skip-link target. Shared focus indicators and base defaults live in `src/index.css`, which imports Tailwind's Preflight reset.

The router will mount this layout as a parent route in step 6. It is not rendered by the starter app yet. Runtime navigation, skip-link and responsive checks must be performed after that wiring. The full branded navigation belongs to Epic 3.

Page-specific sections belong in `pages`; reusable UI belongs in `components`.
