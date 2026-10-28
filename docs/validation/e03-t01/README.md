# E03-T01 base-style checks

**Current status: complete, 27 October 2026.** Earlier step entries below retain their historical pending checks; the final results supersede those statuses.

Step 5 checked 27 October 2026 using installed Chrome and temporary Playwright Core. Build and lint passed. `check-base.cjs` uses local Vite at port 5175 and requires an existing Playwright Core installation through `NODE_PATH`.

At 390px and 1440px widths:

- Body and heading fonts loaded from the local font declarations (Inter 400/600 and Cormorant Garamond 600 used by the current page).
- Body size was 16px mobile and 18px desktop; H1 was 36px and 64px respectively.
- Root size remained the browser-default 16px at both widths.
- Ivory background persisted with an emulated dark OS preference.
- No horizontal overflow; keyboard skip-link activation focused the main content.
- Screenshots reviewed for font rendering, wrapping and the retained development layout.

Evidence: [raw results](base-results.json), [mobile](base-390.png), [desktop](base-1440.png), [script](check-base.cjs).

These checks cover the current placeholder shell. Full style sample, 768/1600px layouts, blocked-font fallbacks, contrast, zoom and two-colour focus validation remain pending. E03-T01 is not complete.

## Step 6: shared layout and controls

Build/lint passed after the implementation. Chrome checks in [check-layout.cjs](check-layout.cjs) passed at 390, 768, 1440 and 1600px. [Raw results](layout-results.json) record container alignment, widths and padding.

- Main widths: 350, 704, 1220 and 1220px, with left edges at 20, 32, 110 and 190px. Header/footer content aligned at each size; no horizontal overflow.
- Section padding: 48px mobile/tablet, 80px desktop. Article placeholder panel capped at 800px.
- Temporarily injected button/input elements used the reusable classes and measured at least 44px tall. Button colours matched navy on gold.
- Keyboard focus exposed a 3px navy outline plus white inner band; inspected on navy. Forced-colour mode retained a solid system outline with no shadow.
- Reviewed [mobile](layout-390.png), [desktop](layout-1440.png) and [isolated focus check](controls-focus-dark.png) screenshots. The focus screenshot uses injected controls solely to inspect the ring, not a finished dark form design.

The script's injected controls do not alter application source or create a sample route. Full sample states, photograph backgrounds, zoom, contrast calculations and blocked-font checks remain in steps 7-8.

## Step 7: development style sample

Added `/__style-sample` and a development-footer link, both restricted to Vite development mode. Production build output contains neither the sample route nor page code. Tailwind may still emit utilities discovered in the sample source.

Build/lint passed. [Sample browser checks](check-sample.cjs) passed at 390 and 1440px with no horizontal overflow. All five supplied font weights loaded; the local action updated its status; inputs/select/textarea worked; Tab skipped the disabled button and focused the name input; hover exposed the action underline. [Raw results](sample-results.json).

Reviewed [mobile](sample-390.png) and [desktop](sample-1440.png) full-page screenshots for wrapping, cards, surfaces and control layout. Comprehensive contrast, intermediate/wide sample views, zoom and blocked-font checks remain step 8. This is not ticket closure.

## Step 8: final validation and ticket closure

Build and lint passed. [Final check script](check-final.cjs) and [raw results](final-results.json) record:

- No horizontal overflow at 320, 390, 768, 1440 and 1600px. Screenshots: [320](final-320.png), [390](final-390.png), [768](final-768.png), [1440](final-1440.png), [1600](final-1600.png).
- 200% root text resizing at 390px and 720px, with no horizontal overflow. Reviewed [mobile text resize](text-200-390.png) and [720px text resize](text-200-720.png). The 720px view separately represents half of a 1440px layout width. These are text-resize/reflow checks, not native browser page-zoom automation.
- Both font families blocked in fresh browser contexts at 390 and 1440px; all five WOFF2 requests were aborted. Chrome's platform-font inspection confirmed actual system font rendering: Georgia headings and Segoe UI for the sampled body text. No overflow. [Mobile fallback](fallback-390.png), [desktop fallback](fallback-1440.png).
- Ten explicit computed-colour combinations passed the chosen AA thresholds. Text pairs were checked against 4.5:1, including headings; essential boundaries/focus bands against 3:1. Body on ivory: **6.23:1**; body on white: **6.85:1**; navy action text on gold: **10.17:1**; white on dark navy: **17.67:1**; input boundaries on white: **6.85:1**. Decorative pale borders and disabled controls are excluded from these essential-control/text assertions.
- No uncaught JavaScript errors on the ordinary sample checks. Expected failed font requests in the deliberate blocked-font contexts are separate from normal loading.

Prior step checks cover all five loaded fonts, action feedback, input editing, hover, keyboard focus, disabled-button skipping, the skip link, control sizing and forced-colour focus. Production JavaScript excludes the development route/page.

No application fixes were needed after final validation. The temporary sample remains accessible only during development for future review. This establishes E03-T01's shared foundation; branded navigation/footer remain E03-T02-T04.

### Limits

Checks used installed Windows Chrome; this is not a cross-browser or assistive-technology audit. Native browser zoom was not automated. Contrast assertions cover the defined solid-colour combinations, not every future content/background combination. Photo-background focus review remains necessary when real photographic sections are implemented. Hosted routing is outside this ticket. No claim of whole-site WCAG conformance is made.
