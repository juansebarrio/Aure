"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PropertyCard } from "@/components/properties/PropertyCard";
import {
  operacionCopy,
  type Operacion,
  type PropertyListItem,
} from "@/lib/properties";

const OPERACIONES: Operacion[] = ["Venta", "Alquiler", "Alquiler temporario"];

/* ---------- estilos compartidos de los campos (sobrios, de marca) ---------- */

// Foco: borde dorado al focusear; con teclado (focus-visible) anillo azul 2px.
const selectCls =
  "h-11 w-full appearance-none rounded-brand border border-borde bg-white pl-3 pr-9 text-sm text-azul outline-none transition-colors focus:border-dorado focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul";

// Inputs numéricos sin spinners (estética limpia) dentro del grupo de rango.
const rangeInputCls =
  "h-full w-full min-w-0 bg-transparent px-3 text-sm text-azul outline-none placeholder:text-gris-texto/70 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const labelCls =
  "mb-1.5 block text-[10px] font-medium uppercase tracking-eyebrow text-gris-texto";

/** Select con label eyebrow visible y chevron propio (no la flecha nativa). */
function SelectField({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={selectCls}
        >
          {children}
        </select>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gris-texto"
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/** Rango mín–máx agrupado en un solo borde (precio, superficie). */
function RangeField({
  label,
  ariaBase,
  desde,
  hasta,
  onDesde,
  onHasta,
}: {
  label: string;
  /** Base para los aria-label de los inputs ("Precio" → "Precio mínimo"). */
  ariaBase: string;
  desde: string;
  hasta: string;
  onDesde: (v: string) => void;
  onHasta: (v: string) => void;
}) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex h-11 items-center overflow-hidden rounded-brand border border-borde bg-white transition-colors focus-within:border-dorado">
        <input
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="Mín"
          aria-label={`${ariaBase} mínimo`}
          value={desde}
          onChange={(e) => onDesde(e.target.value)}
          className={rangeInputCls}
        />
        <span aria-hidden="true" className="shrink-0 text-gris-texto/60">
          –
        </span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="Máx"
          aria-label={`${ariaBase} máximo`}
          value={hasta}
          onChange={(e) => onHasta(e.target.value)}
          className={rangeInputCls}
        />
      </div>
    </div>
  );
}

/**
 * Vista unificada de propiedades: header (título según la operación) + panel de
 * filtros + grilla. La OPERACIÓN vive en la URL (?operacion=…): así el título
 * de arriba y las cards de abajo siempre coinciden, y el link es compartible.
 * El resto de filtros (tipo, zona, ambientes, moneda, precio, m²) son estado
 * local en la página.
 *
 * `operacion` llega como prop desde el server (searchParams). Al cambiarla,
 * hacemos router.replace y el server re-renderiza con la nueva operación; los
 * filtros locales NO se resetean (no hay remount) salvo los que dependen de la
 * operación (tipo/zona/ambientes: sus opciones derivan de ella).
 */
