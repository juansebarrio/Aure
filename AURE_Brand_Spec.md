# AURE — Brand spec para Claude Code

Referencia de marca de **AURE · Arch & Urban Real Estate** para construir el sitio institucional. Está pensado para que Claude Code lo lea como contexto y mantenga todo en sistema.

**Cómo usarlo:** dejá este archivo en la raíz del repo (o en `/docs`) y referencialo desde `CLAUDE.md`. Los tokens van a `globals.css` (bloque `@theme` de Tailwind v4) y la fuente se carga con `next/font`. Todo lo de la sección 10 es copy-paste.

---

## 0. Contexto del proyecto

- **Qué construimos:** sitio web institucional de AURE. Doble función: dar respaldo y credibilidad (que quien no los conoce confíe) y, sobre esa confianza, captar contactos (una consulta, un WhatsApp, una reunión o visita).
- **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind v4. Fuentes con `next/font`.
- **Identidad:** ya está cerrada por el cliente. No se diseña marca nueva: se aplica con fidelidad. Este documento es la fuente de verdad.

---

## 1. La marca en una línea

AURE es una **comercializadora inmobiliaria** moderna: vende desarrollos —sobre todo de pozo— de terceros, para un público de **clase media**. No es una desarrolladora. Su diferencial no es la exclusividad: es ser **moderna, profesional y confiable**, lo opuesto a la inmobiliaria tradicional. La marca transmite respaldo y seriedad con una estética sobria y contemporánea.

Traducido a diseño: **sobrio, oscuro, con mucho aire, sin efectos.** El azul profundo es la superficie protagonista y el dorado es el único acento, siempre en dosis chicas.

---

## 2. Principios de diseño (la estética en 5 reglas)

1. **El azul manda.** `#1E2A47` es la superficie de marca. Las secciones alternan entre fondo azul (impacto, hero, footer) y fondo claro (lectura). Nunca un gris sucio de fondo.
2. **El dorado es un acento, no un color de relleno.** Va en el punto del logo, en eyebrows, en el CTA principal, en líneas finas y detalles. Nunca en bloques grandes ni como color de texto largo.
3. **Tipografía sobria y con aire.** IBM Plex Sans en pocos pesos. Titulares con tracking apretado, etiquetas en mayúscula con tracking amplio.
4. **Cero efectos.** Sin sombras dramáticas, sin bordes biselados, sin gradientes ruidosos. Si hace falta separar, una línea fina (`#E5E9F0`). Profundidad por espacio, no por sombra.
5. **Las imágenes son la prueba.** El sitio se luce —y gana credibilidad— con renders, fotos y videos de obras terminadas y los showrooms 3D. El layout las deja respirar; el texto acompaña, no compite.

---

## 3. Color

### Paleta oficial (4 colores)

| Token | Nombre | HEX | RGB | CMYK | Uso |
|---|---|---|---|---|---|
| `azul` | Azul institucional | `#1E2A47` | 30 · 42 · 71 | 58 · 41 · 0 · 72 | Fondo principal · texto sobre blanco |
| `dorado` | Dorado | `#C6A86B` | 198 · 168 · 107 | 0 · 15 · 46 · 22 | Acento · CTA · detalles |
| `blanco` | Blanco | `#FFFFFF` | 255 · 255 · 255 | 0 · 0 · 0 · 0 | Texto sobre azul · fondos |
| `gris` | Gris submarca | `#AFC0D9` | 175 · 192 · 217 | 19 · 12 · 0 · 15 | Submarca · texto secundario sobre azul |

### Neutrales de interfaz (derivados del manual, para construir el sitio)

No son colores de marca, pero hacen falta para superficies, bordes y texto de UI. Mantenerlos discretos.

| Token | HEX | Uso |
|---|---|---|
| `gris-claro` | `#F4F6FA` | Fondos claros alternativos, superficies suaves |
| `gris-texto` | `#6B7280` | Texto de cuerpo sobre fondo claro |
| `borde` | `#E5E9F0` | Líneas finas, separadores, bordes de cards/inputs |

### Reglas de color (importantes)

- **Texto sobre azul:** blanco (titulares, cuerpo) o gris `#AFC0D9` (secundario). Alto contraste, siempre legible.
- **Texto sobre claro:** azul `#1E2A47` (titulares) o gris-texto `#6B7280` (cuerpo).
- **El dorado NO se usa para texto de cuerpo.** Su contraste contra blanco es bajo (~2.2:1). Reservalo para titulares grandes de adorno, eyebrows, líneas, íconos y el fondo del CTA (con texto azul encima).
- **CTA primario:** fondo `dorado` + texto `azul`. Es el patrón de la marca.

