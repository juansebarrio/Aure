"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * Superficie del hero: degradado azul en movimiento (definido en globals.css
 * como .hero-surface) + un brillo sutil que sigue al cursor.
 *
 * El seguimiento del cursor actualiza las CSS vars --hero-x / --hero-y, con
 * throttle por requestAnimationFrame para no recalcular en cada pointermove.
 */
export function HeroBackground({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);

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
      className="hero-surface text-white"
    >
      <div className="hero-glow" aria-hidden="true" />
      {children}
    </section>
  );
}
