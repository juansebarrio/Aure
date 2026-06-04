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
 *  - Con `videoSrc`: video full-bleed (muted/loop/autoPlay/playsInline) sobre su
 *    poster + overlay sobrio. Fuerza play() porque el autoplay no siempre arranca
 *    cuando el <video> se monta dinámicamente.
 *  - Sin video: degradado azul en movimiento (.hero-surface) + cuadrícula
 *    (HeroGrid) + brillo que sigue al cursor.
 * Respeta prefers-reduced-motion (no reproduce video; muestra el poster).
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
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const hasVideo = Boolean(videoSrc);
  const showVideo = hasVideo && !reduced;

  // Asegura el autoplay (muted) aunque el <video> se monte dinámicamente.
  useEffect(() => {
    if (showVideo) videoRef.current?.play().catch(() => {});
  }, [showVideo]);

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
          {showVideo ? (
            <video
              ref={videoRef}
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
              poster={posterSrc}
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : posterSrc ? (
            <Image
              src={posterSrc}
              alt=""
              fill
              priority
              unoptimized
              className="-z-10 object-cover"
            />
          ) : null}
          {/* Overlay sobrio: degradado a la derecha — texto legible a la izquierda,
              el video se ve a la derecha. */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-azul/85 via-azul/55 to-azul/30" />
        </>
      ) : (
        <HeroGrid />
      )}
      <div className="hero-glow" aria-hidden="true" />
      {children}
    </section>
  );
}
