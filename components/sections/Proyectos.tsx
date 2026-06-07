import { Button } from "@/components/ui/Button";
import { ProyectoVideo } from "@/components/sections/ProyectoVideo";

type Proyecto = {
  id: string;
  nombre: string;
  zona: string;
  estado: string;
  /** Desarrollador (tercero). AURE comercializa, no desarrolla. */
  desarrolladora?: string;
  descripcion: string;
  destacados: string[];
  /** Showroom 3D externo (winbuild). "#" cuando todavía no hay. */
  showroomHref: string;
  media?: { videoSrc?: string; posterSrc?: string };
};

const PROYECTOS: Proyecto[] = [
  {
    id: "nogoya",
    nombre: "Nogoyá 2478",
    zona: "Villa del Parque, CABA",
    estado: "Listo para escriturar",
    desarrolladora: "Nocito Constructora",
    descripcion:
      "Ubicado a metros de la Av. San Martín, conjuga diseño y una localización óptima. La cercanía a las facultades de Ciencias Veterinarias y Agronomía sostiene una demanda habitacional constante e impulsa el movimiento comercial de la zona. Ideal para quienes buscan una vida académica cercana y para familias que quieren apartarse de las áreas céntricas.",
    destacados: [
      "Entrega inmediata, sin esperar obra",
      "A metros de la Av. San Martín",
      "Cerca de Veterinaria y Agronomía (UBA)",
      "Pensado para estudiantes y familias",
    ],
    showroomHref: "https://portal.winbuild.app/Mario%20Yennaccaro/nogoya",
    media: {
      videoSrc: "/proyectos/nogoya.mp4",
      posterSrc: "/proyectos/nogoya-poster.svg",
    },
  },
];

export function Proyectos() {
  return (
    <section id="proyectos" className="bg-gris-claro text-azul">
      {/* Fichas de proyectos */}
      {PROYECTOS.map((proyecto) => {
        const tieneShowroom = proyecto.showroomHref !== "#";
        return (
          <article key={proyecto.id} className="pb-16 sm:pb-4">

            {/* Video full-ancho con texto superpuesto */}
            {proyecto.media?.videoSrc && (
              <ProyectoVideo
                videoSrc={proyecto.media.videoSrc}
                posterSrc={proyecto.media.posterSrc}
                label={`Recorrido · ${proyecto.nombre}`}
              >
                {/* Chip superior */}
                <div className="absolute left-0 right-0 top-0 pt-6 sm:pt-8">
                  <div className="mx-auto max-w-6xl px-6 sm:px-8">
                    <div className="inline-flex w-fit items-center gap-2.5 rounded-full bg-white/60 px-4 py-1.5 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-dorado" aria-hidden="true" />
                      <p className="text-xs font-medium uppercase tracking-eyebrow text-azul">
                        Proyecto destacado
                      </p>
                    </div>
                  </div>
                </div>

                {/* Texto inferior */}
                <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-10">
                  <div className="mx-auto max-w-6xl px-6 sm:px-8">
                    <p className="text-[11px] font-medium uppercase tracking-eyebrow text-dorado">
                      {proyecto.estado}
                    </p>
                    <h3 className="mt-2 text-4xl font-medium leading-tight tracking-display text-white sm:text-5xl">
                      {proyecto.nombre}
                    </h3>
                    <p className="mt-1 text-base text-white/65">{proyecto.zona}</p>
                  </div>
                </div>
              </ProyectoVideo>
            )}

            {/* Contenido debajo del video */}
            <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-8 sm:pt-14">
              <div className="grid gap-10 lg:grid-cols-12">

                {/* Descripción + botones */}
                <div className="lg:col-span-7">
                  <p className="text-base leading-relaxed text-gris-texto">
                    {proyecto.descripcion}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    {tieneShowroom ? (
                      <>
                        <Button
                          href={proyecto.showroomHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver showroom 3D
                        </Button>
                        <Button href="/#contacto" variant="secondary">
                          Consultar
                        </Button>
                      </>
                    ) : (
                      <Button href="/#contacto">Quiero que me avisen</Button>
                    )}
                  </div>
                </div>

                {/* Destacados + desarrolladora */}
                <div className="lg:col-span-5">
                  {/* Honestidad: el desarrollo es de un tercero; AURE comercializa. */}
                  {proyecto.desarrolladora && (
                    <p className="mb-5 text-[11px] uppercase tracking-eyebrow text-gris-texto">
                      Desarrolla ·{" "}
                      <span className="text-azul">{proyecto.desarrolladora}</span>
                    </p>
                  )}

                  <ul className="space-y-3">
                    {proyecto.destacados.map((d) => (
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
