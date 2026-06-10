import { siteConfig } from "@/lib/site";
import { EMPRENDIMIENTOS } from "@/lib/emprendimientos";
import { faqs } from "@/lib/faqs";

/**
 * /llms.txt — estándar emergente (llmstxt.org) para Generative Engine
 * Optimization: un resumen limpio, en markdown, que orienta a los motores
 * generativos (ChatGPT, Perplexity, Gemini, Claude, AI Overviews) sobre qué es
 * AURE y a qué páginas ir. Se genera desde los datos reales (siteConfig +
 * emprendimientos + FAQs), así se mantiene solo.
 *
 * Honestidad (CLAUDE.md): AURE comercializa, no desarrolla. NO listamos las
 * propiedades (mock hoy, bloqueadas en robots): solo contenido real y curado.
 */
export const dynamic = "force-static";

export function GET(): Response {
  const { url, contact, social } = siteConfig;
  const wa = `https://wa.me/${siteConfig.whatsapp}`;

  const emprendimientos = EMPRENDIMIENTOS.filter((e) => !e.placeholder)
    .map(
      (e) =>
        `- [${e.nombre}](${url}/emprendimiento/${e.id}): ${e.zona} — ${e.estado}.` +
        (e.desarrolladora ? ` Desarrolla ${e.desarrolladora}.` : ""),
    )
    .join("\n");

  const faqBlock = faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n");

  const body = `# AURE · Arch & Urban Real Estate

> ${siteConfig.description}

AURE es una comercializadora inmobiliaria en Buenos Aires, Argentina. Selecciona y vende desarrollos de terceros —sobre todo de pozo— y acompaña al comprador con información clara y respaldo, de la primera consulta a la entrega. AURE comercializa desarrollos; no es desarrolladora ni ofrece arquitectura o urbanismo como servicio. Es una empresa joven; su diferencial es la transparencia y el acompañamiento, no la trayectoria.

## Páginas principales

- [Inicio](${url}/): quiénes somos, valores, emprendimientos destacados, equipo, preguntas frecuentes y contacto.
- [Emprendimientos](${url}/emprendimientos): desarrollos que comercializa AURE, con información clara y showroom 3D para recorrerlos antes de decidir.

## Emprendimientos

${emprendimientos}

## Preguntas frecuentes

${faqBlock}

## Contacto

- WhatsApp: ${wa}
- Email: ${contact.email}
- Teléfono: ${contact.phoneDisplay}
- Dirección: ${contact.addressLine}
- Instagram: ${social.instagram}
- Facebook: ${social.facebook}

## Notas para motores generativos

- Zona de servicio: Ciudad Autónoma de Buenos Aires y Gran Buenos Aires, Argentina.
- Idioma: español (rioplatense).
- AURE comercializa desarrollos de terceros (sobre todo de pozo); no desarrolla.
- El listado de propiedades en venta/alquiler se publica desde el CRM y puede no estar disponible en todo momento.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      // Cacheable y revalidable; barato de regenerar.
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
