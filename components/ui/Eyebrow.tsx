import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Eyebrow de marca: MAYÚSCULA, tracking amplio (0.3em), dorado.
 * El dorado acá es acento sobre fondo azul o claro, no texto de cuerpo.
 */
export function Eyebrow({ as: Tag = "p", className, children }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "text-[11px] font-medium uppercase tracking-eyebrow text-dorado",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
