import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/site";

const legalLinks = [
  { label: "Privacidad", href: "/politicas#privacidad" },
  { label: "Cookies", href: "/politicas#cookies" },
  { label: "Términos", href: "/politicas#terminos" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // Remate dorado: hairline dorada al tope del footer.
    <footer className="border-t border-gold bg-brand-blue text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xl font-medium tracking-tight">
              aure<span className="text-gold">.</span>
            </p>
            {/* TODO(contenido): submarca / descripción breve definitiva. */}
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              {siteConfig.legalName}. Real estate premium en Buenos Aires.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Secciones">
            <h2 className="text-xs uppercase tracking-eyebrow text-gold">
              Navegación
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-mist transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-xs uppercase tracking-eyebrow text-gold">
              Contacto
            </h2>
            {/* TODO(contenido): datos de contacto reales. */}
            <ul className="mt-4 space-y-3 text-sm text-mist">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>{siteConfig.contact.phoneDisplay}</li>
              <li>{siteConfig.contact.addressLine}</li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          {/* TODO(contenido): razón social / CUIT. */}
          <p>© {year} {siteConfig.name}. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
