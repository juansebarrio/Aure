import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Testimonios placeholder en cards sobrias (borde fino, sin sombras). */
const testimonials = [
  {
    quote:
      "El nivel de análisis y la claridad en cada etapa hicieron la diferencia.",
    name: "Nombre Apellido",
    role: "Inversor",
  },
  {
    quote:
      "Una mirada arquitectónica que se traduce en decisiones de inversión sólidas.",
    name: "Nombre Apellido",
    role: "Inversora",
  },
  {
    quote:
      "Acompañamiento real, de principio a fin, con total transparencia.",
    name: "Nombre Apellido",
    role: "Family office",
  },
];

export function SocialProof() {
  return (
    <Section id="testimonios" background="cloud">
      <div className="max-w-2xl">
        <Eyebrow>Confianza</Eyebrow>
        <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
          Inversores que eligen AURE
        </h2>
      </div>

      {/* TODO(contenido): testimonios reales (+ eventual fila de logos/prensa). */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <figure
            key={index}
            className="flex flex-col rounded-brand border border-line bg-white p-8"
          >
            <div className="h-px w-8 bg-gold" aria-hidden="true" />
            <blockquote className="mt-6 grow text-base leading-relaxed text-brand-blue">
              «{item.quote}»
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="block font-medium text-brand-blue">
                {item.name}
              </span>
              <span className="block text-muted">{item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
