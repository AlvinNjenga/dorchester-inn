# Dorchester Inn rebuild: epics and actionable tickets

Updated: 25 October 2026. Companion technical reference: [WEBSITE_REBUILD_PLAN.md](WEBSITE_REBUILD_PLAN.md).

Workflow/hosting decisions, 26 October 2026: see [EXTERNAL_WORKFLOWS_AND_HOSTING.md](EXTERNAL_WORKFLOWS_AND_HOSTING.md). Use public read-only WordPress at Dorchester Inn KE, temporary GitHub Pages static hosting with domain to follow, and existing WordPress forms plus phone/email handoffs. Keep the existing private feedback form. No custom frontend form delivery integration is required for this phase.

Scope revised 26 October 2026: remove standalone Food Menu, Drinks Menu, Location and Get directions pages; add Lounge and Massage Chair under Services. Required scope is now 17 pages. Removed tickets E06-T04, E06-T05, E07-T02 and E07-T03 are retired, not completed; existing ticket IDs remain stable. New service content needs owner-supplied facts/assets in E01-T03. Keep useful address/map information on Contact us.

## How to work through this backlog

Recreate Dorchester Inn's information and page purposes using comparable Kinsley layouts and original implementation. Where Kinsley has no equivalent page, combine its title bands, story mosaics, cards, typography and section spacing. Use Dorchester content and approved assets, not demo claims or photography. A premium visual treatment must still describe the actual budget/backpacker guesthouse honestly.

Work down the epics in dependency order. A ticket is a small, reviewable outcome; check it off when its stated result is demonstrated. The order is a delivery sequence, not a commitment to one epic per sprint. Pick a manageable sprint goal, split tickets further when needed, and estimate together after examining the work. Do not assign dates or story points before understanding capacity and uncertainty.

Each ticket below includes the work and its completion check. For every implementation ticket, also run applicable build/lint checks, inspect the affected desktop/mobile views, test new keyboard interactions, and record unresolved limitations. Add focused tests for data transformations, security boundaries and important failure paths; static content does not need tests that merely repeat its markup. Accessibility and responsive behaviour are part of each ticket, with a later cross-site audit.

An epic is complete when its tickets work together in a runnable, reviewable slice. Content-dependent tickets may use clearly labelled development placeholders while facts are pending; unresolved facts must be omitted or resolved before launch. Tracking an open question is not the same as completing the affected page.

## Agreed scope and design

These are 17 distinct pages. Routes are proposed and will be checked against existing public URLs in E01-T01.

| Page | Proposed route | Purpose and reference approach | Delivery ticket |
|---|---|---|---|
| Homepage | `/` | Discovery; Kinsley hero, amenities, mosaic and featured content | E05-T01–T03 |
| Services | `/services` | Facilities overview; reference service cards and amenities | E06-T02 |
| Make a booking | `/make-a-booking` | Stay request; reference form and enquiry patterns | E08-T01–T02 |
| Rooms | `/rooms` | Compare actual room tiers; reference room cards | E06-T01 |
| Our bar | `/our-bar` | Bar experience; reference photographic stories/cards | E07-T01 |
| Cocktail happy hour | `/cocktail-happy-hour` | Promotion details and terms; reference feature/story layout | E07-T04 |
| About us | `/about-us` | Property identity and story; reference mosaic | E06-T03 |
| Leave a review | `/leave-a-review` | Link to the existing WordPress private feedback form; reference CTA/contact tiles | E08-T04 |
| Blog | `/blog` | Browse WordPress articles; reference publication grid | E09-T03 |
| Contact us | `/contact` | General enquiries; reference contact tiles/form layout | E08-T03 |
| Gallery | `/gallery` | Full property photo collection with accessible lightbox | E05-T04 |
| FAQs | `/faqs` | Approved answers to common guest questions | E06-T09 |
| Basic room details | `/rooms/basic-double` | Basic tier photos, inclusions and stay request | E06-T06 |
| Standard room details | `/rooms/standard-double` | Standard tier photos, inclusions and stay request | E06-T07 |
| Deluxe room details | `/rooms/deluxe-double` | Deluxe tier photos, inclusions and stay request | E06-T08 |
| Lounge | `/services/lounge` | Lounge facilities and approved guest information | E06-T10 |
| Massage Chair | `/services/massage-chair` | Chair access, use and verified practical details | E06-T11 |

