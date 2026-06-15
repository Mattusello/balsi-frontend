# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # genera CSS Tailwind + avvia dev server (http://localhost:4200)
npm run build          # genera CSS Tailwind + production build → dist/balsi-frontend
npm run build -- --configuration development  # dev build (source maps)
npm run tw:build       # solo step Tailwind: tailwind.css → src/tailwind.generated.css
npm run tw:watch       # Tailwind in watch mode (usato internamente da npm start)
npm test               # unit test via Karma
npx ng generate component path/to/name --standalone  # scaffolda un componente
```

## Architecture

**Stack:** Angular 22 · TypeScript 6 · Tailwind CSS v4 · SCSS · Node 24

### Tailwind v4 setup

Tailwind v4 **non usa `tailwind.config.js`** e non si integra via PostCSS con Angular 22 (esbuild risolve `@import "tailwindcss"` prima che il plugin PostCSS possa agire). La soluzione adottata:

1. **`tailwind.css`** (project root) — contiene `@import "tailwindcss"`, le direttive `@source` per la scansione dei template, e il blocco `@theme` con i design token.
2. **`@tailwindcss/cli`** genera `src/tailwind.generated.css` leggendo `tailwind.css`. Angular include questo file già processato.
3. **`postcss.config.js`** — solo `autoprefixer`, nessun plugin Tailwind.

**Per aggiungere nuovi componenti**: assicurarsi che i file `.html`/`.ts` siano sotto `src/app/` (già coperto da `@source`). Dopo aver aggiunto classi nuove, il watch (`npm start`) rigenera automaticamente `src/tailwind.generated.css`.

### Design token (classi Tailwind disponibili)

| Token | Hex | Uso |
|---|---|---|
| `oliva-balsi` | `#8DAA8A` | CTA primarie, bordi, hover |
| `teal-balsi` | `#2C4C5E` | Titoli, logo |
| `accent-copper` | `#B78D6D` | Icona carrello, accenti |
| `base-dark` | `#212121` | Testo body |
| `base-light` | `#FFFFFF` | Sfondo pagina |

### Routing

Lazy-loaded standalone via `loadComponent` in `src/app/app.routes.ts`. Aggiungere route lì senza toccare moduli.

### Folder conventions

```
src/app/
  core/
    mocks/       ← GLASSES_MOCK + interfaccia Glass
    services/    ← CatalogService (Observable + delay 600ms)
  shared/
    components/  ← Navbar (scroll + mobile), Footer
  features/
    landing/     ← Hero + bestseller grid + CTA banner
    onboarding/  ← Wizard forma viso (signal-based, 2 step)
```

### Patterns Angular 22

- `ChangeDetectionStrategy.Eager` su tutti i componenti (default v22, aggiunto dalla migration automatica)
- `signal()` / `signal.set()` / `signal.update()` per stato locale
- Template control flow: `@if`, `@for`, `@switch` (non direttive strutturali)
- Font Poppins caricato da Google Fonts in `src/index.html`