### Tokens — Tailwind v4 (`globals.css`)

```css
@import "tailwindcss";

@theme {
  /* Marca */
  --color-azul: #1E2A47;
  --color-dorado: #C6A86B;
  --color-blanco: #FFFFFF;
  --color-gris: #AFC0D9;

  /* Neutrales de interfaz */
  --color-gris-claro: #F4F6FA;
  --color-gris-texto: #6B7280;
  --color-borde: #E5E9F0;

  /* Tipografía */
  --font-sans: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
}
```

Esto habilita utilidades como `bg-azul`, `text-dorado`, `border-borde`, `text-gris-texto`, etc.

### Tokens — CSS vars planas (si no usan utilidades)

```css
:root {
  --azul: #1E2A47;
  --dorado: #C6A86B;
  --blanco: #FFFFFF;
  --gris: #AFC0D9;
  --gris-claro: #F4F6FA;
  --gris-texto: #6B7280;
  --borde: #E5E9F0;
}
```

---

## 4. Tipografía

**Fuente única: IBM Plex Sans** (sans-serif humanista, geometría contemporánea). Está en Google Fonts.

### Pesos

| Peso | Nombre | Rol |
|---|---|---|
| 500 | Medium | Wordmark, titulares (display, h1–h3) |
| 400 | Regular | Texto de UI, datos, tablas, números |
| 300 | Light | Cuerpo largo, párrafos de intro, submarcas |

No sumar otros pesos. Si un titular muy grande necesita más presencia, subir tamaño antes que peso; 600 solo como excepción puntual.

### Setup con `next/font` (`app/layout.tsx`)

```tsx
import { IBM_Plex_Sans } from "next/font/google";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={plex.variable}>
      <body className="bg-blanco text-azul font-sans antialiased">{children}</body>
    </html>
  );
}
```

> Asegurate de que `--font-sans` en `@theme` apunte a `"IBM Plex Sans"` (ya está arriba). Si preferís, usá `var(--font-plex)` directamente.

### Tracking (letter-spacing) — clave para que se vea de marca

| Elemento | Tracking | Notas |
|---|---|---|
| Wordmark `aure` | `-0.025em` | Apretado |
| Titulares display / h1–h2 | `-0.02em` | Apretado |
| Cuerpo | `0` | Normal, line-height 1.7–1.8 |
| Eyebrow / etiquetas | `0.18em` a `0.3em` | MAYÚSCULA |
| Submarca `ARCH & URBAN REAL ESTATE` | `0.36em` | MAYÚSCULA, peso 300 |

### Escala tipográfica sugerida (web)

| Rol | Tamaño | Peso | Tracking | Line-height |
|---|---|---|---|---|
| Display / H1 | `clamp(40px, 6vw, 72px)` | 500 | -0.02em | 1.05 |
| H2 | `clamp(30px, 4vw, 44px)` | 500 | -0.02em | 1.1 |
| H3 | `22–28px` | 500 | -0.01em | 1.2 |
| Lead (intro) | `18–20px` | 300 | 0 | 1.6 |
| Cuerpo | `16–17px` | 400 | 0 | 1.7 |
| Small / caption | `13px` | 400 | 0 | 1.5 |
| Eyebrow | `11px` | 500 | 0.3em | 1 |
| Datos / números | `16–22px` | 400 | -0.01em | 1.1 |

Ejemplo de datos (estilo del manual): `USD 2.450.000 · 847 m² · Piso 18` — peso 400, los valores se pueden resaltar en `dorado`.

---

## 5. Logo, isotipo y favicon

### Wordmark

`aure` en minúscula (IBM Plex Sans 500, tracking `-0.025em`) seguido de un **punto dorado** `#C6A86B`. El conjunto wordmark + submarca es una unidad indivisible.

- **Sobre azul:** `aure` en blanco, punto en dorado, submarca en gris.
- **Sobre blanco:** `aure` en azul, punto en dorado, submarca en azul/gris.

### Isotipo

`a` + punto. Se usa cuando el espacio es reducido (favicon, avatar, mobile). El punto sigue las mismas reglas de color.

### Fallback en texto (mientras no estén los SVG del cliente)

El logo es esencialmente tipográfico, así que se puede renderizar como texto con la fuente de marca:

