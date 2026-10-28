# E03-T03 step 1: current mobile-navigation audit

Audited 28 October 2026. This step changes no application behaviour.

**Subsequent step 2 decision:** the user approved plus/minus disclosure controls on mobile only, with Rooms/Services text remaining direct links. Implemented in `MobileNavigationGroup.tsx`; the historical five-destination gap below is now resolved in the mobile menu. Desktop controls remain deferred. Build/lint and browser checks at 320/390/768px passed for keyboard toggling, 44px targets, direct overview links, child navigation, 17-destination coverage and no overflow. See [results](validation/e03-t03/mobile-collapsible-results.json), [script](validation/e03-t03/check-mobile-groups.cjs) and [preview](validation/e03-t03/mobile-collapsible-390.png). Full E03-T03 validation remains pending.

## Current implementation

`SiteHeader` renders `MobileNavigation` below 1024px. The crest/hamburger arrangement, logo-navy panel, centred links, booking action and non-modal dropdown follow the user's chosen reference. Preserve the direct Rooms/Services links and the user's removal of plus/minus controls.

The toggle is a native button with a changing accessible name, `aria-expanded` and `aria-controls`. The closed panel is hidden and its contents are unmounted. Our bar and Discover use native subgroup disclosures. Shared navigation data drives labels and destinations; active-section matching is shared with desktop.

The panel has viewport-relative maximum height and vertical scrolling. Escape restores toggle focus; the cross closes it; selecting a link closes it and focuses the toggle. Outside pointer interaction and focus leaving the menu also close it. Focus is intentionally not trapped because the menu is non-modal.

## Fresh browser observations

Chrome checks at 320, 390 and 768px, with a short 548px viewport, confirmed:

- Closed menu is absent from accessible navigation landmarks.
- Hamburger opens; cross closes; Escape closes and returns focus.
- Rooms overview navigation closes the menu and loads its destination.
- Settled desktop/mobile breakpoint transitions reset the open state.
- Expanded Our bar/Discover groups scroll inside the panel; no horizontal overflow.

Evidence: [audit script](validation/e03-t03/audit-mobile-menu.cjs) and [raw results](validation/e03-t03/step-1-audit-results.json). The script uses localhost:5173, installed Chrome and temporary Playwright Core through `NODE_PATH`.

## Main remaining gap: five missing menu destinations

The menu currently exposes **12 of 17** distinct required destinations, even with all available subgroups expanded. Missing:

- Basic Double Room: `/rooms/basic-double`
- Standard Double Room: `/rooms/standard-double`
- Deluxe Double Room: `/rooms/deluxe-double`
- Lounge: `/services/lounge`
- Massage Chair: `/services/massage-chair`

These remain in shared navigation data and the development footer, but the Rooms/Services mobile branches render only their overview links. This is the expected result of the explicitly deferred replacement keyboard/touch access, not a new accidental loss of catalogue data.

## Remaining work in the agreed sequence

1. Step 2: choose a clear way to expose those child links while retaining direct overview navigation and avoiding the removed plus/minus controls. Do not silently reintroduce them. Consider an always-visible grouped list or another reference-compatible disclosure arrangement.
2. Step 3: implement the chosen arrangement and verify all 17 destinations through the menu itself.
3. Step 4: examine complete Tab/Shift+Tab order, subgroup keyboard behaviour, outside/focus-leave dismissal and focus after each navigation type. Exercise programmatic/history route changes as well as link clicks; the current visibility derives from a saved route key and deserves an explicit regression check.
4. Step 5: verify orientation/breakpoint transitions, rapid resizing, long labels, enlarged text and short-screen scrolling. An immediate resize out-and-back showed one retained-open result before media-query events settled; ordinary settled transitions passed. Keep rapid-transition behaviour under review rather than claiming it has been fixed.
5. Step 6: build/lint, full destination coverage, desktop regression, screenshots and final validation evidence. Earlier all-17-menu assertions describe an older control arrangement and must not be reused as current passes.

shadcn/ui has been considered: its modal Sheet would change the requested non-modal dropdown. Retain the current component unless the chosen access pattern benefits from a specific primitive.

No build/lint run was necessary for this audit-only step. These observations do not constitute a cross-browser or screen-reader audit. E03-T03 remains open.
