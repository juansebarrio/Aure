# AURE — Sitio institucional

Proyecto de **JS80** para el cliente **AURE · Arch & Urban Real Estate**, una **comercializadora inmobiliaria** moderna en Buenos Aires (vende desarrollos de terceros —sobre todo de pozo— a un público de clase media; no es desarrolladora). El sitio tiene doble función: dar **respaldo y credibilidad** a quien no los conoce y, sobre esa confianza, **captar contactos** (consulta, WhatsApp, reunión o visita).

Este archivo son las convenciones del proyecto. Léelo siempre. Para todo lo visual, la referencia es `AURE_Brand_Spec.md`.

---

## Marca = fuente de verdad

`AURE_Brand_Spec.md` (raíz del repo) manda sobre cualquier decisión visual. Léelo antes de tocar estilos. Resumen de lo crítico:

- **Colores:** azul `#1E2A47` (superficie de marca), dorado `#C6A86B` (acento y CTA, **nunca** texto de cuerpo), blanco `#FFFFFF`, gris `#AFC0D9` (texto secundario sobre azul). Neutrales de UI: gris-claro `#F4F6FA`, gris-texto `#6B7280`, borde `#E5E9F0`.
- **Tipografía:** IBM Plex Sans, pesos 300/400/500. Titulares peso 500, tracking `-0.02em`. Eyebrows en MAYÚSCULA, tracking `0.3em`, dorado. Cuerpo 300/400.
- **CTA primario:** fondo dorado + texto azul.
- **Estética:** sobria, plana, mucho aire, sin sombras ni efectos. Fondos azul o claro, nunca grises sucios. Separadores con borde fino.

---

## Stack (decidido — no improvisar)

- **Next.js 15** (App Router) + **TypeScript** strict
- **Tailwind v4** — tokens de marca en `app/globals.css` con bloque `@theme`
- **IBM Plex Sans** vía `next/font/google` (pesos 300/400/500)
- **pnpm** como package manager
- **Vercel** para deploy (futuro; por ahora todo local)
- Componentes: primitivos propios livianos estilados con los tokens. Sin librerías de UI con estética genérica. Para accesibilidad (accordion, dialog) se permite Radix headless, restyleado 100% a la marca.

---

## Estructura

```
app/
  layout.tsx          # fuente (next/font), metadata, favicons
  globals.css         # @import tailwind + @theme con tokens de marca
  page.tsx            # home
  contacto/page.tsx
  politicas/page.tsx
  api/contacto/route.ts   # stub del formulario
components/
  ui/                 # Button, Container, Section, Eyebrow, Input, Accordion, ImagePlaceholder
  motion/             # SmoothScrollProvider, Reveal, TextReveal, Parallax, gsap.ts
  sections/           # Navbar, Hero, Badges, Proyectos, QuienesSomos, Equipo, SocialProof, Faqs, ContactForm, Footer, InstagramFeed
lib/
public/               # assets (logo, favicons, fotos) — placeholders por ahora
AURE_Brand_Spec.md
CLAUDE.md
.env.example
```

---

## Convenciones

- **Estilado solo con tokens.** Usar utilidades de marca (`bg-azul`, `text-dorado`, `border-borde`, `text-gris-texto`, etc.). Nada de hex hardcodeado dentro de los componentes.
- **TypeScript strict**, sin `any`.
- **Server Components por defecto.** `"use client"` solo donde hace falta (formulario, acordeón, botón flotante).
- **Imágenes con `next/image`** (aspect ratios correctos; placeholders neutros marcados TODO). **Fuentes con `next/font`.**
- **Contenido en español rioplatense neutro**, tono sobrio, profesional, moderno y confiable (accesible, **no de lujo**, lo opuesto a la inmobiliaria tradicional). El copy es placeholder hasta tener el real: marcarlo con `TODO`. **Honestidad:** no afirmar que AURE desarrolla ni que ofrece arquitectura/urbanismo como servicio; los desarrollos son de terceros que AURE comercializa.
- **Accesibilidad:** HTML semántico, labels en inputs, foco visible, buen contraste. El dorado no se usa para texto de cuerpo (contraste bajo).
- **Sin sombras ni efectos.** Profundidad por espacio. Separadores con borde fino (`#E5E9F0` en claro; `rgba(255,255,255,.1)` sobre azul).
- **Radios chicos** (4–8px). Mobile-first; revisar 360 / 768 / 1280px.

