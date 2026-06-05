import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RentalsBrowser } from "@/components/properties/RentalsBrowser";
import { getRentals } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Propiedades en alquiler",
  description:
    "Propiedades en alquiler en Buenos Aires. Departamentos, casas, PH y más, con información clara y acompañamiento de AURE.",
  alternates: { canonical: "/alquiler" },
};

// ISR: vale para el feed real de Tokko (revalida cada 30 min).
export const revalidate = 1800;

export default async function AlquilerPage() {
  const rentals = await getRentals();

  return (
    <main id="contenido">
      {/* Header — con padding-top para despejar el navbar flotante */}
      <section className="bg-azul text-white">
        <Container className="pb-12 pt-28 sm:pb-16 sm:pt-36">
          <Eyebrow>Alquiler</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-display sm:text-5xl">
            Propiedades en alquiler
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-gris">
            Departamentos, casas, PH y más en Buenos Aires. Filtrá por tipo,
            barrio y moneda, y escribinos por la propiedad que te interese.
          </p>
        </Container>
      </section>

      <RentalsBrowser properties={rentals} />
    </main>
  );
}
