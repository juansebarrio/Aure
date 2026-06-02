import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** TODO(contenido): reseñas reales. Cards sobrias (borde fino, sin sombras). */
const testimonials = [
  {
    quote:
      "Me explicaron cada paso de la compra en pozo con claridad. Decidí tranquila y sin sorpresas.",
    name: "Nombre Apellido",
    role: "Compró en pozo · CABA",
  },
  {
    quote:
      "El plan de pago se ajustaba a lo que podía. El acompañamiento fue real, no solo al cerrar.",
    name: "Nombre Apellido",
    role: "Primera compra",
  },
  {
    quote:
      "Respondieron todas mis dudas y estuvieron hasta la entrega de la unidad.",
    name: "Nombre Apellido",
    role: "Cliente",
  },
];

export function SocialProof() {
  return (
    <Section id="testimonios" background="gris-claro">
      <div className="max-w-2xl">
        <Eyebrow>Confianza</Eyebrow>
        <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
          Lo que dicen nuestros clientes
        </h2>
      </div>

      {/* TODO(contenido): testimonios reales (+ eventual fila de logos/prensa). */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <figure
            key={index}
            className="flex flex-col rounded-brand border border-borde bg-white p-8"
          >
            <div className="h-px w-8 bg-dorado" aria-hidden="true" />
            <blockquote className="mt-6 grow text-base leading-relaxed text-azul">
              «{item.quote}»
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="block font-medium text-azul">
                {item.name}
              </span>
              <span className="block text-gris-texto">{item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
