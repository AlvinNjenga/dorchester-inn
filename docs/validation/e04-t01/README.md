# E04-T01 section primitive review

Final review, 30 October 2026: the user supplied `double-room-photo.webp` (768 x 576) and `royal-suburbs.webp` (500 x 386) for the development mosaic, in that order. Both are copied into `src/assets`. All four viewport checks and captures have been refreshed with these images; the browser check verifies both images decode with the expected natural dimensions. Royal Suburbs is an architectural rendering; using it in the development sample does not establish it as a Dorchester property photo or approve it for production.

Reviewed 30 October 2026 on the development-only `/__style-sample` route in local Chrome. Implementation: ActionLink, ActionButton, SectionHeading, PageTitleBand and StoryMosaic. The sample composes them with short/long Dorchester copy, optional fields omitted and shared spacing utilities. Product pages retain their existing constrained main layout; full-width sections are opt-in through a route handle.

## Evidence

- [Recorded browser results](results.json) and [repeatable check](check-primitives.cjs).
- Title bands: [390px](title-390.png), [768px](title-768.png), [1440px](title-1440.png), [1600px](title-1600.png).
- Story compositions: [390px](stories-390.png), [768px](stories-768.png), [1440px](stories-1440.png), [1600px](stories-1600.png).

Checks passed for a single H1, no skipped heading levels, full-width title band, current-page breadcrumb semantics, alternating desktop/image-first mobile story order, omitted optional action, no horizontal overflow, button keyboard activation, disabled-button skipping, room navigation and history return. Doubling the root font size at 390px produced no horizontal overflow; this checks text resizing, not browser zoom. TypeScript, production Vite build and ESLint passed. Desktop/mobile captures were visually inspected for heading wrapping, spacing and story alignment.

Run Vite on `127.0.0.1:5173`, then run `node docs/validation/e04-t01/check-primitives.cjs` with Playwright Core resolvable through `NODE_PATH`. This check uses the existing external tooling in `C:/Users/alvin/AppData/Local/Temp/dorchester-routing-check/node_modules`; no browser-test dependency was added to the project. The npm launcher currently reports no active Node version, so checks used the installed Node v26.12.0 executable directly for TypeScript, Vite and ESLint.

## Reference comparison and limits

Compared with the saved Kinsley homepage/About captures: the title is centred above a compact breadcrumb pill; stories use one white panel with alternating desktop rows and image-first mobile rows. Dorchester fonts, ivory/navy/gold palette and content-driven heights are intentional adaptations. The existing tested header is retained. Supplemental carousel screenshots belong to later carousel work.

The supplied images replace the initial placeholders. Mobile and desktop crops were visually reviewed: the bed/towels and building/branding remain visible, with descriptive alt text. Production photography selection and ownership verification remain separate from this development demonstration. This is not a completed homepage slice or an all-page reference map.

At the user's request, action focus rings were replaced with a subtle gold colour change and input/select/textarea focus rings were removed. Keyboard activation checks passing does not establish sufficient focus visibility or a complete accessibility pass. Review these choices in E10-T02. Headings/navigation/control labels are unselectable; prose/contact details remain selectable and editable fields retain their caret. No screen-reader or cross-browser audit was performed here.

E04-T01's primitive composition and semantic heading-order requirements are demonstrated and the ticket is complete. The remaining production-asset and accessibility review limits above remain explicit; no launch readiness is claimed.
