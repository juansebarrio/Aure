import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agendá una reunión con AURE. Real estate premium en Buenos Aires para inversores calificados.",
};

export default function ContactoPage() {
  const wa = whatsappUrl(siteConfig.whatsapp);

  return (
    <main id="contenido">
      <Section background="blue">
        <div className="max-w-2xl">
          <Eyebrow>Contacto</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-display text-white sm:text-5xl">
            Hablemos de tu próxima inversión
          </h1>
          {/* TODO(contenido): texto de apoyo definitivo. */}
          <p className="mt-6 text-lg font-light leading-relaxed text-mist">
            Coordinemos una reunión. Respondemos cada consulta de forma personal.
          </p>
        </div>

        <dl className="mt-12 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-eyebrow text-gold">Email</dt>
            <dd className="mt-2 text-sm text-mist">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="transition-colors hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-eyebrow text-gold">
              Teléfono
            </dt>
            <dd className="mt-2 text-sm text-mist">
              {siteConfig.contact.phoneDisplay}
              {wa ? (
                <>
                  {" · "}
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    WhatsApp
                  </a>
                </>
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-eyebrow text-gold">
              Ubicación
            </dt>
            <dd className="mt-2 text-sm text-mist">
              {siteConfig.contact.addressLine}
            </dd>
          </div>
        </dl>
      </Section>

      <ContactForm />
    </main>
  );
}
