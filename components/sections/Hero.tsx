import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { HeroBackground } from "@/components/sections/HeroBackground";

/**
 * Hero / banner sobre azul de marca, con degradado animado muy sutil + brillo
 * que reacciona al cursor (ver HeroBackground y .hero-surface en globals.css).
 * TODO(contenido): reemplazar eyebrow, titular, subtítulo y fotos por el
 * material final del cliente.
 */
export function Hero() {
  return (
    <HeroBackground>
      <Container className="relative z-10 grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Eyebrow>Comercialización inmobiliaria · Buenos Aires</Eyebrow>
          {/* TODO(contenido): titular y subtítulo finales. */}
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.08] tracking-display sm:text-5xl lg:text-6xl">
            Invertí en desarrollos seleccionados, con respaldo de principio a fin.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-mist">
            En AURE comercializamos proyectos —sobre todo de pozo— de
            desarrolladores de confianza. Te acompañamos con información clara,
            de la primera consulta a la entrega.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href="/#contacto">Quiero más información</Button>
            <Button href="/#proyectos" variant="secondary">
              Ver proyectos
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6">
          {/* TODO(assets): render/foto del desarrollo (ratio vertical). */}
          <ImagePlaceholder
            aspect="aspect-[4/5]"
            tone="ghost"
            label="Render del proyecto"
            className="lg:ml-auto lg:max-w-md"
          />
        </div>
      </Container>
    </HeroBackground>
  );
}
