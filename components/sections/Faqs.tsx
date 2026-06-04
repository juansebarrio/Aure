import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";

/** FAQ (wireframe 08): las dudas reales antes de comprar. TODO(contenido): respuestas finales. */
const faqs = [
  {
    q: "¿Qué significa comprar en pozo?",
    a: "Placeholder: explicación simple de comprar en pozo, sus etapas y qué esperar en cada una.",
  },
  {
    q: "¿Cómo son las formas de pago y la financiación?",
    a: "Placeholder: anticipo, cuotas, ajustes y planes de pago según el desarrollo.",
  },
  {
    q: "¿Qué pasa si el desarrollo se demora?",
    a: "Placeholder: qué dice el boleto sobre plazos, qué pasa ante demoras y cómo te acompañamos.",
  },
  {
    q: "¿AURE desarrolla o comercializa los proyectos?",
    a: "AURE comercializa: vende desarrollos de terceros y te acompaña en la compra. No desarrolla. [TODO: redacción final.]",
  },
  {
    q: "¿Cómo es el proceso de compra paso a paso?",
    a: "Placeholder: del primer contacto a la entrega de la unidad, paso a paso.",
  },
];

export function Faqs() {
  return (
    <Section id="faqs" background="white">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
            Las dudas que aparecen antes de comprar
          </h2>
          <p className="mt-4 text-gris-texto">
            Plazos y formas de pago explicados sin letra chica.
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
