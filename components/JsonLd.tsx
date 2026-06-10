/**
 * Renderiza datos estructurados (JSON-LD) en un <script type="application/ld+json">.
 * Server component: no envía JS al cliente, solo el markup en el HTML.
 *
 * - Un objeto → un nodo schema.org.
 * - Un array → varios nodos en un único @graph (forma recomendada para
 *   describir varias entidades relacionadas en la misma página).
 *
 * Los constructores viven en lib/structured-data.ts.
 */
type JsonLdNode = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };

  return (
    <script
      type="application/ld+json"
      // Escapamos "<" para que ningún string del JSON pueda cerrar el <script>
      // ni inyectar markup (XSS). Es la práctica estándar para JSON-LD inline.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
