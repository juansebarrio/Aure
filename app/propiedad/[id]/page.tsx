import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import {
  getProperty,
  getProperties,
  formatPrice,
  formatSuperficie,
  isMensual,
  isLiveData,
} from "@/lib/properties";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, propertyLd } from "@/lib/structured-data";

type Params = { id: string };

// Prerendera las propiedades actuales (mock hoy, feed real al conectar Tokko).
// Las que no estén prerenderadas se generan on-demand (ISR).
export async function generateStaticParams(): Promise<Params[]> {
  const properties = await getProperties();
  return properties.map((p) => ({ id: p.id }));
}

export const revalidate = 1800; // ISR 30 min

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) return { title: "Propiedad no encontrada" };

  const suffix = isMensual(property.operacion) ? "/mes" : "";
  const title = `${property.titulo} — ${formatPrice(property.precio, property.moneda)}${suffix}`;
  // OG: las redes no renderizan SVG (los placeholders del mock lo son). Solo
  // mandamos la primera foto si es un raster (las fotos reales de Tokko lo son).
  const firstPhoto = property.fotos[0]?.url;
  const ogImage =
    firstPhoto && !firstPhoto.toLowerCase().endsWith(".svg") ? firstPhoto : undefined;
  return {
    title,
    description: property.descripcion,
    alternates: { canonical: `/propiedad/${property.id}` },
    openGraph: {
      type: "website",
      title,
      description: property.descripcion,
      url: `/propiedad/${property.id}`,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function PropiedadPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) notFound();

  const waMessage = `Hola, me interesa la propiedad en ${property.direccion}, ${property.barrio}.`;
  const wa = whatsappUrl(siteConfig.whatsapp, waMessage);
  const waHref = wa ?? `mailto:${siteConfig.contact.email}`;
  const waExternal = waHref.startsWith("http");

  const stats: { label: string; value: string }[] = [
    { label: "Tipo", value: property.tipo },
    // Ambientes 0 = sin dato en el CRM: se omite (no mostrar "Ambientes 0").
    ...(property.ambientes > 0
      ? [{ label: "Ambientes", value: String(property.ambientes) }]
      : []),
    ...(property.dormitorios != null
      ? [{ label: "Dormitorios", value: String(property.dormitorios) }]
      : []),
    ...(property.banos != null
      ? [{ label: "Baños", value: String(property.banos) }]
      : []),
    ...(formatSuperficie(property.superficie)
      ? [{ label: "Superficie", value: formatSuperficie(property.superficie)! }]
      : []),
    // Expensas SIEMPRE en pesos: Tokko las manda en ARS aunque el precio de la
    // propiedad esté en USD (con property.moneda salía "Expensas USD 142.000").
    ...(property.expensas != null
      ? [
          {
            label: "Expensas",
            value: `${formatPrice(property.expensas, "ARS")}/mes`,
          },
        ]
      : []),
    ...(property.cochera != null
      ? [{ label: "Cochera", value: property.cochera ? "Sí" : "No" }]
      : []),
  ];

  return (
    <main id="contenido">
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", url: "/" },
          { name: "Propiedades", url: "/propiedades" },
          { name: property.titulo, url: `/propiedad/${property.id}` },
        ])}
      />
      {/* Ficha como Accommodation + Offer: SOLO con feed real. Con el mock no
          emitimos markup que presente datos ficticios como una oferta real. */}
      {isLiveData() ? <JsonLd data={propertyLd(property)} /> : null}
      <Container className="pb-20 pt-28 sm:pt-36">
        <Link
          href={`/propiedades?operacion=${encodeURIComponent(property.operacion)}`}
          className="text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          ← Volver a propiedades
        </Link>

        {/* Galería: principal + miniaturas interactivas (tocar una la sube). */}
        <div className="mt-6">
          <PropertyGallery photos={property.fotos} titulo={property.titulo} />
        </div>

        {/* Contenido + panel de contacto */}
        <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <Eyebrow>{property.operacion}</Eyebrow>
            <h1 className="mt-4 text-3xl font-medium tracking-display text-azul sm:text-4xl">
              {property.direccion}
            </h1>
            <p className="mt-1 text-base text-gris-texto">{property.barrio}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-borde bg-borde sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="bg-white p-4">
                  <dt className="text-xs uppercase tracking-eyebrow text-gris-texto">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-azul">
                    {s.value}
                  </dd>
                </div>
              ))}
              {/* Relleno blanco hasta múltiplo de 6 (2 y 3 columnas): si la
                  última fila queda incompleta, el hueco mostraba el fondo
                  `bg-borde` como una celda fantasma beige. */}
              {Array.from({ length: (6 - (stats.length % 6)) % 6 }).map(
                (_, i) => (
                  <div key={`relleno-${i}`} aria-hidden="true" className="bg-white" />
                ),
              )}
            </dl>

            <div className="mt-10">
              <h2 className="text-lg font-medium tracking-display text-azul">
                Descripción
              </h2>
              {/* Las descripciones del CRM separan párrafos con saltos de línea.
                  Las partimos en <p> con espacio entre sí (split por \n+: tolera
                  1 o 2 saltos) para que se lean como párrafos, no como un bloque
                  corrido pegado. */}
              <div className="mt-3 space-y-4 text-base leading-relaxed text-gris-texto">
                {property.descripcion
                  .split(/\n+/)
                  .map((parrafo) => parrafo.trim())
                  .filter(Boolean)
                  .map((parrafo, i) => (
                    <p key={i}>{parrafo}</p>
                  ))}
              </div>
            </div>
          </div>

          {/* Panel de precio + contacto */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-borde bg-white p-6 lg:sticky lg:top-28">
              <p className="text-2xl font-medium tracking-display text-azul">
                {formatPrice(property.precio, property.moneda)}
                {isMensual(property.operacion) ? (
                  <span className="text-sm font-normal text-gris-texto"> / mes</span>
                ) : null}
              </p>
              {/* Expensas en ARS (ver nota en stats). */}
              {property.expensas != null ? (
                <p className="mt-1 text-sm text-gris-texto">
                  + expensas {formatPrice(property.expensas, "ARS")}
                </p>
              ) : null}

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  href={waHref}
                  {...(waExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="w-full"
                >
                  Consultar por WhatsApp
                </Button>
                <Button href="/#contacto" variant="secondary" className="w-full">
                  Otra vía de contacto
                </Button>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-gris-texto">
                Te respondemos con la información completa de la propiedad y
                coordinamos una visita.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
