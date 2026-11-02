# E04-T02 catalogue validation

Reviewed 1 November 2026 in local Chrome at `/__style-sample`.

Follow-up: amenities now use four columns from 1024px, with one/two columns on mobile/tablet. Room/service grids remain one/two/three columns. The browser check and captures were refreshed; TypeScript and focused lint passed.

Implemented typed room/service/amenity content, CatalogueGrid, RoomCard, ServiceCard and AmenityTile. Examples use owner-approved fixed USD/KES nightly prices, source-mapped room photos, confirmed service descriptions and labelled development placeholders for photos the owner will supply later. Long-content and omitted-optional-detail variations are separate from shared catalogue data.

## Evidence

- [Repeatable browser check](check-catalogue.cjs) and [results](results.json).
- Rooms: [mobile](rooms-390.png), [tablet](rooms-768.png), [desktop](rooms-1440.png), [wide desktop](rooms-1600.png).
- Services: [mobile](services-390.png), [tablet](services-768.png), [desktop](services-1440.png), [wide desktop](services-1600.png).
- Amenities: [mobile](amenities-390.png), [desktop](amenities-1440.png).
- Variations: [mobile](variations-390.png), [desktop](variations-1440.png).

TypeScript, production Vite build and ESLint passed. Browser checks passed at 390/768/1440/1600px: one/two/three columns, decoded room images, exact approved prices, six keyboard destinations per width (24 journeys), heading order, unique IDs, no horizontal overflow, missing service photos, omitted practical details and decorative/noninteractive amenity icons. Doubling root font size at 390px produced no horizontal overflow; this is text resizing, not browser zoom. No uncaught page errors occurred. Representative desktop/mobile captures were visually reviewed for room crops, readable wrapping and card geometry. Some captures include the keyboard skip-link overlay; it is existing shell UI, not card content.

Reproduce with Vite on `127.0.0.1:5173` and `node docs/validation/e04-t02/check-catalogue.cjs`. Playwright Core is resolved through `NODE_PATH=C:/Users/alvin/AppData/Local/Temp/dorchester-routing-check/node_modules`; Chrome uses its installed Windows path. No project browser dependency was added. Build/lint used the installed Node v26.12.0 executable directly because the npm launcher has no active version configured.

## Limits and follow-up

- Lounge, Massage Chair and Bar photographs are pending owner supply. Their photo loading/crops are not verified; development placeholders must be replaced before launch.
- Standard and Deluxe share the original site's image files; this is documented in [room image audit](../../ROOM_IMAGE_AUDIT.md), not evidence of distinct physical room appearances.
- Taxes, meal inclusions, occupancy and room size remain omitted. Massage prices/discount amount and happy-hour schedule remain unconfirmed. See [content decisions](../../CATALOGUE_CONTENT_DECISIONS.md).
- Card headings use scoped synthetic bold because only Cormorant 500/600 are currently self-hosted. Replace with a real 700 font file if final typography requires that weight.
- User-requested ringless action focus and form focus styling remain an E10 accessibility review item. Passing keyboard activation does not prove adequate focus contrast. Screen-reader, cross-browser and full contrast audits were not performed here.
- Product Rooms/Services/detail pages remain placeholders; these catalogue components are demonstrated only on the development page. Carousel behaviour is outside this ticket.

E04-T02's reusable data/cards/grids and factual responsive example requirements are met, with the asset/content limitations above explicit.
