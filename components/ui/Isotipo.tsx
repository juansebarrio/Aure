/**
 * Isotipo de AURE (Aure_V1.pdf): "A" abstracta = cuña inclinada + círculo.
 * La cuña usa `currentColor` (hereda el color del texto: azul sobre claro,
 * blanco sobre azul); el círculo va siempre en dorado (el acento de marca lo
 * lleva el isotipo, por eso el punto del wordmark va en el color del texto).
 */
export function Isotipo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="36" cy="70" r="14.5" className="fill-dorado" />
      <polygon points="48,8 67,8 79,92 60,92" fill="currentColor" />
    </svg>
  );
}
