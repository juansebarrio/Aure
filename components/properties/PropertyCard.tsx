import Link from "next/link";
import { PropertyImage } from "@/components/properties/PropertyImage";
import { formatPrice, isMensual, type Property } from "@/lib/properties";

function metaLine(p: Property): string {
  return [p.tipo, `${p.ambientes} amb`, `${p.superficie} m²`].join(" · ");
}

/**
 * Card de propiedad usada en la grilla de /propiedades (PropertiesBrowser).
 * Linkea al detalle /propiedad/[id]. Plano, sin sombras.
 */
export function PropertyCard({
  property,
  priority,
}: {
  property: Property;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/propiedad/${property.id}`}
      className="group block overflow-hidden rounded-2xl border border-borde bg-white transition-colors hover:border-azul/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gris-claro">
        <PropertyImage
          photo={property.fotos[0]}
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
    </Link>
  );
}