export function PropertiesBrowser({
  properties,
  operacion,
}: {
  properties: PropertyListItem[];
  operacion: Operacion | "";
}) {
  const router = useRouter();
  const [tipo, setTipo] = useState("");
  const [barrio, setBarrio] = useState("");
  const [ambientes, setAmbientes] = useState("");
  const [moneda, setMoneda] = useState("");
  const [precioDesde, setPrecioDesde] = useState("");
  const [precioHasta, setPrecioHasta] = useState("");
  const [supDesde, setSupDesde] = useState("");
  const [supHasta, setSupHasta] = useState("");

  const copy = operacionCopy(operacion);

  // Las opciones de tipo/zona/ambientes derivan de las propiedades de la
  // operación elegida: no se ofrecen combinaciones que den cero resultados.
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
  // Ambientes: 1–4 exactos (si existen) + "5+" si hay de 5 o más. 0 = sin dato.
  const ambientesOpts = useMemo(() => {
    const set = new Set(forFacets.map((p) => p.ambientes).filter((n) => n > 0));
    return {
      exactos: [1, 2, 3, 4].filter((n) => set.has(n)),
      hayCincoOMas: Array.from(set).some((n) => n >= 5),
    };
  }, [forFacets]);

  const desde = precioDesde ? Number(precioDesde) : null;
  const hasta = precioHasta ? Number(precioHasta) : null;
  const sDesde = supDesde ? Number(supDesde) : null;
  const sHasta = supHasta ? Number(supHasta) : null;

  const filtered = useMemo(
    () =>
      properties.filter((p) => {
        if (operacion && p.operacion !== operacion) return false;
        if (tipo && p.tipo !== tipo) return false;
        if (barrio && p.barrio !== barrio) return false;
        if (ambientes) {
          if (ambientes === "5+") {
            if (p.ambientes < 5) return false;
          } else if (p.ambientes !== Number(ambientes)) return false;
        }
        if (moneda && p.moneda !== moneda) return false;
        if (desde != null && p.precio < desde) return false;
        if (hasta != null && p.precio > hasta) return false;
        // m²: superficie 0 = sin dato → no matchea un filtro de superficie.
        if ((sDesde != null || sHasta != null) && p.superficie <= 0) return false;
        if (sDesde != null && p.superficie < sDesde) return false;
        if (sHasta != null && p.superficie > sHasta) return false;
        return true;
      }),
    [properties, operacion, tipo, barrio, ambientes, moneda, desde, hasta, sDesde, sHasta],
  );

  const hasFilters = Boolean(
    operacion ||
      tipo ||
      barrio ||
      ambientes ||
      moneda ||
      precioDesde ||
      precioHasta ||
      supDesde ||
      supHasta,
  );
  const sinDatos = properties.length === 0;

  // La operación va a la URL (single source of truth): título + cards en sync.
  function cambiarOperacion(value: string) {
    // Tipo/zona/ambientes derivan de la operación: al cambiarla se resetean
    // para no arrastrar un filtro que ya no aplica (dejaría la grilla vacía).
    setTipo("");
    setBarrio("");
    setAmbientes("");
    router.replace(
      value ? `/propiedades?operacion=${encodeURIComponent(value)}` : "/propiedades",
      { scroll: false },
    );
  }

  function limpiar() {
    setTipo("");
    setBarrio("");
    setAmbientes("");
    setMoneda("");
    setPrecioDesde("");
    setPrecioHasta("");
    setSupDesde("");
    setSupHasta("");
    if (operacion) cambiarOperacion("");
  }

  return (
    <>
      {/* Header — título según la operación (deriva de la URL). pt para el
          navbar; pb extra para que el panel de filtros "flote" solapado. */}
      <section className="bg-azul text-white">
        <Container className="pb-24 pt-28 sm:pb-28 sm:pt-36">
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
        <Container className="pb-14 sm:pb-16">
          {/* Panel de filtros — solapa el header azul (plano, sin sombras).
              pt mayor que el resto: aire entre el borde superior y los labels. */}
          <div className="relative -mt-12 rounded-2xl border border-borde bg-white px-5 pb-5 pt-8 sm:px-6 sm:pb-6 sm:pt-9">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              <SelectField
                id="f-operacion"
                label="Operación"
                value={operacion}
                onChange={cambiarOperacion}
              >
                <option value="">Todas</option>
                {OPERACIONES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </SelectField>

              <SelectField id="f-tipo" label="Tipo" value={tipo} onChange={setTipo}>
                <option value="">Todos</option>
                {tipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </SelectField>

              <SelectField
                id="f-barrio"
                label="Zona"
                value={barrio}
                onChange={setBarrio}
              >
                <option value="">Todas</option>
                {barrios.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </SelectField>

              <SelectField
                id="f-ambientes"
                label="Ambientes"
                value={ambientes}
                onChange={setAmbientes}
              >
                <option value="">Todos</option>
                {ambientesOpts.exactos.map((n) => (
                  <option key={n} value={String(n)}>
                    {n === 1 ? "1 ambiente" : `${n} ambientes`}
                  </option>
                ))}
                {ambientesOpts.hayCincoOMas ? (
                  <option value="5+">5 o más</option>
                ) : null}
              </SelectField>

              <SelectField
                id="f-moneda"
                label="Moneda"
                value={moneda}
                onChange={setMoneda}
              >
                <option value="">Todas</option>
                <option value="ARS">Pesos (ARS)</option>
                <option value="USD">Dólares (USD)</option>
              </SelectField>

              <RangeField
                label="Precio"
                ariaBase="Precio"
                desde={precioDesde}
                hasta={precioHasta}
                onDesde={setPrecioDesde}
                onHasta={setPrecioHasta}
              />

              <RangeField
                label="Superficie (m²)"
                ariaBase="Superficie en m²"
                desde={supDesde}
                hasta={supHasta}
                onDesde={setSupDesde}
                onHasta={setSupHasta}
              />
            </div>

            {/* Pie del panel: resultado + limpiar. */}
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-borde pt-4">
              <p className="text-sm text-gris-texto">
                <span className="font-medium text-azul">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "propiedad" : "propiedades"}
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={limpiar}
                  className="text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Limpiar filtros
                </button>
              ) : null}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-borde bg-gris-claro py-20 text-center">
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
