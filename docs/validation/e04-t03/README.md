# E04-T03 contact and service-detail patterns

Completed implementation and local validation on 2 November 2026. This ticket builds reusable patterns, not the finished Contact/Lounge/Massage Chair product pages.

## Delivered

- `ContactTile`: labelled article, decorative icon, selectable contact value and optional native/internal action. Phone/email/address examples consume shared business data on `/__style-sample`.
- `ServiceDetail`: extends the existing service record with optional paragraphs, reusing image metadata and practical details without duplicating service facts.
- `ServiceDetailLayout`: one H1, Home/Services breadcrumbs, responsive photograph/description, optional practical information and supplied contact action. Missing photos are labelled development placeholders; empty practical/contact sections are omitted.
- Development-only previews: `/__service-sample/lounge`, `/__service-sample/massage-chair`, `/__service-sample/content-check` and `/__service-sample/minimal`. Links are on the style sample. The content-check image is explicitly a supplied Royal Suburbs fixture, not a service photo. Invalid preview slugs return the shared 404 recovery view through a route loader.

## Validation results

| Check | Result | Evidence / scope |
|---|---|---|
| TypeScript, Vite production build, ESLint | PASS | Final commands exited 0 after the unknown-preview loader fix |
| Four viewport widths | PASS | 390, 768, 1440 and 1600px; four detail variants at each width; no horizontal overflow |
| Long copy and omitted optional fields | PASS | Long title/prose/contact label; minimal variant omits practical details, extended paragraphs, image and contact action |
| Semantics and keyboard | PASS for tested behaviour | One H1, no skipped H1/H2 levels, breadcrumb current state; 16 keyboard journeys back to Services; phone-to-email Tab order |
| Pointer links/history | PASS | Eight Lounge/Massage Chair contact journeys and history returns; destinations remain existing product placeholders |
| Contact values | PASS | Correct `tel:+254717411717` / `mailto:info@dorchesterinnke.com`, selectable values, informational address without guessed map link |
| Image branch | PASS with fixture | Royal Suburbs fixture decodes at 500px natural width; aspect-ratio layout reviewed. No actual service photography tested |
| Text enlargement | PASS | Root font size doubled at 390px on style sample, long fixture and minimal preview; this is not browser zoom |
| Production exclusion | PASS | Built JavaScript excludes `__service-sample`, `ServiceDetailSamplePage`, fixture copy and `__style-sample` |
| Runtime errors | PASS | No uncaught browser page errors in final run |
| Text/action colour contrast | PASS for measured palette pairs | Navy on gold 10.17:1; navy on focused gold 9.05:1; muted text on white 6.85:1 and ivory 6.23:1. This is not a complete accessibility audit |
| Action focus visibility | KNOWN LIMITATION | Existing user-requested ringless focus changes gold to deeper gold: only 1.12:1 contrast between states. Do not treat keyboard activation success as an adequate focus-indicator pass; address in E10-T02 |

The first unknown-preview test failed because a render-thrown data result did not select the 404 boundary. Validation moved into the development route loader; the final rerun passed. No failure was hidden or waived.

## Missing information and checks not completed

| Item | Status / next action |
|---|---|
| Lounge and Massage Chair photographs | MISSING: owner will supply. Replace development placeholders and review real crops/alt text before publishing |
| Lounge facilities, access hours and non-guest access | MISSING: only included access/no extra charge is confirmed. Fuller operational claims omitted |
| Massage price, discount amount, instructions and access hours | MISSING: only 15–30-minute sessions and a staying-guest discount are confirmed; prices explicitly pending |
| Map destination | NOT VERIFIED: address tile has no directions action. Exact property-result verification remains E08-T03 |
| Phone/email delivery | NOT PERFORMED: hrefs and keyboard focus checked; no call placed, email sent or mail-app integration tested |
| WordPress form delivery | NOT PERFORMED: no new form or submission integration; remains E08 |
| Actual browser zoom, screen reader, other browsers and real touch hardware | NOT PERFORMED: local headless Chrome and doubled text only |
| Reference fidelity | ADAPTATION: follows documented three-contact-tile and saved title/story patterns. No fresh live service-detail baseline captured; geometry is a deliberate reusable adaptation |
| Finished service/contact pages | OUTSIDE THIS TICKET: existing product routes remain placeholders for E06/E08 |

## Evidence and reproduction

- [Browser checker](check-patterns.cjs) and [recorded results](results.json).
- Contact tiles: [mobile](contacts-390.png), [tablet](contacts-768.png), [desktop](contacts-1440.png), [wide](contacts-1600.png).
- Lounge: [mobile](lounge-390.png), [desktop](lounge-1440.png).
- Massage Chair: [mobile](massage-chair-390.png), [desktop](massage-chair-1440.png).
- Long content/image fixture: [mobile](content-check-390.png), [desktop](content-check-1440.png).
- Missing optional fields: [mobile](minimal-390.png), [desktop](minimal-1440.png).

Representative desktop/mobile captures were visually inspected for text wrapping, photo arrangement, spacing and missing-field readability. Some screenshots retain the existing focused skip-link overlay during programmatic route/capture work; it is shell UI, not service content.

Run Vite at `127.0.0.1:5173`, set `NODE_PATH` to the existing `C:/Users/alvin/AppData/Local/Temp/dorchester-routing-check/node_modules`, and run `node docs/validation/e04-t03/check-patterns.cjs`. Chrome uses its installed Windows executable path. Build/lint used the installed Node v26.12.0 executable directly; no dependencies or package scripts were added. Source decisions remain in [catalogue content decisions](../../CATALOGUE_CONTENT_DECISIONS.md) and [external workflows](../../EXTERNAL_WORKFLOWS_AND_HOSTING.md).
