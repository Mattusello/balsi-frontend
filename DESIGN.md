# Design

Sistema visivo dello Studio Ottico Balsi. Register **brand** (luxury eyewear). Metafora guida: lo strumento ottico di precisione e la luce che si rifrange nella lente.

## Theme

Art direction **per sezione**, non uniforme. Due mondi che si alternano:

- **Scuro / cinematografico** — hero, laboratorio, banner CTA, footer. Fondo verde foresta drenched, smeraldo come luce. Drammatico, alto contrasto, profondità.
- **Chiaro / galleria** — catalogo, prodotto, consulenza, contatti. Fondo neutro chiaro, ink profondo, ampio respiro, lo smeraldo solo come accento.

## Color (OKLCH-anchored, ancore esatte dall'UI Kit)

| Token | Hex | Ruolo |
|---|---|---|
| `forest-900` | `#04130F` | nero-verde più profondo: base gradiente hero |
| `teal-balsi-dark` | `#082722` | primario scurissimo |
| `teal-balsi` | `#0C3831` | **Primario Scuro** — sfondi scuri, titoli su chiaro |
| `oliva-balsi` | `#2E8B75` | **Accento Vivace** — CTA, link, icone attive, la "luce" |
| `oliva-balsi-hover` | `#25735F` | hover accento |
| `emerald-glow` | `#5CC9A7` | smeraldo luminoso: glow/rifrazione, SOLO decorativo su scuro |
| `accent-copper` | `#6E9A8E` | **Secondario Soft** — bordi, divisori, testo secondario su scuro |
| `base-dark` | `#222625` | **Testo Scuro** — body su chiaro |
| `neutro-chiaro` | `#F4F7F6` | **Neutro Chiaro** — sfondi sezioni chiare |
| `base-light` | `#FFFFFF` | sfondo pagina |

Strategia: **Committed/Drenched** sulle sezioni scure (il verde porta il brand), **Restrained** su quelle chiare (un solo accento smeraldo). Niente colori estranei: warmth e lusso passano da tipografia, luce e foto.

## Typography

Coppia su asse di contrasto (display caratterizzato + testo neutro umanista), niente reflex (no Inter/DM/Playfair/Cormorant/Space Grotesk).

- **Display — Bricolage Grotesque** (700/800). Grottesco contemporaneo con carattere ottico, per hero e titoli. Tracking display da −0.02 a −0.03em (mai sotto −0.04em). `text-wrap: balance` su h1–h3.
- **Testo / UI — Hanken Grotesk** (400/500/600/700). Grottesco umanista pulito e caldo, ottima leggibilità. Misura body 65–75ch. Su scuro line-height +0.05–0.1.
- **Specifiche tecniche** (calibri, categorie lenti): Hanken con `letter-spacing` ampio e cifre tabulari — il sistema "strumento di misura", non un mono-costume.

Scala fluida `clamp()`, rapporto ≥1.25. Hero display ceiling ≤ ~6rem.

## Motion (signature)

Materiali: transform, opacity, clip-path, mask, blur, conic/radial-gradient, box-shadow glow. Easing ease-out-expo/quint. Sempre alternativa `prefers-reduced-motion`.

- **Hero**: load orchestrato — reveal a maschera del titolo, lente/rifrazione smeraldo che deriva, tilt 3D sul prodotto, stat counter animati.
- **Reveal on scroll** (`appReveal`): enhance di un default già visibile, mai gate sulla visibilità. Stagger per liste.
- **Tilt** (`appTilt`): parallax 3D pointer-driven su prodotti, off in reduced-motion.
- **Count-up** (`appCountUp`): numeri statistiche.
- **Marquee** brand maison, **sheen sweep** su card/CTA, **lens reticle** accento, **scroll progress** + route transitions.

## Components

- **Navbar**: trasparente sopra hero scuro → solida smerigliata su scroll; underline animato sull'attivo; overlay full-screen mobile con stagger.
- **Footer**: scuro, logo impilato negativo (UI Kit 2.3), newsletter, store list.
- **Product card**: niente griglia-clone uniforme; immagine con swap+sheen, tilt, swatch colori, reveal stagger.
- **Buttons**: primario smeraldo con sheen e lift; secondario outline con fill-on-hover. Radius card 12–16px, pill per tag/bottoni piccoli.
- **Spec sheet** prodotto: dl precisione con divisori, label tracked.

## Layout

Container fluido `px-6 lg:px-12 2xl:px-20`. Spaziatura variata per ritmo (`clamp()`), non uniforme. Flex per 1D, grid per 2D; griglie responsive `repeat(auto-fit, minmax(280px,1fr))`. Composizioni asimmetriche dove serve enfasi. z-index scale semantica (dropdown→sticky→overlay→modal→toast).

## Imagery

Foto reali (asset locale hero + Unsplash verificati riusati dal codebase). Soggetto fisico del brand (occhiali ravvicinati, mani al lavoro sulla lente, materia), non categoria generica. Alt text descrittivo italiano. Mai blocchi colorati al posto di una foto.
