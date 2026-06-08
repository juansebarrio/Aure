import type { Metadata } from "next";
import { PropertiesListing } from "@/components/properties/PropertiesListing";

export const metadata: Metadata = {
  title: "Propiedades en alquiler",
  description:
    "Propiedades en alquiler en Buenos Aires. Departamentos, casas, PH y más, con información clara y acompañamiento de AURE.",
  alternates: { canonical: "/alquiler" },
};

// ISR: vale para el feed real de Tokko (revalida cada 30 min).
export const revalidate = 1800;

export default function AlquilerPage() {
  return (
    <PropertiesListing
      operacion="Alquiler"
      eyebrow="Alquiler"
      titulo="Propiedades en alquiler"
      descripcion="Departamentos, casas, PH y más en Buenos Aires. Filtrá por tipo, barrio y moneda, y escribinos por la propiedad que te interese."
    />
  );
}
