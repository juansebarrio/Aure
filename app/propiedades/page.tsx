import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PropertiesBrowser } from "@/components/properties/PropertiesBrowser";
import { getProperties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Todas las propiedades",
  description:
    "Todas las propiedades de AURE en Buenos Aires: venta, alquiler y alquiler temporario. Filtrá por operación, tipo, zona, moneda y rango de precio.",
  alternates: { canonical: "/propiedades" },
};

// ISR: vale para el feed real de Tokko (revalida cada 30 min).
export const revalidate = 1800;

export default async function PropiedadesPage() {
  const properties = await getProperties();

  return (
    <main id="contenido">
      {/* Header — con padding-top para despejar el navbar flotante */}
      <section className="bg-azul text-white">
        <Container className="pb-12 pt-28 sm:pb-16 sm:pt-36">
          <Eyebrow>Propiedades</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-display sm:text-5xl">
            Todas las propiedades
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-gris">
            Venta, alquiler y alquiler temporario en Buenos Aires. Filtrá por
            operación, tipo, zona, moneda y rango de precio.
          </p>
        </Container>
      </section>

      <PropertiesBrowser properties={properties} showOperationFilter />
    </main>
  );
}
