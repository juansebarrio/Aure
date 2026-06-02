"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";

/**
 * Sincroniza Lenis con GSAP ScrollTrigger. Esta es la parte que se suele romper:
 *  - useLenis(cb) corre cb en cada scroll de Lenis → mantiene ScrollTrigger al día.
 *  - el RAF de Lenis lo maneja gsap.ticker (no el RAF interno: autoRaf=false).
 *  - lagSmoothing(0) para que no "salte" tras pestañas inactivas.
 */
function LenisGsapSync() {
  const lenis = useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    if (!lenis) return;
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(onTick);
    };
  }, [lenis]);

  return null;
}

/**
 * Provider de smooth scroll. Respeta prefers-reduced-motion: si está activo (o
 * en SSR) NO monta Lenis y deja el scroll nativo. ReactLenis con `root` no
 * agrega wrappers al DOM, así que montarlo/desmontarlo no cambia el layout.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [smooth, setSmooth] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setSmooth(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!smooth) return <>{children}</>;

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1 }}>
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
