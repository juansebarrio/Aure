import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

/**
 * Hero / banner sobre azul de marca.
 * TODO(contenido): reemplazar eyebrow, titular, subtítulo y fotos por el
 * material final del cliente.
 */
export function Hero() {
  return (
    <section className="bg-brand-blue text-white">
      <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Eyebrow>Inversión inmobiliaria premium</Eyebrow>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.08] tracking-display sm:text-5xl lg:text-6xl">
            Real estate con criterio arquitectónico y urbano.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-mist">
            Oportunidades seleccionadas en Buenos Aires para inversores que
            valoran el diseño, la ubicación y la rentabilidad a largo plazo.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href="/#agenda">Agendá una reunión</Button>
            <Button href="/#nosotros" variant="secondary">
              Cómo trabajamos
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6">
          {/* TODO(assets): foto principal del desarrollo (ratio vertical premium). */}
          <ImagePlaceholder
            aspect="aspect-[4/5]"
            tone="ghost"
            label="Foto del proyecto"
            className="lg:ml-auto lg:max-w-md"
          />
        </div>
      </Container>
    </section>
  );
}
