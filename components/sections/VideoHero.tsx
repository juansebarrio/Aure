"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";

type VideoHeroProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Loop del hero. TODO(assets): dropear el .mp4 real en /public/video/. */
  videoSrc?: string;
  posterSrc?: string;
};

/**
 * Hero a pantalla completa con video de fondo (muted/loop/autoPlay/playsInline,
 * lazy) + poster con next/image + overlay sobrio. El CTA "Agendá una reunión"
 * siempre visible: la conversión manda por encima del efecto.
 *
 * Con prefers-reduced-motion (o si no hay videoSrc) se muestra solo el poster.
 *
 * NOTA: componente listo, hoy NO montado en la home (ver app/page.tsx).
 */
export function VideoHero({
  eyebrow = "Comercialización inmobiliaria · Buenos Aires",
  title = "Invertí en desarrollos seleccionados, con respaldo de principio a fin.",
  subtitle = "En AURE comercializamos proyectos —sobre todo de pozo— de desarrolladores de confianza. Te acompañamos de la primera consulta a la entrega.",
  ctaLabel = "Agendá una reunión",
  ctaHref = "/#contacto",
  videoSrc,
  posterSrc = "/video/poster.svg",
}: VideoHeroProps) {
  // SSR-safe: asumimos reduced hasta confirmar en cliente (no renderiza video en SSR).
  const [reduced, setReduced] = useState(true);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const showVideo = !reduced && Boolean(videoSrc);

  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-brand-blue text-white">
      <Image
        src={posterSrc}
        alt=""
        fill
        priority
        unoptimized
        className="-z-10 object-cover"
      />
      {showVideo ? (
        <video
          muted
          loop
          autoPlay
          playsInline
          preload="none"
          poster={posterSrc}
          onCanPlay={() => setCanPlay(true)}
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-700 ${
            canPlay ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
      {/* Overlay sobrio (azul de marca con alpha) para legibilidad del texto. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-blue/90 via-brand-blue/70 to-brand-blue/55" />

      <Container className="py-28">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <TextReveal
            as="h1"
            className="mt-6 text-balance text-4xl font-medium leading-[1.08] tracking-display sm:text-5xl lg:text-6xl"
          >
            {title}
          </TextReveal>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-mist">
            {subtitle}
          </p>
          <div className="mt-10">
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
