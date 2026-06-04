import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Proyectos (wireframe 04) — sección PROTAGONISTA. Grilla editorial project-first
 * de los desarrollos que AURE COMERCIALIZA (de TERCEROS, no propios). Data-driven:
 * para sumar proyectos, agregar al array.
 *
 * TODO(contenido): proyectos reales (CMS/data) y los `showroomHref` reales.
 * TODO(ruta): página /proyectos con el listado completo (link "Ver todos").
 */
type Estado = "Pozo" | "En obra" | "Terminado";

type Proyecto = {
  id: string;
  nombre: string;
  zona: string;
  estado: Estado;
  showroomHref: string;
};

const PROYECTOS: Proyecto[] = [
  { id: "1", nombre: "Proyecto I", zona: "Palermo, CABA", estado: "Pozo", showroomHref: "#" },
  { id: "2", nombre: "Proyecto II", zona: "Villa Urquiza, CABA", estado: "En obra", showroomHref: "#" },
  { id: "3", nombre: "Proyecto III", zona: "Caballito, CABA", estado: "Terminado", showroomHref: "#" },
  { id: "4", nombre: "Proyecto IV", zona: "Núñez, CABA", estado: "Pozo", showroomHref: "#" },
  { id: "5", nombre: "Proyecto V", zona: "Colegiales, CABA", estado: "En obra", showroomHref: "#" },
  { id: "6", nombre: "Proyecto VI", zona: "Saavedra, CABA", estado: "Pozo", showroomHref: "#" },
];

export function Proyectos() {
  return (
    <Section id="proyectos" background="gris-claro">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Proyectos</Eyebrow>
            <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
              Desarrollos seleccionados
            </h2>
          </div>
          {/* TODO(ruta): link a /proyectos (listado completo). */}
          <a
            href="#proyectos"
            className="shrink-0 text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Ver todos →
          </a>
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
                Showroom 3D →
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
