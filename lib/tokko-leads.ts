/**
 * Envío de leads al CRM de Tokko (endpoint webcontact). SERVER-SIDE.
 *
 * - Si NO hay `TOKKO_API_KEY`: es no-op (devuelve false). El formulario del
 *   sitio sigue funcionando igual que ahora — esto NO lo rompe.
 * - Nunca lanza: loguea y devuelve boolean (el usuario no ve el error de CRM).
 *
 * TODO(tokko): verificar con la doc/key el endpoint y la forma EXACTA del payload:
 *   - URL: POST https://www.tokkobroker.com/api/v1/webcontact/?key=...
 *   - body: { name, email, phone, text, properties:[id], tags:[...] }
 *     ¿flat o envuelto en { data: {...} }? ¿`phone` vs `cellphone`? confirmar.
 *   - identificar el origen (tag "Sitio web" / source).
 */
const TOKKO_BASE = "https://www.tokkobroker.com/api/v1";

export type LeadInput = {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  /** Texto libre del proyecto/propiedad de interés (campo del formulario). */
  proyecto?: string;
  /** Id de propiedad de Tokko, si la consulta nace de una propiedad. */
  propertyId?: string;
};

export async function sendLeadToTokko(lead: LeadInput): Promise<boolean> {
  const key = process.env.TOKKO_API_KEY;
  if (!key) return false; // sin key: no-op (el form responde ok igual)

  try {
    const text = [
      lead.mensaje,
      lead.proyecto ? `Proyecto/propiedad de interés: ${lead.proyecto}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    // TODO(tokko): confirmar nombres de campos y si va envuelto en { data }.
    const payload: Record<string, unknown> = {
      name: lead.nombre,
      email: lead.email,
      phone: lead.telefono ?? "",
      text,
      tags: ["Sitio web"],
    };
    if (lead.propertyId) payload.properties = [lead.propertyId];

    const res = await fetch(
      `${TOKKO_BASE}/webcontact/?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("[tokko] webcontact respondió", res.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[tokko] sendLeadToTokko falló:", error);
    return false;
  }
}
