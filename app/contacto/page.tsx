import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto de AURE. Consultá por los desarrollos que comercializamos en Buenos Aires; te acompañamos en cada paso.",
};

export default function ContactoPage() {
  const wa = whatsappUrl(siteConfig.whatsapp, siteConfig.whatsappMessage);

  return (
    <main id="contenido">
      <Section background="blue">
        <div className="max-w-2xl">
          <Eyebrow>Contacto</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-display text-white sm:text-5xl">
            Estamos para ayudarte
          </h1>
          {/* TODO(contenido): texto de apoyo definitivo. */}
          <p className="mt-6 text-lg font-light leading-relaxed text-gris">
            Escribinos por el canal que prefieras y te respondemos de forma
            personal, sin compromiso.
          </p>
        </div>

        <dl className="mt-12 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-eyebrow text-dorado">Email</dt>
            <dd className="mt-2 text-sm text-gris">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="transition-colors hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-eyebrow text-dorado">
              Teléfono
            </dt>
            <dd className="mt-2 text-sm text-gris">
              <a
                href={siteConfig.contact.phoneHref}
                className="transition-colors hover:text-white"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
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
            <dt className="text-xs uppercase tracking-eyebrow text-dorado">
              Ubicación
            </dt>
            <dd className="mt-2 text-sm text-gris">
              {siteConfig.contact.addressLine}
            </dd>
          </div>
        </dl>
      </Section>

      <ContactForm />
    </main>
  );
}
