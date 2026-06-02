# AURE — sitio institucional

Sitio de captación de **AURE (Arch & Urban Real Estate)**, real estate premium en
Buenos Aires. Next.js 15 (App Router) · TypeScript · Tailwind v4 · IBM Plex Sans.

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

## Estado

Scaffold + sitio en construcción con contenido **placeholder** (sin fotos ni
textos finales). No se hace deploy todavía: todo local.
