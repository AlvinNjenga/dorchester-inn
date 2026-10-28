# E03-T02 step 2: navigation groups

Defined 28 October 2026 against the existing router, room/service catalogues and 17-page backlog. This is the structure for the next implementation steps; application navigation has not changed yet.

## Desktop header

Order: crest/home link, Home, Rooms, Services, Our bar, Discover, Contact us, Make a booking. Booking is a separate prominent gold CTA. The crest also links to Home with an accessible property name.

| Header item | Behaviour | Dropdown links, in order |
|---|---|---|
| Home | Link to `/` | None |
| Rooms | Link to `/rooms` with a separate disclosure button | All rooms (`/rooms`); Basic Double Room (`/rooms/basic-double`); Standard Double Room (`/rooms/standard-double`); Deluxe Double Room (`/rooms/deluxe-double`) |
| Services | Link to `/services` with a separate disclosure button | All services (`/services`); Lounge (`/services/lounge`); Massage Chair (`/services/massage-chair`) |
| Our bar | Link to `/our-bar` with a separate disclosure button | Our bar (`/our-bar`); Cocktail happy hour (`/cocktail-happy-hour`) |
| Discover | Disclosure button only; there is no Discover page | About us (`/about-us`); Gallery (`/gallery`); Blog (`/blog`); FAQs (`/faqs`) |
| Contact us | Link to `/contact` | None |
| Make a booking | CTA link to `/make-a-booking` | None |

Overview links repeat inside dropdowns so each opened group is self-contained. Parent links remain directly usable without opening their adjacent disclosure. Discover needs no placeholder route or dead link.

Keep full room names in dropdowns, derived from `rooms.ts`; derive service entries from `services.ts`. Top-level labels stay short enough for a compact desktop header. Validate actual fit before fixing the desktop breakpoint.

## Footer coverage and mobile handoff

Leave a review (`/leave-a-review`) remains a footer destination. The existing development footer already exposes all 17 destinations and stays available during E03-T02. The branded footer in E03-T04 must retain that review link and grouped coverage.

Reuse this grouping in E03-T03's mobile navigation, adding Leave a review as a secondary link and retaining a prominent booking action. Preserve the existing narrow-screen navigation until the replacement is ready. Do not add a hamburger that opens an unfinished menu.

Blog article URLs (`/blog/:slug`) are discovered from Blog, not enumerated in the header. The development style sample and not-found view are not product navigation destinations.

## Active-page and section indication

Use exact active-page matching on every destination link, including overview links. Only the link to the actual page receives `aria-current="page"`.

Indicate the parent section visually on detail pages without labelling an overview link as the current page:

- Rooms: `/rooms` and validated room-detail routes.
- Services: `/services` and validated service-detail routes.
- Our bar: `/our-bar` and `/cocktail-happy-hour`.
- Discover: `/about-us`, `/gallery`, `/blog`, article routes and `/faqs`.

Home must not appear active on every route. The booking CTA can show a current-page treatment on `/make-a-booking`. Unknown URLs should not imply a valid room/service section merely because their path has that prefix.

## Coverage check

Header/dropdowns expose 16 distinct required pages: Home (1), Rooms (4), Services (3), Our bar (2), Discover (4), Contact (1), Booking (1). The footer adds Leave a review (1), giving all **17** required pages. All paths match the current router and catalogued detail slugs.

This is a documentation-only step; build/browser checks are deferred until navigation implementation. Next: create typed shared navigation data without duplicating room/service titles or slugs. E03-T02 remains open.
