import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Web App Manifest (metadata de instalación / PWA básico). El ícono es el
 * isotipo placeholder; TODO(assets): reemplazar por el set oficial del cliente.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} · ${siteConfig.submarca}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#1E2A47",
    theme_color: "#1E2A47",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
