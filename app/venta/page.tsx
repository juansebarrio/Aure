import type { Metadata } from "next";
import { PropertiesListing } from "@/components/properties/PropertiesListing";

export const metadata: Metadata = {
  title: "Propiedades en venta",
  description:
    "Propiedades en venta en Buenos Aires. Departamentos, casas, PH y más, con información clara y acompañamiento de AURE.",
  alternates: { canonical: "/venta" },
};

export const revalidate = 1800;

export default function VentaPage() {
  return (
    <PropertiesListing
      operacion="Venta"
      eyebrow="Venta"
      titulo="Propiedades en venta"
      descripcion="Departamentos, casas, PH y más en venta en Buenos Aires. Filtrá por tipo, barrio y moneda, y consultá por la que te interese."
    />
  );
}
