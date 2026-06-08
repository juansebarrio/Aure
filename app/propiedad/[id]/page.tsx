import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { PropertyImage } from "@/components/properties/PropertyImage";
import { getProperty, getProperties, formatPrice, isMensual } from "@/lib/properties";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

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

  const title = `${property.titulo} — ${formatPrice(property.precio, property.moneda)}/mes`;
  const ogImage = property.fotos[0]?.url;
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
    { label: "Ambientes", value: String(property.ambientes) },
    ...(property.dormitorios != null
      ? [{ label: "Dormitorios", value: String(property.dormitorios) }]
      : []),
    ...(property.banos != null
      ? [{ label: "Baños", value: String(property.banos) }]
      : []),
    { label: "Superficie", value: `${property.superficie} m²` },
    ...(property.expensas != null
      ? [
          {
            label: "Expensas",
            value: `${formatPrice(property.expensas, property.moneda)}/mes`,
          },
        ]
      : []),
    ...(property.cochera != null
      ? [{ label: "Cochera", value: property.cochera ? "Sí" : "No" }]
      : []),
  ];

  const [cover, ...rest] = property.fotos;

  return (
    <main id="contenido">
      <Container className="pb-20 pt-28 sm:pt-36">
        <Link
          href="/alquiler"
          className="text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          ← Volver a alquileres
        </Link>

        {/* Galería */}
        <div className="mt-6">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gris-claro">
            <PropertyImage
              photo={cover}
              alt={property.titulo}
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </div>
          {rest.length > 0 ? (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {rest.map((foto, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gris-claro"
                >
                  <PropertyImage
                    photo={foto}
                    alt={`${property.titulo} — foto ${i + 2}`}
                    sizes="33vw"
                  />
                </div>
              ))}
            </div>
          ) : null}
          {/* TODO(ux): galería con lightbox/carrusel cuando estén las fotos reales. */}
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
            </dl>

            <div className="mt-10">
              <h2 className="text-lg font-medium tracking-display text-azul">
                Descripción
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gris-texto">
                {property.descripcion}
              </p>
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
              {property.expensas != null ? (
                <p className="mt-1 text-sm text-gris-texto">
                  + expensas {formatPrice(property.expensas, property.moneda)}
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