Blog article routes (`/blog/:slug`) and a custom not-found view support this scope. Gallery, FAQs and all three room-detail pages are required. Checkout, accounts and a custom booking engine are not required. Preserve any necessary existing legal information. Scope expanded on 25 October 2026; E01-T01's completed audit is extended by the source mappings in `content-map.md`, with deeper content verification still assigned to E01-T03.

Use the palette proposed in the plan: logo navy `#030128`, interface navy `#14243A`, dark navy `#0D1929`, gold `#FCC95E`, decorative muted gold `#C6A15B`, ivory `#F7F4ED`, white `#FFFFFF`, muted text `#555B64`, and border `#E3DED4`. Forest `#263B36` is optional. Use navy text on gold actions; avoid small gold text on white. Implement one token source and check contrast. Use the planned Cormorant Garamond/Inter pairing with licensed self-hosted files and fallbacks.

## Epic 01 — Confirm content, page mapping and external workflows

**Description:** Turn the agreed scope into a reliable content and reference map before layouts depend on uncertain facts.

**Why first / junior explanation:** Layout decisions depend on the information they must hold. A menu with many categories needs different treatment from a short promotional page. Booking and map links also depend on real destinations. A short discovery pass prevents rebuilding pages around invented requirements.

**Rule of thumb:** Confirm what users need to do, what content exists, and which external systems are involved before designing their screens. Time-box research and record unknowns rather than blocking all work indefinitely.

- [x] **E01-T01 — Audit all 17 pages and legacy URLs.** Record each page's source URL, purpose, headings, essential content and intended new route in `docs/content-map.md`; include existing legal pages and old article URLs. Done when every requested page has a content source or named missing-content decision and legacy routes have proposed retain/redirect handling. Completed in [content-map.md](content-map.md), 25 October 2026, with the requested scope adjustment: blog/article inspection and numbered URLs excluded; individual article mapping deferred to E09/E11.
- [ ] **E01-T02 — Map pages to Kinsley patterns.** Assign comparable reference pages or sections to each requested page; capture useful desktop/mobile examples and resolve previously faded carousel captures. Done when the map distinguishes observed layouts from deliberate adaptations and provides a visual target for every page.
- [x] **E01-T03 — Collect and verify content/assets.** Create `docs/asset-manifest.md` with image ownership, dimensions, room association and intended crop; record current tariffs, promotion terms, address, approved property copy and owner-supplied Lounge/Massage Chair details and photos. Done when usable assets and unresolved owner questions are explicit; never infer occupancy, facilities or current prices from ambiguous source text. Marked complete at the owner's request on 26 October 2026; this status update does not claim a new asset audit or create a missing manifest.
- [x] **E01-T04 — Decide external workflows and hosting constraints.** Record the booking/enquiry destination, any supported form delivery endpoint, verified map/review links, WordPress location and proposed frontend host/domain. Done when the integration approach and remaining decisions are documented; shell work may proceed, but dependent integrations wait for real destinations. Planning completed 26 October 2026 in [EXTERNAL_WORKFLOWS_AND_HOSTING.md](EXTERNAL_WORKFLOWS_AND_HOSTING.md): user selected phone/email and existing WordPress booking/contact/feedback forms; public API and temporary GitHub Pages agreed. Domain, final map-result check, form delivery, browser CORS and hosted routing remain named implementation checks.

## Epic 02 — Establish a reliable development foundation

