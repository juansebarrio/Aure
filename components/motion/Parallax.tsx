"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";

type ParallaxProps = {
  /**
   * Velocidad relativa. Positivo = se mueve hacia abajo (más lento que el
   * scroll); negativo = hacia arriba. Sutil: ±0.1 a ±0.3.
   */
  speed?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Mueve su contenido a distinta velocidad durante el scroll (scrub). Para
 * imágenes y fondos. Tip: que el contenido sea un poco más alto que su caja
 * para que no se vean los bordes. Anulado con prefers-reduced-motion.
 */
export function Parallax({ speed = 0.2, className, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [speed] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
