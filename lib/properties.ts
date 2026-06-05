/**
 * Capa de datos de propiedades — UNA interfaz para toda la UI.
 *
 * La UI consume SOLO `getRentals()` / `getProperty()`; nunca la fuente directa.
 * El adaptador se elige por entorno:
 *   - `TOKKO_API_KEY` presente → Tokko (real, server-side)  [TODO: implementar]
 *   - sin `TOKKO_API_KEY`      → Mock (datos ficticios, dev)
 * Así, conectar Tokko la semana próxima es solo cargar la key: no se toca la UI.
 *
 * GUARDRAIL: el mock es SOLO para desarrollo/revisión. No se publica: hay que
 * conectar el feed real de Tokko antes de reemplazar aure.ar.
 */
export type Operacion = "Alquiler" | "Venta";

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
 * Todas las propiedades en alquiler. Si la fuente falla o no hay datos,
 * devuelve [] (la UI muestra un estado vacío prolijo, sin romper el build).
 */
export async function getRentals(): Promise<Property[]> {
  try {
    if (useTokko) {
      const { getRentalsTokko } = await import("./properties.tokko");
      return await getRentalsTokko();
    }
    const { getRentalsMock } = await import("./properties.mock");
    return await getRentalsMock();
  } catch (error) {
    console.error("[properties] getRentals falló:", error);
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
