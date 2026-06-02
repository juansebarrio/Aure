// Registro único de plugins de GSAP (módulo cacheado: corre una sola vez).
// Importá gsap/ScrollTrigger/useGSAP desde acá en los componentes de motion.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };
