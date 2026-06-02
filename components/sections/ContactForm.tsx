"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  validateContact,
  hasErrors,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";

const EMPTY: ContactValues = { nombre: "", email: "", telefono: "", mensaje: "" };

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function update<K extends keyof ContactValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      setStatus("error");
      setStatusMessage("Hay campos para revisar.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data: { ok?: boolean; errors?: ContactErrors } = await res
        .json()
        .catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        setStatusMessage(
          "Gracias. Recibimos tu consulta y te contactamos a la brevedad.",
        );
        setValues(EMPTY);
        setErrors({});
        return;
      }

      if (data.errors) setErrors(data.errors);
      setStatus("error");
      setStatusMessage(
        "No se pudo enviar el formulario. Por favor, revisar los datos e intentar nuevamente.",
      );
    } catch {
      setStatus("error");
      setStatusMessage(
        "No se pudo enviar el formulario en este momento. Por favor, intentar nuevamente más tarde.",
      );
    }
  }

  const submitting = status === "submitting";

  return (
    <Section id="contacto" background="gris-claro">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>Contacto</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
            Dejá tu consulta y te contactamos
          </h2>
          {/* TODO(contenido): texto de apoyo definitivo. */}
          <p className="mt-6 max-w-md leading-relaxed text-gris-texto">
            Contanos qué estás buscando y un asesor te escribe para coordinar una
            consulta, una reunión o una visita. Sin compromiso.
          </p>
        </div>

        <div className="lg:col-span-7">
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-brand border border-borde bg-white p-6 sm:p-8"
            aria-describedby="form-status"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                id="nombre"
                name="nombre"
                label="Nombre"
                autoComplete="name"
                required
                value={values.nombre}
                error={errors.nombre}
                onChange={(e) => update("nombre", e.target.value)}
              />
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                required
                value={values.email}
                error={errors.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div className="mt-5">
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                label="Teléfono"
                hint="Opcional"
                autoComplete="tel"
                value={values.telefono}
                error={errors.telefono}
                onChange={(e) => update("telefono", e.target.value)}
              />
            </div>
            <div className="mt-5">
              <Textarea
                id="mensaje"
                name="mensaje"
                label="Mensaje"
                required
                rows={4}
                value={values.mensaje}
                error={errors.mensaje}
                onChange={(e) => update("mensaje", e.target.value)}
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Enviando…" : "Enviar consulta"}
              </Button>
              <p
                id="form-status"
                role="status"
                aria-live="polite"
                className={
                  status === "success"
                    ? "text-sm text-azul"
                    : status === "error"
                      ? "text-sm text-danger"
                      : "text-sm text-gris-texto"
                }
              >
                {statusMessage}
              </p>
            </div>

            {/* TODO(integración): al enviar, /api/contacto disparará el mail
                interno + confirmación (Resend) cuando estén las claves. */}
          </form>
        </div>
      </div>
    </Section>
  );
}