**Description:** Make the existing React/TypeScript/Vite project predictable to run and safe to extend.

**Depends on:** Start after E01 establishes scope; this can overlap remaining asset collection.

**Why here / junior explanation:** A working baseline lets you tell whether a later failure came from your change or already existed. Strict types and a small amount of structure catch mistakes before multiple pages repeat them.

**Rule of thumb:** Make the smallest existing application build reliably before adding features. Install tools because a near-term feature needs them, not because they might be useful later.

- [x] **E02-T01 — Establish the baseline.** Configure the available Node/npm tooling, inspect existing changes, run current build/lint and document commands and pre-existing failures. Done when a teammate can start the project and reproduce the baseline without losing existing work. Marked complete at the user's request on 26 October 2026; build/lint were not rerun for this status update.
- [x] **E02-T02 — Configure TypeScript and styling.** Enable strict checking in app and Node configs, preserve existing compiler plugins, add aliases and Tailwind integration, and install only needed core packages after checking current compatibility. Done when build/lint pass and an aliased component renders with the new styling setup; historical version notes are not a fresh compatibility check. Completed 26 October 2026; build/lint passed and the user confirmed visual, responsive, keyboard and browser-console checks. Evidence: [E02-T02-validation.md](E02-T02-validation.md).
- [x] **E02-T03 — Create routing and project boundaries.** Add the shared layout route, lazy page boundaries for all 17 pages, article and not-found routes, and organize local content separately from UI and API code. Done when each route loads a labelled development placeholder and unknown URLs show the recovery view. Completed 27 October 2026; shared detail modules preserve all 17 destinations. Build/lint and local desktop/mobile browser checks passed. Hosted routing verification remains in E11.

## Epic 03 — Build design tokens and the shared site layout

**Description:** Implement the common visual foundation and navigation used by every page.

**Depends on:** E02 and E01's navigation/content map.

**Why here / junior explanation:** The layout is the frame around every page: header, footer, container widths, backgrounds and spacing. Fixing these once gives all later pages consistent alignment and avoids adjusting seventeen copies of the same problem.

**Rule of thumb:** Establish the shared frame and visual rules before filling pages. Review it with realistic labels and text lengths, not empty boxes.

- [ ] **E03-T01 — Implement tokens, fonts and base styles.** Add the agreed palette, semantic colour mappings, typography, spacing, radii, containers and focus styles with one source of truth. Done when a temporary style sample demonstrates headings, body text and controls at mobile/desktop sizes with readable contrast and working font fallbacks.
- [ ] **E03-T02 — Build header and desktop navigation.** Use the Dorchester crest and reference header geometry; group the 17 destinations sensibly rather than squeezing all links into one row, and make booking prominent. Done when every page is discoverable through navigation/footer and active links and dropdowns work with keyboard and pointer.
- [ ] **E03-T03 — Build mobile navigation.** Implement an accessible menu with clear groups, booking CTA, Escape dismissal, focus management and close-on-navigation. Done when all destinations are reachable on a narrow screen and focus returns correctly when the menu closes.
- [ ] **E03-T04 — Build footer and route transitions.** Add verified contact/social links, grouped page links, reference-style identity/gallery treatment, skip link and sensible route focus/scroll behaviour. Done when the shell is reviewed at 390, 768, 1440 and 1600px and no visible link leads to a missing destination.

## Epic 04 — Build reusable sections through one real page slice

**Description:** Create the small components needed repeatedly, proving them with actual Dorchester content.

**Depends on:** E03 and usable assets/content from E01.

**Why here / junior explanation:** Components are reusable pieces inside the layout. A section heading, room card or story block should behave consistently wherever it appears. Building a representative slice first exposes awkward component assumptions before other pages depend on them.

**Rule of thumb:** Extract a component when repeated structure or meaningful behaviour justifies it. Prefer a few clear components over one universal component with many switches.

