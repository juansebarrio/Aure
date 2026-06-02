import { cn } from "@/lib/cn";

type PlaceholderTone = "cloud" | "ghost";

const tones: Record<PlaceholderTone, string> = {
  // Para superficies claras.
  cloud: "bg-cloud border border-line text-muted",
  // Para superficies azules (marco translúcido, sin sombras).
  ghost: "bg-white/[0.04] border border-white/15 text-mist",
};

/**
 * Slot de imagen neutro y plano para usar mientras NO hay fotos reales.
 * Mantiene el aspect ratio correcto para evitar saltos de layout.
 *
 * TODO(assets): reemplazar por <Image> de next/image cuando lleguen las fotos
 * del cliente (configurar remotePatterns en next.config.ts si vienen de un CDN).
 */
export function ImagePlaceholder({
  aspect = "aspect-[4/3]",
  label = "Imagen del proyecto",
  tone = "cloud",
  className,
}: {
  /** Clase de aspect-ratio (ej: "aspect-[4/5]", "aspect-square"). */
  aspect?: string;
  label?: string;
  tone?: PlaceholderTone;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex w-full items-center justify-center overflow-hidden rounded-brand",
        aspect,
        tones[tone],
        className,
      )}
    >
      <span className="px-4 text-center text-xs font-medium uppercase tracking-eyebrow">
        {label}
      </span>
    </div>
  );
}
