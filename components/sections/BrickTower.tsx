"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Torre de ladrillos isométricos que se "construye" con el scroll en una
 * esquina del módulo de Testimonios. Al bajar, los ladrillos caen y se apilan
 * en diagonal isométrica (cada uno medio paso hacia atrás y arriba → quedan
 * UNO DELANTE DEL OTRO, no en columna); al subir, se desarman. Scrubbeado al
 * progreso de scroll de la sección, throttle por rAF. Respeta
 * prefers-reduced-motion. Decorativo: aria-hidden y pointer-events-none.
 *
 * Tonos del dorado de marca (shading 3D), no terracota, para respetar la paleta.
 */
const N = 6; // ladrillos (torre bajita)
const BRICK_W = 104; // px de ancho de cada ladrillo
const VB = { x: 0, y: 56, w: 118, h: 72 }; // viewBox del SVG
const SCALE = BRICK_W / VB.w;
const BRICK_H_PX = VB.h * SCALE;
const DROP = 34; // px desde donde "cae" cada ladrillo

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

// --- Geometría isométrica de un ladrillo ---
type P = { x: number; y: number };
const R: P = { x: 70, y: 35 }; // eje largo
const D: P = { x: -32, y: 16 }; // eje profundidad
const UP: P = { x: 0, y: -24 }; // altura
const P0: P = { x: 40, y: 86 }; // vértice frontal-inferior
const add = (...ps: P[]) =>
  ps.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), { x: 0, y: 0 });
const str = (p: P) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
const poly = (ps: P[]) => ps.map(str).join(" ");

const bF = P0;
const bR = add(P0, R);
const bL = add(P0, D);
const tF = add(P0, UP);
const tR = add(P0, R, UP);
const tB = add(P0, R, D, UP);
const tL = add(P0, D, UP);

const top = (u: number, v: number) =>
  add(tF, { x: R.x * u, y: R.y * u }, { x: D.x * v, y: D.y * v });
const slot = (u0: number, u1: number, v: number, dv: number) =>
  poly([top(u0, v), top(u1, v), top(u1, v + dv), top(u0, v + dv)]);

// Perforaciones (2 filas × 3).
const SLOTS = [0.22, 0.55].flatMap((v) =>
  (
    [
      [0.15, 0.32],
      [0.41, 0.58],
      [0.67, 0.84],
    ] as const
  ).map(([u0, u1]) => slot(u0, u1, v, 0.18)),
);

// Paso de apilado: cada ladrillo sube (UP) + medio paso de profundidad (D),
// proyectado a pantalla y escalado. Resultado: diagonal hacia arriba-izquierda,
// con los ladrillos uno delante del otro.
const STEP = {
  x: (UP.x + D.x * 0.5) * SCALE,
  y: (UP.y + D.y * 0.5) * SCALE,
};

function IsoBrick() {
  return (
    <svg
      viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
      width={BRICK_W}
      height={BRICK_H_PX}
      aria-hidden="true"
      className="block"
    >
      {/* Caras en tonos del dorado de marca (claro→oscuro) para el 3D. */}
      <polygon points={poly([tF, tL, bL, bF])} fill="#ae9056" />
      <polygon points={poly([tF, tR, bR, bF])} fill="#8c6f3d" />
      <polygon points={poly([tF, tR, tB, tL])} fill="#cbae72" />
      {SLOTS.map((s, i) => (
        <polygon key={i} points={s} fill="#5c4a28" />
      ))}
    </svg>
  );
}

export function BrickTower() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setProgress(1);
      return;
    }
    const section = wrapRef.current?.closest("section");
    if (!section) return;

    let frame: number | null = null;
    const update = () => {
      frame = null;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      setProgress(clamp((vh - rect.top) / (rect.height + vh)));
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const seg = 1 / N;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 right-2 isolate origin-bottom-right scale-[0.55] sm:right-4 sm:scale-75 lg:scale-100 xl:right-10"
      style={{
        width: BRICK_W + (N - 1) * Math.abs(STEP.x),
        height: BRICK_H_PX + (N - 1) * Math.abs(STEP.y) + DROP,
      }}
    >
      {Array.from({ length: N }).map((_, i) => {
        const bp = reduced ? 1 : clamp((progress - i * seg) / seg);
        const x = i * STEP.x;
        const y = i * STEP.y - (1 - bp) * DROP;
        return (
          <div
            key={i}
            className="absolute bottom-0 right-0 transition-opacity duration-150"
            style={{
              transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`,
              opacity: clamp(bp * 1.4),
              // El de más adelante (i=0) queda por encima.
              zIndex: N - i,
            }}
          >
            <IsoBrick />
          </div>
        );
      })}
    </div>
  );
}
