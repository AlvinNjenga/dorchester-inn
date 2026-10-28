# Self-hosted fonts

Downloaded 27 October 2026 from Fontsource 5.3.0 packages via jsDelivr:

| Family | Normal weights | Source |
|---|---|---|
| Inter | 400, 500, 600 | https://www.jsdelivr.com/package/npm/@fontsource/inter?version=5.3.0 |
| Cormorant Garamond | 500, 600 | https://www.jsdelivr.com/package/npm/@fontsource/cormorant-garamond?version=5.3.0 |

Each family directory retains the package's `LICENSE` (SIL Open Font License 1.1). The WOFF2 files are unmodified Latin subsets from `files/<family>-latin-<weight>-normal.woff2`. No package dependency or external runtime font request is required.

`src/styles/fonts.css` registers the exact weights using `font-display: swap`. Vite processes the relative URLs and emits hashed font assets with the production build. The theme's body and heading stacks retain system sans and Georgia/Times fallbacks. Characters outside these files' coverage fall back to those fonts.

Only normal styles are supplied. Do not request unsupported weights or italics for these families without adding the corresponding licensed files; global `font-synthesis: none` prevents synthetic faces. No preloads are added before measuring a real page's critical font use.

Step 4 verification: checked WOFF2 file signatures and local references, and ran build/lint. Browser font-load and blocked-font fallback checks remain part of the temporary style-sample validation. Global application of the fonts belongs to step 5.
