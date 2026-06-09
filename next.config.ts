import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Fotos reales de Tokko Broker. Los placeholders del mock son SVG locales
    // y se sirven con `unoptimized` desde PropertyImage.
    // TODO(tokko): verificar con la respuesta real que las fotos vienen de
    // static.tokkobroker.com; si Tokko sirve algunas desde otro host/CDN,
    // sumar el patrón acá.
    remotePatterns: [
      { protocol: "https", hostname: "static.tokkobroker.com" },
    ],
  },
  // Las páginas por operación se unificaron en /propiedades con el filtro
  // pre-aplicado. Redirigimos las URLs viejas (temporal mientras se itera).
  async redirects() {
    return [
      { source: "/alquiler", destination: "/propiedades?operacion=Alquiler", permanent: false },
      { source: "/venta", destination: "/propiedades?operacion=Venta", permanent: false },
      {
        source: "/alquiler-temporario",
        destination: "/propiedades?operacion=Alquiler%20temporario",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
