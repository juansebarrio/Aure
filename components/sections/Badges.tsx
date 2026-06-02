import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

/** Respaldo / por qué AURE. Detalle dorado, sin cajas pesadas. */
const items = [
  {
    title: "Desarrolladores de confianza",
    text: "Comercializamos proyectos de desarrolladores con trayectoria y documentación en regla. AURE no desarrolla: selecciona y acompaña.",
  },
  {
    title: "Información clara",
    text: "Plazos, formas de pago y estado de obra explicados sin letra chica.",
  },
  {
    title: "De la consulta a la entrega",
    text: "Te acompañamos en cada paso, desde la primera consulta hasta la entrega de la unidad.",
  },
  {
    title: "Pensado para vos",
    text: "Oportunidades de pozo con planes de pago accesibles para clase media.",
  },
];

export function Badges() {
  return (
    <Section id="garantias" background="white">
      <Reveal>
      <div className="max-w-2xl">
        <Eyebrow>Por qué AURE</Eyebrow>
        <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
          Respaldo y claridad en cada paso
        </h2>
      </div>

      {/* TODO(contenido): reemplazar garantías/beneficios por los definitivos. */}
      <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.title}>
            <div className="h-px w-8 bg-dorado" aria-hidden="true" />
            <h3 className="mt-5 text-lg font-medium tracking-display">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gris-texto">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
      </Reveal>
    </Section>
  );
}
