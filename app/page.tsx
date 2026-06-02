import { Hero } from "@/components/sections/Hero";
import { Badges } from "@/components/sections/Badges";
import { Proyectos } from "@/components/sections/Proyectos";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { Equipo } from "@/components/sections/Equipo";
import { SocialProof } from "@/components/sections/SocialProof";
import { Faqs } from "@/components/sections/Faqs";
import { ContactForm } from "@/components/sections/ContactForm";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
// Hero alternativo con video (capa de motion). Listo pero NO montado: para
// usarlo, reemplazar <Hero /> por <VideoHero /> (ver components/sections/VideoHero.tsx).
// import { VideoHero } from "@/components/sections/VideoHero";

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
