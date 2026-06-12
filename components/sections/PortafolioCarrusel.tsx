"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type CarruselItem = {
  id: string;
  categoria: "Desarrollo" | "Venta" | "Alquiler";
  badge: string;
  foto: string;
  alt: string;
  titulo: string;
  descripcion: string;
  href: string;
  cta: string;
  ctaExternal?: boolean;
};

function ArrowBtn({
  dir,
  onClick,
  className,
}: {
  dir: "left" | "right";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Anterior" : "Siguiente"}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-borde bg-white text-azul transition-colors hover:border-azul hover:bg-azul hover:text-white",
        className,
      )}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        {dir === "right" ? (
          <polyline points="13 6 19 12 13 18" />
        ) : (
          <polyline points="11 6 5 12 11 18" />
        )}
      </svg>
    </button>
  );
}

const categoriaMeta: Record<
  CarruselItem["categoria"],
  { label: string; eyebrow: string; badge: string }
> = {
  Desarrollo: {
    label: "Desarrollo",
    eyebrow: "text-dorado",
    badge: "bg-dorado/90 text-azul",
  },
  Venta: {
    label: "Venta",
    eyebrow: "text-azul",
    badge: "bg-azul/90 text-white",
  },
  Alquiler: {
    label: "Alquiler",
    eyebrow: "text-gris-texto",
    badge: "bg-azul/80 text-white",
  },
};

export function PortafolioCarrusel({
  items,
  ctaFinal,
}: {
  items: CarruselItem[];
  /** Card de cierre del carrusel (p. ej. "Ver todas las propiedades"). */
  ctaFinal?: { label: string; href: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setCanScrollLeft(el.scrollLeft > 4);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    ref.current?.scrollBy({
      left: dir === "left" ? -310 : 310,
      behavior: "smooth",
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8">
      {/* Wrapper relativo para posicionar flechas */}
      <div className="relative">
        {/* Flecha izquierda — solo cuando hay contenido para volver */}
        {canScrollLeft && (
          <ArrowBtn
            dir="left"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2"
          />
        )}

        {/* Flecha derecha — siempre visible, centrada verticalmente. Dentro del
            contenedor (no se sale en mobile/tablet ni genera scroll horizontal). */}
        <ArrowBtn
          dir="right"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2"
        />

      {/* Carrusel scrollable */}
      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const meta = categoriaMeta[item.categoria];
          return (
            <article
              key={item.id}
              className="w-72 flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-borde bg-white"
            >
              {/* Foto */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gris-claro">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.foto}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span
                  className={cn(
                    "absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]",
                    meta.badge,
                  )}
                >
                  {item.badge}
                </span>
              </div>

              {/* Contenido */}
              <div className="flex flex-col p-5">
                <p
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-eyebrow",
                    meta.eyebrow,
                  )}
                >
                  {meta.label}
                </p>
                <h3 className="mt-2 font-medium leading-snug tracking-display text-azul">
                  {item.titulo}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gris-texto">
                  {item.descripcion}
                </p>
                <div className="mt-5">
                  <Button
                    href={item.href}
                    size="sm"
                    variant="secondary"
                    {...(item.ctaExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.cta}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}

        {/* Card de cierre: invita a ver el listado completo. Misma huella que
            las cards (w-72, rounded-2xl); azul de marca, sobria. */}
        {ctaFinal ? (
          <Link
            href={ctaFinal.href}
            className="group flex w-72 flex-shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-2xl bg-azul p-8 text-center text-white transition-colors hover:bg-azul-profundo"
          >
            <span className="text-xl font-medium leading-snug tracking-display">
              {ctaFinal.label}
            </span>
            <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-eyebrow text-gris">
              Explorar
              <svg
                viewBox="0 0 20 12"
                width="18"
                height="11"
                fill="none"
                aria-hidden="true"
                className="text-dorado transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M1 6h17M13 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        ) : null}
      </div>
      </div>
    </div>
  );
}
