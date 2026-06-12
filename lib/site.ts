/**
 * Configuración central del sitio. Datos de contacto REALES (validados con el
 * cliente). Este sitio reemplaza a aure.ar.
 *
 * TODO(posicionamiento): aure.ar es una inmobiliaria full (incluye alquileres).
 * El encuadre actual "comercializa desarrollos / no desarrolla" queda
 * inconsistente con eso al sumar alquileres. NO reescribir el copy acá: se
 * define con el cliente después de la reunión.
 */
export const siteConfig = {
  name: "AURE",
  /** Submarca / nombre completo (spec §5). Es el nombre de marca, NO un claim de servicio. */
  submarca: "Arch & Urban Real Estate",
  legalName: "AURE · Arch & Urban Real Estate",
  tagline: "Comercialización inmobiliaria · Buenos Aires",
  description:
    "AURE comercializa desarrollos inmobiliarios seleccionados en Buenos Aires, sobre todo de pozo. Te acompañamos con información clara y respaldo, de la primera consulta a la entrega.",
  // URL canónica. En producción se setea NEXT_PUBLIC_SITE_URL (dominio final
  // https://www.aure.ar al migrar). Fallback a la URL real para que metadata /
  // Open Graph NO apunten a localhost.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aure.ar",
  // WhatsApp: solo dígitos, formato internacional (con 9 para móvil AR).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5491130500088",
  /** Mensaje precargado del WhatsApp (botón flotante + CTA de contacto). */
  whatsappMessage: "Hola, quería hacer una consulta.",
  contact: {
    email: "hola@aure.ar",
    phoneDisplay: "11 3050-0088",
    phoneHref: "tel:+541130500088",
    // TODO(cliente): confirmar dirección. En el kick-off mencionaron Villa
    // Urquiza; el sitio actual usa Quesada 5739. Usamos Quesada por ahora.
    addressLine: "Quesada 5739, Dto. 4 — Ciudad de Buenos Aires",
    // Partes estructuradas de la dirección (para PostalAddress / JSON-LD).
    // Misma dirección que `addressLine`; al confirmarla, actualizar ambas.
    address: {
      streetAddress: "Quesada 5739, Dto. 4",
      locality: "Ciudad Autónoma de Buenos Aires",
      region: "CABA",
      country: "AR",
    },
  },
  social: {
    instagram: "https://www.instagram.com/aure.realty/",
    facebook: "https://www.facebook.com/aure.propiedades",
  },
  // Sellos de confianza (cámaras del rubro). TODO(cliente): confirmar el nombre
  // completo y los links oficiales; reemplazar por los logos reales.
  seals: [
    { label: "CPI", title: "Sello CPI — cámara del rubro inmobiliario" },
    { label: "LCNI", title: "Sello LCNI — cámara del rubro inmobiliario" },
  ],
} as const;

/**
 * Menú "Propiedades" (dropdown del navbar). Emprendimientos apunta por ahora a
 * la sección Proyectos del home; las otras tres son páginas de listado.
 */
export const propiedadesMenu = [
  { label: "Todas las propiedades", href: "/propiedades" },
  { label: "Venta", href: "/propiedades?operacion=Venta" },
  { label: "Alquiler", href: "/propiedades?operacion=Alquiler" },
  { label: "Alquiler temporario", href: "/propiedades?operacion=Alquiler%20temporario" },
] as const;

/**
 * Links sueltos del navbar (además del dropdown "Propiedades"). Emprendimientos
 * es una sección aparte (otra entidad), por eso va como ítem propio, no en el
 * dropdown. Anclas con "/" para funcionar desde cualquier página.
 */
export const navLinks = [
  { label: "Emprendimientos", href: "/emprendimientos" },
  // Guías queda fuera de la navbar superior, pero sigue en el footer (y sus
  // páginas /guias siguen vivas e indexables — es la palanca de GEO).
  { label: "Guías", href: "/guias", footerOnly: true },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
] as const;

/** Links de la navbar superior: navLinks sin los marcados `footerOnly`. */
export const navbarLinks = navLinks.filter(
  (l) => !("footerOnly" in l && l.footerOnly),
);

/** CTA primario reutilizable (lleva al formulario de contacto, siempre visible). */
export const primaryCta = {
  label: "Quiero info",
  href: "/#contacto",
} as const;

export type NavLink = (typeof navLinks)[number];
