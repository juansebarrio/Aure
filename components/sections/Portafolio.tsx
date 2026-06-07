import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { getRentals, formatPrice } from "@/lib/properties";
import {
  PortafolioCarrusel,
  type CarruselItem,
} from "@/components/sections/PortafolioCarrusel";

/**
 * Desarrollos hardcodeados — misma data que antes vivía en <Proyectos>.
 * TODO(cliente): sumar más desarrollos cuando haya nuevos proyectos reales.
 */
const DESARROLLOS: CarruselItem[] = [
  {
    id: "nogoya",
    categoria: "Desarrollo",
    badge: "Listo para escriturar",
    foto: "/proyectos/nogoya-poster.svg",
    alt: "Nogoyá 2478",
    titulo: "Nogoyá 2478",
    descripcion:
      "Villa del Parque, CABA · Entrega inmediata a metros de la Av. San Martín. Cerca de Veterinaria y Agronomía (UBA).",
    href: "https://portal.winbuild.app/Mario%20Yennaccaro/nogoya",
    cta: "Ver showroom 3D",
    ctaExternal: true,
  },
  {
    id: "proximo-desarrollo",
    categoria: "Desarrollo",
    badge: "Próximamente",
    foto: "/propiedades/placeholder-1.svg",
    alt: "Próximo desarrollo",
    titulo: "Próximo desarrollo",
    descripcion:
      "Sumamos proyectos de forma curada: pocos, bien elegidos. Avisanos y te contamos cuando se publique el próximo.",
    href: "/#contacto",
    cta: "Avisame cuando salga",
  },
];

/**
 * Propiedades en venta — placeholder hasta conectar Tokko con operación=Venta.
 * TODO(integración): reemplazar por getVentas() cuando esté disponible.
 */
const VENTAS: CarruselItem[] = [
  {
    id: "venta-proximamente",
    categoria: "Venta",
    badge: "Próximamente",
    foto: "/propiedades/placeholder-2.svg",
    alt: "Propiedades en venta",
    titulo: "Propiedades en venta",
    descripcion:
      "Estamos sumando propiedades en venta. Dejanos tus datos y te avisamos con las primeras opciones.",
    href: "/#contacto",
    cta: "Consultar",
  },
];

/**
 * Portafolio (fusión de Proyectos + Alquileres) — carrusel horizontal con las
 * tres líneas de negocio de AURE: desarrollos, ventas y alquileres.
 * La columna izquierda ancla el copy; la derecha scrollea con flechas.
 */
export async function Portafolio() {
  const rentals = await getRentals();

  const alquileres: CarruselItem[] = rentals.slice(0, 8).map((p) => ({
    id: p.id,
    categoria: "Alquiler" as const,
    badge: p.barrio,
    foto: p.fotos[0]?.url ?? "/propiedades/placeholder-1.svg",
    alt: p.fotos[0]?.alt ?? p.titulo,
    titulo: p.titulo,
    descripcion: `${formatPrice(p.precio, p.moneda)} / mes · ${p.ambientes} amb · ${p.superficie} m²`,
    href: `/propiedad/${p.id}`,
    cta: "Ver propiedad",
  }));

  const items: CarruselItem[] = [...DESARROLLOS, ...VENTAS, ...alquileres];

  return (
    <section id="portafolio" className="bg-gris-claro pb-16 pt-[84px] text-azul sm:pb-24">
      <Container>
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Columna izquierda — copy anclado */}
          <div className="flex flex-col justify-center lg:col-span-4">
            <Eyebrow>Portafolio</Eyebrow>
            <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
              Desarrollos, ventas y alquileres
            </h2>
            <p className="mt-4 leading-relaxed text-gris-texto">
              Tres formas de trabajar con AURE: comprá en pozo, adquirí una
              propiedad terminada o encontrá tu próximo alquiler en Buenos Aires.
            </p>

            {/* Leyenda de categorías */}
            <ul className="mt-8 flex flex-col gap-3">
              {(
                [
                  {
                    dot: "bg-dorado",
                    label: "Proyectos en pozo y terminados",
                  },
                  { dot: "bg-azul", label: "Propiedades en venta" },
                  { dot: "bg-gris", label: "Propiedades en alquiler" },
                ] as const
              ).map(({ dot, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-gris-texto">
                  <span
                    className={`h-2 w-2 flex-shrink-0 rounded-full ${dot}`}
                    aria-hidden="true"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Columna derecha — carrusel (client component) */}
          <PortafolioCarrusel items={items} />
        </div>
      </Reveal>
      </Container>
    </section>
  );
}
