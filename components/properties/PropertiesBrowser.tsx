"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PropertyCard } from "@/components/properties/PropertyCard";
import type { Operacion, Property } from "@/lib/properties";

const fieldCls =
  "h-11 rounded-brand border border-borde bg-white px-3 text-sm text-azul focus:border-dorado focus:outline-none";

const OPERACIONES: Operacion[] = ["Venta", "Alquiler", "Alquiler temporario"];

/**
 * Grilla de propiedades con filtros del lado del cliente sobre datos que llegan
 * server-rendered (buenos para SEO): operación (opcional), tipo, barrio, moneda
 * y rango de precio. Sirve para una operación fija (/alquiler, /venta, …) o para
 * "todas" (/propiedades) con `showOperationFilter`.
 *
 * Nota: el rango de precio es numérico; conviene combinarlo con la moneda
 * (ARS/USD) para que sea preciso. TODO(tokko): con el feed real, filtrar/paginar
 * del lado del servidor.
 */
export function PropertiesBrowser({
  properties,
  showOperationFilter = false,
  initialOperacion = "",
}: {
  properties: Property[];
  showOperationFilter?: boolean;
  initialOperacion?: string;
}) {
  const [operacion, setOperacion] = useState(initialOperacion);
  const [tipo, setTipo] = useState("");
  const [barrio, setBarrio] = useState("");
  const [moneda, setMoneda] = useState("");
  const [precioDesde, setPrecioDesde] = useState("");
  const [precioHasta, setPrecioHasta] = useState("");

  const tipos = useMemo(
    () => Array.from(new Set(properties.map((p) => p.tipo))).sort(),
    [properties],
  );
  const barrios = useMemo(
    () => Array.from(new Set(properties.map((p) => p.barrio))).sort(),
    [properties],
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

  function limpiar() {
    setOperacion("");
    setTipo("");
    setBarrio("");
    setMoneda("");
    setPrecioDesde("");
    setPrecioHasta("");
  }

  return (
    <section className="bg-white">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-wrap items-center gap-3">
          {showOperationFilter ? (
            <>
              <label className="sr-only" htmlFor="f-operacion">
                Operación
              </label>
              <select
                id="f-operacion"
                value={operacion}
                onChange={(e) => setOperacion(e.target.value)}
                className={fieldCls}
              >
                <option value="">Operación (todas)</option>
                {OPERACIONES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </>
          ) : null}

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
