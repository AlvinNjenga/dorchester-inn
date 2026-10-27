# E02-T03 local browser verification

Date: 27 October 2026. Step 9 local verification passed in installed Google Chrome, automated with a temporary Playwright Core installation. Project dependencies were not changed. The test server used `http://127.0.0.1:5174`.

## Results

- All 17 required URLs rendered their correct heading, shared header and footer at 390px and 1440px widths: 34 successful checks, with no horizontal overflow.
- All 17 development-navigation links opened the correct page and indicated exactly one current destination.
- `/blog/example-article` rendered the article placeholder and slug, including after refresh.
- `/does-not-exist`, `/rooms/unknown`, `/services/unknown` and `/blog/a/b` rendered the recovery page with a Home link.
- Browser Back/Forward navigation passed.
- Tab reached the visible skip link, Enter focused the main region, navigation links had focus outlines and keyboard activation opened the correct page.
- Delaying the Gallery module download displayed the loading status, followed by the page.
- Intentionally aborting the Gallery module download displayed the error boundary; its Home link successfully recovered. Network errors in that deliberately failed-download scenario are expected.
- No uncaught JavaScript errors occurred in the ordinary route checks.
- Reviewed the 390px and 1440px homepage screenshots: text and navigation were readable and the development index stacked into one or three columns respectively.
- Build and lint passed after the latest application change (step 8). They were not repeated solely for these evidence files.

## Evidence and rerunning

- [Raw browser results](browser-results.json)
- [390px screenshot](routing-390.png)
- [1440px screenshot](routing-1440.png)
- [Browser check script](check.cjs)

The script uses the installed Windows Chrome path and port 5174. Start Vite with `npm run dev -- --host 127.0.0.1 --port 5174 --strictPort`. Install `playwright-core` in a temporary directory, set `NODE_PATH` to that directory's `node_modules`, then run `node docs/validation/e02-t03/check.cjs`. It writes its JSON and screenshots beside the script. No browser download is required when the configured Chrome installation exists.

## Limits and remaining work

This verifies local Vite behaviour. Its SPA fallback lets direct URLs work locally; it does not prove GitHub Pages direct requests, HTTP status codes, repository-prefix assets or prerendered output. Those checks remain in E11, with the approach recorded in [the routing decision](../../E02-T03-routing-decision.md).

This is not a cross-browser or assistive-technology audit. Automatic route focus/scroll management and the full branded navigation remain Epic 3 work. Step 10 documentation and final ticket closure follow separately.
