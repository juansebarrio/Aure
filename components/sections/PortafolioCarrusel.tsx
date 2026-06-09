"use client";

import { useRef, useState, useEffect } from "react";
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

export function PortafolioCarrusel({ items }: { items: CarruselItem[] }) {
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
            className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          />
        )}

        {/* Flecha derecha — siempre visible, centrada verticalmente */}
        <ArrowBtn
          dir="right"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 translate-x-[calc(100%+40px)] -translate-y-1/2"
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
      </div>
      </div>
    </div>
  );
}
