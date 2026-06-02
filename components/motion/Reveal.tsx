"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";

type RevealProps = {
  className?: string;
  children: ReactNode;
  /** Desplazamiento vertical inicial, en px. */
  y?: number;
  delay?: number;
  duration?: number;
  /** Si es true, anima los hijos directos con stagger en lugar del bloque. */
  stagger?: boolean;
};

/**
 * Fade + translate-y al entrar en viewport (ScrollTrigger). Sobrio.
 * Con prefers-reduced-motion el contenido se muestra sin animar (queda visible).
 */
export function Reveal({
  className,
  children,
  y = 24,
  delay = 0,
  duration = 0.7,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          opacity: 0,
          y,
          duration,
          delay,
          ease: "power2.out",
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [y, delay, duration, stagger] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
