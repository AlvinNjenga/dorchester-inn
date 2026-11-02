# Local content

Store typed, approved property information here, such as room and service catalogues. Keep this data separate from UI components and route configuration.

`ServiceDetail` extends a catalogue service with optional paragraph prose. The detail layout receives the same service facts and an explicit contact action from its caller. Current short Lounge/Massage Chair records remain the source for previews; development stress fixtures do not alter them. Missing facts/photos and validation limits are recorded in `docs/validation/e04-t03/README.md`.

Do not add invented facts or duplicate WordPress articles here. `rooms.ts` contains stable routing identities, factual minimal descriptions, source-mapped lead images and owner-approved fixed USD/KES nightly prices. These are independent displayed amounts, not exchange calculations. Tax, meal, occupancy and size claims are omitted until confirmed. Standard and Deluxe deliberately share the original site's lead image; all gallery source mappings remain in `docs/room-image-sources.json` for later detail-page work.

`services.ts` preserves Lounge/Massage Chair routing identities and adds approved descriptions/practical details. Optional images are absent while awaiting owner photos. `serviceCatalogue` adds Our bar for cards, with its actual `/our-bar` destination, without creating a new `/services/bar` route or navigation entry. No happy-hour schedule, massage price or discount amount is inferred. `catalogue.ts` defines shared image/amenity types and a small supported amenity list; icons are descriptive keys for the UI to render, keeping React out of content data. Sources/limits are recorded in `docs/CATALOGUE_CONTENT_DECISIONS.md` and `docs/ROOM_IMAGE_AUDIT.md`.

`navigation.ts` owns the shared header groups, booking CTA and secondary links defined in `docs/E03-T02-navigation-map.md`. Room/service links are derived from their catalogues. A discriminated `kind` distinguishes direct links from disclosure groups; groups may have an overview destination, while Discover has none. Stable group IDs are available for later disclosure controls.

`navigationDestinations` flattens these entries into one link per URL for the existing development footer. It preserves top-level labels when an overview also appears inside a dropdown. The style-sample link remains separate and development-only. Article links are supplied by Blog rather than enumerated in this configuration. Active-state matching and dropdown behaviour belong to UI implementation, not this content module.

`footerNavigationGroups` derives the two public footer lists from those same destinations and named header groups, removing duplicate overview URLs. It throws for missing required group/destination definitions so configuration mistakes are visible. `business.ts` supplies source-noted identity/contact information; pending socials, map and legal destinations are not guessed or added to it.
