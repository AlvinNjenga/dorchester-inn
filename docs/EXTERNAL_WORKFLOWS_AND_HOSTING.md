# External workflows and hosting decisions

Decision date: 26 October 2026. Ticket: **E01-T04**. Planning decisions only; no deployment, DNS changes, form submissions or WordPress changes were made.

## Agreed approach

| Area | Decision | Implementation / verification |
|---|---|---|
| WordPress | Keep the existing site at `https://dorchesterinnke.com`. Read the public REST API at `https://dorchesterinnke.com/wp-json/wp/v2`. | Published content only; read-only GETs with `credentials: 'omit'`. No authentication, API key, application password or frontend secrets. Do not move the CMS or its media/admin paths for the temporary frontend. |
| Frontend | Temporarily host static output on GitHub Pages with a custom domain supplied later. | Build in GitHub Actions; publish `dist`. Domain, repository/Pages URL and DNS details remain deployment inputs, not reasons to stop layout work. Hosting suitability for a live business launch must be settled as noted below. |
| Booking | Phone/email plus the existing [WordPress booking form](https://dorchesterinnke.com/booking-enquiry/). | `/make-a-booking` explains the stay-request process and links to the existing form. Do not implement frontend POSTs or claim confirmed availability. |
| General enquiries | Phone/email plus the existing [WordPress contact form](https://dorchesterinnke.com/contact-us/). | `/contact` offers direct links and a clearly labelled handoff to the original form. No new form provider or backend is needed. |
| Feedback | Keep the existing [WordPress feedback form](https://dorchesterinnke.com/reviews/). | `/leave-a-review` explains that the action opens the existing feedback form. This is private guest feedback, not a public review-profile submission. No public review profiles are required for this phase. |
| Map | Reuse the existing site's map destination after checking it. | Exact embedded map queries extracted below. They are address searches, not verified place-ID pins; verify the resolved property location before publishing a new map link. |

Direct channels from the existing site: `tel:+254717411717` and `mailto:info@dorchesterinnke.com`. Existing forms remain hosted and processed by WordPress. Reading their public HTML confirms the visible form exists, not that email delivery succeeds; arranged delivery checks belong to E08.

Room/date preferences can be preserved within the new frontend and included in a properly encoded email draft. Do not assume the WordPress form supports query-string prefilling. Verify supported prefill parameters before using them; otherwise explain that guests enter preferences in the existing form. Clicking email opens the visitor's mail app and does not mean a message was sent.

## Authentication and CORS are separate

Public WordPress content does not need authentication. Browser requests from GitHub Pages/the new custom domain to `dorchesterinnke.com` still cross origins, so the API must send suitable CORS response headers. WordPress normally supplies these through [its REST CORS handler](https://developer.wordpress.org/reference/functions/rest_send_cors_headers/); no custom CORS configuration or proxy is planned unless a real browser check fails.

Earlier project research recorded reflected allow-origin and exposed pagination headers for public post/category requests. This is historical evidence, not a test from the future frontend domain. E09 verifies browser reads during development; E11 repeats from the actual hosting origin, including `X-WP-Total`/`X-WP-TotalPages` access. Do not use `mode: 'no-cors'`: an opaque response cannot supply readable JSON. A public API alone does not disable browser cross-origin checks.

Public configuration to add when the API feature is implemented:

```dotenv
VITE_WORDPRESS_API_URL=https://dorchesterinnke.com/wp-json/wp/v2
# VITE_SITE_URL is supplied once the custom domain is known.
```

No API call was made as part of this planning update; blog/article inspection remains outside the earlier content-audit scope.

## GitHub Pages constraints and route strategy

GitHub Pages serves [static HTML/CSS/JavaScript](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). It does not run the WordPress server, a form handler, an SSR server or a same-origin API proxy. Keep those responsibilities on the existing WordPress host.

Use build-time prerendering for the 17 required pages and published article routes, emitting route directories such as `services/lounge/index.html`. Browser-history navigation can then hydrate the same pages while direct links/refreshes have actual files to load. This is the target approach; the Vite-compatible prerender implementation and hosted URL behaviour must be proved in E11. Do not rely on Netlify `_redirects`, Nginx rules or a generic SPA fallback on Pages. Provide a genuine `404.html` recovery page rather than treating a copied SPA shell with a 404 response as correct routing.

The [Vite deployment guide](https://vite.dev/guide/static-deploy.html#github-pages) specifies `base: '/'` for a custom domain. If previewing first at `<owner>.github.io/<repository>/`, use the repository prefix for that build and keep router/link/asset paths aligned. Do not guess a repository name or hardcode the final domain now. Supply the custom-domain/HTTPS settings and canonical URL when known.

New WordPress articles need a rebuild to receive their own static route and initial HTML. Keep existing articles accessible on WordPress until regenerated routes are deployed; do not promise arbitrary new client-only article routes work on refresh. Select a manual dispatch or scheduled rebuild in E11; no authenticated publishing integration is required now.

GitHub's [Pages usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) restrict use as free hosting for running an online business or primarily facilitating commercial transactions. Record the requested host as temporary review hosting; before a public business launch, settle suitability or choose a host intended for that use. Temporary duration and a custom domain do not remove that restriction. No alternative host has been selected by this decision.

## Map evidence

Direct public HTML reads on 26 October 2026 returned HTTP 200 for both source pages:

- [Contact source](https://dorchesterinnke.com/contact-us/) embeds [this address search](https://maps.google.com/maps?q=Dorchester%20Inn%2C%20Kenya%2C%20Outering%20Road%2C%20Ruaraka%20Nairobi%2C%20Kenya&z=10&hl=en&t=m&output=embed&iwloc=near).
- [Location source](https://dorchesterinnke.com/location/) embeds [this similar address search](https://maps.google.com/maps?q=Dorchester%20Inn%20Kenya%2C%20Outering%20Road%2C%20Ruaraka%20Nairobi%2C%20Kenya&z=12&hl=en&t=m&output=embed&iwloc=near).

Both query Dorchester Inn on Outering Road in Ruaraka, Nairobi; zoom levels differ. No place ID or precise coordinates are encoded. E08-T03 must check the resulting destination against the property address/owner confirmation before converting it into the new external map action. Keep address and phone visible if that verification is pending; do not substitute guessed coordinates.

## Follow-ups and completion boundary

- **E08:** implement the selected handoffs, verify link destinations and map result, and arrange delivery checks for existing forms. No automated submission to the live forms during development.
- **E09:** implement read-only public WordPress access and verify browser CORS/pagination handling.
- **E11:** prove static deep links/404s, configure the supplied domain and build base, settle hosting suitability for launch, and define article rebuild/canonical behaviour.
- **Legacy URLs:** the original WordPress domain stays live. Do not activate content-map redirect proposals now, particularly `/booking-enquiry/`, `/contact-us/` or `/reviews/`, since the new frontend depends on them. Any later migration must replace the workflow before redirecting its destination. Old-domain redirects require control of that host; GitHub Pages cannot configure them.

E01-T04 is complete as a planning ticket: the API, hosting direction and user-facing external workflows are selected, and the remaining deployment/verification inputs have explicit owners. This does not claim that forms, maps, browser CORS or production deployment have passed implementation acceptance checks.
