import { NextResponse } from "next/server";
import { validateContact, hasErrors, type ContactValues } from "@/lib/contact";
import { sendLeadToTokko } from "@/lib/tokko-leads";

/**
 * Endpoint del formulario de contacto. Valida y envía el lead al CRM de Tokko
 * (si hay TOKKO_API_KEY). Sin key, el form sigue funcionando igual (responde ok).
 *
 * TODO(integración): además del CRM, sumar mail interno + confirmación (Resend).
 *   Variables esperadas: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 */
export async function POST(request: Request) {
  let body: Partial<ContactValues>;
  try {
    body = (await request.json()) as Partial<ContactValues>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Cuerpo inválido." },
      { status: 400 },
    );
  }

  const errors = validateContact(body);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Enviar el lead al CRM de Tokko (no-op si no hay TOKKO_API_KEY). No rompe la
  // respuesta al usuario si Tokko falla: el formulario responde ok igual.
  const sentToCrm = await sendLeadToTokko({
    nombre: body.nombre ?? "",
    email: body.email ?? "",
    telefono: body.telefono,
    mensaje: body.mensaje ?? "",
    proyecto: body.proyecto,
  });

  console.info("[contacto] nuevo lead:", {
    nombre: body.nombre,
    email: body.email,
    telefono: body.telefono ?? "",
    proyecto: body.proyecto ?? "",
    sentToCrm,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
