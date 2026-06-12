import Link from "next/link";
import { PropertyCardGallery } from "@/components/properties/PropertyCardGallery";
import { formatPrice, isMensual, type Property } from "@/lib/properties";

function metaLine(p: Property): string {
  return [p.tipo, `${p.ambientes} amb`, `${p.superficie} m²`].join(" · ");
}

/**
 * Card de propiedad usada en la grilla de /propiedades (PropertiesBrowser).
 * Linkea al detalle con un LINK ESTIRADO (overlay z-10) en vez de envolver todo
 * en <a>: así las flechas del mini-carrusel (z-20) son cliqueables sin anidar
 * botones dentro de un link (HTML inválido). Plano, sin sombras.
 */
export function PropertyCard({
  property,
  priority,
}: {
  property: Property;
  priority?: boolean;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-borde bg-white transition-colors hover:border-azul/30">
      <div className="relative aspect-[4/3] overflow-hidden bg-gris-claro">
        <PropertyCardGallery
          photos={property.fotos}
          alt={property.titulo}
          priority={priority}
        />
        <span className="absolute left-3 top-3 rounded-brand bg-azul/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-eyebrow text-white">
          {property.operacion}
        </span>
      </div>
      <div className="p-5">
        <p className="text-lg font-medium tracking-display text-azul">
          {formatPrice(property.precio, property.moneda)}
          {isMensual(property.operacion) ? (
            <span className="text-xs font-normal text-gris-texto"> / mes</span>
          ) : null}
        </p>
        <h3 className="mt-1 truncate text-sm font-medium text-azul">
          {property.direccion}
        </h3>
        <p className="text-sm text-gris-texto">{property.barrio}</p>
        <p className="mt-3 text-xs uppercase tracking-eyebrow text-gris-texto">
          {metaLine(property)}
        </p>
      </div>
      <Link
        href={`/propiedad/${property.id}`}
        aria-label={`Ver propiedad: ${property.direccion}, ${property.barrio}`}
        className="absolute inset-0 z-10 rounded-2xl"
      />
    </article>
  );
}
