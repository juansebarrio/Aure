import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { faqPageLd } from "@/lib/structured-data";

/**
 * FAQ (wireframe 08): las dudas reales antes de comprar. Las respuestas son
 * claras pero GENERALES: los detalles financieros y legales (ajustes,
 * cancelación, gastos) varían por desarrollo y los confirma el cliente — no
 * agregar cifras ni condiciones específicas.
 */
const faqs = [
  {
    q: "¿Qué significa comprar en pozo?",
    a: "Comprás una unidad de un desarrollo que todavía está en construcción o por empezar, a un precio menor que el de una propiedad terminada, pagando en etapas a medida que avanza la obra. Te explicamos cada etapa y qué esperar en cada una para que sepas siempre dónde estás parado.",
  },
  {
    q: "¿Quién es el desarrollador y qué respaldo tiene la operación?",
    a: "Solo comercializamos proyectos de desarrolladores con trayectoria y documentación en regla. Antes de avanzar te contamos quién desarrolla, qué obras entregó antes y qué respaldo tiene la operación, para que decidas con información concreta y no con promesas.",
  },
  {
    q: "¿Cómo son las formas de pago y la financiación?",
    a: "Depende de cada desarrollo: suele haber un anticipo y cuotas durante la obra, con algún tipo de ajuste. Antes de que avances te mostramos el plan de pago completo, con los números claros y sin letra chica.",
  },
  {
    q: "¿Qué pasa si el desarrollo se demora?",
    a: "El boleto establece los plazos y qué sucede ante una demora. Te explicamos esas condiciones antes de firmar y te acompañamos durante toda la obra si surge cualquier imprevisto.",
  },
  {
    q: "¿Puedo cancelar o vender mi unidad antes de la entrega?",
    a: "Las condiciones de cancelación y de cesión dependen del contrato de cada desarrollo. Te las explicamos con claridad antes de avanzar, para que decidas sabiendo todas las alternativas.",
  },
  {
    q: "¿Qué gastos adicionales tengo que tener en cuenta?",
    a: "Además del precio de la unidad, hay gastos como escritura, impuestos y sellos. Te los detallamos desde el principio para que armes tu presupuesto sin sorpresas.",
  },
  {
    q: "¿AURE desarrolla o comercializa los proyectos?",
    // TODO(cliente): confirmar el alcance exacto (comercialización pura vs.
    // algún rol de desarrollo/reciclaje propio) y ajustar esta respuesta.
    a: "AURE comercializa: seleccionamos y vendemos desarrollos de terceros y te acompañamos en toda la compra.",
  },
  {
    q: "¿Cómo es el proceso de compra, paso a paso?",
    a: "Del primer contacto a la entrega: hacés tu consulta, te asesoramos y te mostramos el proyecto (incluido el showroom 3D), revisamos juntos números, plan de pago y documentación, reservás y firmás el boleto, te acompañamos durante la obra y llegamos juntos a la entrega y la escritura.",
  },
];

export function Faqs() {
  return (
    <Section id="faqs" background="white">
      {/* Datos estructurados FAQPage: mismas Q&A que se ven, elegibles para
          rich results. Vive acá para viajar solo con la sección (solo home). */}
      <JsonLd data={faqPageLd(faqs)} />
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
