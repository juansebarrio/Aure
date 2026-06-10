import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getProperties, isLiveData } from "@/lib/properties";
import { EMPRENDIMIENTOS } from "@/lib/emprendimientos";
import { GUIAS } from "@/lib/guias";

/**
 * Sitemap derivado de las fuentes de datos: se mantiene solo. Solo lista lo
 * indexable (no anuncia rutas bloqueadas):
 *   - Institucional + emprendimientos reales (curados): siempre.
 *   - Propiedades (/propiedades + fichas): solo con feed real de Tokko; con el
 *     mock están bloqueadas en robots, así que no van acá.
 *   - El placeholder de emprendimiento y /politicas (legal preliminar) quedan
 *     fuera hasta tener contenido real.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const lastModified = new Date();

  const emprendimientos: MetadataRoute.Sitemap = EMPRENDIMIENTOS.filter(
    (e) => !e.placeholder,
  ).map((e) => ({
    url: `${base}/emprendimiento/${e.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guias: MetadataRoute.Sitemap = GUIAS.map((g) => ({
    url: `${base}/guias/${g.slug}`,
    lastModified: new Date(g.actualizada),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/emprendimientos`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...emprendimientos,
    {
      url: `${base}/guias`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...guias,
  ];

  if (isLiveData()) {
    const properties = await getProperties();
    entries.push(
      {
        url: `${base}/propiedades`,
        lastModified,
        changeFrequency: "daily",
        priority: 0.9,
      },
      ...properties.map((p) => ({
        url: `${base}/propiedad/${p.id}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    );
  }

  return entries;
}
