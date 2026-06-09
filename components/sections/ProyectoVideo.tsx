"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Video full-bleed de un proyecto con slot para contenido overlay.
 * Respeta prefers-reduced-motion (pausa el video).
 */
export function ProyectoVideo({
  videoSrc,
  posterSrc,
  label,
  children,
}: {
  videoSrc: string;
  posterSrc?: string;
  label: string;
  children?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) video.pause();
      else video.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-azul-profundo">
      <video
        ref={videoRef}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        poster={posterSrc}
        aria-label={label}
        className="h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Gradiente inferior para legibilidad del texto */}
      <div aria-hidden="true" className="video-scrim-soft absolute inset-0" />

      {children}
    </div>
  );
}
