# E03-T04 step 1: footer content and asset audit

Audited 28 October 2026. Documentation only; no application changes or new assets downloaded.

## Reference and brand direction

Reviewed the footer in the saved `docs/reference/kinsley/homepage-1440.png`. The reference has four columns: identity/description/socials, main links, secondary links and a six-image 3x2 grid. The identity column is wider than either link column. There is generous vertical padding, shared main-container alignment and a separate copyright strip. The recorded mobile pattern stacks/centres the columns and preserves the three-column thumbnail grid.

Use this arrangement as a reference, adapting to the 17-page scope. Retain the user's approved logo-navy `#030128` background rather than adding the reference's background photograph. Use explicit light heading/body/link colours; global base heading/link rules otherwise apply navy. Avoid copying demo branding, credits, social accounts or images.

## Content ready for layout

| Item | Source/status | Implementation direction |
|---|---|---|
| Identity | Existing crest at `src/assets/dorchester-logo.jpg`, 300x291px, opaque logo-navy backing | Preserve aspect ratio; pair with visible property name and one clear home-link accessible name. |
| Short description | [Public homepage](https://dorchesterinnke.com/) identifies a backpacker guesthouse with private rooms and an in-house bar/restaurant | Proposed concise paraphrase: “Private rooms for backpackers and budget travellers in Nairobi, with an in-house bar and restaurant.” Do not import luxury claims or unverified amenity promises. |
| Telephone | Public homepage and recorded workflow agree: +254 717 411 717 | Display readable number; link `tel:+254717411717`. No test call was made. |
| Email | Homepage and workflow agree: info@dorchesterinnke.com | Link `mailto:info@dorchesterinnke.com`. No delivery test was performed. |
| Address | Homepage/contact sources identify Outering Road, off Thika Road, opposite Qwetu Student Apartments, Ruaraka, Nairobi, Kenya | Use concise address text; do not infer coordinates, travel times or a precise verified map pin. |
| Product links | `src/content/navigation.ts` and catalogues provide all 17 requested destinations | Derive footer groups from shared data; retain review, room and service detail links when removing the development index. |
| Copyright | Use current year and Dorchester Inn identity | Do not copy Kinsley's historical year or developer attribution. No new credit link is required. |

Homepage reader returned a recently cached page; the contact page reader was substantially older. These are source observations, not owner confirmation of current business operations.

## Social destinations: source-linked, profile verification outstanding

The [existing contact page](https://dorchesterinnke.com/contact-us/) publishes these links:

- Facebook: `https://www.facebook.com/dorchesterinn`
- Instagram: `https://www.instagram.com/dorchesterinnkenya`
- YouTube: `https://www.youtube.com/@dorchesterinn`

Attempts to open the profiles returned reader cache misses. This does not establish that the accounts are unavailable or independently verify their current ownership. Keep them as source-derived candidates, then check profiles before treating the footer's social links as verified. Do not invent X, LinkedIn or WhatsApp destinations. Use named accessible links rather than unnamed icons.

## Legal links and map

The current homepage exposes [Privacy Policy](https://dorchesterinnke.com/privacy-policy/) and [Terms and Conditions](https://dorchesterinnke.com/terms-and-conditions/). The content map previously audited them; current reader attempts returned a cache miss and timeout respectively, not confirmed 404s.

No new legal routes exist in the React router. Preserve these as explicit original-site links once availability is checked; do not create broken local `/privacy-policy` or `/terms-and-conditions` links or fabricate replacement policies. The existing hosting decision keeps WordPress live. Policy/content review for the final site remains separate from linking to the current documents.

The recorded map URLs are address searches without verified place IDs. Keep directions on Contact; do not add an unverified map action to the footer solely to fill a column.

## Asset readiness and gallery gap

The repository has the usable crest, fonts, starter artwork and saved reference screenshots. No approved local property-gallery set or asset manifest was found. `hero.png`, React/Vite artwork and Kinsley screenshots are not approved Dorchester gallery assets.

Candidate property images linked by the current homepage include:

| Subject | Source path under `https://dorchesterinnke.com/wp-content/uploads/2024/04/` |
|---|---|
| Double room | `Dorchester-hotel-kenya-room-double-1024x768.jpg` |
| Pool table | `Dorchester-hotel-pool-table-1024x736.jpg` |
| Bar | `hotel-bar-1024x768.jpg` |
| Another bar view | `dorchester-hotel-Kenya-Bar-1-1024x768.jpg` |

Image fetches through the reader returned cache misses, so filenames do not prove dimensions, image contents or ownership. These are candidates only. The site's broader gallery also contains travel/food imagery; do not assume those are property photographs.

Before implementing a six-thumbnail grid, obtain/check suitable property images, usage approval, actual dimensions, crops and alt text. Reuse real fewer-image layouts or a deliberate gallery link if six suitable photos are unavailable; do not duplicate images merely to fill six cells or label a local grid as Instagram without an actual feed.

## Current code and next-step boundaries

`SiteLayout` currently renders only the temporary `DevelopmentNavigation` index and development-preview text in its footer. No `SiteFooter` or shared business-contact content module exists yet. The development style-sample link is already gated by development mode; keep that separation when replacing the footer.

Next, define the footer's groups/layout using the ready identity/contact content and shared routes, while explicitly tracking social/profile, legal availability and gallery-asset verification. Then implement `SiteFooter`; route focus/scroll work remains later in E03-T04. shadcn has been considered: the basic footer layout/links do not require an interactive primitive.

No build/lint run was necessary for this audit-only change. E03-T04 remains open; this audit does not claim all external destinations/assets are ready for publication.
