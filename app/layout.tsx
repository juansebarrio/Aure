import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { IntroSequence } from "@/components/motion/IntroSequence";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/structured-data";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.submarca}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.submarca}`,
    description: siteConfig.description,
    url: siteConfig.url,
    // La imagen OG (1200x630) la genera app/opengraph-image.tsx.
    // TODO(assets): refinar la OG con la fuente/asset definitivos.
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.submarca}`,
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
        {/* Identidad de la marca (RealEstateAgent) + el sitio (WebSite),
            presentes en todas las páginas. El resto del JSON-LD (FAQPage,
            BreadcrumbList, fichas) se monta por página. */}
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {/* Antes del primer paint: si la intro ya se vio en esta sesión o hay
            reduced-motion, marca <html class="intro-seen"> para ocultar el
            overlay por CSS y evitar flash. La primera visita corre la animación. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('aure_intro_seen')||(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){document.documentElement.classList.add('intro-seen')}}catch(e){}",
          }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-brand focus:bg-dorado focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-azul"
        >
          Saltar al contenido
        </a>
        <SmoothScrollProvider>
          <IntroSequence />
          <Navbar />
          {children}
          <Footer />
          <WhatsappButton />
        </SmoothScrollProvider>
        {/*
          Medición (GA4 / Meta Pixel): hueco preparado, nada instalado todavía.
          Cuando estén las claves/definición, montar <Analytics /> acá
          (ver components/Analytics.tsx).
        */}
      </body>
    </html>
  );
}
