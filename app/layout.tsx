import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { WhatsappButton } from "@/components/WhatsappButton";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { IntroSequence } from "@/components/motion/IntroSequence";

// Outfit: tipografía de todo el sitio (titulares, bajadas y cuerpos) — Aure_V1.pdf §05.
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-outfit",
});

// IBM Plex Sans: SOLO el logotipo "aure." (y la intro). El resto usa Outfit.
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
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
  themeColor: "#212a45",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${outfit.variable} ${ibmPlexSans.variable}`}
    >
      <body className="font-sans antialiased">
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
