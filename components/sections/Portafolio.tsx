import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { getProperties, formatPrice } from "@/lib/properties";
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
    href: "/emprendimiento/nogoya",
    cta: "Ver ficha completa",
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
 * Propiedades en venta — FALLBACK si el feed real no devuelve ventas (Tokko
 * caído o cuenta sin ventas): la sección nunca queda rota.
 */
const VENTAS_FALLBACK: CarruselItem[] = [
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
  const [enVenta, rentals] = await Promise.all([
    getProperties("Venta"),
    getProperties("Alquiler"),
  ]);

  // Ventas REALES del feed (mismo patrón que alquileres); si no hay, fallback.
  const ventas: CarruselItem[] = enVenta.slice(0, 8).map((p) => ({
    id: p.id,
    categoria: "Venta" as const,
    badge: p.barrio,
    foto: p.fotos[0]?.url ?? "/propiedades/placeholder-2.svg",
    alt: p.fotos[0]?.alt ?? p.titulo,
    titulo: p.titulo,
    descripcion: `${formatPrice(p.precio, p.moneda)} · ${p.ambientes} amb · ${p.superficie} m²`,
    href: `/propiedad/${p.id}`,
    cta: "Ver propiedad",
  }));

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

  const items: CarruselItem[] = [
    ...DESARROLLOS,
    ...(ventas.length > 0 ? ventas : VENTAS_FALLBACK),
    ...alquileres,
  ];

  return (
    <section id="portafolio" className="bg-gris-claro pb-16 pt-[84px] text-azul sm:pb-24">
      <Container>
        <Reveal>
          {/* Header — mismo patrón que Equipo */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Portafolio</Eyebrow>
              <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
                Desarrollos, ventas y alquileres
              </h2>
              <p className="mt-4 leading-relaxed text-gris-texto">
                Tres formas de trabajar con AURE: comprá en pozo, adquirí una
                propiedad terminada o encontrá tu próximo alquiler en Buenos Aires.
              </p>
            </div>
            <Link href="/emprendimientos" className="shrink-0 text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70">
              Ver todas →
            </Link>
          </div>
        </Reveal>
      </Container>

      {/* Carrusel full-width — cierra con la card "Ver todas las propiedades". */}
      <div className="mt-12">
        <PortafolioCarrusel
          items={items}
          ctaFinal={{
            label: "Ver todas las propiedades disponibles",
            href: "/propiedades",
          }}
        />
      </div>
    </section>
  );
}
