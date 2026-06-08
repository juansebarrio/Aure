import type { Operacion, Property } from "./properties";

/**
 * Adaptador Tokko Broker (REAL) — ESBOZO. Se activa cuando `TOKKO_API_KEY`
 * está seteada (server-side). Hoy NO está implementado: lanza para que la capa
 * caiga al estado vacío sin romper.
 *
 * TODO(tokko): implementar el fetch real. ANTES de codear, leer la doc oficial
 * de la API de Tokko Broker y confirmar:
 *   - endpoint de listado de propiedades y el de detalle por id;
 *   - filtro por operación: Venta, Alquiler y Alquiler temporario (confirmar el
 *     ID de cada operación en Tokko) y por estado publicado/activo;
 *   - estructura de la respuesta (precio, moneda, fotos, ambientes, m²,
 *     expensas) para mapearla a `Property` (función `mapTokkoToProperty`);
 *   - paginación.
 *   - Emprendimientos es OTRA entidad (developments): endpoint y mapeo aparte.
 * Sugerencias a confirmar con la doc:
 *   - base: https://www.tokkobroker.com/api/v1
 *   - listado: GET /property/?key=${TOKKO_API_KEY}&...  (params a confirmar)
 *   - cachear con fetch(..., { next: { revalidate: 1800 } }) → ISR 30 min.
 * La API key va SIEMPRE en `TOKKO_API_KEY` (server-side), nunca en el cliente
 * ni commiteada.
 */

export async function getPropertiesTokko(
  operacion?: Operacion,
): Promise<Property[]> {
  if (!process.env.TOKKO_API_KEY) {
    throw new Error("TOKKO_API_KEY no configurada");
  }
  // TODO(tokko): fetch real al listado filtrando por `operacion` y mapear a
  // Property. Ver doc oficial.
  throw new Error(
    `Adaptador Tokko aún no implementado (operacion=${operacion ?? "todas"}).`,
  );
}

export async function getPropertyTokko(id: string): Promise<Property | null> {
  if (!process.env.TOKKO_API_KEY) {
    throw new Error("TOKKO_API_KEY no configurada");
  }
  // TODO(tokko): fetch real del detalle por id y map a Property.
  throw new Error(`Adaptador Tokko aún no implementado (id=${id}).`);
}
