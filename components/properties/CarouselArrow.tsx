"use client";

import { cn } from "@/lib/cn";

/**
 * Flecha circular para galerías de fotos (cards y ficha). Sobria, sin sombras;
 * mismo lenguaje que las flechas del carrusel del portafolio. `hidden` la
 * desvanece en los extremos sin sacarla del layout (y la saca del tab order).
 */
export function CarouselArrow({
  dir,
  label,
  onClick,
  hidden,
  className,
}: {
  dir: "left" | "right";
  label: string;
  onClick: () => void;
  hidden?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      tabIndex={hidden ? -1 : 0}
      className={cn(
        "absolute top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-borde bg-white/90 text-azul transition hover:border-azul hover:bg-azul hover:text-white",
        dir === "left" ? "left-3" : "right-3",
        hidden && "pointer-events-none opacity-0",
        className,
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === "right" ? (
          <polyline points="9 5 16 12 9 19" />
        ) : (
          <polyline points="15 5 8 12 15 19" />
        )}
      </svg>
    </button>
  );
}
