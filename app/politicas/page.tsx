import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Políticas",
  description:
    "Política de privacidad, política de cookies y términos y condiciones de AURE.",
  alternates: { canonical: "/politicas" },
  // TODO(legal): contenido preliminar. Quitar el noindex cuando estén los
  // textos legales definitivos (y sumar /politicas al sitemap).
  robots: { index: false, follow: true },
};

/**
 * Estructura con placeholders.
 * TODO(legal): reemplazar todos los textos por el contenido legal definitivo
 * provisto por el cliente / su asesoría legal.
 */
const policies = [
  {
    id: "privacidad",
    title: "Política de privacidad",
    body: [
      "Placeholder: cómo AURE recolecta, usa y protege los datos personales de quienes contactan a través del sitio.",
      "Placeholder: base legal del tratamiento, plazos de conservación y derechos del titular de los datos.",
    ],
  },
  {
    id: "cookies",
    title: "Política de cookies",
    body: [
      "Placeholder: qué cookies utiliza el sitio, con qué finalidad y cómo gestionarlas.",
      "Placeholder: cookies de medición (GA4 / Meta) sujetas a consentimiento; hoy no hay medición instalada.",
    ],
  },
  {
    id: "terminos",
    title: "Términos y condiciones",
    body: [
      "Placeholder: condiciones de uso del sitio y alcance de la información publicada.",
      "Placeholder: la información no constituye oferta ni asesoramiento financiero; cada operación se formaliza por separado.",
    ],
  },
];

export default function PoliticasPage() {
  return (
    <main id="contenido">
      <Section background="blue">
        <div className="max-w-2xl">
          <Eyebrow>Legales</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-display text-white sm:text-5xl">
            Políticas
          </h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-gris">
            Privacidad, cookies y términos. Contenido preliminar, pendiente de
            revisión legal.
          </p>
          <nav aria-label="Secciones de políticas" className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {policies.map((policy) => (
                <li key={policy.id}>
                  <a
                    href={`#${policy.id}`}
                    className="text-gris underline underline-offset-4 transition-colors hover:text-white"
                  >
                    {policy.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>

      <Section background="white">
        <div className="max-w-3xl space-y-16">
          {policies.map((policy) => (
            <section
              key={policy.id}
              id={policy.id}
              className="scroll-mt-24"
              aria-labelledby={`${policy.id}-title`}
            >
              <h2
                id={`${policy.id}-title`}
                className="text-2xl font-medium tracking-display"
              >
                {policy.title}
              </h2>
              {policy.body.map((paragraph, index) => (
                <p key={index} className="mt-4 leading-relaxed text-gris-texto">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </main>
  );
}
