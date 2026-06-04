import { Hero } from "@/components/sections/Hero";
import { Badges } from "@/components/sections/Badges";
import { Proyectos } from "@/components/sections/Proyectos";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { Equipo } from "@/components/sections/Equipo";
import { SocialProof } from "@/components/sections/SocialProof";
import { Faqs } from "@/components/sections/Faqs";
import { ContactForm } from "@/components/sections/ContactForm";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
// El Hero es híbrido (grilla animada de fondo + slot de video full-bleed). Para
// sumar el video real, pasá videoSrc/posterSrc a <HeroBackground> en Hero.tsx.
// (VideoHero queda como variante full-screen alternativa, sin montar.)

export default function HomePage() {
  return (
    <main id="contenido">
      <Hero />
      <Badges />
      <Proyectos />
      <QuienesSomos />
      <Equipo />
      <SocialProof />
      <Faqs />
      <ContactForm />
      <InstagramFeed />
    </main>
  );
}
