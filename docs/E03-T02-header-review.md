# E03-T02 step 1: reference header and logo review

Reviewed 28 October 2026 using the local logo and saved Kinsley homepage captures. No reference website requests were made.

## Available crest

Use `src/assets/dorchester-logo.jpg`: a 300 x 291px JPEG with gold crown/laurel, white monogram and an opaque navy backing. Sampled corner pixels are RGB(3, 1, 40), exactly the existing `--color-brand-logo: #030128`. Small interior variations are consistent with the JPEG artwork; it is not a transparent vector logo.

Import the existing image through Vite. Preserve its 300:291 ratio with explicit intrinsic dimensions and `object-contain`; do not crop, stretch, recolour or recreate it. Start with a displayed height around 64px (width approximately 66px), then review legibility. This stays below its source dimensions, including at 2x pixel density. A higher-resolution original would help larger placements but is not required to proceed with the header.

The crest contains a monogram rather than the full property name. Pair it with visible Dorchester Inn text where space allows and give the home link one clear accessible name without repeating it through both image alt text and adjacent text.

## Reference geometry

The saved 1440px homepage capture shows a full-width white header, approximately 80px tall, with logo left, navigation centrally arranged and booking action right, aligned to an approximately 1220px content width. Navigation is compact, the booking action is a pill and the active page has an underline. The demo cart and floating toolbar are excluded from our implementation.

The saved 390px capture hides full desktop navigation and uses a compact logo/menu arrangement. Mobile menu behaviour belongs to E03-T03. Sticky behaviour cannot be established from a screenshot and is not assumed in this step.

## Agreed brand adaptation

The user requested the logo colour for the header and footer where it works. Use `bg-brand-logo` (`#030128`) as the direction for both. It visually joins the crest backing to the surrounding surface and frames the ivory page content.

- Header: light navigation and identity text (`text-surface` or `text-background`), gold booking CTA with navy text, clear active underline and two-colour focus.
- Dropdowns: use explicit surface/text classes so the global navy link defaults never become navy-on-navy. Final panel treatment will be reviewed with the desktop implementation.
- Footer: carry the same navy surface into E03-T04, with explicit light headings/links/body copy. Prefer restrained borders over a background photograph behind the crest.
- Do not rely on a parent's light text class alone: current base heading/link rules explicitly set navy and require local overrides on dark surfaces.
- Keep the existing shared 1220px container and Tailwind sizing/spacing. Aim for an 80-96px desktop header, allowing a 64px crest with adequate padding. Any increase over the reference's approximate 80px height is a deliberate accommodation of the Dorchester crest.

Palette calculations: white on logo navy is approximately 20:1; ivory also exceeds 4.5:1. Navy text on the existing gold action is 10.17:1. Actual rendered states, dropdowns and focus still require validation during implementation.

This step records the asset and visual direction only. The application header/footer have not yet been rebuilt or recoloured. Next: define the navigation groups, then shared navigation data and header implementation. E03-T02 remains open.
