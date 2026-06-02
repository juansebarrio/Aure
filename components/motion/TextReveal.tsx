"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type TextRevealProps = {
  as?: "h1" | "h2" | "h3" | "p";
  /** Revelar por líneas o por palabras. */
  type?: "lines" | "words";
  className?: string;
  delay?: number;
  children: ReactNode;
};

/**
 * Reveal de titulares display, línea por línea (o palabra por palabra) con un
 * "mask" sobrio. Usa SplitText de GSAP (gratuito); si por algún motivo no está,
 * cae a animar el elemento entero. El texto va plano en el DOM (SSR/SEO ok) y
 * con prefers-reduced-motion no se anima.
 */
export function TextReveal({
  as = "h2",
  type = "lines",
  className,
  delay = 0,
  children,
}: TextRevealProps) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let split: SplitText | null = null;
        try {
          split = new SplitText(el, { type, mask: type });
        } catch {
          split = null;
        }
        const targets = split
          ? type === "words"
            ? split.words
            : split.lines
          : [el];
        gsap.from(targets, {
          yPercent: 110,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        return () => {
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [type, delay] },
  );

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
