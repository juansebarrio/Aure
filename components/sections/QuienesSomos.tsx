import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";

import { TextReveal } from "@/components/motion/TextReveal";
import type { ReactNode } from "react";

/**
 * Institucional. Empresa JOVEN: no inventar trayectoria ni decir que desarrollan.
 * El respaldo viene de la selección de proyectos, la claridad y el acompañamiento.
 * TODO(contenido): texto institucional definitivo.
 */
type Valor = { titulo: string; texto: string; icon: ReactNode };

const valores: Valor[] = [
  {
    titulo: "Selección",
    texto: "Trabajamos con desarrolladores de confianza.",
    icon: (
      // Diamante — curado / premium
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2.7 10.3l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4l-4-4a1 1 0 0 0-.7-.3H6.4a1 1 0 0 0-.7.3l-3 4a1 1 0 0 0 0 1.4z" />
        <path d="M6 4.6L12 12l6-7.4" />
        <path d="M2.7 10.3L12 12l9.3-1.7" />
      </svg>
    ),
  },
  {
    titulo: "Claridad",
    texto: "Te explicamos todo, sin letra chica.",
    icon: (
      // Documento con tilde — transparencia / sin letra chica
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M14 2v6h6" />
        <path d="M9 13l2 2 4-4" />
      </svg>
    ),
  },
  {
    titulo: "Cercanía",
    texto: "Personas que te acompañan, no formularios.",
    icon: (
      // Dos personas — equipo / acompañamiento
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
        <circle cx="18" cy="7" r="2.5" />
        <path d="M21 21v-1.5a4 4 0 0 0-2.5-3.7" />
      </svg>
    ),
  },
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
            <p className="mt-6 text-lg font-light leading-relaxed text-gris">
              AURE es una comercializadora: seleccionamos y vendemos desarrollos
              de terceros —sobre todo de pozo— en Buenos Aires. No desarrollamos:
              nos dedicamos a que elijas bien y con respaldo.
            </p>
            <p className="mt-4 leading-relaxed text-gris">
              Somos un equipo nuevo, con experiencia en el rubro, que apuesta a
              una forma más clara y honesta de comprar. Sin promesas que no
              podamos cumplir.
            </p>

            {/* Glass cards para los valores */}
            <dl className="mt-10 grid gap-3 border-t border-white/15 pt-8 sm:grid-cols-3">
              {valores.map((valor) => (
                <div
                  key={valor.titulo}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <span className="text-dorado">{valor.icon}</span>
                  <dt className="mt-4 text-sm font-medium text-white">
                    {valor.titulo}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-gris">
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
