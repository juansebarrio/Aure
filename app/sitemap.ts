import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getProperties } from "@/lib/properties";

/**
 * Sitemap completo. Incluye las páginas estáticas reales y las fichas de
 * propiedad derivadas de la capa de datos (mock hoy, feed real de Tokko al
 * cargar la key): así se mantiene solo, sin tocar este archivo.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const lastModified = new Date();

  const properties = await getProperties();
  const propiedades: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${base}/propiedad/${p.id}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/propiedades`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/emprendimientos`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/politicas`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...propiedades,
  ];
}
