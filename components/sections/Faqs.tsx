import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

/** TODO(contenido): preguntas y respuestas reales. */
const faqs = [
  {
    q: "¿Quién puede invertir con AURE?",
    a: "Placeholder: descripción del perfil de inversor calificado al que acompaña AURE.",
  },
  {
    q: "¿Cuál es el ticket mínimo de inversión?",
    a: "Placeholder: rango orientativo de inversión y cómo se define según el desarrollo.",
  },
  {
    q: "¿Cómo es el proceso desde la primera reunión?",
    a: "Placeholder: etapas desde el primer contacto hasta la concreción de la operación.",
  },
  {
    q: "¿Qué tipo de desarrollos ofrecen?",
    a: "Placeholder: tipologías de activos y criterios de selección arquitectónica y urbana.",
  },
  {
    q: "¿Cómo se reporta el avance de la inversión?",
    a: "Placeholder: frecuencia y formato de los reportes de avance al inversor.",
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
