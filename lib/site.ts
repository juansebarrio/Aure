/**
 * Configuración central del sitio.
 * TODO(contenido): reemplazar todos los textos/links placeholder por el
 * contenido final aprobado por el cliente.
 *
 * TODO(registro): el brief pide "no asumir voseo ni tono informal", pero
 * nombra al formulario "Agendá una reunión" (voseo). Se usa esa etiqueta tal
 * cual para el CTA/form y se mantiene el resto del copy en registro neutro.
 * Confirmar con el cliente el registro definitivo de toda la pieza.
 */
export const siteConfig = {
  name: "AURE",
  legalName: "AURE — Arch & Urban Real Estate",
  tagline: "Arch & Urban Real Estate",
  // TODO(contenido): descripción final aprobada por el cliente.
  description:
    "Real estate premium en Buenos Aires. Acompañamos a inversores calificados en oportunidades inmobiliarias seleccionadas con criterio arquitectónico y urbano.",
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
  { label: "Garantías", href: "/#garantias" },
  { label: "Testimonios", href: "/#testimonios" },
  { label: "Preguntas", href: "/#faqs" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;

/** CTA primario reutilizable (lleva al formulario). */
export const primaryCta = {
  label: "Agendá una reunión",
  href: "/#agenda",
} as const;

export type NavLink = (typeof navLinks)[number];
