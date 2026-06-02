import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

type SectionBackground = "blue" | "gris-claro" | "white";

const backgrounds: Record<SectionBackground, string> = {
  blue: "bg-azul text-white",
  "gris-claro": "bg-gris-claro text-azul",
  white: "bg-white text-azul",
};

type SectionProps = {
  id?: string;
  background?: SectionBackground;
  /** Etiqueta para lectores de pantalla cuando no hay heading visible directo. */
  "aria-labelledby"?: string;
  className?: string;
  containerClassName?: string;
  /** Si es true, no envuelve en Container (layout full-bleed). */
  bleed?: boolean;
  children: ReactNode;
};

/**
 * Bloque de sección con ritmo vertical generoso y variante de fondo
 * (azul de marca / claro). Separación entre secciones con borde fino,
 * sin sombras.
 */
export function Section({
  id,
  background = "white",
  className,
  containerClassName,
  bleed = false,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-24", backgrounds[background], className)}
      {...rest}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
