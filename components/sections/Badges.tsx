import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

/** Garantías / beneficios. Detalle dorado, sin cajas pesadas. */
const items = [
  {
    title: "Curaduría profesional",
    text: "Cada oportunidad pasa por un análisis arquitectónico, urbano y financiero antes de presentarse.",
  },
  {
    title: "Transparencia total",
    text: "Información clara sobre rentabilidad, plazos y riesgos en cada operación.",
  },
  {
    title: "Acompañamiento integral",
    text: "Un equipo dedicado durante todo el proceso, de la evaluación a la escritura.",
  },
  {
    title: "Ubicaciones estratégicas",
    text: "Activos seleccionados en zonas de valorización sostenida de Buenos Aires.",
  },
];

export function Badges() {
  return (
    <Section id="garantias" background="white">
      <Reveal>
      <div className="max-w-2xl">
        <Eyebrow>Por qué AURE</Eyebrow>
        <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
          Respaldo en cada decisión de inversión
        </h2>
      </div>

      {/* TODO(contenido): reemplazar garantías/beneficios por los definitivos. */}
      <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.title}>
            <div className="h-px w-8 bg-gold" aria-hidden="true" />
            <h3 className="mt-5 text-lg font-medium tracking-display">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
      </Reveal>
    </Section>
  );
}
