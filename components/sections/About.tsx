import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

/** TODO(contenido): cifras reales. */
const stats = [
  { value: "+12", label: "Años de trayectoria" },
  { value: "+80", label: "Operaciones cerradas" },
  { value: "100%", label: "A medida" },
];

export function About() {
  return (
    <Section id="nosotros" background="blue">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Eyebrow>Quiénes somos</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium tracking-display text-white sm:text-4xl">
            Arquitectura y criterio urbano aplicados a la inversión
          </h2>
          {/* TODO(contenido): texto institucional definitivo. */}
          <p className="mt-6 text-lg font-light leading-relaxed text-mist">
            AURE acompaña a inversores calificados en operaciones inmobiliarias
            premium en Buenos Aires, combinando lectura arquitectónica, análisis
            urbano y disciplina financiera.
          </p>
          <p className="mt-4 leading-relaxed text-mist">
            Cada decisión se toma con la misma vara: diseño, ubicación y
            rentabilidad sostenible en el tiempo.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-3xl font-medium tracking-display text-white">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-xs uppercase tracking-eyebrow text-mist">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          {/* TODO(assets): foto del equipo / oficina. */}
          <ImagePlaceholder
            aspect="aspect-[4/3]"
            tone="ghost"
            label="Equipo / oficina"
            className="lg:ml-auto lg:max-w-lg"
          />
        </div>
      </div>
    </Section>
  );
}
