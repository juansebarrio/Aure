import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PropertiesBrowser } from "@/components/properties/PropertiesBrowser";
import { getProperties, type Operacion } from "@/lib/properties";

type SP = { operacion?: string | string[] };

const OPERACIONES: Operacion[] = ["Venta", "Alquiler", "Alquiler temporario"];

function parseOperacion(v: string | string[] | undefined): Operacion | "" {
  const s = Array.isArray(v) ? v[0] : v;
  return OPERACIONES.includes(s as Operacion) ? (s as Operacion) : "";
}

// Título / copy según la operación pre-filtrada (la vista es siempre la misma).
const COPY: Record<
  Operacion | "",
  { eyebrow: string; titulo: string; descripcion: string }
> = {
  "": {
    eyebrow: "Propiedades",
    titulo: "Todas las propiedades",
    descripcion:
      "Venta, alquiler y alquiler temporario en Buenos Aires. Filtrá por operación, tipo, zona, moneda y rango de precio.",
  },
  Venta: {
    eyebrow: "Venta",
    titulo: "Propiedades en venta",
    descripcion:
      "Propiedades en venta en Buenos Aires. Filtrá por tipo, zona, moneda y rango de precio.",
  },
  Alquiler: {
    eyebrow: "Alquiler",
    titulo: "Propiedades en alquiler",
    descripcion:
      "Propiedades en alquiler en Buenos Aires. Filtrá por tipo, zona, moneda y rango de precio.",
  },
  "Alquiler temporario": {
    eyebrow: "Alquiler temporario",
    titulo: "Alquiler temporario",
    descripcion:
      "Departamentos amoblados para estadías cortas en Buenos Aires. Filtrá por tipo, zona, moneda y rango de precio.",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SP>;
}): Promise<Metadata> {
  const op = parseOperacion((await searchParams).operacion);
  const c = COPY[op];
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
  const c = COPY[op];
  const properties = await getProperties();

  return (
    <main id="contenido">
      {/* Header — con padding-top para despejar el navbar flotante */}
      <section className="bg-azul text-white">
        <Container className="pb-12 pt-28 sm:pb-16 sm:pt-36">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-display sm:text-5xl">
            {c.titulo}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-gris">
            {c.descripcion}
          </p>
        </Container>
      </section>

      {/* key: al cambiar la operación del menú, remonta y re-aplica el filtro. */}
      <PropertiesBrowser
        key={op || "all"}
        properties={properties}
        showOperationFilter
        initialOperacion={op}
      />
    </main>
  );
}
