import { NextResponse } from "next/server";
import { validateContact, hasErrors, type ContactValues } from "@/lib/contact";

/**
 * STUB del endpoint del formulario "Agendá una reunión".
 * Valida los campos y por ahora responde ok + loguea en servidor.
 *
 * TODO(integración): acá va el envío real cuando estén las claves —
 *   1) Mail interno al equipo con el lead (Resend).
 *   2) Mail de confirmación al contacto.
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

  // TODO(integración): reemplazar este log por el envío de mails (Resend).
  console.info("[contacto] nuevo lead (stub):", {
    nombre: body.nombre,
    email: body.email,
    telefono: body.telefono ?? "",
    mensaje: body.mensaje,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
