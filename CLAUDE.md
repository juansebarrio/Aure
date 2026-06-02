# CLAUDE.md

Guía para trabajar en el sitio institucional de **AURE** (Arch & Urban Real
Estate). Leé esto antes de tocar el código.

## Fuente de verdad de marca

**[`AURE_Brand_Spec.md`](./AURE_Brand_Spec.md) manda sobre cualquier decisión
visual.** Los tokens de marca viven en `app/globals.css` (`@theme`). No
hardcodear colores, fuentes ni tracking: usar siempre los tokens / utilidades.

Reglas duras: el **dorado nunca es texto de cuerpo**; **sin sombras ni efectos**;
**no usar colores fuera de la paleta**; mucho aire; separadores con borde fino.

## Stack

- **Next.js 15** (App Router) + **TypeScript strict**
- **Tailwind v4** (CSS-first; tokens en `app/globals.css` con `@theme`)
- **IBM Plex Sans** vía `next/font` (pesos 300/400/500)
- **pnpm** como package manager
- Deploy futuro: Vercel (por ahora, todo local)

## Scripts

```bash
pnpm install   # instalar dependencias
pnpm dev       # desarrollo (http://localhost:3000)
pnpm build     # build de producción (type-check + lint + compilación)
pnpm start     # servir el build
pnpm lint      # ESLint
```

## Estructura

```
app/
  layout.tsx          # html lang=es, fuente, metadata/SEO, Navbar, skip-link
  page.tsx            # Home (secciones)
  globals.css         # @theme con tokens de marca + estilos base
  icon.svg            # favicon placeholder (TODO: asset real)
  contacto/           # /contacto            (pendiente)
  politicas/          # /politicas           (pendiente)
  api/contacto/       # POST stub del formulario (pendiente)
components/
  ui/                 # primitivos: Button, Container, Section, Eyebrow,
                      #             Input/Textarea, Accordion, ImagePlaceholder
  sections/           # bloques de la home: Navbar, Hero, ... (en progreso)
lib/
  cn.ts               # helper de clases
  site.ts             # config del sitio, navegación, CTA (textos placeholder)
public/               # assets estáticos
```

## Convenciones

- **Primitivos primero.** Componer la UI con los primitivos de `components/ui`.
  Nada de librerías de UI con estética genérica. Para a11y compleja (dialog),
  primitivas headless de Radix **restyleadas 100%** a la marca (aún no usadas).
- **Tokens, no hex.** `bg-brand-blue`, `text-gold`, `text-mist`, `bg-cloud`,
  `text-muted`, `border-line`, `tracking-display`, `tracking-eyebrow`.
- **Accesibilidad:** HTML semántico, labels en inputs, foco visible (dorado),
  buen contraste (recordá: dorado no es texto de cuerpo).
- **Performance:** `next/image` con ratios correctos (placeholders neutros por
  ahora), fuentes con `next/font`, sin librerías pesadas.
- **Contenido:** español, tono sobrio/premium, **todo placeholder marcado como
  `TODO`**. No asumir voseo ni tono informal (ver _Decisiones abiertas_ del spec).
- Commits chicos y descriptivos. **No deploy**: queda en local.

## Integraciones (STUB por ahora)

Todas con `TODO` claro y sin claves reales (ver `.env.example`):

- **Formulario:** `POST /api/contacto` valida y responde ok (loguea). Marcado el
  punto donde luego va el mail interno + confirmación (**Resend**).
- **WhatsApp:** link `wa.me` con `NEXT_PUBLIC_WHATSAPP`.
- **Instagram:** `<InstagramFeed>` con datos mock; `TODO` para la API real.
- **Medición (GA4 / Meta Pixel):** hueco dejado, **nada instalado** todavía.

## Variables de entorno

Copiar `.env.example` → `.env.local`. **Nunca** comitear secretos (`.env*` está
en `.gitignore`).
