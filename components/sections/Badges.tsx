import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Respaldo (wireframe 03): franja honesta de datos — sin métricas infladas ni
 * trayectoria inventada.
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
      </Reveal>
    </Section>
  );
}
