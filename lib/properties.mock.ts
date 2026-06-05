import type { Property } from "./properties";

/**
 * MOCK — propiedades FICTICIAS para desarrollo/revisión. NO son reales.
 * Direcciones tipo "Calle Ejemplo 123"; barrios y precios verosímiles de CABA.
 *
 * GUARDRAIL: reemplazar por el feed real de Tokko antes de publicar. No
 * presentar estos datos como reales en producción.
 */
const FOTOS: Property["fotos"] = [
  { url: "/propiedades/placeholder-1.svg", alt: "Imagen de muestra" },
  { url: "/propiedades/placeholder-2.svg", alt: "Imagen de muestra" },
  { url: "/propiedades/placeholder-3.svg", alt: "Imagen de muestra" },
];

const RENTALS: Property[] = [
  {
    id: "alq-01",
    titulo: "Departamento 2 ambientes en Palermo",
    direccion: "Calle Ejemplo 1234",
    barrio: "Palermo",
    operacion: "Alquiler",
    tipo: "Departamento",
    precio: 520000,
    moneda: "ARS",
    expensas: 95000,
    ambientes: 2,
    dormitorios: 1,
    banos: 1,
    superficie: 48,
    cochera: false,
    descripcion:
      "Dos ambientes luminoso, exterior, con balcón. Cocina integrada y buena ubicación, a pasos de transporte y comercios. (Datos de muestra.)",
    fotos: FOTOS,
  },
  {
    id: "alq-02",
    titulo: "Departamento 3 ambientes en Belgrano",
    direccion: "Av. Demo 2050",
    barrio: "Belgrano",
    operacion: "Alquiler",
    tipo: "Departamento",
    precio: 780000,
    moneda: "ARS",
    expensas: 130000,
    ambientes: 3,
    dormitorios: 2,
    banos: 2,
    superficie: 72,
    cochera: true,
    descripcion:
      "Tres ambientes amplio con dependencia, cochera cubierta y amenities. Muy buena distribución y luz natural. (Datos de muestra.)",
    fotos: FOTOS,
  },
  {
    id: "alq-03",
    titulo: "PH 3 ambientes en Villa Crespo",
    direccion: "Pasaje Muestra 345",
    barrio: "Villa Crespo",
    operacion: "Alquiler",
    tipo: "PH",
    precio: 650,
    moneda: "USD",
    ambientes: 3,
    dormitorios: 2,
    banos: 1,
    superficie: 80,
    cochera: false,
    descripcion:
      "PH al frente con patio propio y terraza. Sin expensas, ideal para quienes buscan independencia. (Datos de muestra.)",
    fotos: FOTOS,
  },
  {
    id: "alq-04",
    titulo: "Monoambiente en Recoleta",
    direccion: "Calle Ejemplo 567",
    barrio: "Recoleta",
    operacion: "Alquiler",
    tipo: "Departamento",
    precio: 410000,
    moneda: "ARS",
    expensas: 80000,
    ambientes: 1,
    banos: 1,
    superficie: 32,
    cochera: false,
    descripcion:
      "Monoambiente funcional y bien mantenido, en zona con todos los servicios. Apto profesional. (Datos de muestra.)",
    fotos: FOTOS,
  },
  {
    id: "alq-05",
    titulo: "Casa 4 ambientes en Núñez",
    direccion: "Calle Ficticia 890",
    barrio: "Núñez",
    operacion: "Alquiler",
    tipo: "Casa",
    precio: 1500,
    moneda: "USD",
    ambientes: 4,
    dormitorios: 3,
    banos: 2,
    superficie: 140,
    cochera: true,
    descripcion:
      "Casa en dos plantas con jardín, parrilla y cochera para dos autos. Barrio tranquilo y residencial. (Datos de muestra.)",
    fotos: FOTOS,
  },
  {
    id: "alq-06",
    titulo: "Oficina en Microcentro",
    direccion: "Av. Modelo 100",
    barrio: "Microcentro",
    operacion: "Alquiler",
    tipo: "Oficina",
    precio: 600000,
    moneda: "ARS",
    ambientes: 2,
    banos: 1,
    superficie: 55,
    cochera: false,
    descripcion:
      "Oficina en edificio corporativo, planta flexible y muy conectada al transporte. (Datos de muestra.)",
    fotos: FOTOS,
  },
  {
    id: "alq-07",
    titulo: "Departamento 2 ambientes en Caballito",
    direccion: "Calle Ejemplo 432",
    barrio: "Caballito",
    operacion: "Alquiler",
    tipo: "Departamento",
    precio: 480000,
    moneda: "ARS",
    expensas: 90000,
    ambientes: 2,
    dormitorios: 1,
    banos: 1,
    superficie: 50,
    cochera: false,
    descripcion:
      "Dos ambientes contrafrente, silencioso, con buena ventilación. Cerca de parques y subte. (Datos de muestra.)",
    fotos: FOTOS,
  },
  {
    id: "alq-08",
    titulo: "Local comercial en Villa Urquiza",
    direccion: "Av. Demo 1500",
    barrio: "Villa Urquiza",
    operacion: "Alquiler",
    tipo: "Local",
    precio: 700000,
    moneda: "ARS",
    ambientes: 1,
    banos: 1,
    superficie: 60,
    cochera: false,
    descripcion:
      "Local a la calle con vidriera, sobre avenida de alto tránsito. Apto múltiples rubros. (Datos de muestra.)",
    fotos: FOTOS,
  },
];

export async function getRentalsMock(): Promise<Property[]> {
  return RENTALS;
}

export async function getPropertyMock(id: string): Promise<Property | null> {
  return RENTALS.find((p) => p.id === id) ?? null;
}
