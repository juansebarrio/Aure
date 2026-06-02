"use client";

import { useEffect, useRef, useState } from "react";

// Mantener CELL en sync con `background-size` de .hero-grid en globals.css.
const CELL = 64; // px, tamaño de celda
const RADIUS = 150; // px, alcance del efecto proximity
const MAX_SCALE = 0.45; // crecimiento máximo de la celda bajo el cursor
const MAX_FILL = 0.12; // opacidad máxima del relleno blanco bajo el cursor

/**
 * Capa interactiva de la cuadrícula del hero. Las líneas las dibuja .hero-grid
 * por CSS; acá renderizamos celdas (transparentes por defecto) que, cerca del
 * cursor, se rellenan y agrandan sutilmente según la distancia (proximity).
 *
 * Rendimiento: pointermove con throttle por requestAnimationFrame y solo se
 * tocan las celdas dentro del radio. Respeta prefers-reduced-motion.
 */
export function HeroGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<HTMLDivElement[]>([]);
  const activeRef = useRef<Set<number>>(new Set());
  const frameRef = useRef<number | null>(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });

  // Medir el contenedor y calcular columnas/filas.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setGrid({
        cols: Math.max(1, Math.ceil(width / CELL)),
        rows: Math.max(1, Math.ceil(height / CELL)),
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Efecto proximity.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || grid.cols === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cells = cellRefs.current;

    const reset = () => {
      activeRef.current.forEach((idx) => {
        const cell = cells[idx];
        if (cell) {
          cell.style.transform = "";
          cell.style.backgroundColor = "";
        }
      });
      activeRef.current = new Set();
    };

    const apply = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      // Si el cursor está lejos del hero, limpiar y salir.
      if (
        px < -RADIUS ||
        py < -RADIUS ||
        px > rect.width + RADIUS ||
        py > rect.height + RADIUS
      ) {
        reset();
        return;
      }

      const next = new Set<number>();
      const minCol = Math.max(0, Math.floor((px - RADIUS) / CELL));
      const maxCol = Math.min(grid.cols - 1, Math.floor((px + RADIUS) / CELL));
      const minRow = Math.max(0, Math.floor((py - RADIUS) / CELL));
      const maxRow = Math.min(grid.rows - 1, Math.floor((py + RADIUS) / CELL));

      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          const cx = (c + 0.5) * CELL;
          const cy = (r + 0.5) * CELL;
          const dist = Math.hypot(cx - px, cy - py);
          if (dist > RADIUS) continue;
          const idx = r * grid.cols + c;
          const cell = cells[idx];
          if (!cell) continue;
          const t = 1 - dist / RADIUS; // 0 (lejos) → 1 (bajo el cursor)
          cell.style.transform = `scale(${(1 + MAX_SCALE * t).toFixed(3)})`;
          cell.style.backgroundColor = `rgba(255,255,255,${(MAX_FILL * t).toFixed(3)})`;
          next.add(idx);
        }
      }

      // Resetear las celdas que dejaron de estar en el radio.
      activeRef.current.forEach((idx) => {
        if (!next.has(idx)) {
          const cell = cells[idx];
          if (cell) {
            cell.style.transform = "";
            cell.style.backgroundColor = "";
          }
        }
      });
      activeRef.current = next;
    };

    const onMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        apply(clientX, clientY);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", reset);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      reset();
    };
  }, [grid]);

  const count = grid.cols * grid.rows;
  cellRefs.current = [];

  return (
    <div ref={containerRef} aria-hidden="true" className="hero-grid">
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, ${CELL}px)`,
          gridAutoRows: `${CELL}px`,
        }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            ref={(node) => {
              if (node) cellRefs.current[i] = node;
            }}
            className="origin-center transition-[transform,background-color] duration-200 ease-out"
          />
        ))}
      </div>
    </div>
  );
}
