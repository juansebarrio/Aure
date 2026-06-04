import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

type Dato = {
  titulo: string;
  texto: string;
  icon: ReactNode;
};

/**
 * Respaldo (wireframe 03): franja honesta de datos — sin métricas infladas ni
 * trayectoria inventada.
 * TODO(contenido): datos verificables reales.
 */
const datos: Dato[] = [
  {
    titulo: "Desarrolladores aliados",
    texto:
      "Comercializamos proyectos de desarrolladores con trayectoria y documentación en regla.",
    icon: (
      // Escudo con tilde — confianza / verificado
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3L4 7.5V12c0 4.8 3.4 9.2 8 10.5 4.6-1.3 8-5.7 8-10.5V7.5L12 3z" />
        <path d="M8.5 12l2.5 2.5 4.5-4.5" />
      </svg>
    ),
  },
  {
    titulo: "Zonas de cobertura",
    texto: "Trabajamos en zonas seleccionadas de CABA y Gran Buenos Aires.",
    icon: (
      // Pin de mapa
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    titulo: "Proyectos en cartera",
    texto:
      "Una cartera curada de desarrollos en distintas etapas: pozo, en obra y terminados.",
    icon: (
      // Capas / stack — portfolio
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
      </svg>
    ),
  },
  {
    titulo: "Showrooms 3D",
    texto: "Recorré cada unidad en un showroom 3D antes de decidir.",
    icon: (
      // Cubo 3D
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    ),
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
              <span className="text-dorado">{dato.icon}</span>
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
