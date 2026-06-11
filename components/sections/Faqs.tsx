import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { faqPageLd } from "@/lib/structured-data";
import { faqs } from "@/lib/faqs";

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
