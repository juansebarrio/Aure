import type { Metadata } from "next";
import { PropertiesListing } from "@/components/properties/PropertiesListing";

export const metadata: Metadata = {
  title: "Alquiler temporario",
  description:
    "Alquiler temporario en Buenos Aires: departamentos amoblados para estadías cortas, con acompañamiento de AURE.",
  alternates: { canonical: "/alquiler-temporario" },
};

export const revalidate = 1800;

export default function AlquilerTemporarioPage() {
  return (
    <PropertiesListing
      operacion="Alquiler temporario"
      eyebrow="Alquiler temporario"
      titulo="Alquiler temporario"
      descripcion="Departamentos amoblados para estadías cortas en Buenos Aires. Filtrá por tipo, barrio y moneda, y consultá disponibilidad."
    />
  );
}
