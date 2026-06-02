import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

/**
 * Grilla de desarrollos — PREPARADA pero NO usada todavía (ver brief).
 * Si el cliente confirma que muestran varios desarrollos, se activa importándola
 * y renderizándola en la home (o en una página propia /desarrollos).
 *
 * TODO(contenido): reemplazar el mock por los desarrollos reales (CMS o data).
 */
type Development = {
  id: string;
  name: string;
  location: string;
  status: string;
};

const MOCK_DEVELOPMENTS: Development[] = [
  { id: "1", name: "Desarrollo I", location: "Palermo, CABA", status: "En pozo" },
  { id: "2", name: "Desarrollo II", location: "Núñez, CABA", status: "En obra" },
  { id: "3", name: "Desarrollo III", location: "Tigre, GBA", status: "Próximo" },
];

export function DevelopmentsGrid() {
  return (
    <Section id="desarrollos" background="cloud">
      <div className="max-w-2xl">
        <Eyebrow>Desarrollos</Eyebrow>
        <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
          Oportunidades seleccionadas
        </h2>
      </div>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_DEVELOPMENTS.map((dev) => (
          <li key={dev.id}>
            <ImagePlaceholder aspect="aspect-[4/3]" label={dev.name} />
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-medium tracking-display">
                {dev.name}
              </h3>
              <span className="shrink-0 text-xs uppercase tracking-eyebrow text-gold">
                {dev.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{dev.location}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
