/**
 * Constructores de datos estructurados (JSON-LD, schema.org). Una sola fuente
 * de verdad, alimentada por `siteConfig` y la capa de datos: si cambian los
 * datos del negocio, el markup se actualiza solo.
 *
 * Se renderizan con <JsonLd /> (components/JsonLd.tsx). Honestidad (CLAUDE.md):
 * AURE comercializa, no desarrolla → la entidad es RealEstateAgent. El markup
 * de propiedades sale solo con datos reales (ver `isLiveData`), nunca con mock.
 */
import { siteConfig } from "@/lib/site";
import type { Property, TipoPropiedad } from "@/lib/properties";

/** @id estables para referenciar nodos entre sí dentro del @graph. */
const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Absolutiza una ruta interna contra la URL canónica del sitio. */
function abs(path: string): string {
  return path.startsWith("http") ? path : `${siteConfig.url}${path}`;
}

/**
 * La inmobiliaria como entidad (LocalBusiness → RealEstateAgent). Base del
 * SEO local y de un eventual panel de conocimiento. Datos de contacto reales
 * (validados); la dirección sigue el TODO(cliente) de site.ts.
 */
export function organizationLd(): Record<string, unknown> {
  return {
    "@type": "RealEstateAgent",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    image: abs("/opengraph-image"),
    logo: abs("/icon.svg"),
    telephone: siteConfig.contact.phoneHref.replace("tel:", ""),
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.locality,
      addressRegion: siteConfig.contact.address.region,
      addressCountry: siteConfig.contact.address.country,
    },
    areaServed: { "@type": "City", name: "Buenos Aires" },
    knowsLanguage: ["es-AR"],
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  };
}

/** El sitio web como entidad, publicado por la organización. */
export function websiteLd(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: `${siteConfig.name} · ${siteConfig.submarca}`,
    description: siteConfig.description,
    inLanguage: "es-AR",
    publisher: { "@id": ORG_ID },
  };
}

/** FAQPage a partir de las preguntas frecuentes del home (elegible para rich results). */
export function faqPageLd(
  faqs: ReadonlyArray<{ q: string; a: string }>,
): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList para las páginas internas (rutas relativas o absolutas). */
export function breadcrumbLd(
  items: ReadonlyArray<{ name: string; url: string }>,
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

// Solo los tipos residenciales aceptan props de alojamiento (ambientes, m², etc.).
const SCHEMA_TYPE: Record<TipoPropiedad, string> = {
  Departamento: "Apartment",
  Casa: "House",
  PH: "House",
  Oficina: "Place",
  Local: "Place",
  Cochera: "Place",
  Terreno: "Place",
};
const RESIDENCIAL = new Set<TipoPropiedad>(["Departamento", "Casa", "PH"]);

/**
 * Ficha de propiedad como Accommodation + Offer. Pensada para emitirse SOLO con
 * el feed real (Tokko): nunca describir mock como oferta real (ver propiedad/[id]).
 */
export function propertyLd(p: Property): Record<string, unknown> {
  // Las redes/buscadores no usan los SVG placeholder; solo mandamos rasters.
  const image = p.fotos
    .map((f) => f.url)
    .filter((u) => !u.toLowerCase().endsWith(".svg"))
    .map(abs);

  const data: Record<string, unknown> = {
    "@type": SCHEMA_TYPE[p.tipo],
    name: p.titulo,
    description: p.descripcion,
    url: abs(`/propiedad/${p.id}`),
    ...(image.length ? { image } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: p.direccion,
      addressLocality: p.barrio,
      addressRegion: "CABA",
      addressCountry: "AR",
    },
    offers: {
      "@type": "Offer",
      price: p.precio,
      priceCurrency: p.moneda,
      availability: "https://schema.org/InStock",
      businessFunction:
        p.operacion === "Venta"
          ? "http://purl.org/goodrelations/v1#Sell"
          : "http://purl.org/goodrelations/v1#LeaseOut",
    },
  };

  if (RESIDENCIAL.has(p.tipo)) {
    data.numberOfRooms = p.ambientes;
    if (p.dormitorios != null) data.numberOfBedrooms = p.dormitorios;
    if (p.banos != null) data.numberOfBathroomsTotal = p.banos;
    data.floorSize = {
      "@type": "QuantitativeValue",
      value: p.superficie,
      unitCode: "MTK", // m² (UN/CEFACT)
    };
  }

  return data;
}