```tsx
function Wordmark({ dark = true }: { dark?: boolean }) {
  return (
    <span
      className="font-sans font-medium leading-none"
      style={{ letterSpacing: "-0.025em", color: dark ? "#FFFFFF" : "#1E2A47" }}
    >
      aure<span style={{ color: "#C6A86B" }}>.</span>
    </span>
  );
}
```

Submarca (opcional, debajo del wordmark): `ARCH & URBAN REAL ESTATE`, mayúscula, peso 300, tracking `0.36em`, color gris.

> Reemplazar por el SVG oficial (`AURE_Master_Logo.svg` / `AURE_Isotipo.svg`) en `/public` apenas el cliente lo entregue. Ver sección 9.

### Área de seguridad

Margen libre alrededor del logo = `x`, donde `x` = altura de la letra "a".
- Mínimo: `1x` en los cuatro lados.
- Recomendado: `2x`.
- Premium (hero, piezas grandes): `3x`.

### Tamaños mínimos (web/mobile)

- Logo completo: **≥ 160px** en web, **≥ 120px** en mobile.
- Isotipo: **≥ 24px**.
- Por debajo de esos valores, usar el isotipo en lugar del logo completo.
- Siempre servir en `2x` para retina.

### Favicon y metadata

Usar el set provisto por el cliente (isotipo `a.` sobre azul, esquinas redondeadas): `favicon.svg`, `favicon.ico`, `favicon-16/32/48/64`, `apple-touch-icon-180`, `favicon-192`, `favicon-512`. Colocarlos en `/public` y declararlos:

```tsx
// app/layout.tsx
export const metadata = {
  title: "AURE · Arch & Urban Real Estate",
  description: "Comercialización de desarrollos inmobiliarios en Buenos Aires.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon-180x180.png",
  },
  themeColor: "#1E2A47",
};
```

---

## 6. Dirección por sección del sitio

El sitio alterna fondos **azul** (impacto) y **claro** (lectura). El dorado puntúa, no rellena.

- **Navbar:** fondo azul. Wordmark blanco con punto dorado a la izquierda. Links en mayúscula, 11px, tracking `0.1em`, color gris; hover a blanco. Línea inferior `rgba(255,255,255,0.08)`.
- **Hero / banner:** fondo azul, mucho aire. Eyebrow dorado en mayúscula (ej. "Real estate · Buenos Aires"). Titular display blanco, peso 500, tracking `-0.02em`. Subtítulo en gris `#AFC0D9`. CTA primario dorado con texto azul, que lleva al contacto. Render o foto del desarrollo de fondo o al costado.
- **Badges (respaldo/confianza):** fila de ítems cortos (respaldo, experiencia, con quién trabajan) con un detalle dorado (ícono fino o línea). Sobre fondo claro o azul. Sin cajas pesadas; borde fino o solo el detalle dorado.
- **Formulario de contacto:** objetivo único y suave — dejar datos para una consulta, reunión o visita. Fondo claro o azul. Inputs con borde `#E5E9F0`, label en mayúscula chica. Botón = CTA dorado/azul. Pocos campos (los definimos con el cliente).
- **Social proof (reseñas/testimonios):** cards sobrias, fondo claro, separadores finos. Comillas o detalle en dorado. Nombre del autor en azul 500, rol en gris-texto.
- **FAQs (acordeón):** lista con separadores `#E5E9F0`. Pregunta en azul 500; al abrir, el indicador (+/–) en dorado. Respuesta en gris-texto, peso 300/400.
- **Quiénes somos (institucional):** puede ir sobre azul. Titular blanco, cuerpo en gris. Transmite respaldo, seriedad y por qué confiar — sin inventar trayectoria que no tienen (empresa joven). Honestidad: comercializan, no desarrollan.
- **Proyectos:** los desarrollos que AURE comercializa (de terceros). Grilla sobria de cards con render/foto, nombre, zona, estado (pozo/en obra/entrega) y rango de valores si corresponde. Enlace a los showrooms 3D. Pensado para sumar proyectos sin rehacer. Dejar claro que son desarrollos de terceros que AURE comercializa.
- **Equipo:** las personas detrás de AURE, para reforzar la confianza. Fotos sobrias y consistentes, nombre y rol. Sección simple; el cliente confirma a quiénes mostrar.
- **Botón de WhatsApp:** flotante, abajo a la derecha. Mantenerlo discreto y coherente con la marca (confirmar con el cliente si va en verde estándar de WhatsApp o en un tratamiento azul/dorado).
- **Feed de Instagram:** grilla limpia (3–4 columnas en desktop). Sin marcos ruidosos.
- **Footer:** fondo azul. Wordmark, submarca en gris, datos de contacto, links legales. Una línea fina dorada de remate funciona bien.
- **Páginas de contacto y políticas:** sobrias, fondo claro, tipografía legible. Las políticas son texto largo (privacidad, cookies, términos): peso 400, buen interlineado.

