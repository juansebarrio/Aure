import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Acordeón accesible basado en <details>/<summary> nativos:
 * teclado y semántica gratis, sin JS de cliente. Separadores finos,
 * indicador dorado que pasa de "+" a "×" al abrir.
 */
export function Accordion({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("border-y border-line", className)}>{children}</div>
  );
}

export function AccordionItem({
  question,
  defaultOpen = false,
  children,
}: {
  question: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details
      className="group border-b border-line last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
        <span className="text-base font-medium tracking-display text-current sm:text-lg">
          {question}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 select-none text-2xl font-light leading-none text-gold transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="max-w-prose pb-6 text-sm leading-relaxed text-muted sm:text-base">
        {children}
      </div>
    </details>
  );
}
