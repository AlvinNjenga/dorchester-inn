# Component implementation guidance

- Consider the installed shadcn/ui setup before building new interactive UI. Prefer its appropriate primitives for dialogs, alerts, popovers and complex form controls when they reduce accessibility/interaction work. Add only components needed by the current ticket.
- Use `components.json` and the installed CLI; place generated primitives in `src/components/ui`. Import `cn` through `@/lib/utils`. See `docs/SHADCN_UI.md` for commands and theming.
- Preserve the agreed Dorchester palette, typography, layout and focus styles. Review generated CSS/source changes instead of allowing a default theme to replace existing styles. Prefer standard Tailwind values; do not recreate redundant token layers or `hotel-` utility aliases.
- Keep the existing tested header/navigation unless the user or ticket asks to replace it. The mobile menu is a non-modal dropdown below the header; a modal Sheet is not an automatic substitute.
- Component libraries do not replace verification: check keyboard/focus behaviour, route changes, pointer interactions, responsive sizing and contrast appropriate to the change.