- [ ] **E04-T01 — Build section primitives.** Implement actions, section headings, interior title/breadcrumb bands and story mosaics; demonstrate them with real long/short copy. Done when they compose without page-specific spacing hacks and preserve semantic heading order.
- [ ] **E04-T02 — Build catalogue cards and grids.** Add typed local room/service data and reusable room cards, service cards, amenity tiles and responsive grids. Done when real room/service examples display at one, two and three columns without invented prices or metadata.
- [ ] **E04-T03 — Build contact and service-detail patterns.** Implement reusable contact tiles and a service-detail layout with a title, photograph, description, practical details and useful contact action. Done when long copy, missing optional fields and mobile layouts remain readable, ready for Lounge and Massage Chair.
- [ ] **E04-T04 — Review the first homepage slice.** Assemble the photo hero, honest stay-request CTA, overlapping amenity strip and first story mosaic. Done when matching mobile/desktop captures have been compared with the reference and major geometry, crop and typography issues are corrected before expanding the site.

## Epic 05 — Complete the homepage

**Description:** Deliver a useful discovery page that introduces the property and directs visitors to the deeper pages.

**Depends on:** E04. Live latest-post data is completed by E09-T04.

**Why here / junior explanation:** The homepage exercises most shared sections, so it is a useful integration check. Once its components work together, inner pages become smaller compositions rather than separate designs from scratch.

**Rule of thumb:** Finish one representative page early, then reuse its proven patterns. Keep independent content usable when an optional network section fails.

- [ ] **E05-T01 — Compose the full homepage.** Extend the first slice with gallery, featured rooms, services, approved feedback and latest-publications space in the reference-derived order. Done when the page tells a coherent Dorchester story and links to the correct booking, rooms, services, bar and blog destinations.
- [ ] **E05-T02 — Complete gallery and feedback behaviour.** Add working gallery controls/lightbox, swipe where appropriate, keyboard dismissal and focus return; show testimonials only with approved attribution. Done when controls work, reduced motion is respected, and missing optional feedback does not leave a blank section.
- [ ] **E05-T03 — Review homepage fidelity and resilience.** Tune section rhythm, image crops, text wrapping and mobile stacking; document intentional brand/content deviations. Done when the static homepage is approved visually and remains usable with the future news section loading or failing; E09-T04 closes the live-data dependency.
- [ ] **E05-T04 — Build Gallery.** Create `/gallery` using approved property photos and the shared lightbox from E05-T02; link to it from the homepage gallery and site navigation/footer. Done when the full collection works on mobile/desktop, images have appropriate alt treatment and dimensions, and keyboard controls, Escape and focus return work. Reuse one image catalogue rather than copying homepage data.

## Epic 06 — Deliver rooms, services, identity and FAQs

**Description:** Assemble the core information pages using the shared shell and components.

**Depends on:** E04; follow the homepage review to reuse settled patterns.

**Why here / junior explanation:** These pages mostly use local content and established components, making them a good next step before asynchronous APIs and form delivery. They also provide real destinations for homepage links.

**Rule of thumb:** Build straightforward pages before integration-heavy ones, while keeping each page focused on a distinct user question.

