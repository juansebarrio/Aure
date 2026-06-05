import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Fotos reales de Tokko Broker (cuando se conecte el feed). Los placeholders
    // del mock son SVG locales y se sirven con `unoptimized` desde PropertyImage.
    remotePatterns: [
      { protocol: "https", hostname: "static.tokkobroker.com" },
    ],
  },
};

export default nextConfig;
