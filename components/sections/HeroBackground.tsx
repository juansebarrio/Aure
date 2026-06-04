"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { HeroGrid } from "@/components/sections/HeroGrid";
import { cn } from "@/lib/cn";

/**
 * Fondo del hero, HÍBRIDO (ver wireframe):
 *  - Sin video: degradado azul en movimiento (.hero-surface) + cuadrícula
 *    (HeroGrid) + brillo que sigue al cursor. Es el fondo por defecto hoy.
 *  - Con `videoSrc`: video full-bleed (lazy, muted, loop) sobre poster + overlay
 *    sobrio. La grilla queda de respaldo cuando no hay video.
 * Respeta prefers-reduced-motion (no reproduce video; muestra el poster).
 * TODO(assets): pasar videoSrc/posterSrc cuando esté el video real del hero.
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
  const [reduced, setReduced] = useState(true);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

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

  const hasVideo = Boolean(videoSrc);
  const showVideo = hasVideo && !reduced;

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("hero-surface text-white", className)}
    >
      {hasVideo ? (
        <>
          {posterSrc ? (
            <Image
              src={posterSrc}
              alt=""
              fill
              priority
              unoptimized
              className="-z-10 object-cover"
            />
          ) : null}
          {showVideo ? (
            <video
              muted
              loop
              autoPlay
              playsInline
              preload="none"
              poster={posterSrc}
              onCanPlay={() => setCanPlay(true)}
              className={cn(
                "absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-700",
                canPlay ? "opacity-100" : "opacity-0",
              )}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : null}
          {/* Overlay sobrio (azul con alpha) para legibilidad sobre el video. */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-azul/90 via-azul/70 to-azul/55" />
        </>
      ) : (
        <HeroGrid />
      )}
      <div className="hero-glow" aria-hidden="true" />
      {children}
    </section>
  );
}
