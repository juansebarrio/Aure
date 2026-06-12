import { unstable_cache } from "next/cache";
import type { Moneda, Operacion, Property, TipoPropiedad } from "./properties";

/**
 * Adaptador Tokko Broker (REAL). Se usa cuando `TOKKO_API_KEY` está presente
 * (server-side). Implementado contra la doc oficial (developers.tokkobroker.com);
 * como todavía no tenemos la key, los nombres de campos / IDs marcados con TODO
 * hay que verificarlos contra la respuesta real (ver TOKKO_INTEGRATION.md).
 *
 * Todo lo INCIERTO está aislado en `mapTokkoProperty` y en los mapas de
 * operación/moneda/tipo: ajustar cuando veamos la respuesta real es un cambio
 * en un solo lugar.
 *
 * La API key va SIEMPRE en `TOKKO_API_KEY` (server-side), nunca en el cliente
 * ni commiteada. Errores → log + [] / null (no rompe el build; la UI ya tiene
 * estados vacíos).
 */

const TOKKO_BASE = "https://www.tokkobroker.com/api/v1";
const REVALIDATE = 60 * 60 * 6; // 6 h (ISR)

// Sólo se usa si `operation_type` viene como número; el map también resuelve el
// nombre string (Venta/Alquiler/…), que es lo habitual en la respuesta de Tokko.
const OPERATION_BY_ID: Record<number, Operacion> = {
  1: "Venta",
  2: "Alquiler",
  3: "Alquiler temporario",
};

