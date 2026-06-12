/**
 * Capa de datos de propiedades — UNA interfaz para toda la UI.
 *
 * La UI consume SOLO `getProperties()` / `getProperty()`; nunca la fuente
 * directa. El adaptador se elige por entorno:
 *   - `TOKKO_API_KEY` presente → Tokko (real, server-side)  [TODO: implementar]
 *   - sin `TOKKO_API_KEY`      → Mock (datos ficticios, dev)
 * Así, conectar Tokko es solo cargar la key: no se toca la UI.
 *
 * NOTA: "Emprendimientos" (desarrollos) es OTRA entidad en Tokko, no una
 * operación de propiedad — se maneja aparte (hoy: sección Proyectos).
 *
 * GUARDRAIL: el mock es SOLO para desarrollo/revisión. No se publica: hay que
 * conectar el feed real de Tokko antes de reemplazar aure.ar.
 */
// Mock importado de forma ESTÁTICA: es el fallback siempre presente. Evita un
// `await import()` dinámico en el path de render (que en el serverless de Vercel
// puede fallar de forma intermitente durante el streaming → "Server Components
// render error"). El adaptador Tokko queda dinámico: solo se carga con la key.
import { getPropertiesMock, getPropertyMock } from "./properties.mock";

export type Operacion = "Venta" | "Alquiler" | "Alquiler temporario";

export type TipoPropiedad =
  | "Departamento"
  | "Casa"
  | "PH"
  | "Oficina"
  | "Local"
  | "Cochera"
  | "Terreno";

export type Moneda = "ARS" | "USD";

export type PropertyPhoto = { url: string; alt?: string };

export type Property = {
  id: string;
  titulo: string;
  direccion: string;
  barrio: string;
  operacion: Operacion;
  tipo: TipoPropiedad;
  precio: number;
  moneda: Moneda;
  /** Expensas mensuales (si aplica). */
  expensas?: number;
  ambientes: number;
  dormitorios?: number;
  banos?: number;
  /** Superficie en m². */
  superficie: number;
  cochera?: boolean;
  descripcion: string;
  fotos: PropertyPhoto[];
};

/** El adaptador real (Tokko) se usa solo si hay API key server-side. */
const useTokko = Boolean(process.env.TOKKO_API_KEY);

/**
 * `true` cuando la fuente es el feed real (Tokko), no el mock. Lo usan SEO/
 * indexación para no exponer datos ficticios: sitemap de propiedades, JSON-LD
 * de fichas y robots/noindex se atan a esto.
 */
export function isLiveData(): boolean {
  return useTokko;
}

/**
 * Propiedades, opcionalmente filtradas por operación. Si la fuente falla o no
 * hay datos, devuelve [] (la UI muestra un estado vacío prolijo).
 */
export async function getProperties(
  operacion?: Operacion,
): Promise<Property[]> {
  try {
    if (useTokko) {
      const { getPropertiesTokko } = await import("./properties.tokko");
      return await getPropertiesTokko(operacion);
    }
    return await getPropertiesMock(operacion);
  } catch (error) {
    console.error("[properties] getProperties falló:", error);
    return [];
  }
}

/** Una propiedad por id, o `null` si no existe o falla la fuente. */
export async function getProperty(id: string): Promise<Property | null> {
  try {
    if (useTokko) {
      const { getPropertyTokko } = await import("./properties.tokko");
      return await getPropertyTokko(id);
    }
    return await getPropertyMock(id);
  } catch (error) {
    console.error("[properties] getProperty falló:", error);
    return null;
  }
}

/** Formatea precio + moneda para mostrar (ej. "USD 650" / "$ 520.000"). */
export function formatPrice(precio: number, moneda: Moneda): string {
  const n = new Intl.NumberFormat("es-AR").format(precio);
  return moneda === "USD" ? `USD ${n}` : `$ ${n}`;
}

/**
 * Superficie formateada en es-AR (coma decimal: "75,75 m²"), o `null` cuando no
 * hay dato. El mapeo de Tokko cae a 0 si la propiedad no tiene superficie
 * cargada; 0/negativo se tratan como "sin dato" y la UI omite el m².
 * El espacio es NBSP: el "m²" no se separa del número al partir línea.
 */
export function formatSuperficie(m2: number): string | null {
  if (!Number.isFinite(m2) || m2 <= 0) return null;
  return `${new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 }).format(m2)} m²`;
}

/**
 * Ambientes para mostrar ("3 amb", NBSP), o `null` sin dato: el mapeo de Tokko
 * cae a 0 si la propiedad no trae room_amount, y "0 amb" no se muestra.
 */
export function formatAmbientes(ambientes: number): string | null {
  if (!Number.isFinite(ambientes) || ambientes <= 0) return null;
  return `${ambientes} amb`;
}

/**
 * Versión LIVIANA de Property para la grilla de /propiedades: sin descripción y
 * con las fotos recortadas a lo que usa la card (3 navegables + 1 de fondo de la
 * slide "+N fotos"). `totalFotos` conserva el total real para ese "+N". Evita
 * serializar 86 propiedades × ~24 fotos al cliente (~1,5 MB de HTML).
 */
export type PropertyListItem = Omit<Property, "descripcion"> & {
  totalFotos: number;
};

export function toPropertyListItem(p: Property): PropertyListItem {
  // Mapeo explícito (no spread): un campo nuevo en Property no engorda el
  // listado por accidente; se suma acá solo si la grilla lo necesita.
  return {
    id: p.id,
    titulo: p.titulo,
    direccion: p.direccion,
    barrio: p.barrio,
    operacion: p.operacion,
    tipo: p.tipo,
    precio: p.precio,
    moneda: p.moneda,
    expensas: p.expensas,
    ambientes: p.ambientes,
    dormitorios: p.dormitorios,
    banos: p.banos,
    superficie: p.superficie,
    cochera: p.cochera,
    fotos: p.fotos.slice(0, 4),
    totalFotos: p.fotos.length,
  };
}

/**
 * Sufijo de precio "/ mes": solo el alquiler estándar es mensual. La venta no
 * lleva sufijo, y el alquiler temporario se cotiza por período variable
 * (noche/estadía), así que tampoco lo afirmamos como mensual.
 * TODO(cliente): confirmar cómo mostrar el precio del alquiler temporario.
 */
export function isMensual(operacion: Operacion): boolean {
  return operacion === "Alquiler";
}

/** Copy del header de /propiedades según la operación filtrada (vista unificada). */
export function operacionCopy(operacion: Operacion | ""): {
  eyebrow: string;
  titulo: string;
  descripcion: string;
} {
  switch (operacion) {
    case "Venta":
      return {
        eyebrow: "Venta",
        titulo: "Propiedades en venta",
        descripcion:
          "Propiedades en venta en Buenos Aires. Filtrá por tipo, zona, moneda y rango de precio.",
      };
    case "Alquiler":
      return {
        eyebrow: "Alquiler",
        titulo: "Propiedades en alquiler",
        descripcion:
          "Propiedades en alquiler en Buenos Aires. Filtrá por tipo, zona, moneda y rango de precio.",
      };
    case "Alquiler temporario":
      return {
        eyebrow: "Alquiler temporario",
        titulo: "Alquiler temporario",
        descripcion:
          "Departamentos amoblados para estadías cortas en Buenos Aires. Filtrá por tipo, zona, moneda y rango de precio.",
      };
    default:
      return {
        eyebrow: "Propiedades",
        titulo: "Todas las propiedades",
        descripcion:
          "Venta, alquiler y alquiler temporario en Buenos Aires. Filtrá por operación, tipo, zona, moneda y rango de precio.",
      };
  }
}
