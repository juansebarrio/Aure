import Image from "next/image";
import { cn } from "@/lib/cn";
import type { PropertyPhoto } from "@/lib/properties";

/**
 * Imagen de propiedad con next/image (`fill`; el contenedor define el ratio).
 * Las fotos reales de Tokko se optimizan; los placeholders SVG locales del mock
 * se sirven con `unoptimized` (next/image no optimiza SVG sin config global).
 */
export function PropertyImage({
  photo,
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className,
  priority,
}: {
  photo?: PropertyPhoto;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!photo) {
    return (
      <div className={cn("h-full w-full bg-gris-claro", className)} aria-hidden="true" />
    );
  }
  const isSvg = photo.url.toLowerCase().endsWith(".svg");
  return (
    <Image
      src={photo.url}
      alt={photo.alt ?? alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={isSvg}
      className={cn("object-cover", className)}
    />
  );
}