/* ----------------- helpers defensivos (sin `any`) ----------------- */
function rec(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : {};
}
function arr(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}
function str(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}
function num(v: unknown): number | undefined {
  // null explícito (Tastypie lo manda en campos vacíos): NO es 0 (Number(null)=0
  // mostraría p. ej. "Expensas $ 0"); es "sin dato".
  if (v == null) return undefined;
  if (typeof v !== "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
  const s = v.trim();
  if (!s) return undefined;
  // Formato API (Tastypie): decimal con PUNTO — "85.00", "1234.50". Antes se
  // asumía formato es-AR y se borraban los puntos como separador de miles:
  // "85.00" → 8500 (los m² salían multiplicados por 100).
  if (/^-?\d+(\.\d+)?$/.test(s)) {
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
  }
  // Fallback es-AR (coma decimal, puntos de miles): "1.234,56" → 1234.56.
  const n = parseFloat(s.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : undefined;
}

// Normaliza la operación desde id (number) o nombre (string ES/EN). TODO confirmar.
function toOperacion(opType: unknown): Operacion | null {
  if (typeof opType === "number") return OPERATION_BY_ID[opType] ?? null;
  const s = String(opType ?? "").toLowerCase();
  if (!s) return null;
  if (s.includes("tempor")) return "Alquiler temporario";
  if (s.includes("alquiler") || s.includes("rent")) return "Alquiler";
  if (s.includes("venta") || s.includes("sale")) return "Venta";
  return null;
}

// Normaliza moneda. TODO(tokko): confirmar strings reales (ARS/USD/U$S/$).
function toMoneda(currency: unknown): Moneda {
  const c = String(currency ?? "").toUpperCase();
  if (c.includes("USD") || c.includes("U$S") || c.includes("DOLAR") || c.includes("DÓLAR")) {
    return "USD";
  }
  return "ARS";
}

// Mapea el nombre de tipo de Tokko a nuestro TipoPropiedad. TODO confirmar nombres.
function toTipo(name: unknown): TipoPropiedad {
  const s = String(name ?? "").toLowerCase();
  if (s.includes("casa")) return "Casa";
  if (s.includes("ph")) return "PH";
  if (s.includes("oficina")) return "Oficina";
  if (s.includes("local")) return "Local";
  if (s.includes("cochera") || s.includes("garage") || s.includes("garaje")) return "Cochera";
  if (s.includes("terreno") || s.includes("lote")) return "Terreno";
  return "Departamento";
}

/**
 * MAPEO AISLADO — el único lugar a tocar cuando veamos la respuesta real.
 * `prefer`: cuando listamos por operación, elige el precio de ESA operación
 * (una propiedad puede tener venta y alquiler a la vez).
 */
export function mapTokkoProperty(
  raw: unknown,
  prefer?: Operacion,
): Property | null {
  const r = rec(raw);
  const id = r.id != null ? String(r.id) : undefined;
  if (!id) return null;

  // operations: [{ operation_type, prices: [{ price, currency, period }] }]  // TODO confirmar
  const operations = arr(r.operations).map(rec);
  const chosen =
    operations.find((op) => toOperacion(op.operation_type) === prefer) ??
    operations[0] ??
    {};
  const operacion = toOperacion(chosen.operation_type) ?? prefer ?? "Alquiler";
  const price0 = rec(arr(chosen.prices)[0]);

  const location = rec(r.location); // { name, full_location } // TODO confirmar
  const type = rec(r.type); // { name } // TODO confirmar

  const fotos = arr(r.photos)
    .map((p) => {
      const pr = rec(p);
      const url = str(pr.image) ?? str(pr.original) ?? str(pr.thumb) ?? "";
      return { url, alt: str(r.publication_title) ?? "Foto de la propiedad" };
    })
    .filter((f) => f.url);

  return {
    id,
    titulo: str(r.publication_title) ?? str(r.address) ?? `Propiedad ${id}`,
    direccion: str(r.fake_address) ?? str(r.address) ?? str(location.name) ?? "",
    barrio: str(location.name) ?? str(location.full_location) ?? "",
    operacion,
    tipo: toTipo(type.name),
    precio: num(price0.price) ?? 0,
    moneda: toMoneda(price0.currency),
    expensas: num(r.expenses),
    ambientes: num(r.room_amount) ?? 0,
    dormitorios: num(r.suite_amount),
    banos: num(r.bathroom_amount),
    superficie:
      num(r.total_surface) ?? num(r.roofed_surface) ?? num(r.surface) ?? 0,
    cochera: (num(r.parking_lot_amount) ?? 0) > 0,
    descripcion: str(r.description) ?? str(r.rich_description) ?? "",
    fotos,
  };
}

function commonParams(key: string): URLSearchParams {
  return new URLSearchParams({ key, format: "json", lang: "es_ar" });
}

// Trae + mapea el listado. SIN caché de fetch a propósito: la respuesta CRUDA de
// Tokko (todas las propiedades) supera el límite de 2 MB del Data Cache de Next y
// tiraba el warning "Failed to set Next.js data cache" (cada request refetcheaba).
// En Next 15 un fetch sin opciones no se cachea; el resultado MAPEADO —liviano— se
// cachea aparte con unstable_cache (ver getPropertiesTokko).
async function fetchPropertiesTokko(
  operacion?: Operacion,
): Promise<Property[]> {
  const key = process.env.TOKKO_API_KEY;
  if (!key) return [];
  const params = commonParams(key);
  params.set("limit", "200"); // TODO(tokko): paginar si meta.total_count > limit
  params.set("offset", "0");
  // Listado plano (Tastypie): /property/ devuelve { meta, objects } y NO requiere
  // `data`. El endpoint /property/search/ exige un `data` de filtros completo y sin
  // él devolvía HTTP 400; el filtro por operación se aplica abajo, sobre el mapeo.
  const url = `${TOKKO_BASE}/property/?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Tokko ${res.status}`);

  const json = rec(await res.json());
  const mapped = arr(json.objects)
    .map((o) => mapTokkoProperty(o, operacion))
    .filter((p): p is Property => p !== null);

  // Refuerzo: si el endpoint no filtró, filtramos por operación acá.
  return operacion ? mapped.filter((p) => p.operacion === operacion) : mapped;
}

/**
 * Listado de propiedades, cacheado con `unstable_cache` (revalida cada 6 h),
 * con una entrada por operación. Se cachea el resultado MAPEADO (liviano), no la
 * respuesta cruda de Tokko. Ante error → log + [] (el error NO se cachea: se
 * reintenta en el próximo request). Invalidable on-demand con el tag.
 */
export async function getPropertiesTokko(
  operacion?: Operacion,
): Promise<Property[]> {
  try {
    const load = unstable_cache(
      () => fetchPropertiesTokko(operacion),
      ["tokko-properties", operacion ?? "all"],
      { revalidate: REVALIDATE, tags: ["tokko-properties"] },
    );
    return await load();
  } catch (error) {
    console.error("[tokko] getPropertiesTokko falló:", error);
    return [];
  }
}

export async function getPropertyTokko(id: string): Promise<Property | null> {
  const key = process.env.TOKKO_API_KEY;
  if (!key) return null;
  try {
    const url = `${TOKKO_BASE}/property/${encodeURIComponent(id)}/?${commonParams(key).toString()}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) throw new Error(`Tokko ${res.status}`);
    return mapTokkoProperty(await res.json());
  } catch (error) {
    console.error("[tokko] getPropertyTokko falló:", error);
    return null;
  }
}
