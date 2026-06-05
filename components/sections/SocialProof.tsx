import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Testimonial = {
  tipo: "comprador" | "desarrollador";
  quote: string;
  name: string;
  role: string;
};

// TODO(cliente): reemplazar por testimonios REALES (el cliente los tiene, de
// compradores y de desarrolladores) ANTES del lanzamiento. No presentar estas
// citas como reales en producción.
const testimonials: Testimonial[] = [
  {
    tipo: "comprador",
    quote:
      "Me explicaron cada paso de la compra en pozo con claridad. Decidí tranquila y sin sorpresas.",
    name: "[Nombre]",
    role: "Compró en pozo · CABA",
  },
  {
    tipo: "comprador",
    quote:
      "En un momento me recomendaron no avanzar con una unidad porque no me convenía. Esa honestidad me hizo confiar.",
    name: "[Nombre]",
    role: "Primera compra",
  },
  {
    tipo: "desarrollador",
    quote:
      "Elegí a AURE para comercializar mi desarrollo por su profesionalismo y su forma clara de trabajar.",
    name: "[Nombre]",
    role: "Desarrollador",
  },
];

export function SocialProof() {
  return (
    <Section id="testimonios" background="gris-claro">
      <div className="max-w-2xl">
        <Eyebrow>Confianza</Eyebrow>
        <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
          Lo que dicen quienes ya compraron con nosotros
        </h2>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <figure
            key={index}
            className="flex flex-col rounded-2xl border border-borde bg-white p-8"
          >
            {/* Tipo de testimonio: comprador o desarrollador */}
            <span className="text-[11px] font-medium uppercase tracking-eyebrow text-dorado">
              {item.tipo === "desarrollador" ? "Desarrollador" : "Comprador"}
            </span>
            <blockquote className="mt-5 grow text-base leading-relaxed text-azul">
              «{item.quote}»
            </blockquote>
            <figcaption className="mt-6 border-t border-borde pt-5 text-sm">
              <span className="block font-medium text-azul">{item.name}</span>
              <span className="block text-gris-texto">{item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
