"use client";

import { useEffect, useRef } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";

/**
 * Media de un proyecto.
 *  - Con `videoSrc`: recorrido en loop, muted/playsInline, que se reproduce SOLO
 *    cuando entra en viewport (IntersectionObserver) y se pausa al salir, para no
 *    gastar ancho de banda ni distraer. Respeta prefers-reduced-motion (queda
 *    fijo en el poster). No usa `autoPlay`: el play lo dispara el observer.
 *  - Sin `videoSrc`: placeholder neutro (mismo aspect ratio, sin saltos).
 *
 * TODO(assets): cuando haya fotos/renders reales, sumar variante <Image>.
 */
export function ProjectMedia({
  videoSrc,
  posterSrc,
  label,
  aspect = "aspect-[16/10]",
}: {
  videoSrc?: string;
  posterSrc?: string;
  label: string;
  /** Clase de aspect-ratio (ej: "aspect-[16/10]"). */
  aspect?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  if (!videoSrc) {
    return <ImagePlaceholder aspect={aspect} label={label} />;
  }

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-brand border border-borde",
        aspect,
      )}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
        aria-label={label}
        className="h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
