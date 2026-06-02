import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

/** TODO(contenido): preguntas y respuestas reales. */
const faqs = [
  {
    q: "¿AURE desarrolla los proyectos?",
    a: "No. AURE es comercializadora: selecciona y vende desarrollos de terceros (desarrolladores) y te acompaña en la compra. [TODO: redacción final.]",
  },
  {
    q: "¿Qué significa comprar en pozo?",
    a: "Placeholder: explicación simple de comprar en pozo, sus etapas y qué esperar en cada una.",
  },
  {
    q: "¿Cómo son las formas de pago?",
    a: "Placeholder: anticipo, cuotas y planes de pago según el desarrollo.",
  },
  {
    q: "¿Cómo es el proceso de compra con AURE?",
    a: "Placeholder: pasos desde la primera consulta hasta la entrega de la unidad.",
  },
  {
    q: "¿Puedo visitar la obra o ver el proyecto?",
    a: "Placeholder: visitas a obra, recorridos y showroom 3D de cada proyecto.",
  },
];

export function Faqs() {
  return (
    <Section id="faqs" background="white">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
            Respuestas a las consultas más habituales
          </h2>
          <p className="mt-4 text-muted">
            ¿Quedó algo sin responder? El equipo lo resuelve en una reunión.
          </p>
        </div>
        <div className="lg:col-span-8">
          <Accordion>
            {faqs.map((item, index) => (
              <AccordionItem
                key={item.q}
                question={item.q}
                defaultOpen={index === 0}
              >
                {item.a}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
