import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { getProperties } from "@/lib/properties";

/**
 * Home — sección "En alquiler": selección de propiedades en alquiler.
 * Consume SOLO la interfaz lib/properties (mock hoy, Tokko al cargar la key).
 * Si no hay datos, no renderiza la sección (estado vacío prolijo en el home).
 */
export async function Rentals() {
  const rentals = (await getProperties("Alquiler")).slice(0, 3);
  if (rentals.length === 0) return null;

  return (
    <Section id="alquiler" background="white">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>En alquiler</Eyebrow>
            <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
              Propiedades en alquiler
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gris-texto">
              Una selección de las últimas propiedades en alquiler en Buenos
              Aires. Recorré el detalle y escribinos por la que te interese.
            </p>
          </div>
          <Link
            href="/propiedades?operacion=Alquiler"
            className="shrink-0 text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Ver todas →
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rentals.map((property, i) => (
            <li key={property.id}>
              <PropertyCard property={property} priority={i === 0} />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
