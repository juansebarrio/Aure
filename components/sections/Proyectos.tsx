import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Grilla de proyectos que AURE COMERCIALIZA (desarrollos de TERCEROS, sobre todo
 * de pozo). Data-driven: para sumar proyectos, agregar al array (no hardcodear
 * card por card).
 *
 * TODO(contenido): reemplazar el mock por los proyectos reales (CMS o data) y
 * los `showroomHref` por los links reales al showroom 3D.
 */
type Estado = "Pozo" | "En obra" | "Entrega";

type Proyecto = {
  id: string;
  nombre: string;
  zona: string;
  estado: Estado;
  showroomHref: string;
};

const PROYECTOS: Proyecto[] = [
  { id: "1", nombre: "Proyecto I", zona: "Villa Urquiza, CABA", estado: "Pozo", showroomHref: "#" },
  { id: "2", nombre: "Proyecto II", zona: "Caballito, CABA", estado: "En obra", showroomHref: "#" },
  { id: "3", nombre: "Proyecto III", zona: "Tigre, GBA", estado: "Entrega", showroomHref: "#" },
];

export function Proyectos() {
  return (
    <Section id="proyectos" background="gris-claro">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Proyectos</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
            Desarrollos que comercializamos
          </h2>
          {/* Honestidad: son proyectos de terceros, AURE no desarrolla. */}
          <p className="mt-4 leading-relaxed text-gris-texto">
            Proyectos de desarrolladores de confianza, seleccionados por AURE.
            No los desarrollamos: los comercializamos y te acompañamos en la compra.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROYECTOS.map((proyecto) => (
            <li key={proyecto.id}>
              {/* TODO(assets): render/foto real del proyecto. */}
              <ImagePlaceholder
                aspect="aspect-[4/3]"
                label={`Render · ${proyecto.nombre}`}
              />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-medium tracking-display">
                  {proyecto.nombre}
                </h3>
                <span className="shrink-0 text-xs uppercase tracking-eyebrow text-dorado">
                  {proyecto.estado}
                </span>
              </div>
              <p className="mt-1 text-sm text-gris-texto">{proyecto.zona}</p>
              {/* TODO(integración): link real al showroom 3D. */}
              <a
                href={proyecto.showroomHref}
                className="mt-3 inline-block text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
                aria-label={`Ver showroom 3D de ${proyecto.nombre}`}
              >
                Ver showroom 3D
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
