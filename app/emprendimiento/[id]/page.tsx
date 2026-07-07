import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ProyectoVideo } from "@/components/sections/ProyectoVideo";
import { EMPRENDIMIENTOS, getEmprendimiento } from "@/lib/emprendimientos";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/structured-data";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return EMPRENDIMIENTOS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const emp = getEmprendimiento(id);
  if (!emp) return { title: "Emprendimiento no encontrado" };
  const ogImage = emp.media?.posterSrc;
  return {
    title: emp.nombre,
    description: emp.descripcion,
    alternates: { canonical: `/emprendimiento/${emp.id}` },
    // El placeholder (sin contenido real) no se indexa todavía.
    ...(emp.placeholder ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      title: emp.nombre,
      description: emp.descripcion,
      url: `/emprendimiento/${emp.id}`,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function EmprendimientoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const emp = getEmprendimiento(id);
  if (!emp) notFound();

  const wa = whatsappUrl(
    siteConfig.whatsapp,
    `Hola, me interesa el emprendimiento ${emp.nombre}.`,
  );
  const waHref = wa ?? `mailto:${siteConfig.contact.email}`;
  const waExternal = waHref.startsWith("http");

  return (
    <main id="contenido">
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", url: "/" },
          { name: "Emprendimientos", url: "/emprendimientos" },
          { name: emp.nombre, url: `/emprendimiento/${emp.id}` },
        ])}
      />
      <Container className="pb-20 pt-28 sm:pt-36">
        <Link
          href="/emprendimientos"
          className="text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          ← Volver a emprendimientos
        </Link>

        <div className="mt-6">
          <Eyebrow>{emp.estado}</Eyebrow>
          <h1 className="mt-4 text-4xl font-medium tracking-display text-azul sm:text-5xl">
            {emp.nombre}
          </h1>
          <p className="mt-1 text-base text-gris-texto">{emp.zona}</p>
        </div>

        {/* Video del emprendimiento */}
        {emp.media?.videoSrc ? (
          <div className="mt-8">
            <ProyectoVideo
              videoSrc={emp.media.videoSrc}
              posterSrc={emp.media.posterSrc}
              label={`Recorrido · ${emp.nombre}`}
            />
          </div>
        ) : null}

        {/* Info */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-base leading-relaxed text-gris-texto">
              {emp.descripcion}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                href={waHref}
                {...(waExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                Consultar
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            {emp.desarrolladora ? (
              <p className="mb-5 text-[11px] uppercase tracking-eyebrow text-gris-texto">
                Desarrolla ·{" "}
                <span className="text-azul">{emp.desarrolladora}</span>
              </p>
            ) : null}
            <ul className="space-y-3">
              {emp.destacados.map((d) => (
                <li key={d} className="flex gap-3 text-sm text-azul">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-dorado"
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Showroom 3D embebido */}
        <div className="mt-14 border-t border-borde pt-12">
          <h2 className="text-2xl font-medium tracking-display text-azul">
            Showroom 3D
          </h2>
          {emp.showroomEmbedUrl ? (
            <>
              <p className="mt-2 text-sm text-gris-texto">
                Recorré el desarrollo en 3D, a tu ritmo.
              </p>
              <div className="mt-5 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-borde bg-gris-claro">
                <iframe
                  src={emp.showroomEmbedUrl}
                  title={`Showroom 3D — ${emp.nombre}`}
                  className="h-full w-full"
                  style={{ border: 0 }}
                  allow="fullscreen; autoplay; xr-spatial-tracking"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-gris-texto">
              Showroom 3D próximamente.
            </p>
          )}
        </div>

        {/* Video de presentación (con audio: arranca a pedido, con controles) */}
        {emp.presentacion ? (
          <div className="mt-14 border-t border-borde pt-12">
            <h2 className="text-2xl font-medium tracking-display text-azul">
              Presentación
            </h2>
            <p className="mt-2 text-sm text-gris-texto">
              Conocé el proyecto en detalle.
            </p>
            <div className="mt-5 w-full overflow-hidden rounded-2xl bg-azul-profundo">
              <video
                controls
                playsInline
                preload="metadata"
                poster={emp.presentacion.posterSrc}
                aria-label={`Presentación — ${emp.nombre}`}
                className="h-auto w-full"
              >
                <source src={emp.presentacion.videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        ) : null}
      </Container>
    </main>
  );
}
