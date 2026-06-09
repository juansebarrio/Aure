"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { operacionCopy, type Operacion, type Property } from "@/lib/properties";

const fieldCls =
  "h-11 rounded-brand border border-borde bg-white px-3 text-sm text-azul focus:border-dorado focus:outline-none";

const OPERACIONES: Operacion[] = ["Venta", "Alquiler", "Alquiler temporario"];

/**
 * Vista unificada de propiedades: header (título según la operación) + grilla
 * con filtros. La OPERACIÓN vive en la URL (?operacion=…): así el título de
 * arriba y las cards de abajo siempre coinciden, y el link es compartible. El
 * resto de filtros (tipo, zona, moneda, precio) son estado local en la página.
 *
 * `operacion` llega como prop desde el server (searchParams). Al cambiarla,
 * hacemos router.replace y el server re-renderiza con la nueva operación; los
 * filtros locales NO se resetean (no hay remount).
 */
export function PropertiesBrowser({
  properties,
  operacion,
}: {
  properties: Property[];
  operacion: Operacion | "";
}) {
  const router = useRouter();
  const [tipo, setTipo] = useState("");
  const [barrio, setBarrio] = useState("");
  const [moneda, setMoneda] = useState("");
  const [precioDesde, setPrecioDesde] = useState("");
  const [precioHasta, setPrecioHasta] = useState("");

  const copy = operacionCopy(operacion);

  // Las opciones de tipo/zona se derivan de las propiedades de la operación
  // elegida: así no se ofrecen combinaciones (p. ej. una zona que solo existe en
  // alquiler) que devolverían cero resultados al estar en Venta.
  const forFacets = useMemo(
    () =>
      operacion ? properties.filter((p) => p.operacion === operacion) : properties,
    [properties, operacion],
  );
  const tipos = useMemo(
    () => Array.from(new Set(forFacets.map((p) => p.tipo))).sort(),
    [forFacets],
  );
  const barrios = useMemo(
    () => Array.from(new Set(forFacets.map((p) => p.barrio))).sort(),
    [forFacets],
  );

  const desde = precioDesde ? Number(precioDesde) : null;
  const hasta = precioHasta ? Number(precioHasta) : null;

  const filtered = useMemo(
    () =>
      properties.filter((p) => {
        if (operacion && p.operacion !== operacion) return false;
        if (tipo && p.tipo !== tipo) return false;
        if (barrio && p.barrio !== barrio) return false;
        if (moneda && p.moneda !== moneda) return false;
        if (desde != null && p.precio < desde) return false;
        if (hasta != null && p.precio > hasta) return false;
        return true;
      }),
    [properties, operacion, tipo, barrio, moneda, desde, hasta],
  );

  const hasFilters = Boolean(
    operacion || tipo || barrio || moneda || precioDesde || precioHasta,
  );
  const sinDatos = properties.length === 0;

  // La operación va a la URL (single source of truth): título + cards en sync.
  function cambiarOperacion(value: string) {
    // Tipo y zona dependen de la operación: al cambiarla los reseteamos para no
    // arrastrar un filtro que ya no aplica (dejaría la grilla vacía).
    setTipo("");
    setBarrio("");
    router.replace(
      value ? `/propiedades?operacion=${encodeURIComponent(value)}` : "/propiedades",
      { scroll: false },
    );
  }

  function limpiar() {
    setTipo("");
    setBarrio("");
    setMoneda("");
    setPrecioDesde("");
    setPrecioHasta("");
    if (operacion) cambiarOperacion("");
  }

  return (
    <>
      {/* Header — título según la operación (deriva de la URL). pt para el navbar. */}
      <section className="bg-azul text-white">
        <Container className="pb-12 pt-28 sm:pb-16 sm:pt-36">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-display sm:text-5xl">
            {copy.titulo}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-gris">
            {copy.descripcion}
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-14 sm:py-16">
          <div className="flex flex-wrap items-center gap-3">
            <label className="sr-only" htmlFor="f-operacion">
              Operación
            </label>
            <select
              id="f-operacion"
              value={operacion}
              onChange={(e) => cambiarOperacion(e.target.value)}
              className={fieldCls}
            >
              <option value="">Operación (todas)</option>
              {OPERACIONES.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="f-tipo">
              Tipo de propiedad
            </label>
            <select
              id="f-tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className={fieldCls}
            >
              <option value="">Tipo (todos)</option>
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="f-barrio">
              Zona / barrio
            </label>
            <select
              id="f-barrio"
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              className={fieldCls}
            >
              <option value="">Zona (todas)</option>
              {barrios.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="f-moneda">
              Moneda
            </label>
            <select
              id="f-moneda"
              value={moneda}
              onChange={(e) => setMoneda(e.target.value)}
              className={fieldCls}
            >
              <option value="">Moneda (todas)</option>
              <option value="ARS">Pesos (ARS)</option>
              <option value="USD">Dólares (USD)</option>
            </select>

            <label className="sr-only" htmlFor="f-desde">
              Precio desde
            </label>
            <input
              id="f-desde"
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="Precio desde"
              value={precioDesde}
              onChange={(e) => setPrecioDesde(e.target.value)}
              className={`${fieldCls} w-36`}
            />

            <label className="sr-only" htmlFor="f-hasta">
              Precio hasta
            </label>
            <input
              id="f-hasta"
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="Precio hasta"
              value={precioHasta}
              onChange={(e) => setPrecioHasta(e.target.value)}
              className={`${fieldCls} w-36`}
            />

            {hasFilters ? (
              <button
                type="button"
                onClick={limpiar}
                className="h-11 px-2 text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Limpiar
              </button>
            ) : null}

            <p className="ml-auto text-sm text-gris-texto">
              {filtered.length}{" "}
              {filtered.length === 1 ? "propiedad" : "propiedades"}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-borde bg-gris-claro py-20 text-center">
              <p className="text-base font-medium text-azul">
                {sinDatos
                  ? "No hay propiedades disponibles por el momento"
                  : "No hay propiedades que coincidan"}
              </p>
              <p className="mt-2 text-sm text-gris-texto">
                {sinDatos
                  ? "Volvé a intentar más tarde o escribinos."
                  : "Probá ajustar los filtros."}
              </p>
            </div>
          ) : (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <li key={p.id}>
                  <PropertyCard property={p} priority={i < 3} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
