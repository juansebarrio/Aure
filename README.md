# AURE — sitio institucional

Sitio de captación de **AURE (Arch & Urban Real Estate)**, comercializadora
inmobiliaria en Buenos Aires. Next.js 15 (App Router) · TypeScript · Tailwind v4 · IBM Plex Sans.

## Requisitos

- Node.js ≥ 20 (probado con 22)
- pnpm ≥ 10 (`corepack enable` si no lo tenés)

## Cómo correr

```bash
pnpm install          # instalar dependencias
cp .env.example .env.local   # configurar variables (ver abajo)
pnpm dev              # http://localhost:3000
```

Otros scripts:

```bash
pnpm build            # build de producción (type-check + lint + compilación)
pnpm start            # servir el build
pnpm lint             # ESLint
```

## Variables de entorno

Copiá `.env.example` a `.env.local` y completá los valores. **No comitees
secretos** (`.env*` está ignorado). Por ahora alcanza con:

- `NEXT_PUBLIC_WHATSAPP` — número de WhatsApp (solo dígitos, formato internacional).
- `NEXT_PUBLIC_SITE_URL` — URL canónica (en local, `http://localhost:3000`).

El resto (Resend, Instagram, medición) está **stubbeado** y se completa más
adelante.

## Documentación

- **Marca:** [`AURE_Brand_Spec.md`](./AURE_Brand_Spec.md) — fuente de verdad visual.
- **Trabajo en el repo:** [`CLAUDE.md`](./CLAUDE.md) — stack, estructura,
  convenciones e integraciones.

## Motion (capa instalada)

Animación con scroll suave: `gsap` + `@gsap/react` + `ScrollTrigger` + `lenis`.
Primitivos en `components/motion/` (`SmoothScrollProvider`, `Reveal`, `TextReveal`,
`Parallax`, `IntroSequence`). Detalle en [`CLAUDE.md`](./CLAUDE.md) (sección _Motion_).

**TODO motion:**

- **Afinar la intro:** tunear los tiempos de `IntroSequence` (constantes `T` en
  `components/motion/IntroSequence.tsx`) y validarla en mobile. Es la animación de
  apertura que forma el logo "aure." y se desvanece (solo primera visita).
- **Video del hero:** el `<Hero />` ya monta un video de fondo
  (`public/video/hero-nogoya.mp4`) con poster y scrim de legibilidad. TODO:
  reemplazarlo por el loop cinematográfico definitivo del cliente y afinar el
  poster (`public/video/poster.svg`).
- **Secciones a motionizar después:** hero, Social proof, FAQs, Formulario y
  Footer. Hoy solo **Badges** y **About** tienen `<Reveal>` / `<TextReveal>`
  como muestra de que el sistema funciona.
- Mantener todo **sobrio** y respetando `prefers-reduced-motion`.

## Estado

Scaffold + sitio en construcción con contenido **placeholder** (sin fotos ni
textos finales). No se hace deploy todavía: todo local.
