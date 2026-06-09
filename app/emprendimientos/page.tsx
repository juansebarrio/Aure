import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Proyectos } from "@/components/sections/Proyectos";

export const metadata: Metadata = {
  title: "Emprendimientos",
  description:
    "Emprendimientos y desarrollos que comercializa AURE en Buenos Aires, con información clara y showroom 3D.",
  alternates: { canonical: "/emprendimientos" },
};

// TODO(tokko): cuando se conecte el feed real, listar los emprendimientos de
// Tokko (entidad developments) en vez de reusar la sección Proyectos.
export default function EmprendimientosPage() {
  return (
    <main id="contenido">
      {/* Header — con padding-top para despejar el navbar flotante */}
      <section className="bg-azul text-white">
        <Container className="pb-12 pt-28 sm:pb-16 sm:pt-36">
          <Eyebrow>Emprendimientos</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-display sm:text-5xl">
            Emprendimientos
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-gris">
            Los desarrollos que comercializamos en Buenos Aires, con información
            clara y showroom 3D para que los recorras antes de decidir.
          </p>
        </Container>
      </section>

      <Proyectos />
    </main>
  );
}
