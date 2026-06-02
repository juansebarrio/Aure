import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    // La imagen OG (1200x630) la genera app/opengraph-image.tsx.
    // TODO(assets): refinar la OG con la fuente/asset definitivos.
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  // TODO(SEO): verification (Google/Bing) cuando estén las cuentas del cliente.
};

export const viewport: Viewport = {
  themeColor: "#1E2A47",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={ibmPlexSans.variable}>
      <body className="font-sans antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-brand focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-blue"
        >
          Saltar al contenido
        </a>
        <Navbar />
        {children}
        <Footer />
        <WhatsappButton />
        {/*
          Medición (GA4 / Meta Pixel): hueco preparado, nada instalado todavía.
          Cuando estén las claves/definición, montar <Analytics /> acá
          (ver components/Analytics.tsx).
        */}
      </body>
    </html>
  );
}
