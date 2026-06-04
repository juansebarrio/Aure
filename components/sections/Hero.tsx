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
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Vignette: solo pesa abajo donde está el texto; el video respira arriba */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to top, rgba(17,24,44,0.92) 0%, rgba(17,24,44,0.55) 28%, rgba(0,0,0,0.10) 60%, transparent 100%)",
        }}
      />

      {/* Contenido — todo al fondo, chip pegado al titular */}
      <div className="relative z-10 flex min-h-svh flex-col justify-end px-6 pb-28 pt-28 lg:px-16">
        <div className="flex flex-col gap-4">

          {/* Eyebrow glass pill */}
          <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/12 bg-white/8 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-dorado" aria-hidden="true" />
            <p className="text-xs font-light uppercase tracking-eyebrow text-blanco/75">
              Buenos Aires · Real Estate
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
              Invertí en
              <br />
              lo que vale.
            </h1>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="/#contacto">Contacto</Button>
              <Button href="/#proyectos" variant="glass">Ver proyectos</Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
