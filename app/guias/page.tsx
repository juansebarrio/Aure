import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/structured-data";
import { GUIAS } from "@/lib/guias";

export const metadata: Metadata = {
  title: "Guías para comprar con claridad",
  description:
    "Guías claras para comprar una propiedad en Buenos Aires: qué significa comprar en pozo, el proceso paso a paso, gastos y formas de pago. Sin letra chica.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <main id="contenido">
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", url: "/" },
          { name: "Guías", url: "/guias" },
        ])}
      />

      <section className="bg-azul text-white">
        <Container className="pb-12 pt-28 sm:pb-16 sm:pt-36">
          <Eyebrow>Guías</Eyebrow>
          <h1 className="mt-5 text-4xl font-medium tracking-display sm:text-5xl">
            Guías para comprar con claridad
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-gris">
            Lo que conviene entender antes de comprar una propiedad en Buenos
            Aires, explicado sin letra chica. Empezamos por lo más consultado y
            vamos sumando.
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-borde bg-borde sm:grid-cols-2">
            {GUIAS.map((guia) => (
              <li key={guia.slug} className="bg-white">
                <Link
                  href={`/guias/${guia.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors hover:bg-gris-claro"
                >
                  <h2 className="text-xl font-medium tracking-display text-azul">
                    {guia.titulo}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gris-texto">
                    {guia.resumen}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-eyebrow text-azul">
                    Leer guía
                    <span
                      aria-hidden="true"
                      className="text-dorado transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
