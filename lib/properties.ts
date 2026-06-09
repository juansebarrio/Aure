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
    const { getPropertiesMock } = await import("./properties.mock");
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
    const { getPropertyMock } = await import("./properties.mock");
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

/** Sufijo de precio: alquileres son mensuales; la venta no lleva "/ mes". */
export function isMensual(operacion: Operacion): boolean {
  return operacion !== "Venta";
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
