/**
 * Configuración central del sitio.
 * TODO(contenido): reemplazar todos los textos/links placeholder por el
 * contenido final aprobado por el cliente.
 *
 * TODO(registro): audiencia = clase media en Buenos Aires. Registro cercano,
 * claro y honesto; el voseo natural en CTAs ("Agendá una visita") es apropiado.
 * Confirmar el registro definitivo de toda la pieza.
 *
 * POSICIONAMIENTO: AURE es una COMERCIALIZADORA. Vende desarrollos de TERCEROS
 * (sobre todo de pozo). NO es desarrolladora ni ofrece "arquitectura como
 * servicio": el copy no debe dar a entender lo contrario.
 */
export const siteConfig = {
  name: "AURE",
  /** Submarca / nombre completo (spec §5). Es el nombre de marca, NO un claim de servicio. */
  submarca: "Arch & Urban Real Estate",
  legalName: "AURE · Arch & Urban Real Estate",
  tagline: "Comercialización inmobiliaria · Buenos Aires",
  // TODO(contenido): descripción final aprobada por el cliente.
  description:
    "AURE comercializa desarrollos inmobiliarios seleccionados en Buenos Aires, sobre todo de pozo. Te acompañamos con información clara y respaldo, de la primera consulta a la entrega.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Número de WhatsApp: solo dígitos, formato internacional. Desde env. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  // TODO(contenido): datos de contacto reales del cliente.
  contact: {
    email: "contacto@aure.example",
    phoneDisplay: "+54 11 0000-0000",
    addressLine: "Buenos Aires, Argentina",
  },
  social: {
    // TODO(contenido): handle/URL real de Instagram.
    instagram: "https://instagram.com/",
  },
} as const;

/** Navegación principal. Anclas con prefijo "/" para funcionar desde cualquier página. */
export const navLinks = [
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
] as const;

/** CTA primario reutilizable (lleva al formulario de contacto, siempre visible). */
export const primaryCta = {
  label: "Quiero info",
  href: "/#contacto",
} as const;

export type NavLink = (typeof navLinks)[number];
