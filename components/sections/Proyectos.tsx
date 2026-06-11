import { Button } from "@/components/ui/Button";
import { ProyectoVideo } from "@/components/sections/ProyectoVideo";
import { EMPRENDIMIENTOS } from "@/lib/emprendimientos";

/**
 * Sección de emprendimientos (home y /emprendimientos). Cada emprendimiento
 * linkea a su FICHA COMPLETA (/emprendimiento/[id]), donde está el showroom 3D
 * embebido. Data en lib/emprendimientos.ts.
 */
export function Proyectos() {
  return (
    <section id="proyectos" className="bg-gris-claro pt-16 text-azul sm:pt-24">
      {EMPRENDIMIENTOS.map((emp) => {
        const href = `/emprendimiento/${emp.id}`;

        // Chip + título del feature con video. Se reutilizan en dos layouts:
        //  · lg+  → superpuestos sobre el video (overlay clásico, intacto).
        //  · <lg  → apilados DEBAJO del video sobre fondo azul, en flujo normal,
        //           así nunca se enciman cuando el banner pierde altura.
        const chip = (
          <div className="inline-flex w-fit items-center gap-2.5 rounded-full bg-white/60 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-dorado" aria-hidden="true" />
            <p className="text-xs font-medium uppercase tracking-eyebrow text-azul">
              Proyecto destacado
            </p>
          </div>
        );
        const titulo = (
          <>
            <p className="text-[11px] font-medium uppercase tracking-eyebrow text-dorado">
              {emp.estado}
            </p>
            <h2 className="mt-2 text-4xl font-medium leading-tight tracking-display text-white sm:text-5xl">
              {emp.nombre}
            </h2>
            <p className="mt-1 text-base text-white/65">{emp.zona}</p>
          </>
        );

        return (
          <article key={emp.id} className="pb-16 sm:pb-24">
            {emp.media?.videoSrc ? (
              // Con video: en lg+ el título va overlay sobre el video; en
              // pantallas chicas se apila debajo (evita que los textos se enciman).
              <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <ProyectoVideo
                  videoSrc={emp.media.videoSrc}
                  posterSrc={emp.media.posterSrc}
                  label={`Recorrido · ${emp.nombre}`}
                >
                  {/* Overlay SOLO en lg+ (en pantallas chicas el texto va debajo). */}
                  <div className="absolute left-0 top-0 hidden p-6 sm:p-8 lg:block">
                    {chip}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 hidden p-6 sm:p-8 lg:block">
                    {titulo}
                  </div>
                </ProyectoVideo>

                {/* < lg: contenido apilado debajo del video, sobre fondo azul. */}
                <div className="mt-3 rounded-2xl bg-azul p-6 lg:hidden">
                  {chip}
                  <div className="mt-4">{titulo}</div>
                </div>
              </div>
            ) : (
              // Sin video (placeholder): encabezado simple.
              <div className="mx-auto max-w-6xl px-6 sm:px-8">
                <p className="text-[11px] font-medium uppercase tracking-eyebrow text-dorado">
                  {emp.estado}
                </p>
                <h2 className="mt-2 text-3xl font-medium tracking-display sm:text-4xl">
                  {emp.nombre}
                </h2>
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
                    {/* El showroom 3D va embebido en la ficha completa. */}
                    <Button href={href}>Ver ficha completa</Button>
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
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
