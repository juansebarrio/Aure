import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  id: string;
  label: string;
  /** Texto de ayuda opcional bajo el campo. */
  hint?: string;
  /** Mensaje de error opcional (activa estado inválido). */
  error?: string;
  className?: string;
  wrapperClassName?: string;
};

const fieldBase =
  "block w-full rounded-xl border border-borde bg-white px-4 py-3 text-base text-azul placeholder:text-gris-texto/70 transition-colors focus:border-dorado focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-danger";

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  wrapperClassName,
  children,
}: Pick<FieldProps, "id" | "label" | "hint" | "error" | "wrapperClassName"> & {
  required?: boolean;
  children: ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName)}>
      <label htmlFor={id} className="text-sm font-medium text-azul">
        {label}
        {required ? (
          <span className="ml-1 text-gris-texto" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={hintId} className="text-sm text-gris-texto">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Campo de texto de una línea, accesible (label asociado, aria-describedby). */
export function Input({
  id,
  label,
  hint,
  error,
  className,
  wrapperClassName,
  ...props
}: FieldProps & Omit<ComponentPropsWithoutRef<"input">, "id" | keyof FieldProps>) {
  const describedBy =
    [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={props.required}
      wrapperClassName={wrapperClassName}
    >
      <input
        id={id}
        className={cn(fieldBase, className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
    </FieldShell>
  );
}

/** Campo multilínea, mismo tratamiento visual y de accesibilidad que Input. */
export function Textarea({
  id,
  label,
  hint,
  error,
  className,
  wrapperClassName,
  ...props
}: FieldProps &
  Omit<ComponentPropsWithoutRef<"textarea">, "id" | keyof FieldProps>) {
  const describedBy =
    [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={props.required}
      wrapperClassName={wrapperClassName}
    >
      <textarea
        id={id}
        className={cn(fieldBase, "min-h-32 resize-y", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
    </FieldShell>
  );
}
