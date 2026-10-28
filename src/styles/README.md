# Shared styles

`tokens.css` defines custom values directly in Tailwind's `@theme`. There is no separate mapping file or `hotel-` prefix. For example, `--color-gold` supplies `bg-gold`, `text-gold` and `border-gold`; `--font-heading` supplies `font-heading`.

Prefer Tailwind defaults wherever they achieve the design:

```tsx
<section className="bg-surface px-5 py-12 md:px-8 lg:px-10 lg:py-20">
  <h1 className="font-heading text-h1 text-primary">Dorchester Inn</h1>
  <button className="min-h-11 rounded-full bg-gold px-6 font-medium text-primary">
    Make a booking
  </button>
</section>
```

Licensed, self-hosted fonts are registered by `fonts.css`: Inter 400/500/600 and Cormorant Garamond 500/600, all normal styles, with `font-display: swap`. See the [font provenance and licences](../assets/fonts/README.md).

- Spacing: `gap-6`, `px-5 md:px-8 lg:px-10` for gutters, `py-12 lg:py-20` for regular sections, `py-16 lg:py-24` for larger sections.
- Radii: `rounded-sm` for images, `rounded-lg` for cards, `rounded-xl` for grouped surfaces, `rounded-full` for actions.
- Weights: `font-normal`, `font-medium`, `font-semibold`.
- Small text: `text-sm/normal` for navigation and `text-xs/normal` or `text-sm/normal` for metadata (line height 1.5).
- Custom design values: `shadow-card`, `max-w-main`, `max-w-article`, `max-w-prose`.

Custom heading/body sizes include line heights and update at the desktop breakpoint. Ordinary CSS references the same variables, such as `color: var(--color-primary)`. No additional aliases are needed.

Use navy (`primary`) text on gold actions, white (`surface`) on dark navy surfaces, and muted text as a stronger control border. Gold-muted and border colours are decorative.

Removed unused semantic aliases and speculative component-library variables. Add semantic roles only when an actual component needs them. This simplifies the earlier plan's proposed shadcn mapping; no component library is currently installed.

`base.css` applies the fonts, light palette, responsive typography, link defaults and control font inheritance. It preserves the browser-controlled root size and full-height app layout. Keyboard focus combines a white inner band and navy outer outline, with a system-colour outline in forced-colour mode.

`components.css` contains three repeated patterns:

- `site-container`: centred 1220px cap with 20/32/40px minimum gutters. Place once inside a full-width band; do not add horizontal padding or nest containers. The current main element already provides it. Future full-bleed sections will need their own inner container instead.
- `button-primary`: navy text on gold, pill shape, 44px minimum height, hover underline and disabled styling. Use a native button for actions and a link for navigation. `aria-disabled` only styles a link; callers must implement its disabled behaviour if needed. Native disabled buttons need no extra handling.
- `form-control`: labelled text inputs, selects and textareas; 44px minimum height, white fill and a stronger muted-text border. Keep labels visible and associate help/errors using IDs. This class does not apply to checkboxes/radios or provide validation logic.

Reading panels use `mx-auto max-w-article` (800px cap) and inner text can use `max-w-prose` (70ch). The article placeholder now demonstrates the panel width. Section spacing stays ordinary `py-12 lg:py-20` or `py-16 lg:py-24` utilities. No extra spacing tokens or component library are needed.

## Temporary style sample

Run Vite and visit `/__style-sample`, or use the Development style sample link in the footer. The route and link are gated by `import.meta.env.DEV`; the page is lazy-loaded and excluded from production JavaScript. The 17 product destinations remain unchanged.

The sample covers typography (including all five font weights), long text, reading width, light/navy surfaces, cards, links, action/disabled controls, labelled inputs, a select and a textarea. Hover and keyboard focus are real interaction states, not permanently styled imitations. The sample action updates a local status message and sends no data.

E03-T01 is complete. See [validation evidence](../../docs/validation/e03-t01/README.md) for viewport, text-resize, contrast, keyboard and blocked-font checks and their limits. Remove the temporary page, route and footer link when the sample is no longer needed.
