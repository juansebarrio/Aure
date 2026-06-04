import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectMedia } from "@/components/sections/ProjectMedia";
import { cn } from "@/lib/cn";

/**
 * Proyectos (wireframe 04) — sección PROTAGONISTA, en formato FICHA. AURE es
 * comercializadora: muestra POCOS desarrollos de TERCEROS, bien presentados,
 * con su showroom 3D. Data-driven: para sumar/editar un proyecto, tocar el
 * array. El primero es real (Nogoyá 2478); el segundo es placeholder.
 *
 * TODO(cliente): segundo proyecto real (hoy placeholder) y confirmar la etapa
 * de obra de cada desarrollo.
 */
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
  {
    // TODO(cliente): reemplazar por el segundo desarrollo real (info + showroom + media).
    id: "proximo",
    nombre: "Próximo desarrollo",
    zona: "Buenos Aires",
    estado: "Próximamente",
    descripcion:
      "Sumamos desarrollos de forma curada: pocos, bien elegidos. Dejanos tus datos y te avisamos apenas se publique el próximo, con la misma información clara y el mismo acompañamiento de principio a fin.",
    destacados: [
      "Selección curada de desarrollos",
      "Información clara desde el primer día",
      "Showroom 3D al publicarse",
    ],
    showroomHref: "#",
  },
];

export function Proyectos() {
  return (
    <Section id="proyectos" background="gris-claro">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Proyectos</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
            Desarrollos seleccionados
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gris-texto">
            Pocos proyectos, bien elegidos. Comercializamos desarrollos de
            terceros con información clara y showroom 3D para que los recorras
            antes de decidir.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 space-y-16 sm:space-y-24">
        {PROYECTOS.map((proyecto, i) => {
          const tieneShowroom = proyecto.showroomHref !== "#";
          const flip = i % 2 === 1; // alterna el lado de la media (ritmo editorial)
          return (
            <Reveal key={proyecto.id}>
              <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
                  <ProjectMedia
                    videoSrc={proyecto.media?.videoSrc}
                    posterSrc={proyecto.media?.posterSrc}
                    label={`Recorrido · ${proyecto.nombre}`}
                    aspect="aspect-[16/10]"
                  />
                </div>

                <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
                  <Eyebrow>{proyecto.estado}</Eyebrow>
                  <h3 className="mt-4 text-2xl font-medium tracking-display sm:text-3xl">
                    {proyecto.nombre}
                  </h3>
                  <p className="mt-1 text-sm text-gris-texto">{proyecto.zona}</p>

                  <p className="mt-5 text-base leading-relaxed text-gris-texto">
                    {proyecto.descripcion}
                  </p>

                  <ul className="mt-6 space-y-2.5">
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

                  {/* Honestidad: el desarrollo es de un tercero; AURE comercializa. */}
                  {proyecto.desarrolladora ? (
                    <p className="mt-6 text-[11px] uppercase tracking-eyebrow text-gris-texto">
                      Desarrolla ·{" "}
                      <span className="text-azul">{proyecto.desarrolladora}</span>
                    </p>
                  ) : null}

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
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
