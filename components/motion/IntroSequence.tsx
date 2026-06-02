"use client";

import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Flip, SplitText);

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

// Tiempos (segundos). Ajustar acá para tunear. Total ~3.9s. TODO(afinado): tunear.
const T = {
  revealStart: 0.3,
  revealDur: 1.2,
  revealStagger: 0.16,
  hold: 0.65, // pausa de lectura antes de cerrar
  restCharDur: 0.5, // cada letra del resto al fundirse
  restCharStagger: 0.022, // entre letras (de afuera hacia adentro)
  restWordOffset: 0.07, // desfase entre palabras
  restWidthDur: 1.05,
  restStagger: 0.08,
  meltSettle: 0.18, // beat tras el fundido, antes de que las iniciales viajen
  flipDur: 1.35,
  flipRun: 1.45, // hueco para que el Flip corra dentro del timeline
  dotDur: 0.7,
  dotDelay: 0.05, // el punto aparece DESPUÉS de que el logo ya se formó (no se encabalga con el Flip)
  holdLogo: 1.2, // respiro (más largo) sobre el logo antes del fade
  fadeDur: 1.0,
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

        // Fijar el ancho de cada "resto" (fuente ya cargada) para colapsarlo suave...
        rests.forEach((r) => gsap.set(r, { width: r.offsetWidth }));
        // ...y partirlo en letras para que se "fundan" en la inicial de a poco.
        const restSplits = rests.map((r) => new SplitText(r, { type: "chars" }));

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
        // 3 · Compresión: cada palabra se FUNDE en su inicial — las letras del
        //     resto se retraen de afuera hacia adentro (fade + encogen + se corren
        //     hacia la inicial), mientras el ancho colapsa suave.
        const timeline = tl;
        restSplits.forEach((split, i) => {
          timeline.to(
            split.chars,
            {
              opacity: 0,
              scale: 0.55,
              x: -5,
              transformOrigin: "left center",
              duration: T.restCharDur,
              ease: "power2.in",
              stagger: { each: T.restCharStagger, from: "end" },
            },
            `cierre+=${i * T.restWordOffset}`,
          );
        });
        tl.to(
          rests,
          {
            width: 0,
            duration: T.restWidthDur,
            stagger: T.restStagger,
            ease: "power2.inOut",
          },
          "cierre+=0.12",
        );
        // Las palabras YA se fundieron: solo quedan las iniciales, en su lugar.
        tl.addLabel("fundido", `>+${T.meltSettle}`);
        // 4 · Convergencia con Flip: RECIÉN AHORA las iniciales viajan al logotipo
        //     (secuencial, no encabalgado → lectura fluida palabra → letra → logo).
        tl.add(() => {
          const state = Flip.getState(keys, { props: "fontSize" });
          overlay.classList.add("collapsed");
          Flip.from(state, {
            duration: T.flipDur,
            ease: "power2.inOut",
            absolute: true,
          });
        }, "fundido");
        tl.to({}, { duration: T.flipRun }); // deja correr el Flip dentro del timeline
        // 5 · Punto dorado: aparece en su lugar (después de "e") con el logo YA
        //     formado, sin encabalgarse con el Flip → no "salta".
        tl.to(
          dot,
          { autoAlpha: 1, scale: 1, duration: T.dotDur, ease: "power2.out" },
          `>+${T.dotDelay}`,
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
