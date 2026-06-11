import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, breadcrumbLd, faqPageLd } from "@/lib/structured-data";
import { GUIAS, getGuia } from "@/lib/guias";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guia = getGuia(slug);
  if (!guia) return { title: "Guía no encontrada" };
  return {
    title: guia.titulo,
    description: guia.resumen,
    alternates: { canonical: `/guias/${guia.slug}` },
    openGraph: {
      type: "article",
      title: guia.titulo,
      description: guia.resumen,
      url: `/guias/${guia.slug}`,
    },
  };
}

// Fecha legible es-AR (en UTC para no correrse un día por zona horaria).
function formatFecha(iso: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default async function GuiaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const guia = getGuia(slug);
  if (!guia) notFound();

  const url = `/guias/${guia.slug}`;
  const wa = whatsappUrl(
    siteConfig.whatsapp,
    `Hola, tengo una consulta sobre ${guia.titulo.toLowerCase()}.`,
  );
  const waHref = wa ?? `mailto:${siteConfig.contact.email}`;
  const waExternal = waHref.startsWith("http");

  return (
    <main id="contenido">
      <JsonLd
        data={[
          articleLd({
            title: guia.titulo,
            description: guia.resumen,
            url,
            dateModified: guia.actualizada,
            datePublished: guia.actualizada,
          }),
          breadcrumbLd([
            { name: "Inicio", url: "/" },
            { name: "Guías", url: "/guias" },
            { name: guia.titulo, url },
          ]),
        ]}
      />
      {guia.faqs?.length ? <JsonLd data={faqPageLd(guia.faqs)} /> : null}

      <Container className="pb-20 pt-28 sm:pt-36">
        <Link
          href="/guias"
          className="text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          ← Volver a guías
        </Link>

        <article className="mt-6 max-w-2xl">
          <Eyebrow>Guía</Eyebrow>
          <h1 className="mt-4 text-4xl font-medium tracking-display text-azul sm:text-5xl">
            {guia.titulo}
          </h1>
          <p className="mt-3 text-xs uppercase tracking-eyebrow text-gris-texto">
            Actualizado el {formatFecha(guia.actualizada)}
          </p>
          <p className="mt-6 text-lg font-light leading-relaxed text-gris-texto">
            {guia.resumen}
          </p>

          {guia.secciones.map((sec) => (
            <section key={sec.titulo} className="mt-12">
              <h2 className="text-2xl font-medium tracking-display text-azul">
                {sec.titulo}
              </h2>
              {sec.parrafos.map((p, i) => (
                <p
                  key={i}
                  className="mt-4 text-base leading-relaxed text-gris-texto"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          {/* CTA al final de la guía */}
          <div className="mt-14 rounded-2xl border border-borde bg-gris-claro p-7">
            <h2 className="text-xl font-medium tracking-display text-azul">
              ¿Te quedan dudas?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gris-texto">
              Te respondemos cada pregunta antes de que avances, sin compromiso.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                href={waHref}
                {...(waExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                Hacer una consulta
              </Button>
              <Button href="/#contacto" variant="secondary">
                Otra vía de contacto
              </Button>
            </div>
          </div>

          {/* Honestidad: contenido preliminar hasta el copy definitivo del cliente. */}
          <p className="mt-8 text-xs leading-relaxed text-gris-texto">
            Esta guía es general y de orientación. Las condiciones concretas
            (plazos, ajustes, gastos) varían según cada desarrollo y se detallan
            antes de avanzar.
          </p>
        </article>
      </Container>
    </main>
  );
}
