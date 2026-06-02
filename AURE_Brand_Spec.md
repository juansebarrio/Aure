# AURE — Brand Spec

**Arch & Urban Real Estate** · Real estate premium · Buenos Aires

> **Procedencia de este documento.** El repositorio se inicializó sin un
> `AURE_Brand_Spec.md`. Este archivo se redactó a partir del **resumen de marca
> incluido en el brief del proyecto**, para que exista una única fuente de
> verdad versionada. Si el cliente/estudio tiene un brand spec canónico, **debe
> reemplazar a este** y cualquier divergencia se resuelve a favor del oficial.
> Las decisiones que el brief no cubría están marcadas como _Decisión abierta_.

Esta es la **fuente de verdad de marca**. Manda sobre cualquier decisión visual.
Su contraparte en código son los tokens de `app/globals.css` (bloque `@theme`).

---

## 1. Esencia

Sobria, plana, premium. Mucho aire. Sin sombras ni efectos. El sitio existe para
la **captación**: que un inversor calificado agende una reunión. Todo conduce al
formulario.

Principios:

- **Plano y sobrio.** Nada de sombras, gradientes, glow ni profundidad falsa.
- **Aire.** Espaciado generoso; el contenido respira.
- **Separación por líneas.** Bordes finos en lugar de cajas pesadas o sombras.
- **Color con intención.** El dorado es acento y nunca grita.

---

## 2. Color

| Token (código)     | Hex       | Rol                                                        |
| ------------------ | --------- | ---------------------------------------------------------- |
| `brand-blue`       | `#1E2A47` | Superficie de marca (fondos azules, texto sobre claro).    |
| `gold`             | `#C6A86B` | Acento + CTA. **Nunca texto de cuerpo.**                   |
| `white`            | `#FFFFFF` | Texto sobre azul; superficies claras.                      |
| `mist`             | `#AFC0D9` | Texto secundario **sobre azul**.                           |
| `cloud`            | `#F4F6FA` | Gris-claro: fondos de sección claros.                      |
| `muted`            | `#6B7280` | Gris-texto: cuerpo/secundario **sobre claro**.             |
| `line`             | `#E5E9F0` | Borde fino / separadores.                                  |

### Reglas de color (estrictas)

- **El dorado (`gold`) NO se usa para texto de cuerpo.** Solo acento, eyebrows,
  detalles y fondo del CTA primario.
- **No usar colores fuera de esta paleta.** Sin grises “sucios”: los neutrales
  son `cloud` / `muted` / `line`. Los fondos son **azul o claros**, nunca grises
  apagados.
- **Sin sombras.** La jerarquía se logra con color, escala tipográfica y aire.

### Contraste / accesibilidad

- Texto sobre azul: blanco (principal) o `mist` (secundario). `mist` se reserva
  para texto secundario/grande; no usar para microcopy crítico sobre azul.
- Texto sobre claro: `brand-blue` (principal) o `muted` (secundario).
- Foco visible en `gold`, con `outline-offset`.

---

## 3. Tipografía

**IBM Plex Sans** (vía `next/font`), pesos **300 / 400 / 500**.

| Uso           | Peso | Tratamiento                                              |
| ------------- | ---- | ------------------------------------------------------- |
| Titulares     | 500  | `tracking -0.02em`, interlineado ajustado.              |
| Eyebrows      | 500  | **MAYÚSCULA**, `tracking 0.3em`, color `gold`.          |
| Cuerpo        | 300 / 400 | Interlineado holgado; 300 para intros/subtítulos.  |

- Wordmark: `aure` en minúscula + punto dorado (`.`).
- No usar pesos ≥ 600. El 500 es el máximo.

---

## 4. Layout y espacio

- **Mobile-first.** Validar 360px, 768px y 1280px.
- **Mucho aire**: padding vertical de sección generoso.
- **Separadores**: borde fino (`line`), nunca sombras ni cajas pesadas.
- **Fondos** alternan **azul de marca** y **claro** (`white` / `cloud`).
- Ancho de contenido contenido (centrado, márgenes amplios).

---

## 5. Componentes

- **CTA primario:** fondo `gold` + texto `brand-blue`. Plano.
- **CTA secundario:** “fantasma” — transparente, borde fino, hereda el color del
  contexto (blanco sobre azul, azul sobre claro).
- **Cards (social proof):** sobrias, borde fino, sin sombra.
- **FAQs:** acordeón con separadores finos e indicador dorado al abrir.
- **Inputs:** label visible siempre, borde fino, foco dorado, sobre superficie
  clara para máxima legibilidad.

---

## 6. Imágenes

- `next/image`, con **aspect ratios correctos** para evitar saltos de layout.
- Mientras no haya fotos reales: **placeholders neutros** (planos, sin texto
  decorativo en dorado), marcados como `TODO(assets)`.
- Ratios sugeridos: hero vertical (`4/5`), tarjetas de proyecto (`4/3`).

---

## 7. Mapeo a código

Los tokens viven en `app/globals.css` dentro de `@theme` y generan utilidades de
Tailwind v4 (`bg-brand-blue`, `text-gold`, `text-mist`, `bg-cloud`, `text-muted`,
`border-line`, `tracking-display`, `tracking-eyebrow`, `font-sans`).
**No hardcodear hex en componentes**: usar siempre los tokens.

---

## 8. Decisiones abiertas

Puntos que el brief no definía; resueltos siguiendo el espíritu sobrio/premium y
marcados para confirmar con el cliente:

- **Radio de bordes:** se eligieron **corners rectos** (estética arquitectónica).
  Centralizado en los primitivos para cambiarlo fácil. _Confirmar._
- **Color de error de formularios:** no existe en la paleta. Se usa un rojo
  funcional restringido (`--color-danger`, marcado como **no-marca**) solo para
  validación. _Confirmar o sumar al spec._
- **Registro de redacción:** el brief pide “no asumir voseo”, pero nombra el
  formulario “Agendá una reunión” (voseo). Se respeta esa etiqueta y el resto se
  mantiene neutro. _Confirmar registro definitivo de toda la pieza._
