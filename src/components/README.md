# Shared UI

Place reusable UI components here. Components receive data through props rather than owning route definitions or WordPress requests.

For new interactive components, consider the installed shadcn/ui setup before implementing complex behaviour yourself. Add only needed primitives under `src/components/ui`, keep the Dorchester styles, and verify keyboard/focus behaviour. See [setup and component guidance](../../docs/SHADCN_UI.md) and the root `AGENTS.md`. Existing header/mobile navigation stays in place.

`SiteHeader` owns the branded header and navigation landmarks, rendered by `SiteLayout` on every routed page. It uses the provided crest, logo-navy background, light navigation and gold booking action from shared navigation data. Desktop navigation starts at 1024px; the property-name text appears from 1280px beside the crest (and at tablet widths).

`DesktopNavigation` renders ordinary links and disclosure buttons, not application-menu roles. Following the user's reference-style refinement, each group label is its disclosure button, with its overview link inside the panel; separate arrow controls are removed. It exposes expanded state and panel IDs, keeps one panel open, and closes on Escape (returning trigger focus), outside pointer interaction, focus leaving a group and crossing the mobile breakpoint. `SiteHeader` keys this component to the router location key so navigation/history resets all disclosure state.

On hover-capable devices, mouse entry opens a desktop group and leaving its trigger/panel closes it. Keyboard-visible focus within the group keeps its links available until focus leaves or Escape is pressed. A mouse click following hover keeps the panel open; keyboard and touch activation toggle it. Mobile navigation remains tap/disclosure based.

Rooms and Services have direct overview links in both headers. Desktop hovering opens their detail dropdowns; alternative desktop keyboard/touch access remains explicitly deferred. On mobile, the user approved separate plus/minus buttons in `MobileNavigationGroup`, with 44px targets, expanded state, controlled panel IDs and direct parent links. Children collapse independently and reset when the menu contents unmount. The centred labels remain aligned when the controls appear. Our bar and Discover retain their native mobile disclosures. All 17 destinations are now present in the mobile menu. Full mobile focus/responsive validation remains part of E03-T03.

Both desktop and mobile navigation use `src/app/navigation.ts` to highlight parent sections in gold. Desktop top-level items use regular 14px type with tracking and a short gold bar flush with the bottom of the 80px header. Exact `NavLink` destinations alone receive `aria-current="page"`; the helper matches catalogued destinations and single-segment article routes, not broad room/service prefixes. Overview links are not declared current on detail pages. Mobile links retain exact-page underlines, with no visible subgroup arrows. The booking CTA also underlines on its exact route.

`MobileNavigation` provides the reference-style centred dropdown below the mobile header. The hamburger becomes a cross when open; all groups, secondary links and the booking CTA reuse shared navigation data. The non-modal panel supports Escape/focus return, outside dismissal, close-on-navigation, native subgroup disclosures and scrolling on short screens. Desktop breakpoint changes reset the panel. See `docs/validation/e03-t03/README.md` for checks and screenshots.

Mobile route-key changes permanently clear open state so Back/Forward cannot revive a menu opened on an earlier history entry. Preserve this reset when changing state handling; a visibility check against the current route key alone is insufficient.

`DevelopmentNavigation` is a temporary review index for all 17 required destinations, rendered in the shared footer. It uses router links with exact active-page matching and the shared destination list from `src/content/navigation.ts`. It remains available in preview builds until Epic 3 replaces it with the complete site navigation. It contains no property facts or API calls.

`SetupCheck.tsx` is a temporary TypeScript, alias and Tailwind demonstration. Keep it until the routing layout replaces the starter screen.