- [ ] **E06-T01 — Build Rooms.** Show the three verified room tiers, useful comparisons, inclusions and approved pricing with links to each required room-detail page and booking links carrying room preference. Done when visitors can compare tiers, open each detail page and request a stay without unsupported availability claims.
- [ ] **E06-T02 — Build Services.** Compose photographic service cards and a factual amenity grid, with links to `/services/lounge`, `/services/massage-chair` and Our bar. Done when both new details are discoverable under Services in the page and navigation, every facility claim is supported and actions lead somewhere useful; distinguish the pool table from a swimming pool.
- [ ] **E06-T03 — Build About us.** Use story mosaics and property photography to explain identity, intended guests and the approved property story. Done when the page has original Dorchester copy, clear onward links and no fabricated history, awards or luxury claims.
- [ ] **E06-T06 — Build Basic room details and the shared template.** Create `/rooms/basic-double` with breadcrumbs, verified tier photos, description, inclusions, approved tariff, booking CTA carrying the room preference and links to other tiers. Done when the page works responsively and the reusable template reads from the same room catalogue as the listing; unknown slugs show 404. Confirm missing facts through E01-T03 rather than inventing amenities or occupancy.
- [ ] **E06-T07 — Build Standard room details.** Reuse the template from E06-T06 at `/rooms/standard-double`, with verified Standard photos, inclusions and tariff. Done when differences from Basic are clear, listing links work and the booking CTA passes the Standard preference without copying Basic content accidentally.
- [ ] **E06-T08 — Build Deluxe room details.** Reuse the template from E06-T06 at `/rooms/deluxe-double`, with verified Deluxe photos, inclusions and tariff. Done when differences from other tiers are clear and listing, related-room and booking links work; do not infer premium amenities from the tier name.
- [ ] **E06-T09 — Build FAQs.** Create `/faqs` from the existing FAQ source, grouping approved answers about stays, booking, facilities and arrival; link to booking/contact for unanswered questions. Done when all questions and answers are readable with keyboard and assistive technology, optional accordions expose expanded state correctly, and operational policies agree with the booking and legal pages.

- [ ] **E06-T10 — Build Lounge.** Create `/services/lounge` using the shared service-detail pattern, approved lounge photos, description and confirmed access/facilities information. Done when breadcrumbs lead back to Services, navigation and cards reach the page, and visitors can contact staff for questions; do not infer opening hours or amenities from the page name.
- [ ] **E06-T11 — Build Massage Chair.** Create `/services/massage-chair` using the same pattern, approved photography and verified availability, charges/session details and operator instructions where applicable. Done when the page is linked under Services and offers a genuine contact action; omit unconfirmed benefits, prices and usage claims.

## Epic 07 — Deliver bar and happy hour

**Description:** Give each dining and entertainment page a clear purpose while reusing the established visual language.

**Depends on:** E04 and approved dining content/assets from E01.

**Why here / junior explanation:** These pages share content patterns and links. Building them together helps check the journey from the bar overview to the current offer.

**Rule of thumb:** Group related content features, and choose a data structure that makes future edits simple. Business promotions need explicit conditions and a way to stop displaying expired claims.

- [ ] **E07-T01 — Build Our bar.** Introduce the actual bar experience, approved facilities and photography using reference story/card patterns. Done when visitors can reach happy-hour details and no opening hours are assumed; standalone food/drinks menus are outside the required scope.
- [ ] **E07-T04 — Build Cocktail happy hour.** Display verified days, times, applicable drinks, prices and terms using the shared promotional layout. Done when current status is explicit and an inactive/no-current-offer state avoids advertising an unverified or expired deal.

## Epic 08 — Complete booking, contact and review journeys

**Description:** Connect user intent to real staff or external services, with clear expectations and truthful outcomes.

**Depends on:** E03–E04 and E01-T04's confirmed workflow decisions; room preference comes from E06-T01.

**Why here / junior explanation:** An attractive form is only the visible part of a workflow. Delivery, validation and failure handling must work together. Building this after the content pages lets us test actual entry points rather than a form in isolation.

**Rule of thumb:** Trace every action through to its real outcome. A successful enquiry submission means the message was accepted, not that a room was booked.

