import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { navLinks, propiedadesMenu, siteConfig } from "@/lib/site";

const legalLinks = [
  { label: "Privacidad", href: "/politicas#privacidad" },
  { label: "Cookies", href: "/politicas#cookies" },
  { label: "Términos", href: "/politicas#terminos" },
];

// Navegación del footer: secciones de propiedades + el resto.
const footerNav = [...propiedadesMenu, ...navLinks];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // Remate dorado: hairline dorada al tope del footer.
    <footer className="border-t border-dorado bg-azul text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo variant="imagotipo" mode="dark" className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gris">
              Comercializamos desarrollos seleccionados en Buenos Aires, con
              acompañamiento real.
            </p>

            {/* Sellos de cámaras del rubro. TODO(cliente): reemplazar por los logos reales. */}
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Cámaras del rubro">
              {siteConfig.seals.map((seal) => (
                <li key={seal.label}>
                  <span
                    title={seal.title}
                    className="inline-flex items-center rounded-brand border border-white/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-eyebrow text-gris"
                  >
                    {seal.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <nav className="md:col-span-3" aria-label="Secciones">
            <h2 className="text-xs uppercase tracking-eyebrow text-dorado">
              Navegación
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gris transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-xs uppercase tracking-eyebrow text-dorado">
              Contacto
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-gris">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>{siteConfig.contact.addressLine}</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xs uppercase tracking-eyebrow text-dorado">
              Redes
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-gris">
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
              <li>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-gris sm:flex-row sm:items-center sm:justify-between">
          {/* TODO(contenido): razón social / CUIT. */}
          {/* min-w-0 deja envolver el texto en 375px (no se corta a la derecha). */}
          <p className="min-w-0">
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
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