---

## Motion

Capa de animación con scroll suave, **sobria y de marca** (easings suaves, duraciones cortas, cero fuegos artificiales).

- **Stack:** `gsap` + `@gsap/react` (`useGSAP`) + `ScrollTrigger` + `Flip` (para la intro), y `lenis` (`lenis/react`). Sin `framer-motion`.
- **Dónde vive:** `components/motion/` — `SmoothScrollProvider` (Lenis + sync con ScrollTrigger, montado en `layout`), `<Reveal>`, `<TextReveal>` (SplitText con fallback), `<Parallax>`, y `gsap.ts` (registra plugins una sola vez).
- **`<IntroSequence>`** (`components/motion/`): intro de apertura que forma el logotipo "aure." (las 3 palabras de la sigla se comprimen a sus iniciales con Flip, aparece el punto dorado) y **se desvanece sin tocar el resto del sitio** (no mueve el logo al navbar ni revela el hero). Montada en `layout` dentro del provider. Reglas: **solo primera visita** (sessionStorage `aure_intro_seen` + script inline en `layout` que evita el flash en visitas siguientes), **reduced-motion lo saltea**, espera `document.fonts.ready` antes de medir, **bloquea el scroll** mientras corre (body + `lenis.stop()`), y se puede **saltar** con click o Esc. Tiempos en constantes (`T`) arriba del componente.
- **`prefers-reduced-motion` (regla dura):** si está activo, NO se monta Lenis y las animaciones se saltean (`gsap.matchMedia`); la intro no corre. Todos los componentes de motion son `"use client"` y no rompen SSR.

---

## Scripts

```
pnpm install
pnpm dev      # desarrollo
pnpm build    # build de producción
pnpm start    # servir el build
pnpm lint
```

---

## Integraciones (estado actual: stub)

Todo stubbeado hasta tener claves y definiciones del cliente. Dejar TODO claro en cada punto.

- **Formulario** → `POST /api/contacto`: valida y por ahora responde ok y loguea. TODO: mail interno + confirmación con Resend.
- **WhatsApp** → link `wa.me` con `NEXT_PUBLIC_WHATSAPP`.
- **Instagram** → datos mock en `<InstagramFeed>`. TODO: feed real.
- **Medición** (GA4 / pixel de Meta) → hueco preparado, sin instalar.
- Mantener `.env.example` al día. **Nunca comitear secretos.**

---

## Reglas duras

- No inventar ni cambiar colores fuera de la paleta.
- Dorado solo como acento o CTA; nunca como texto de cuerpo ni relleno grande.
- No reemplazar IBM Plex Sans por otra fuente.
- No deformar/rotar el logo ni agregarle efectos.
- No hacer deploy ni publicar: trabajar en local.
- Decisiones de marca solo dentro del spec. Si el spec no alcanza, seguir el espíritu (sobrio/moderno/confiable), dejar un `TODO` o preguntar. No improvisar marca.
- **Honestidad:** AURE comercializa, no desarrolla. No prometer desarrollo propio ni arquitectura como servicio; presentar los proyectos como desarrollos de terceros. Sin métricas ni trayectoria infladas (empresa joven).

---

## Pendiente del cliente (no bloquea el scaffold)

- **Assets reales:** logo SVG (`AURE_Master_Logo.svg`, `AURE_Isotipo.svg`), set de favicons, y sobre todo **renders, fotos, videos de obras terminadas y los showrooms 3D** (disponibles a pedido del cliente). Mientras tanto, fallback del logo en texto (ver spec) y placeholders.
- **Definiciones abiertas:** cómo presentar la relación con el desarrollador (los desarrollos son de terceros), a quiénes del equipo mostrar, autogestión (¿CMS o sitio que mantenemos nosotros?), dominio y mails corporativos, idioma (¿solo ES o también EN?), campos del formulario, quién redacta los textos legales. (Se cierran con el formulario estratégico.)

---

## Cómo trabajamos

- Plan breve antes de cambios grandes; confirmar el scaffold inicial.
- Commits chicos y descriptivos.
- Confirmar operaciones críticas (instalaciones grandes, cambios de estructura).
