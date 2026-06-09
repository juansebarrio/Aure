import type { Metadata } from "next";
import { PropertiesBrowser } from "@/components/properties/PropertiesBrowser";
import { getProperties, operacionCopy, type Operacion } from "@/lib/properties";

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
  const properties = await getProperties();

  return (
    <main id="contenido">
      <PropertiesBrowser properties={properties} operacion={op} />
    </main>
  );
}
