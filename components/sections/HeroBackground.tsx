"use client";

import {
  useEffect,
  useRef,
  type PointerEvent,
  type ReactNode,
} from "react";
import { HeroGrid } from "@/components/sections/HeroGrid";
import { cn } from "@/lib/cn";

/**
 * Fondo del hero, HÍBRIDO (ver wireframe):
 *  - Con `videoSrc`: video full-bleed (muted/loop/autoPlay/playsInline) sobre su
 *    poster + overlay sobrio. El <video> se renderiza siempre (también en SSR)
 *    para que el autoplay nativo arranque solo; el efecto sólo refuerza el play
 *    y respeta prefers-reduced-motion (lo pausa en su poster).
 *  - Sin video: degradado azul en movimiento (.hero-surface) + cuadrícula
 *    (HeroGrid) + brillo que sigue al cursor.
 *
 * Importante (z-index): el video y el overlay van en `z-0`, NO en z negativo. El
 * fondo de `.hero-surface` es un degradado azul OPACO; con z negativo el video
 * quedaba detrás de ese fondo (se veía "azul liso"). En `z-0` pinta por encima
 * del degradado y por debajo del contenido (que va en `z-10`).
 */
export function HeroBackground({
  children,
  className,
  videoSrc,
  posterSrc,
}: {
  children: ReactNode;
  className?: string;
  videoSrc?: string;
  posterSrc?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideo = Boolean(videoSrc);

  // Autoplay (muted) + respeto a prefers-reduced-motion: si el usuario pide
  // menos movimiento, pausamos el video (queda fijo en su poster).
  useEffect(() => {
    if (!hasVideo) return;
    const video = videoRef.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [hasVideo]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || frame.current !== null) return;
    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--hero-x", `${x.toFixed(2)}%`);
      el.style.setProperty("--hero-y", `${y.toFixed(2)}%`);
    });
  }

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("hero-surface text-white", className)}
    >
      {hasVideo ? (
        <>
          <video
            ref={videoRef}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            poster={posterSrc}
            className="absolute inset-0 z-0 h-full w-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Overlay sobrio: degradado a la derecha — texto legible a la
              izquierda, el video se ve a la derecha. */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-azul/85 via-azul/55 to-azul/30" />
        </>
      ) : (
        <HeroGrid />
      )}
      <div className="hero-glow" aria-hidden="true" />
      {children}
    </section>
  );
}
