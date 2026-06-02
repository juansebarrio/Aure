import { Hero } from "@/components/sections/Hero";
import { Badges } from "@/components/sections/Badges";
import { SocialProof } from "@/components/sections/SocialProof";
import { Faqs } from "@/components/sections/Faqs";
import { About } from "@/components/sections/About";
import { ContactForm } from "@/components/sections/ContactForm";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
// import { DevelopmentsGrid } from "@/components/sections/DevelopmentsGrid";
// Hero alternativo con video (capa de motion). Listo pero NO montado: para
// usarlo, reemplazar <Hero /> por <VideoHero /> (ver components/sections/VideoHero.tsx).
// import { VideoHero } from "@/components/sections/VideoHero";

export default function HomePage() {
  return (
    <main id="contenido">
      <Hero />
      <Badges />
      <SocialProof />
      <Faqs />
      <About />
      <ContactForm />
      <InstagramFeed />
      {/*
        Grilla de desarrollos: componente preparado pero NO mostrado todavía.
        Activar <DevelopmentsGrid /> solo si el cliente confirma que exhiben
        varios desarrollos (ver components/sections/DevelopmentsGrid.tsx).
      */}
    </main>
  );
}
