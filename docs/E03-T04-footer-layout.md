# E03-T04 step 2: footer layout and link groups

Defined 28 October 2026 from the footer audit and current navigation data. This is the implementation specification for step 3; no application styling or components change in this step.

## Layout

Use four desktop columns within the existing centred 1220px container:

| Column | Contents |
|---|---|
| Identity | Crest/home link, Dorchester Inn name, concise guesthouse description and a Gallery text link. Add named social links only after profile verification. |
| Stay with us | Booking, room overview/details and service overview/details (eight links below). |
| Explore and help | Home, bar/promotion, property information and guest-help destinations (nine links below). |
| Get in touch | Address text, telephone link, email link and Contact us link. No unverified map or WhatsApp action. |

The wider identity/contact blocks balance two narrower navigation columns. Use ordinary Tailwind grids, gaps and typography; shadcn is unnecessary for this static structure.

Use logo navy (`bg-brand-logo`) for the full footer, explicit white headings/links and ivory body text. Keep gold accents restrained and retain visible keyboard focus. Pale separators can be decorative, but must not be the only link/focus indicator. Keep headings locally styled so base navy heading rules do not create navy-on-navy text.

Main padding: `py-16 lg:py-24`; column gaps: `gap-10 lg:gap-12`. Begin with one centred column at 390px, two columns at 768px and four at 1440/1600px. Keep address/text measures bounded and allow email/long labels to wrap. Do not introduce an accordion just to shorten the mobile footer.

## Link coverage

### Stay with us

1. Make a booking — `/make-a-booking`
2. Rooms — `/rooms`
3. Basic Double Room — `/rooms/basic-double`
4. Standard Double Room — `/rooms/standard-double`
5. Deluxe Double Room — `/rooms/deluxe-double`
6. Services — `/services`
7. Lounge — `/services/lounge`
8. Massage Chair — `/services/massage-chair`

### Explore and help

1. Home — `/`
2. Our bar — `/our-bar`
3. Cocktail happy hour — `/cocktail-happy-hour`
4. About us — `/about-us`
5. Gallery — `/gallery`
6. Blog — `/blog`
7. FAQs — `/faqs`
8. Contact us — `/contact`
9. Leave a review — `/leave-a-review`

Together these two lists cover all **17 distinct required destinations**, independent of the header. The identity home/Gallery links and contact-column Contact link are useful contextual duplicates; they do not replace coverage in the navigation lists.

Derive links from `navigationDestinations` and group identities/catalogues rather than copying their labels/slugs into `SiteFooter`. A small typed footer grouping belongs in the shared navigation content module. Missing group entries should be discovered during validation, not silently filtered out. Blog articles are discovered through Blog rather than enumerated here.

Use semantic labelled navigation regions for the two link groups and ordinary lists. Use exact current-page matching; do not mark Rooms current on room-detail pages.

## Contact and identity content

Use the existing crest at its original aspect ratio, with a modest approximately 64px display height and visible Dorchester Inn text. Avoid repeated accessible names when the crest and name share one link.

Description: use the audit's short factual paraphrase, without star ratings, luxury claims or unconfirmed amenities. Contact values come from a small typed business-content module with source notes; the footer consumes it instead of embedding contact literals in JSX.

Phone target: `tel:+254717411717`. Email target: `mailto:info@dorchesterinnke.com`. Use the audited address as text, not an unverified location link.

## Gallery, socials and legal material

The reference uses six photographs in its fourth column. We deliberately use contact information there because approved local photographs are currently unavailable. The initial footer's Gallery text link is a real destination; no empty boxes, fake Instagram feed or repeated stock photos are needed.

Once suitable approved property images are collected, a three-column thumbnail grid can be introduced as an additional identity/gallery treatment and reviewed for balance. Do not reserve an empty visual section now. If thumbnails repeat a Gallery destination, avoid creating many identical keyboard stops without a useful reason.

Social links remain omitted until their source-derived profiles have been verified. Do not display a heading or empty icon row for unavailable links.

Add a bottom strip separated by a subtle light border: current year/property copyright and Privacy Policy/Terms links on the original WordPress site once availability is verified. Do not link to nonexistent local legal routes. Keep missing legal-link verification tracked for ticket closure rather than presenting it as complete. Stack the strip on mobile and align it horizontally when space permits.

## Integration and scope

Step 3 creates `SiteFooter` and its shared content data. Step 4 replaces the current development footer in `SiteLayout`; retain any needed development index/style-sample access in a separate development-only area. The public footer must not contain development-preview copy or implementation notes.

Route focus, scrolling and skip-link behaviour remain steps 5-6. Step 7 verifies the link coverage, external destinations, contrast, keyboard traversal and four required review widths. E03-T04 remains open.
