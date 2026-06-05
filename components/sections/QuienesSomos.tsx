import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";

import { TextReveal } from "@/components/motion/TextReveal";
import type { ReactNode } from "react";

/**
 * Institucional. El eje es el PROFESIONALISMO (la confianza como consecuencia),
 * no el lujo. AURE comercializa desarrollos de terceros; no afirmamos que
 * desarrolla (ver guardrail / FAQ 7).
 * TODO(contenido): foto real del equipo / oficina.
 */
type Valor = { titulo: string; texto: string; icon: ReactNode };

const valores: Valor[] = [
  {
    titulo: "Profesionalismo",
    texto:
      "Hacemos las cosas bien, con criterio y preparación. La confianza se construye trabajando, no prometiendo.",
    icon: (
      // Medalla — hacer las cosas bien
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="6" />
        <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" />
      </svg>
    ),
  },
  {
    titulo: "Cercanía",
    texto: "Personas que escuchan y acompañan en cada paso, no formularios.",
    icon: (
      // Dos personas — acompañamiento
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
        <circle cx="18" cy="7" r="2.5" />
        <path d="M21 21v-1.5a4 4 0 0 0-2.5-3.7" />
      </svg>
    ),
  },
  {
    titulo: "Conocimiento del negocio",
    texto:
      "Entendemos el mercado desde adentro: lo comercial, lo constructivo, lo financiero y lo legal.",
    icon: (
      // Lámpara — conocimiento
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    titulo: "Transparencia",
    texto: "Información clara y honesta, sin letra chica, en cada etapa.",
    icon: (
      // Ojo — transparencia
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    titulo: "Evolución",
    texto:
      "Una empresa joven con mentalidad de mejora continua y mejores herramientas.",
    icon: (
      // Flecha ascendente — mejora continua
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 6l-9.5 9.5-5-5L1 18" />
        <path d="M17 6h6v6" />
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
            Una nueva generación de inmobiliarias
          </TextReveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg font-light leading-relaxed text-gris">
              AURE nace de años de experiencia en el mercado y de una convicción:
              comprar una propiedad puede ser un proceso más claro, profesional y
              humano. Vimos de cerca las falencias del sector —información
              escasa, procesos opacos, una mirada puramente transaccional— y
              construimos lo contrario.
            </p>
            <p className="mt-4 leading-relaxed text-gris">
              Somos una comercializadora: seleccionamos y vendemos desarrollos
              —sobre todo de pozo— y te acompañamos en cada decisión. No vendemos
              metros: te ayudamos a elegir bien, con respaldo y sin letra chica.
              Detrás de cada operación hay una decisión patrimonial importante, y
              la tratamos como tal.
            </p>
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

      {/* Valores — fila secundaria debajo de la foto: tarjetas chicas, poco
          protagonistas, 5 en una fila en desktop. */}
      <Reveal>
        <dl className="mt-14 grid grid-cols-2 gap-3 border-t border-white/10 pt-10 sm:grid-cols-3 lg:grid-cols-5">
          {valores.map((valor) => (
            <div
              key={valor.titulo}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
            >
              <span className="text-dorado">{valor.icon}</span>
              <dt className="mt-3 text-[13px] font-medium text-white">
                {valor.titulo}
              </dt>
              <dd className="mt-1 text-xs leading-relaxed text-gris">
                {valor.texto}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
