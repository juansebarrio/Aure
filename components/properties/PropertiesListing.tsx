import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PropertiesBrowser } from "@/components/properties/PropertiesBrowser";
import { getProperties, type Operacion } from "@/lib/properties";

/**
 * Página de listado de propiedades por operación (Venta / Alquiler / Alquiler
 * temporario). Server-rendered: header + grilla con filtros. Reusable: cada
 * ruta (/venta, /alquiler, /alquiler-temporario) la monta con su operación.
 */
export async function PropertiesListing({
  operacion,
  eyebrow,
  titulo,
  descripcion,
}: {
  operacion: Operacion;
  eyebrow: string;
  titulo: string;
  descripcion: string;
}) {
  const properties = await getProperties(operacion);

  return (
    <main id="contenido">
      {/* Header — con padding-top para despejar el navbar flotante */}
      <section className="bg-azul text-white">
        <Container className="pb-12 pt-28 sm:pb-16 sm:pt-36">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-display sm:text-5xl">
            {titulo}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-gris">
            {descripcion}
          </p>
        </Container>
      </section>

      <PropertiesBrowser properties={properties} />
    </main>
  );
}
