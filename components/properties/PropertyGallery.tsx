"use client";

import { useEffect, useRef, useState } from "react";
import { PropertyImage } from "@/components/properties/PropertyImage";
import { CarouselArrow } from "@/components/properties/CarouselArrow";
import { cn } from "@/lib/cn";
import type { PropertyPhoto } from "@/lib/properties";

/**
 * Galería de la ficha de propiedad: foto principal arriba + tira de miniaturas
 * (carrusel horizontal) abajo. Tocar una miniatura la muestra en la principal;
 * la principal además tiene flechas y contador. Sobria, sin sombras.
 * TODO(ux): lightbox/zoom si el cliente lo pide.
 */
export function PropertyGallery({
  photos,
  titulo,
}: {
  photos: PropertyPhoto[];
  titulo: string;
}) {
  const [active, setActive] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const count = photos.length;

  // Mantener la miniatura activa a la vista. Scroll horizontal de la TIRA
  // (scrollTo manual, no scrollIntoView): nunca mueve la página verticalmente.
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const left = thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  const go = (delta: number) =>
    setActive((i) => Math.min(Math.max(i + delta, 0), count - 1));

  return (
    <div>
      {/* Principal */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gris-claro">
        <PropertyImage
          photo={photos[active]}
          alt={count > 1 ? `${titulo} — foto ${active + 1} de ${count}` : titulo}
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority={active === 0}
        />
        {count > 1 ? (
          <>
            <CarouselArrow
              dir="left"
              label="Foto anterior"
              onClick={() => go(-1)}
              hidden={active === 0}
              className="h-9 w-9"
            />
            <CarouselArrow
              dir="right"
              label="Foto siguiente"
              onClick={() => go(1)}
              hidden={active === count - 1}
              className="h-9 w-9"
            />
            <p
              aria-live="polite"
              className="absolute right-3 top-3 rounded-brand bg-azul/80 px-2 py-1 text-xs font-medium text-white"
            >
              {active + 1} / {count}
            </p>
          </>
        ) : null}
      </div>

      {/* Tira de miniaturas — tocar una la sube a la principal. */}
      {count > 1 ? (
        <div
          ref={thumbsRef}
          className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((foto, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1} de ${count}`}
              aria-current={i === active ? "true" : undefined}
              className={cn(
                "relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity sm:w-28",
                i === active
                  ? "border-dorado"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <PropertyImage
                photo={foto}
                alt={`${titulo} — miniatura ${i + 1}`}
                sizes="(min-width: 640px) 112px, 96px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
