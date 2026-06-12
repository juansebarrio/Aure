import type { Metadata } from "next";
import { PropertiesBrowser } from "@/components/properties/PropertiesBrowser";
import {
  getProperties,
  operacionCopy,
  toPropertyListItem,
  type Operacion,
} from "@/lib/properties";

type SP = { operacion?: string | string[] };

const OPERACIONES: Operacion[] = ["Venta", "Alquiler", "Alquiler temporario"];

function parseOperacion(v: string | string[] | undefined): Operacion | "" {
  const s = Array.isArray(v) ? v[0] : v;
  return OPERACIONES.includes(s as Operacion) ? (s as Operacion) : "";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SP>;
}): Promise<Metadata> {
  const op = parseOperacion((await searchParams).operacion);
  const c = operacionCopy(op);
  return {
    title: c.titulo,
    description: c.descripcion,
    alternates: {
      canonical: op
        ? `/propiedades?operacion=${encodeURIComponent(op)}`
        : "/propiedades",
    },
  };
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const op = parseOperacion((await searchParams).operacion);
  // Slim: la grilla no usa descripción y solo 4 fotos por card — serializar las
  // 86 propiedades completas (con ~24 fotos c/u) inflaba el HTML a ~1,5 MB.
  const properties = (await getProperties()).map(toPropertyListItem);

  return (
    <main id="contenido">
      <PropertiesBrowser properties={properties} operacion={op} />
    </main>
  );
}
