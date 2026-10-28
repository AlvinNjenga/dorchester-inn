# shadcn/ui in this project

Installed 28 October 2026 using the [official existing-project/manual setup](https://ui.shadcn.com/docs/installation/manual). Existing Vite, React, Tailwind v4, strict TypeScript and Dorchester styling are retained.

## Adding a component

Run `npm run ui -- add dialog` (replace `dialog` with the component needed). The project uses `components.json`, the `new-york` registry style, TypeScript and Lucide icons. Generated UI source belongs in `src/components/ui`; import `cn` from `@/lib/utils`. Dependencies for a specific primitive are installed when that component is added.

Review generated changes before using them. Do not rerun initialization or overwrite existing CSS/configuration to add a component. Keep the current lockfile; use ordinary npm resolution rather than force/legacy-peer-deps flags. The locally installed CLI is a dev dependency and can be run using the `ui` script.

## Choosing components

Consider shadcn before writing new interactive controls, especially Dialog, Alert Dialog, Popover, Select and other complex form interactions. Its accessibility behaviour is useful, but still verify keyboard support, focus management, responsive layouts and contrast. Add only the current ticket's components; no whole-library installation is needed.

Keep simple layouts and standard HTML controls when they already meet the design. Preserve the existing header/navigation. The mobile reference uses a non-modal dropdown beneath the header; a modal Sheet would change its behaviour and should only be used if the design calls for that.

## Styling

`src/styles/tokens.css` remains the single source of custom design values. Existing palette names (`primary`, `background`, `border`) are unchanged. Additional semantic colour names needed by generated components reference those values through a small `@theme inline` block; there is no duplicated palette or `hotel-` namespace.

Primary means interface navy with white foreground; secondary means gold with navy foreground. Use the gold/secondary treatment for booking actions. Card/popover use white with navy text; input boundaries use the stronger muted-text colour. A destructive red is reserved for errors/destructive actions. Verify actual combinations when used.

Keep Tailwind's existing spacing and radius defaults. Do not copy a registry's global radius reset, neutral palette, blanket border reset or dark-mode theme over the agreed website styles. Animation helpers are imported through `src/index.css`. `@/lib/utils` re-exports the official `cn` helper for consistent class merging.

The project remains a light theme with explicit navy header/footer surfaces. Dark shadcn variants are not an implemented site-wide dark mode. Dialogs rendered through portals need their own correct surface/text classes.

Persistent agent guidance lives in the root `AGENTS.md`; shared-component notes also point here. Installation does not migrate the existing header or add unused product UI.

## Setup verification

Installed CLI version: 4.23.0. `npm run ui -- info` correctly reports Vite, Tailwind v4, TypeScript, Radix/new-york, the existing `@` alias and configured source paths. No UI primitives have been generated yet. Build, lint and `cn` class-merging checks passed. Desktop disclosure checks passed at four widths, and the full mobile navigation checks (17 destinations, dismissal, focus, scrolling, resizing and text resizing) passed after the CSS imports were added. Existing validation scripts are in `docs/validation/e03-t02` and `docs/validation/e03-t03`.
