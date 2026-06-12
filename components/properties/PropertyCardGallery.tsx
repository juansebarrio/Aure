"use client";

import { useRef, useState } from "react";
import { PropertyImage } from "@/components/properties/PropertyImage";
import { CarouselArrow } from "@/components/properties/CarouselArrow";
import { cn } from "@/lib/cn";
import type { PropertyPhoto } from "@/lib/properties";

/** Fotos navegables en la card; el resto se ve en la ficha. */
const MAX_FOTOS = 3;

type Slide =
  | { kind: "foto"; photo: PropertyPhoto }
  | { kind: "more"; photo: PropertyPhoto; restantes: number };

/**
 * Mini-carrusel de fotos dentro de la card de propiedad: hasta MAX_FOTOS fotos
 * con swipe nativo (scroll-snap) + flechas; si hay más, la última slide es un
 * "+N fotos · Ver ficha" (la card entera ya linkea al detalle).
 *
 * Va DEBAJO del link estirado de la card (z-10); las flechas viven en z-20 para
 * ser cliqueables sin navegar. Los dots son indicadores (pointer-events-none).
 */
export function PropertyCardGallery({
  photos,
  totalFotos,
  alt,
  priority,
}: {
  photos: PropertyPhoto[];
  /** Total REAL de fotos de la propiedad: el listado recorta `photos` a 4
   *  (PropertyListItem) y el "+N fotos" se calcula sobre el total. */
  totalFotos?: number;
  alt: string;
  priority?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // 0 o 1 foto: imagen simple, sin controles (igual que antes).
  if (photos.length <= 1) {
    return <PropertyImage photo={photos[0]} alt={alt} priority={priority} />;
  }

  const restantes = (totalFotos ?? photos.length) - MAX_FOTOS;
  const slides: Slide[] = [
    ...photos
      .slice(0, MAX_FOTOS)
      .map((photo): Slide => ({ kind: "foto", photo })),
    ...(restantes > 0
      ? [{ kind: "more", photo: photos[MAX_FOTOS], restantes } as Slide]
      : []),
  ];
  const count = slides.length;

  const go = (delta: number) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.min(Math.max(index + delta, 0), count - 1);
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  // El índice deriva del scroll real: cubre flechas Y swipe táctil.
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index && i >= 0 && i < count) setIndex(i);
  };

  return (
    <>
      <div
        ref={trackRef}
        onScroll={onScroll}
        aria-label={`Fotos de ${alt}`}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-full w-full shrink-0 snap-center">
            {slide.kind === "foto" ? (
              <PropertyImage
                photo={slide.photo}
                alt={`${alt} — foto ${i + 1}`}
                priority={priority && i === 0}
              />
            ) : (
              <>
                <PropertyImage photo={slide.photo} alt="" />
                {/* Velo azul de marca sobre la foto siguiente: invita a la ficha. */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-azul/85 text-white">
                  <p className="text-lg font-medium tracking-display">
                    +{slide.restantes} fotos
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-eyebrow text-gris">
                    Ver ficha completa
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <CarouselArrow
        dir="left"
        label="Foto anterior"
        onClick={() => go(-1)}
        hidden={index === 0}
        className="h-8 w-8"
      />
      <CarouselArrow
        dir="right"
        label="Foto siguiente"
        onClick={() => go(1)}
        hidden={index === count - 1}
        className="h-8 w-8"
      />

      {/* Indicadores (solo visuales; el link estirado sigue cliqueable encima). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5"
      >
        {slides.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              i === index ? "bg-white" : "bg-white/50",
            )}
          />
        ))}
      </div>
    </>
  );
}
