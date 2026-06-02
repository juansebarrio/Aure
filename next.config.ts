import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // TODO: cuando lleguen los assets reales del cliente, configurar dominios
  // remotos para next/image (p. ej. el CDN de fotos de los desarrollos).
  // images: {
  //   remotePatterns: [{ protocol: "https", hostname: "..." }],
  // },
};

export default nextConfig;
