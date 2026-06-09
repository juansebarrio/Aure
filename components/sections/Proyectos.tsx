import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProyectoVideo } from "@/components/sections/ProyectoVideo";
import { EMPRENDIMIENTOS } from "@/lib/emprendimientos";

/**
 * Sección de emprendimientos (home y /emprendimientos). Cada emprendimiento
 * linkea a su página propia (/emprendimiento/[id]), donde está el showroom 3D
 * embebido. Data en lib/emprendimientos.ts.
 */
export function Proyectos({ showVerMas: _showVerMas = true }: { showVerMas?: boolean }) {
  return (
    <section id="proyectos" className="bg-gris-claro pt-16 text-azul sm:pt-24">
      {EMPRENDIMIENTOS.map((emp) => {
        const href = `/emprendimiento/${emp.id}`;
        const ctaLabel = emp.showroomEmbedUrl ? "Ver showroom 3D" : "Ver emprendimiento";
        return (
          <article key={emp.id} className="pb-16 sm:pb-24">
            {emp.media?.videoSrc ? (
              // Con video: feature full-width con el título overlay.
              <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <ProyectoVideo
                  videoSrc={emp.media.videoSrc}
                  posterSrc={emp.media.posterSrc}
                  label={`Recorrido · ${emp.nombre}`}
                >
                  <div className="absolute left-0 top-0 p-6 sm:p-8">
                    <div className="inline-flex w-fit items-center gap-2.5 rounded-full bg-white/60 px-4 py-1.5 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-dorado" aria-hidden="true" />
                      <p className="text-xs font-medium uppercase tracking-eyebrow text-azul">
                        Proyecto destacado
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-[11px] font-medium uppercase tracking-eyebrow text-dorado">
                      {emp.estado}
                    </p>
                    <h3 className="mt-2 text-4xl font-medium leading-tight tracking-display text-white sm:text-5xl">
                      {emp.nombre}
                    </h3>
                    <p className="mt-1 text-base text-white/65">{emp.zona}</p>
                  </div>
                </ProyectoVideo>
              </div>
            ) : (
              // Sin video (placeholder): encabezado simple.
              <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <p className="text-[11px] font-medium uppercase tracking-eyebrow text-dorado">
                  {emp.estado}
                </p>
                <h3 className="mt-2 text-3xl font-medium tracking-display sm:text-4xl">
                  {emp.nombre}
                </h3>
                <p className="mt-1 text-base text-gris-texto">{emp.zona}</p>
              </div>
            )}

            <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-8 sm:pt-14">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="text-base leading-relaxed text-gris-texto">
                    {emp.descripcion}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <Button href={href}>{ctaLabel}</Button>
                    <Button href="/#contacto" variant="secondary">
                      Consultar
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  {/* Honestidad: el desarrollo es de un tercero; AURE comercializa. */}
                  {emp.desarrolladora && (
                    <p className="mb-5 text-[11px] uppercase tracking-eyebrow text-gris-texto">
                      Desarrolla ·{" "}
                      <span className="text-azul">{emp.desarrolladora}</span>
                    </p>
                  )}
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
                  {/* El link de "Ver showroom 3D" lleva a la página del emprendimiento. */}
                  <p className="mt-6">
                    <Link
                      href={href}
                      className="text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
                    >
                      Ver ficha completa →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
