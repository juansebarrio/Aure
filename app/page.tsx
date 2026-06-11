import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Badges } from "@/components/sections/Badges";
import { Proyectos } from "@/components/sections/Proyectos";
import { Portafolio } from "@/components/sections/Portafolio";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { Equipo } from "@/components/sections/Equipo";
import { SocialProof } from "@/components/sections/SocialProof";
import { Faqs } from "@/components/sections/Faqs";
import { ContactForm } from "@/components/sections/ContactForm";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
// El Hero es full-screen con video de fondo (public/video/hero-nogoya.mp4) +
// scrim de legibilidad y CTAs siempre visibles.

// Canónica explícita del home (el resto del metadata se hereda del layout).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main id="contenido">
      <Hero />
      <Badges />
      <QuienesSomos />
      <Portafolio />
      <Proyectos />
      <Equipo />
      <SocialProof />
      <Faqs />
      <ContactForm />
      <InstagramFeed />
    </main>
  );
}
