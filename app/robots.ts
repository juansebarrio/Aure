import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Indexación atada a la fuente de datos: sin `TOKKO_API_KEY` el sitio sirve el
 * mock (datos ficticios), así que pedimos NO indexar (entorno de staging). Con
 * la key (datos reales de Tokko) habilitamos la indexación. Es reversible: al
 * cargar la key, el sitio queda indexable solo.
 */
export default function robots(): MetadataRoute.Robots {
  const indexable = Boolean(process.env.TOKKO_API_KEY);
  return {
    rules: indexable
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
