import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

/**
 * Institucional. Empresa JOVEN: no inventar trayectoria ni decir que desarrollan.
 * El respaldo viene de la selección de proyectos, la claridad y el acompañamiento.
 * TODO(contenido): texto institucional definitivo.
 */
const valores = [
  { titulo: "Selección", texto: "Trabajamos con desarrolladores de confianza." },
  { titulo: "Claridad", texto: "Te explicamos todo, sin letra chica." },
  { titulo: "Cercanía", texto: "Personas que te acompañan, no formularios." },
];

export function QuienesSomos() {
  return (
    <Section id="nosotros" background="blue">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Eyebrow>Quiénes somos</Eyebrow>
          <TextReveal
            as="h2"
            className="mt-5 text-3xl font-medium tracking-display text-white sm:text-4xl"
          >
            Una inmobiliaria joven que se toma en serio tu confianza
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg font-light leading-relaxed text-mist">
              AURE es una comercializadora: seleccionamos y vendemos desarrollos
              de terceros —sobre todo de pozo— en Buenos Aires. No desarrollamos:
              nos dedicamos a que elijas bien y con respaldo.
            </p>
            <p className="mt-4 leading-relaxed text-mist">
              Somos un equipo nuevo, con experiencia en el rubro, que apuesta a
              una forma más clara y honesta de comprar. Sin promesas que no
              podamos cumplir.
            </p>

            <dl className="mt-10 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
              {valores.map((valor) => (
                <div key={valor.titulo}>
                  <div className="h-px w-8 bg-gold" aria-hidden="true" />
                  <dt className="mt-4 text-sm font-medium text-white">
                    {valor.titulo}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-mist">
                    {valor.texto}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          {/* TODO(assets): foto del equipo / oficina. */}
          <ImagePlaceholder
            aspect="aspect-[4/3]"
            tone="ghost"
            label="Equipo / oficina"
            className="lg:ml-auto lg:max-w-lg"
          />
        </div>
      </div>
    </Section>
  );
}
