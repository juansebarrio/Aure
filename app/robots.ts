import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Indexación quirúrgica atada a la fuente de datos. El contenido institucional
 * y los emprendimientos (curados a mano, reales) se indexan siempre. Las
 * propiedades dependen de Tokko: sin `TOKKO_API_KEY` el sitio sirve el mock
 * (datos ficticios), así que bloqueamos /propiedades y /propiedad/* para no
 * indexar fichas inventadas. Con la key, esas rutas quedan indexables solas.
 *
 * El placeholder de emprendimiento y /politicas (legal preliminar) se excluyen
 * vía `robots: { index: false }` en su metadata, no acá.
 */
export default function robots(): MetadataRoute.Robots {
  const live = Boolean(process.env.TOKKO_API_KEY);
  return {
    rules: live
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", allow: "/", disallow: ["/propiedades", "/propiedad/"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
