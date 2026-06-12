# Integración Tokko Broker — puesta en vivo

Estado: **API key cargada en Vercel — conectando el feed real.** Con `TOKKO_API_KEY`
presente, el sitio pasa del **mock** (`lib/properties.mock.ts`) a **datos reales** de
Tokko y se habilita el **envío de leads** al CRM; sin la key, vuelve al mock y el
formulario responde ok sin postear. La UI no cambia: la costura es por env. Queda
pendiente **verificar el mapeo contra la respuesta real** (ver checklist) y ajustar
`mapTokkoProperty` si algún campo difiere.

## Arquitectura (dónde está cada cosa)
- Interfaz única: `lib/properties.ts` → `getProperties(operacion?)`, `getProperty(id)`, tipo `Property`.
  Elige adaptador por env: `TOKKO_API_KEY` presente → Tokko, si no → mock.
- Adaptador real: `lib/properties.tokko.ts` (fetch + caché ISR 6 h + `mapTokkoProperty`).
- Adaptador mock: `lib/properties.mock.ts` (no se elimina; queda de fallback/dev).
- Leads → CRM: `lib/tokko-leads.ts` (`sendLeadToTokko`), llamado desde `app/api/contacto/route.ts`.
- Imágenes: `next.config.ts` → `images.remotePatterns` incluye `static.tokkobroker.com`.

## Checklist de puesta en vivo (con la key)

1. **Cargar la key**
   - `.env.local` (local): `TOKKO_API_KEY=...`
   - Vercel → Project → Settings → Environment Variables: `TOKKO_API_KEY` (todos los environments).
   - La key es **server-side**: nunca `NEXT_PUBLIC_`, nunca commiteada.

2. **Verificar la respuesta real y ajustar el mapeo**
   - Probar en el playground / navegador (server):
     `https://www.tokkobroker.com/api/v1/property/?format=json&key=LA_KEY&lang=es_ar&limit=1`
   - Comparar los nombres de campos reales contra `mapTokkoProperty()` en
     `lib/properties.tokko.ts` y ajustar **solo ahí** (está aislado). Campos a confirmar:
     `publication_title`, `fake_address`/`address`, `location.name`/`full_location`,
     `operations[].operation_type` + `operations[].prices[].{price,currency}`,
     `type.name`, `total_surface`/`roofed_surface`/`surface`,
     `room_amount`/`suite_amount`/`bathroom_amount`/`parking_lot_amount`,
     `expenses`, `description`/`rich_description`, `photos[].image`.

3. **Confirmar operación = Alquiler (y Venta / Temporario)**
   - Verificar los IDs en `OPERATION_TYPE_ID` / `OPERATION_BY_ID` (`lib/properties.tokko.ts`).
     Asumimos `Venta=1, Alquiler=2, Alquiler temporario=3` — **confirmar con la cuenta**.
   - Confirmar que `GET /api/v1/property/search/?...&data={"operation_types":[2]}` filtra
     bien (o pasar a `/property/` + filtrar en el map). El map ya refuerza el filtro
     por operación del lado nuestro.

4. **Confirmar endpoint y payload de leads (CRM)**
   - `sendLeadToTokko()` postea a `POST /api/v1/webcontact/?key=...` con
     `{ name, email, phone, text, properties?, tags:["Sitio web"] }`.
   - Verificar con la doc/cuenta: ¿payload flat o `{ data: {...} }`? ¿`phone` vs
     `cellphone`? ¿cómo se asocia la propiedad (`properties:[id]`)? ¿cómo se ve el
     origen en el CRM? Ajustar en `lib/tokko-leads.ts`.
   - Probar un envío real y confirmar que el lead aparece en "Consultas" del CRM.

5. **Paginación**
   - `getPropertiesTokko` hoy pide `limit=200, offset=0`. Si `meta.total_count > limit`,
     implementar el loop de paginación (TODO marcado en el archivo).

6. **Imágenes**
   - Verificar que las fotos cargan desde `static.tokkobroker.com`. Si Tokko sirve
     algunas desde otro host/CDN, sumar el patrón en `next.config.ts`.

7. **Verificación final**
   - `pnpm build` con la key → debe traer propiedades reales sin romper.
   - Revisar Home ("En alquiler"), `/alquiler`, `/venta`, `/alquiler-temporario`,
     detalle `/propiedad/[id]`, y un envío de formulario que llegue al CRM.
   - Recordatorio: **Emprendimientos** es otra entidad de Tokko (developments) — su
     feed real es un trabajo aparte (hoy `/emprendimientos` reusa la sección Proyectos).

## Guardrails
- API key solo server-side, nunca en el cliente ni commiteada.
- El mock no se elimina: es el fallback hasta que la key esté.
- Errores de Tokko → log + estado vacío (no rompen el build ni la UI).