---

## 7. Componentes base

- **Botón primario:** `bg-dorado text-azul`, mayúscula, 11px, tracking `0.1em`, padding ~`10px 24px`, `border-radius: 4px`. Sin sombra. Hover: leve oscurecido del dorado.
- **Botón secundario / fantasma:** borde fino (dorado sobre azul, o azul sobre claro), texto del color del borde, mismo tracking. Fondo transparente.
- **Card:** fondo blanco o azul según sección, `border: 1px solid #E5E9F0` (en claro), `border-radius` chico (4–8px). Sin sombra pesada; como mucho una sombra muy sutil.
- **Input:** fondo blanco, `border: 1px solid #E5E9F0`, foco con borde azul. Label en mayúscula chica, gris-texto.
- **Acordeón:** filas separadas por `1px #E5E9F0`, indicador dorado, transición simple de altura.
- **Separadores / líneas:** `1px #E5E9F0` en claro; `rgba(255,255,255,0.08–0.15)` sobre azul. Detalles dorados solo como remate fino.

Radios y sombras: radios chicos (4–8px), sombras mínimas o nulas. La marca es plana y sobria.

---

## 8. Reglas duras (qué NUNCA hacer)

- No deformar, estirar ni rotar el logo.
- No cambiar los colores de la paleta ni inventar variantes.
- No reemplazar IBM Plex Sans por otra fuente.
- No agregar sombras, biseles ni efectos al logo.
- No usar el logo sobre fondos de baja legibilidad.
- No modificar el espaciado entre letras del wordmark.
- No usar dorado como color de texto de cuerpo ni en bloques grandes de relleno.
- No meter gradientes ruidosos ni fondos grises sucios. Fondos: azul, blanco o `#F4F6FA`.

---

## 9. Assets pendientes del cliente

Lo siguiente viene en el kit de marca de AURE y conviene pedirlo para colocarlo en `/public`:

- `AURE_Master_Logo.svg` y `.pdf` (logo completo, 5 versiones)
- `AURE_Isotipo.svg` y `.pdf`
- Set de favicons: `favicon.svg`, `favicon.ico`, `favicon-16/32/48/64`, `apple-touch-icon-180`, `favicon-192`, `favicon-512`
- PNGs del logo en alta (`1000/2000/4000px`)
- **Renders y fotos de los desarrollos, videos de obras terminadas y los showrooms 3D (Winwill)** — lo más importante para el resultado, y ya disponible a pedido

Mientras no estén los SVG, usar el fallback en texto de la sección 5. El favicon sí o sí conviene tenerlo real antes de publicar.

---

## 10. Cómo cablear esto en el proyecto (checklist)

1. Pegar el bloque `@theme` de la sección 3 en `app/globals.css` (encima del `@import "tailwindcss"` correspondiente).
2. Configurar `next/font` con IBM Plex Sans (sección 4) y aplicar la variable en `<html>`.
3. Setear `metadata` + favicons (sección 5).
4. Definir los componentes base (sección 7) como primitivos reutilizables antes de armar secciones.
5. Construir las secciones según la sección 6, alternando fondos azul/claro.
6. Mantener el dorado como acento en todo momento; revisar contraste de cualquier texto.
7. Colocar los assets reales del cliente en `/public` apenas lleguen y reemplazar el fallback del logo.

---

## Nota sobre el copy

El manual define lo visual, no la voz. Para el contenido: español rioplatense neutro (el público es de CABA), tono sobrio, profesional, moderno y **confiable** — accesible, no de lujo, y lo opuesto a la inmobiliaria tradicional. Sin caer en informalidad. La redacción final y quién la escribe se cierra con el formulario estratégico conjunto.

**Guardrails de honestidad (importante):** no prometer desarrollo propio ni arquitectura/urbanismo como servicio (AURE comercializa, no desarrolla). Los desarrollos mostrados son de terceros: presentarlos como comercialización. Nada de métricas ni trayectoria infladas — es una empresa joven; el respaldo se construye con material real (renders, obras terminadas, showrooms) y claridad, no con claims.
