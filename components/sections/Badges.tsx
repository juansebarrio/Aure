import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Respaldo (wireframe 03): franja honesta de datos — sin métricas infladas ni
 * trayectoria inventada — + logos de los desarrolladores con los que trabaja AURE.
 * TODO(contenido): datos verificables reales.
 */
const datos = [
  {
    titulo: "Desarrolladores aliados",
    texto:
      "Comercializamos proyectos de desarrolladores con trayectoria y documentación en regla.",
  },
  {
    titulo: "Zonas de cobertura",
    texto: "Trabajamos en zonas seleccionadas de CABA y Gran Buenos Aires.",
  },
  {
    titulo: "Proyectos en cartera",
    texto:
      "Una cartera curada de desarrollos en distintas etapas: pozo, en obra y terminados.",
  },
  {
    titulo: "Showrooms 3D",
    texto: "Recorré cada unidad en un showroom 3D antes de decidir.",
  },
];

export function Badges() {
  return (
    <Section id="respaldo" background="white">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Respaldo</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
            Datos, no promesas
          </h2>
        </div>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {datos.map((dato) => (
            <li key={dato.titulo}>
              <div className="h-px w-8 bg-dorado" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-medium tracking-display">
                {dato.titulo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gris-texto">
                {dato.texto}
              </p>
            </li>
          ))}
        </ul>

        {/* TODO(assets): logos reales de los desarrolladores con los que trabaja AURE. */}
        <div className="mt-14 border-t border-borde pt-8">
          <p className="text-[11px] uppercase tracking-eyebrow text-gris-texto">
            Desarrolladores con los que trabajamos
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                aria-hidden="true"
                className="flex h-12 items-center justify-center rounded-brand border border-borde text-[10px] uppercase tracking-eyebrow text-gris-texto"
              >
                Logo
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
