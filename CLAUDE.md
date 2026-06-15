# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # dev server at http://localhost:4200
npm run build          # production build → dist/balsi-frontend
npm run build -- --configuration development   # dev build (source maps, no budgets)
npm test               # unit tests via Karma
npx ng generate component path/to/name --standalone   # scaffold a standalone component
```

## Architecture

**Stack:** Angular 19 (standalone, esbuild builder) · Tailwind CSS v3 · SCSS

**Tailwind v3 setup** — configured via `tailwind.config.js` at the project root. Content scanning is set to `src/**/*.{html,ts,scss}`. Global entry is `src/tailwind.css` (contains `@tailwind base/components/utilities`), listed first in `angular.json`'s `styles` array. PostCSS plugin is `tailwindcss` + `autoprefixer` in `postcss.config.js`.

**Custom design tokens** (usable as Tailwind classes like `bg-oliva-balsi`, `text-teal-balsi`):
- `oliva-balsi` `#8DAA8A` — primary CTA, borders, hover
- `teal-balsi` `#2C4C5E` — headings, logo
- `accent-copper` `#B78D6D` — cart icon, accents
- `base-dark` `#212121` — body text
- `base-light` `#FFFFFF` — page background

**Routing** — lazy-loaded standalone components via `loadComponent` in `src/app/app.routes.ts`. Add new pages there without touching any module.

**Folder conventions:**
```
src/app/
  core/
    mocks/          ← static mock data (glasses.mock.ts + Glass interface)
    services/       ← injectable services (catalog.service.ts returns Observable via of() + delay(600))
  shared/
    components/     ← layout-level components (navbar, footer)
  features/
    landing/        ← home page (hero + bestseller grid)
    onboarding/     ← face-shape wizard (signal-based step state)
```

**Patterns to follow:**
- Angular control flow syntax (`@if`, `@for`, `@switch`) — not structural directives
- `signal()` / `signal.set()` / `signal.update()` for component state
- Inline Tailwind utility classes — no component `.scss` styles unless truly necessary
- Font: Poppins loaded from Google Fonts in `src/index.html`