- [ ] **E08-T01 — Build Make a booking.** Explain the request/confirmation process and connect a genuine approved channel or provider; accept and validate room/date preferences from site links. Done when a visitor can make a real request and sees honest availability/confirmation wording; direct contact/provider links are a valid delivery approach.
- [ ] **E08-T02 — Complete the selected delivery path.** Verify phone/email and the existing WordPress booking/contact form handoffs, including any supported preference transfer; arrange a delivery check for the original forms. Done when the chosen external path works without a fake success screen, guessed prefill parameters or exposed secret. No new React submission form/provider is required by the agreed workflow.
- [ ] **E08-T03 — Build Contact us.** Show usable phone/email/address links, a verified external map destination and the approved general enquiry method in the reference contact layout, linking booking requests to the booking page. Done when all destinations are verified and contact remains usable if any optional integration fails; this page holds useful location/arrival information without separate Location/Get directions routes.
- [ ] **E08-T04 — Build Leave a review.** Add a neutral invitation linking to `https://dorchesterinnke.com/reviews/`, the agreed existing WordPress private feedback form. Done when the handoff works and its wording distinguishes private feedback from a public review; offer the same option to all guests without filtering by sentiment or fabricated reviews. Public review-profile links are not required in this phase.
- [ ] **E08-T05 — Verify cross-page journeys.** Follow homepage/room booking links, Services-to-Lounge/Massage Chair links, bar-to-happy-hour links, Contact's external map action and footer contact/review links on desktop/mobile. Done when preferences survive supported handoffs and every visible action has an understandable result.

## Epic 09 — Integrate WordPress and deliver the blog

**Description:** Build a reliable data boundary, then use it for the blog listing, articles and homepage news.

**Depends on:** E02, E03 and the WordPress topology decision. The API spike can start after the shell while marketing pages progress.

**Why here / junior explanation:** Remote data introduces delays, missing fields and errors that local pages do not have. Proving one real post end to end first prevents building an entire blog around an incorrect API assumption.

**Rule of thumb:** Validate external data at the boundary, convert it into UI-friendly models, and design loading, empty and failure states alongside the successful screen.

- [ ] **E09-T01 — Prove one live WordPress post.** Configure the public API URL and verify a listing and slug request in the browser, including CORS and exposed pagination headers. Done when one genuine post is readable through the application without credentials and hosting assumptions are recorded.
- [ ] **E09-T02 — Implement the typed API boundary.** Add runtime validation, normalized models, cancellation/timeouts, status handling, query caching and missing-image fallbacks. Done when meaningful tests cover malformed responses, missing embeds, pagination and request failures; an empty slug result differs from a failed request.
- [ ] **E09-T03 — Build Blog and article routes.** Compose the reference-style listing and article layouts with real pagination, URL-backed search/category state, sanitized article HTML and responsive media. Done when Back/Forward and direct article links work, missing posts show 404, errors offer retry, and malicious HTML fixtures are rejected; related/share controls work if included.
- [ ] **E09-T04 — Connect homepage latest posts.** Reuse the normalized data and blog cards for three recent posts. Done when real posts link to working articles and loading, empty and API-failure states stay contained within the homepage section.

## Epic 10 — Audit the complete experience

**Description:** Resolve issues that only become visible when all pages and workflows are assembled.

**Depends on:** E05–E09, including live homepage news.

**Why here / junior explanation:** Individual components can pass their checks while a full page still has awkward reading order, overflowing text or inconsistent spacing. This is a cross-site audit, not the first time we test mobile or accessibility.

**Rule of thumb:** Test at component, page and journey levels. Compare large visual structure before polishing tiny shadows or icons.

- [ ] **E10-T01 — Audit responsive layouts and visual fidelity.** Review all 17 pages plus articles at 375–430, 768, 1280–1440 and 1600px; compare representative captures with the reference. Done when overflow, clipping, crops and major geometry discrepancies are resolved and deliberate deviations are documented.
- [ ] **E10-T02 — Audit accessibility.** Check keyboard navigation, focus order/visibility, menu/lightbox focus, labels/errors, contrast, reduced motion, 200% zoom and a screen-reader sample. Done when critical automated findings and manual blockers are fixed; automated scores alone are insufficient.
- [ ] **E10-T03 — Audit content and failure paths.** Review service details, tariffs, promotional status, asset rights and all contact/map/review links; exercise API outage, no results, missing imagery and unknown routes. Done when every page has reviewed content and failures give useful recovery without exposing placeholders.

