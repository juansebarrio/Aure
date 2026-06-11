import type { SVGProps } from "react";

/**
 * Isotipo de AURE (Aure_V1.pdf): la "A" abstracta = pala + círculo.
 * Geometría oficial del cliente. La pala usa `currentColor` (azul sobre claro,
 * crema sobre azul); el círculo queda siempre dorado.
 */
export function Isotipo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 300 342" role="img" aria-label="aure" fill="none" {...props}>
      <circle cx="57" cy="285" r="57" fill="#C0A872" />
      <path d="M130 0 L300 342 L185 342 L72 112 Z" fill="currentColor" />
    </svg>
  );
}
