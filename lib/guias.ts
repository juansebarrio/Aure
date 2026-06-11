/**
 * Guías informativas — el mayor lever de Generative Engine Optimization (GEO):
 * páginas que responden, una por una, las preguntas que la gente le hace a la
 * IA ("¿cómo comprar en pozo?", "¿qué gastos tiene comprar en CABA?"). Cada
 * guía es citable por los motores generativos y refuerza a AURE como fuente.
 *
 * GUARDRAIL (CLAUDE.md): contenido PRELIMINAR derivado de las FAQ ya aprobadas.
 * Es general y honesto (sin cifras ni condiciones específicas, que varían por
 * desarrollo). TODO(cliente): revisar y ampliar con el copy definitivo; sumar
 * autor/persona real si se quiere bylines.
 */
export type GuiaSeccion = { titulo: string; parrafos: string[] };

export type Guia = {
  slug: string;
  titulo: string;
  /** Resumen: sirve de meta description, intro y bajada para el listado. */
  resumen: string;
  /** Fecha de última actualización (ISO). GEO/buscadores valoran la frescura. */
  actualizada: string;
  secciones: GuiaSeccion[];
  /** Preguntas que responde la guía (FAQPage schema + bloque Q&A para GEO). */
  faqs?: { q: string; a: string }[];
};

// TODO(cliente): actualizar la fecha cuando se revise el contenido real.
const ACTUALIZADA = "2026-06-10";

export const GUIAS: Guia[] = [
  {
    slug: "comprar-en-pozo-paso-a-paso",
    titulo: "Comprar en pozo, paso a paso",
    resumen:
      "Qué significa comprar en pozo en Buenos Aires, cómo es el proceso de la primera consulta a la escritura, y qué pasa si la obra se demora o querés ceder tu unidad antes de la entrega.",
    actualizada: ACTUALIZADA,
    secciones: [
      {
        titulo: "¿Qué significa comprar en pozo?",
        parrafos: [
          "Comprar en pozo es adquirir una unidad de un desarrollo que todavía está en construcción o por empezar, a un precio menor que el de una propiedad terminada, pagando en etapas a medida que avanza la obra.",
          "Es una de las formas más accesibles de comprar en Buenos Aires, porque escalona el desembolso en el tiempo en lugar de exigir el total de entrada. A cambio, hay que entender bien las etapas y los plazos. Te explicamos cada una y qué esperar, para que sepas siempre dónde estás parado.",
        ],
      },
      {
        titulo: "El proceso, de la primera consulta a la entrega",
        parrafos: [
          "Hacés tu consulta y te asesoramos según lo que buscás y tu presupuesto. Te mostramos el proyecto, incluido el showroom 3D para recorrerlo antes de decidir.",
          "Revisamos juntos los números, el plan de pago y la documentación. Cuando todo cierra, reservás y firmás el boleto de compraventa.",
          "Te acompañamos durante toda la obra y llegamos juntos a la entrega y la escritura. La idea es que en ningún momento te sientas solo frente a una decisión patrimonial importante.",
        ],
      },
      {
        titulo: "¿Qué pasa si el desarrollo se demora?",
        parrafos: [
          "El boleto de compraventa establece los plazos de obra y qué sucede ante una demora. Esas condiciones se explican antes de firmar, no después.",
          "Si surge un imprevisto durante la construcción, te acompañamos para entender las opciones y los pasos a seguir según lo que el contrato prevé.",
        ],
      },
      {
        titulo: "¿Podés cancelar o ceder tu unidad antes de la entrega?",
        parrafos: [
          "Las condiciones de cancelación y de cesión dependen del contrato de cada desarrollo. No son iguales en todos los proyectos.",
          "Te las explicamos con claridad antes de avanzar, para que decidas sabiendo todas las alternativas y sin sorpresas más adelante.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué significa comprar en pozo?",
        a: "Comprás una unidad de un desarrollo en construcción o por empezar, a un precio menor que el de una propiedad terminada, pagando en etapas a medida que avanza la obra.",
      },
      {
        q: "¿Cómo es el proceso de compra en pozo, paso a paso?",
        a: "Consulta y asesoramiento, recorrida del proyecto (incluido showroom 3D), revisión de números, plan de pago y documentación, reserva y firma del boleto, acompañamiento durante la obra, y entrega y escritura.",
      },
      {
        q: "¿Qué pasa si el desarrollo se demora?",
        a: "El boleto establece los plazos y qué sucede ante una demora. Esas condiciones se explican antes de firmar y te acompañamos durante toda la obra si surge un imprevisto.",
      },
    ],
  },
  {
    slug: "gastos-y-formas-de-pago",
    titulo: "Gastos y formas de pago al comprar una propiedad",
    resumen:
      "Cómo suelen ser las formas de pago y la financiación al comprar en pozo, y qué gastos adicionales —escritura, impuestos, sellos— conviene tener en cuenta para armar tu presupuesto sin sorpresas.",
    actualizada: ACTUALIZADA,
    secciones: [
      {
        titulo: "Formas de pago y financiación",
        parrafos: [
          "En un desarrollo en pozo suele haber un anticipo y cuotas durante la obra, con algún tipo de ajuste. El esquema exacto depende de cada proyecto.",
          "Antes de que avances te mostramos el plan de pago completo, con los números claros y sin letra chica, para que sepas qué vas a pagar y cuándo.",
        ],
      },
      {
        titulo: "Qué gastos adicionales tener en cuenta",
        parrafos: [
          "Además del precio de la unidad, una compra implica gastos como la escritura, los impuestos y los sellos correspondientes.",
          "Te los detallamos desde el principio para que los incluyas en tu presupuesto y no aparezcan como una sorpresa sobre el final de la operación.",
        ],
      },
      {
        titulo: "Cómo armamos tu presupuesto",
        parrafos: [
          "Trabajamos con vos el número total —unidad más gastos— y el calendario de pagos, para que la decisión se tome con la foto completa.",
          "El objetivo es simple: que entiendas cada peso antes de comprometerte, y que el plan sea sostenible para tu situación.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cómo son las formas de pago y la financiación al comprar en pozo?",
        a: "Suele haber un anticipo y cuotas durante la obra, con algún tipo de ajuste. El plan de pago completo se muestra antes de avanzar, con los números claros.",
      },
      {
        q: "¿Qué gastos adicionales tengo que tener en cuenta al comprar una propiedad?",
        a: "Además del precio de la unidad, hay gastos como escritura, impuestos y sellos. Se detallan desde el principio para armar el presupuesto sin sorpresas.",
      },
    ],
  },
];

export function getGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}
