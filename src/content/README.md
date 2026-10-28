# Local content

Store typed, approved property information here, such as room and service catalogues. Keep this data separate from UI components and route configuration.

Do not add invented facts or duplicate WordPress articles here. `rooms.ts` and `services.ts` currently contain routing identities only, not verified property details.

`navigation.ts` owns the shared header groups, booking CTA and secondary links defined in `docs/E03-T02-navigation-map.md`. Room/service links are derived from their catalogues. A discriminated `kind` distinguishes direct links from disclosure groups; groups may have an overview destination, while Discover has none. Stable group IDs are available for later disclosure controls.

`navigationDestinations` flattens these entries into one link per URL for the existing development footer. It preserves top-level labels when an overview also appears inside a dropdown. The style-sample link remains separate and development-only. Article links are supplied by Blog rather than enumerated in this configuration. Active-state matching and dropdown behaviour belong to UI implementation, not this content module.
