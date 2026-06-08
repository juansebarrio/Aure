"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  validateContact,
  hasErrors,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";

const EMPTY: ContactValues = {
  nombre: "",
  email: "",
  telefono: "",
  proyecto: "",
  mensaje: "",
};

type Status = "idle" | "submitting" | "success" | "error";

/* ---- Iconos de canales ---- */
function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/**
 * Contacto — tres vías de contacto:
 *  1) Formulario (el que compara).
 *  2) WhatsApp directo (el inmediato).
 *  3) Reunión / visita (el decidido).
 */
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
  const mailto = `mailto:${siteConfig.contact.email}`;
  const waInfo =
    whatsappUrl(siteConfig.whatsapp, siteConfig.whatsappMessage) ?? mailto;
  const waVisita =
    whatsappUrl(
      siteConfig.whatsapp,
      "Hola, quería coordinar una reunión o una visita.",
    ) ?? mailto;

  /* ---- Canales de contacto ---- */
  const channels = [
    {
      icon: <IconWhatsApp />,
      label: "WhatsApp directo",
      sub: "Respuesta directa, lunes a sábado",
      href: waInfo,
      external: true,
    },
    {
      icon: <IconCalendar />,
      label: "Reunión o visita",
      sub: "Coordinamos en el showroom o donde prefieras",
      href: waVisita,
      external: true,
    },
    {
      icon: <IconMail />,
      label: siteConfig.contact.email,
      sub: "También por correo, si preferís",
      href: mailto,
      external: false,
    },
  ];

  return (
    <Section id="contacto" background="blue">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

        {/* Columna izquierda — copy + canales */}
        <div className="flex flex-col lg:col-span-5">
          <Eyebrow>Contacto</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium tracking-display text-white sm:text-4xl">
            Hablemos cuando quieras
          </h2>
          {/* TODO(contenido): texto definitivo */}
          <p className="mt-4 leading-relaxed text-gris">
            Elegí cómo comunicarte. Sin formulismos, sin esperas innecesarias.
          </p>

          {/* Lista de canales */}
          <ul className="mt-10 divide-y divide-white/10 border-t border-white/10">
            {channels.map((ch) => (
              <li key={ch.label}>
                <a
                  href={ch.href}
                  {...(ch.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 py-5 transition-colors"
                >
                  {/* Ícono en círculo glass */}
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-dorado transition-colors group-hover:border-dorado/40 group-hover:bg-dorado/10">
                    {ch.icon}
                  </span>

                  {/* Texto */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white transition-colors group-hover:text-dorado">
                      {ch.label}
                    </p>
                    <p className="mt-0.5 text-sm text-gris">{ch.sub}</p>
                  </div>

                  {/* Flecha */}
                  <span className="flex-shrink-0 text-white/25 transition-colors group-hover:text-dorado">
                    <IconChevron />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna derecha — formulario */}
        <div className="lg:col-span-7">
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-2xl bg-white p-6 sm:p-8"
            aria-describedby="form-status"
          >
            <p className="mb-6 text-base font-medium text-azul">
              Completá el formulario y un asesor se pone en contacto.
            </p>

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
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                label="Teléfono / WhatsApp"
                hint="Opcional"
                autoComplete="tel"
                value={values.telefono}
                error={errors.telefono}
                onChange={(e) => update("telefono", e.target.value)}
              />
              <Input
                id="proyecto"
                name="proyecto"
                label="Proyecto de interés"
                hint="Opcional"
                value={values.proyecto}
                onChange={(e) => update("proyecto", e.target.value)}
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
            {/* TODO(integración): /api/contacto disparará mail interno + confirmación (Resend). */}
          </form>
        </div>

      </div>
    </Section>
  );
}
