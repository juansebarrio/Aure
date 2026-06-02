"use client";

import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

/**
 * Intro tipográfica de apertura: las tres palabras de la sigla aparecen, cada
 * una se comprime hacia su inicial, las iniciales se juntan en "aure" (Flip),
 * aparece el punto dorado y el overlay se DESVANECE entero, revelando el sitio
 * que ya está debajo. NO anima ni reacomoda el layout (no toca navbar/hero/
 * secciones): se ocupa solo de su overlay y desaparece.
 *
 * Reglas: solo en la primera visita (sessionStorage), prefers-reduced-motion lo
 * saltea, espera document.fonts.ready antes de medir, y bloquea el scroll
 * mientras corre. El overlay se renderiza desde el server (tapa la página, sin
 * flash); la timeline va 100% en cliente.
 */

// Tiempos (segundos). Ajustar acá para tunear. Total ~2.7s. TODO(afinado): tunear.
const T = {
  revealStart: 0.25,
  revealDur: 1.0,
  revealStagger: 0.15,
  hold: 0.5, // pausa de lectura antes de cerrar
  restFadeDur: 0.55,
  restWidthDur: 0.9,
  restStagger: 0.07,
  flipOffset: 0.55, // arranque del Flip respecto a "cierre"
  flipDur: 1.15,
  flipRun: 1.2, // hueco para que el Flip corra dentro del timeline
  dotDur: 0.6,
  dotOverlap: -0.3,
  holdLogo: 0.55, // respiro sobre el logo
  fadeDur: 0.8,
};

const SEEN_KEY = "aure_intro_seen";

export function IntroSequence() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const html = document.documentElement;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      let seen = false;
      try {
        seen = Boolean(sessionStorage.getItem(SEEN_KEY));
      } catch {
        seen = false;
      }

      // No correr: reduced-motion o ya vista en esta sesión.
      if (reduced || seen || html.classList.contains("intro-seen")) {
        setDone(true);
        return;
      }

      const keys = gsap.utils.toArray<HTMLElement>(
        overlay.querySelectorAll(".intro-k"),
      );
      const rests = gsap.utils.toArray<HTMLElement>(
        overlay.querySelectorAll(".intro-r"),
      );
      const inners = gsap.utils.toArray<HTMLElement>(
        overlay.querySelectorAll(".intro-inner"),
      );
      const dot = overlay.querySelector<HTMLElement>(".intro-dot");

      // Lock de scroll (overlay + body; lenis si está disponible).
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      html.classList.add("intro-running");

      let finished = false;
      let tl: gsap.core.Timeline | undefined;

      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") skip();
      };
      const onClick = () => skip();
      const removeListeners = () => {
        window.removeEventListener("keydown", onKey);
        overlay.removeEventListener("click", onClick);
      };

      const finish = () => {
        if (finished) return;
        finished = true;
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* sessionStorage no disponible: no pasa nada */
        }
        html.classList.add("intro-seen");
        html.classList.remove("intro-running");
        document.body.style.overflow = prevOverflow;
        lenisRef.current?.start();
        removeListeners();
        setDone(true); // desmonta el overlay
      };

      // Skip accesible: completar hasta el logo y dejar correr el fade.
      const skip = () => {
        if (!tl || finished) return;
        const logoTime = tl.labels.logo ?? tl.duration();
        if (tl.time() >= logoTime) return; // ya pasó el logo
        tl.pause();
        tl.tweenTo("logo", {
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => tl?.play(),
        });
      };

      // Estado inicial (antes de medir / animar).
      gsap.set(inners, { yPercent: 118 });
      gsap.set(rests, { opacity: 1, clearProps: "width" });
      gsap.set(keys, { clearProps: "transform,fontSize,opacity" });
      gsap.set(dot, { autoAlpha: 0, scale: 0.4, transformOrigin: "center bottom" });

      const build = () => {
        if (!overlayRef.current) return;
        lenisRef.current?.stop();

        // Fijar el ancho de cada "resto" para poder colapsarlo suave (con la fuente ya cargada).
        rests.forEach((r) => gsap.set(r, { width: r.offsetWidth }));

        tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: finish,
        });

        // 1 · Reveal con máscara, escalonado.
        tl.to(
          inners,
          { yPercent: 0, duration: T.revealDur, stagger: T.revealStagger },
          T.revealStart,
        );
        // 2 · Pausa de lectura.
        tl.addLabel("cierre", `>+${T.hold}`);
        // 3 · Compresión: el resto se desvanece y colapsa su ancho hacia la inicial.
        tl.to(
          rests,
          {
            opacity: 0,
            duration: T.restFadeDur,
            stagger: T.restStagger,
            ease: "power2.in",
          },
          "cierre",
        );
        tl.to(
          rests,
          {
            width: 0,
            duration: T.restWidthDur,
            stagger: T.restStagger,
            ease: "power2.inOut",
          },
          "cierre",
        );
        // 4 · Convergencia con Flip: las iniciales glidean a "aure".
        tl.add(() => {
          const state = Flip.getState(keys, { props: "fontSize" });
          overlay.classList.add("collapsed");
          Flip.from(state, {
            duration: T.flipDur,
            ease: "power2.inOut",
            absolute: true,
          });
        }, `cierre+=${T.flipOffset}`);
        tl.to({}, { duration: T.flipRun }); // deja correr el Flip dentro del timeline
        // 5 · Punto dorado → queda "aure."
        tl.to(
          dot,
          { autoAlpha: 1, scale: 1, duration: T.dotDur, ease: "power2.out" },
          `>${T.dotOverlap}`,
        );
        // 6 · Respiro y fade del overlay entero (revela el sitio, sin tocarlo).
        tl.addLabel("logo", `>+${T.holdLogo}`);
        tl.to(overlay, { autoAlpha: 0, duration: T.fadeDur, ease: "power2.inOut" }, "logo");
      };

      window.addEventListener("keydown", onKey);
      overlay.addEventListener("click", onClick);

      // Esperar a que la fuente cargue antes de medir y arrancar.
      if (document.fonts?.ready) {
        document.fonts.ready.then(build).catch(build);
      } else {
        build();
      }

      // Cleanup si se desmonta mientras corre (ej. navegación): restaurar todo.
      return () => {
        removeListeners();
        html.classList.remove("intro-running");
        document.body.style.overflow = prevOverflow;
        lenisRef.current?.start();
      };
    },
    { scope: overlayRef },
  );

  if (done) return null;

  return (
    <div ref={overlayRef} className="intro-overlay" aria-hidden="true">
      <div className="intro-seq">
        <span className="intro-line">
          <span className="intro-inner">
            <span className="intro-k">a</span>
            <span className="intro-r">rquitectura</span>
          </span>
        </span>
        <span className="intro-line">
          <span className="intro-inner">
            <span className="intro-k">u</span>
            <span className="intro-r">rbanismo</span>
          </span>
        </span>
        <span className="intro-line">
          <span className="intro-inner">
            <span className="intro-k">r</span>
            <span className="intro-r">eal&nbsp;</span>
            <span className="intro-k">e</span>
            <span className="intro-r">state</span>
          </span>
        </span>
        <span className="intro-dot">.</span>
      </div>
    </div>
  );
}
