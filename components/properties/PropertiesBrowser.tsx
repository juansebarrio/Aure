"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PropertyCard } from "@/components/properties/PropertyCard";
import type { Property } from "@/lib/properties";

const selectCls =
  "h-11 rounded-brand border border-borde bg-white px-3 text-sm text-azul focus:border-dorado focus:outline-none";

/**
 * Grilla de propiedades con filtros básicos (tipo, barrio, moneda), del lado del
 * cliente sobre datos que llegan server-rendered (buenos para SEO). Sirve para
 * cualquier operación (venta, alquiler, alquiler temporario).
 *
 * TODO(tokko): con el feed real (muchas propiedades) conviene filtrar/paginar
 * del lado del servidor. El rango de precio se omite por la mezcla de monedas
 * (ARS/USD); se suma cuando se defina la normalización.
 */
export function PropertiesBrowser({ properties }: { properties: Property[] }) {
  const [tipo, setTipo] = useState("");
  const [barrio, setBarrio] = useState("");
  const [moneda, setMoneda] = useState("");

  const tipos = useMemo(
    () => Array.from(new Set(properties.map((p) => p.tipo))).sort(),
    [properties],
  );
  const barrios = useMemo(
    () => Array.from(new Set(properties.map((p) => p.barrio))).sort(),
    [properties],
  );

  const filtered = useMemo(
    () =>
      properties.filter(
        (p) =>
          (!tipo || p.tipo === tipo) &&
          (!barrio || p.barrio === barrio) &&
          (!moneda || p.moneda === moneda),
      ),
    [properties, tipo, barrio, moneda],
  );

  const hasFilters = Boolean(tipo || barrio || moneda);
  const sinDatos = properties.length === 0;

  return (
    <section className="bg-white">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <label className="sr-only" htmlFor="f-tipo">
              Tipo de propiedad
            </label>
            <select
              id="f-tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className={selectCls}
            >
              <option value="">Tipo (todos)</option>
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="f-barrio">
              Barrio
            </label>
            <select
              id="f-barrio"
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              className={selectCls}
            >
              <option value="">Barrio (todos)</option>
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
              className={selectCls}
            >
              <option value="">Moneda (todas)</option>
              <option value="ARS">Pesos (ARS)</option>
              <option value="USD">Dólares (USD)</option>
            </select>

            {hasFilters ? (
              <button
                type="button"
                onClick={() => {
                  setTipo("");
                  setBarrio("");
                  setMoneda("");
                }}
                className="h-11 px-2 text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Limpiar
              </button>
            ) : null}
          </div>

          <p className="text-sm text-gris-texto">
            {filtered.length} {filtered.length === 1 ? "propiedad" : "propiedades"}
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
  );
}
