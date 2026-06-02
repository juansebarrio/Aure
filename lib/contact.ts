/**
 * Validación del formulario de contacto, compartida entre el cliente
 * (validación en vivo) y el API route (validación de servidor).
 *
 * Mensajes en registro neutro/impersonal a propósito: el brief pide no asumir
 * voseo. La única excepción es la etiqueta "Agendá una reunión" (dada por el
 * brief). TODO(registro): confirmar el registro definitivo con el cliente.
 */
export type ContactValues = {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: Partial<ContactValues>): ContactErrors {
  const errors: ContactErrors = {};

  const nombre = (values.nombre ?? "").trim();
  const email = (values.email ?? "").trim();
  const telefono = (values.telefono ?? "").trim();
  const mensaje = (values.mensaje ?? "").trim();

  if (nombre.length < 2) {
    errors.nombre = "El nombre es obligatorio.";
  }
  if (!EMAIL_RE.test(email)) {
    errors.email = "El email no es válido.";
  }
  if (telefono && telefono.replace(/\D/g, "").length < 6) {
    errors.telefono = "El teléfono no es válido.";
  }
  if (mensaje.length < 10) {
    errors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  }

  return errors;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