## Epic 11 — Prepare search, performance and hosting

**Description:** Make the completed site discoverable, fast and safe to host alongside WordPress.

**Depends on:** Integrated pages from E05–E09; finalize after E10 fixes. Hosting/rendering investigation should start earlier through E01-T04 and E09-T01.

**Why here / junior explanation:** Routing and rendering decisions affect launch, so they are investigated early. Final metadata, asset budgets and redirects can only be verified properly once real pages and content exist.

**Rule of thumb:** Identify deployment constraints early, then validate them against a production build. A page working through in-app navigation does not prove that refreshing its URL will work on the host.

- [ ] **E11-T01 — Implement route metadata and crawlable output.** Add unique titles/descriptions, canonical/social data, factual structured data and sitemap coverage for all pages/articles. Complete a compatibility spike for the plan's prerender approach before adopting tooling. Done when selected routes expose correct initial HTML and article publication/rebuild behaviour is documented.
- [ ] **E11-T02 — Optimize production assets and loading.** Add appropriately sized responsive images, stable dimensions, selective lazy loading and limited self-hosted fonts. Done when production measurements document LCP/CLS and Lighthouse results against the plan's targets, with remaining constraints explained.
- [ ] **E11-T03 — Configure and verify hosting routes.** Implement GitHub Pages static route output/deep-link handling, genuine 404 output, supplied custom domain and correct Vite/router base; define article rebuild behaviour and settle Pages suitability before a live business launch. Keep WordPress on its existing host and preserve external form destinations. Done when direct requests/refreshes work, real browser CORS exposes pagination headers, and CMS access still works. Legacy redirect proposals remain deferred while the original site supplies forms/content; GitHub Pages does not configure old-host redirects.

## Epic 12 — Accept the release and hand over maintenance

**Description:** Demonstrate that the agreed scope is complete and make the result straightforward to operate.

**Depends on:** All preceding epics and resolved launch blockers.

**Why last / junior explanation:** Release acceptance checks the integrated product, not just a collection of completed tickets. Handover matters because services, offers, room details and blog content will change after launch.

**Rule of thumb:** Define completion with evidence and an owner for ongoing updates. Keep a rollback path before changing the live site.

- [ ] **E12-T01 — Run release acceptance.** Review the 17-page inventory, supporting article/404 routes and critical journeys on production-like hosting; run build/lint and the focused regression suite. Done when the results and visual/content approvals are recorded and no launch-blocking issue remains.
- [ ] **E12-T02 — Document operation and rollback.** Write setup, environment, build/deploy, WordPress publication/rebuild and rollback instructions; explain how to update services, tariffs, promotions and assets. Done when another developer can follow the instructions and content maintainers know where each update belongs.
- [ ] **E12-T03 — Prepare and execute the release.** Prepare the release checklist and preview evidence, then publish when deployment is authorized; verify production routes, forms/handoffs, maps, service details and blog afterward. Done when live checks pass and rollback details are available; until publication is authorized, record the release as ready, not deployed.

## Suggested first sprint goal

“Agree the content/reference map and demonstrate the shared shell plus the first homepage slice.” Select a realistic subset of E01–E04 for the team's capacity; do not treat four complete epics as an automatic sprint commitment. Review the slice together before committing to page-by-page polish.

## Project completion checklist

- [ ] All 17 requested pages and supporting article/404 routes are complete and reachable.
- [ ] Agreed colours and consistent reference-derived layouts are used throughout.
- [ ] Dorchester facts, assets, service details and promotions are approved; no development placeholders remain.
- [ ] Booking, contact, directions and review actions reach genuine destinations.
- [ ] WordPress content renders safely with useful loading, empty and failure states.
- [ ] Responsive, accessibility, SEO, performance and production-routing evidence is recorded.
- [ ] Maintenance, publication and rollback instructions are usable.
