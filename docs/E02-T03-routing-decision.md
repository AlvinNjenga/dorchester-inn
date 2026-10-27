# E02-T03 routing approach

Recorded: 26 October 2026. Steps 1 and 2 complete; router package installed, application routing not yet changed.

## Router installation and validation

Installed exact runtime dependency `react-router@8.5.0`, updating `package.json` and `package-lock.json`. The official [Data Mode installation guide](https://reactrouter.com/start/data/installation) supports adding this package to an existing Vite app; no framework-mode tooling or separate `react-router-dom` package was added.

Fresh npm registry metadata declares Node >=22.22.0, React/React DOM >=19.2.7, and React/React DOM types >=19.2.0. The selected Node 26.12.0, installed React/React DOM 19.3.1 and types 19.3.0 meet those requirements. The router package declares no Vite peer requirement; the existing Vite 8.3.5 build passed after installation.

Validation: `npm run build` and `npm run lint` both passed. npm reported zero vulnerabilities during installation. This validates dependency installation, not route behaviour; route wiring and navigation checks remain in subsequent steps.

## Decision

Update, 27 October 2026: at the user's request, room-detail destinations share `RoomDetailsPage` at `/rooms/:roomSlug`; Lounge and Massage Chair share `ServiceDetailsPage` at `/services/:serviceSlug`. Typed local catalogues currently contain only the agreed slugs and labels. Unknown slugs raise a route 404 error; route error handling will be wired with the router. The 17 destinations remain unchanged, with lazy boundaries per shared page module rather than per detail URL. Prerendering must enumerate the known detail URLs from these catalogues.

Follow the existing hosting decision: React Router browser-history routing, a shared layout and lazy page modules. Target build-time prerendered HTML for the 17 required pages and published article paths on temporary GitHub Pages hosting. Emit a real `404.html` recovery page. See [EXTERNAL_WORKFLOWS_AND_HOSTING.md](EXTERNAL_WORKFLOWS_AND_HOSTING.md).

Client navigation and direct requests solve different problems. React Router handles navigation after JavaScript loads; a direct visit or refresh first asks the host for a file. For `/services/lounge/`, the target build must provide `services/lounge/index.html`. A plain Vite SPA build does not produce those route files automatically.

E02-T03 establishes the route tree and local placeholder behaviour. Prerender tool selection, generated output, direct nested requests, HTTP statuses and trailing-slash behaviour must be proved in E11 before Pages deployment is considered ready. Keep initial component rendering compatible with prerendering: do not access browser-only globals at module scope or during initial render. Do not confuse a working Vite development fallback with hosted route support.

Use `/` as the asset base for root/custom-domain hosting. For a repository-path preview, supply the actual repository prefix to both Vite's asset base and the router basename. The repository and domain are not yet supplied; do not invent them.

Published article paths must be enumerated at build time; new WordPress articles require a rebuild for direct static access. Keep the original WordPress article URLs accessible during migration. `/blog/:slug` placeholder navigation does not prove arbitrary article paths exist on the static host.

## Alternatives

| Approach | Does it work? | Reason for not selecting it here |
|---|---|---|
| Browser routing with only a single `index.html` | Works with a host configured to serve that shell for valid nested routes | GitHub Pages does not provide the arbitrary SPA rewrite configuration this requires; direct nested requests can return 404 |
| Hash routing, such as `/#/rooms` | Works on static hosting because the fragment is not sent to the host | Changes the agreed clean URL structure and does not produce page-specific initial HTML by itself |
| Use the SPA shell as `404.html` | Can recover a client view after a missing-file response | A valid page initially returning HTTP 404 is not the intended deployment behaviour |
| Server-side rendering on each request | Works on a host with the required runtime | GitHub Pages serves static output and cannot run that application server |
| Another static host with SPA rewrites | Viable if hosting is changed | Changes the selected temporary host; no need to switch hosts for local route work |
| Separate hand-written HTML pages | Works on static hosting | Duplicates shared layout work unless generated from shared templates; prerendering reuses the React pages |

React Router framework-mode prerendering is one possible implementation, not a feature enabled automatically by adding the router package to this Vite app. Assess its build and compiler-plugin implications before selecting a prerender implementation. Framework mode is not selected by this decision.

## Sources

- [React Router hash routing](https://reactrouter.com/api/declarative-routers/HashRouter)
- [React Router prerendering and static hosting](https://reactrouter.com/how-to/pre-rendering)
- [GitHub Pages static hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub Pages custom 404 pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)
- [Vite GitHub Pages deployment and base paths](https://vite.dev/guide/static-deploy.html#github-pages)
