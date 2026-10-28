# E03-T01 — Step 1: existing style audit

Reviewed 27 October 2026. This records the audit and migration decisions only; tokens, fonts and runtime styles have not yet been changed.

## Loaded styles and application boundary

`index.html` loads `src/main.tsx`, which imports `src/index.css` and mounts the router. The router mounts `SiteLayout` and the routed pages. `src/index.css` imports Tailwind and contains the active global defaults in `@layer base`.

`src/App.tsx` is the unused starter screen. It imports `src/App.css` and `SetupCheck`, but the current entry point/router does not import it. Its CSS is therefore outside the current runtime import graph. Tailwind may still discover utility classes in unused source files; that does not mount those components or load `App.css`.

Edit source files for this ticket. `dist/` is generated build output.

## Existing variable consumers

| Variable | Active consumers | Migration decision |
|---|---|---|
| `--text` | Global text colour in `index.css` | Use planned `--color-text-muted` for default body copy. |
| `--text-h` | Global focus outline; `SiteLayout` identity, navigation and skip link; `PagePlaceholder` heading; `DevelopmentNavigation` links | Use `--color-text` for heading/link text; give focus its own contrasting treatment. |
| `--bg` | Global background; `SiteLayout` skip link | Use `--color-background` for the page and `--color-surface` for the skip-link background. |
| `--border` | `SiteLayout` header/footer separators | Use `--color-border` for decorative separators. Essential control boundaries need a separately checked treatment. |
| `--sans` | Global font shorthand | Replace with the shared body font token and Inter/system fallbacks. |
| `--heading` | Unused starter `App.css` only | Replace with the heading font token when adding global heading rules. |
| `--mono`, `--code-bg`, `--accent`, `--accent-bg`, `--accent-border`, `--social-bg`, `--shadow` | Unused starter `App.css` only | Do not carry these starter variables into the hotel token system. Add the planned hotel shadow independently. |

**Decision: migrate the three active component files directly when the new tokens are wired in.** Temporary aliases are unnecessary for this small, known consumer set. Keep global replacements and component references consistent in the same change. No new hotel code should depend on the legacy names. Deleting the unused starter screen/styles is optional cleanup, not required by this audit.

## Base rules to preserve or replace

- Preserve Tailwind Preflight and the base layer so utilities can intentionally override defaults.
- Preserve `#root` as a flex column with `min-height: 100svh`; the layout depends on it to fill short pages.
- Replace starter colours, `color-scheme: light dark` and automatic dark-mode overrides with the agreed light navy/gold/ivory design. Dark footer/sample surfaces will receive explicit colours.
- Replace the current 18px root font size, 16px breakpoint override and 1.45 line height with the planned type system. Prefer a stable, user-respecting root size and responsive body typography: changing the root also changes all `rem`-based spacing and utilities.
- Review the global letter spacing against both fonts; do not inherit the starter's blanket tracking without a visual check.
- Retain appropriate rendering defaults, including `font-synthesis: none`, and verify the actual font weights are supplied.
- Replace the single-colour focus outline with the planned contrasting two-part treatment; check it on light, navy and photographic surfaces.

## Component-level overrides to account for

- `PagePlaceholder`, `RouteError` and `NotFoundPage` set heading size/weight with utilities. Base heading rules alone will not demonstrate the new heading scale while these overrides remain. Migrate where appropriate or use explicit typography roles in the temporary sample.
- `DevelopmentNavigation` sets its own heading size; `SiteLayout` sets the identity link size/weight. These are deliberate local roles to review, not automatic candidates for the H1 scale.
- `SiteLayout` repeats `p-[clamp(1rem,4vw,2rem)]` on header, main and footer. Replace through the later shared container/gutter work; check nested padding to avoid double gutters.
- Placeholder/error/navigation components use Tailwind spacing utilities. Tailwind's existing scale is not yet the agreed hotel spacing contract; wire the required values deliberately without redefining every utility by accident.
- `SetupCheck` has hard-coded `bg-slate-900` and `text-white`, but is only used by the inactive starter screen. It is not the style sample for E03-T01.
- The skip link already has reveal-on-focus behaviour, and navigation links already have active-page treatments. Preserve these during colour migration.
- No active shared button/input styles, self-hosted font declarations or hotel `@theme` mappings were found. These are new work in the following steps.

## Next implementation boundary

Create `src/styles/tokens.css` using the agreed values in `WEBSITE_REBUILD_PLAN.md` sections 4–5. Follow with Tailwind mappings, licensed fonts and base styles; migrate the active legacy references when those styles are connected. Keep the branded header/menu/footer implementation in E03-T02–T04.

## Verification limits

This was a source/import audit, not a rendered visual or contrast validation. No build/lint run was needed for this documentation-only step. Git status could not be inspected because `git` was unavailable on the shell PATH. E03-T01 remains open until the implementation and style-sample checks are complete.
