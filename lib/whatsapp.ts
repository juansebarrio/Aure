/**
 * Construye un link wa.me a partir de un número (solo dígitos, formato
 * internacional). Devuelve null si no hay número configurado, para que el
 * componente pueda no renderizar el botón.
 */
export function whatsappUrl(
  rawNumber: string,
  message?: string,
): string | null {
  const digits = rawNumber.replace(/\D/g, "");
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
