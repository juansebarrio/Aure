import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroBackground } from "@/components/sections/HeroBackground";

/**
 * Hero híbrido full-bleed (wireframe 02): grilla animada de fondo hoy; el video
 * real se suma pasándole videoSrc/posterSrc a HeroBackground. Titular editorial,
 * subtítulo de una línea y CTA primario a contacto + secundario a proyectos.
 * TODO(contenido/assets): titular/subtítulo finales y el video del hero.
 */
export function Hero() {
  return (
    <HeroBackground
      className="flex min-h-svh items-center"
      videoSrc="/video/hero.mp4"
      posterSrc="/video/poster.svg"
    >
      <Container className="relative z-10 py-28">
        <div className="max-w-3xl">
          <Eyebrow>Comercialización inmobiliaria · Buenos Aires</Eyebrow>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.08] tracking-display sm:text-5xl lg:text-6xl">
            Invertí en desarrollos seleccionados, con respaldo de principio a fin.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-gris">
            Te acompañamos con información clara, de la primera consulta a la
            entrega.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href="/#contacto">Quiero más información</Button>
            <Button href="/#proyectos" variant="secondary">
              Ver proyectos
            </Button>
          </div>
        </div>
      </Container>
    </HeroBackground>
  );
}
