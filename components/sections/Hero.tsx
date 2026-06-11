"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

export function Hero() {
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
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-svh overflow-hidden bg-azul-profundo text-blanco"
    >
      {/* Video full-bleed — protagonista visual */}
      <video
        ref={videoRef}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        poster="/video/poster.svg"
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        {/* Video del hero: Nogoyá. Anteriores en el repo por si hay que volver:
            /video/hero-v2.mp4 y /video/hero.mp4. */}
        <source src="/video/hero-nogoya.mp4" type="video/mp4" />
      </video>

      {/* Vignette: solo pesa abajo donde está el texto; el video respira arriba */}
      <div aria-hidden="true" className="video-scrim absolute inset-0 z-0" />

      {/* Contenido — todo al fondo, chip pegado al titular */}
      <div className="relative z-10 flex min-h-svh flex-col justify-end px-6 pb-28 lg:px-16">
        <div className="flex flex-col gap-4">

          {/* Eyebrow glass pill — en 375px el texto envuelve a 2 líneas centrado
              y queda contenido (no se corta): max-w-full lo acota al ancho
              disponible y min-w-0 deja envolver. En sm+ vuelve a una línea. */}
          <div className="inline-flex w-fit max-w-full items-center gap-2.5 rounded-full border border-white/12 bg-white/8 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-dorado" aria-hidden="true" />
            <p className="min-w-0 text-center text-[10px] font-light uppercase tracking-[0.18em] text-blanco/75 sm:text-xs sm:tracking-eyebrow">
              Comercialización inmobiliaria · Buenos Aires
            </p>
          </div>

          {/* Titular + CTAs */}
          <div>
            <div className="mb-4 h-px w-8 bg-dorado" aria-hidden="true" />
            <h1
              id="hero-heading"
              className="font-medium leading-[0.88] tracking-display"
              style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}
            >
              Comprá con claridad.
              <br />
              Decidí con respaldo.
            </h1>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/#contacto">Quiero info</Button>
              <Button href="/#proyectos" variant="glass">Ver proyectos</Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
