import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Cards sobrias del equipo. Data-driven (array). Da cara visible = confianza.
 * TODO(contenido): personas reales (foto, nombre, rol).
 */
type Persona = { id: string; nombre: string; rol: string };

const EQUIPO: Persona[] = [
  { id: "1", nombre: "Nombre Apellido", rol: "Dirección" },
  { id: "2", nombre: "Nombre Apellido", rol: "Asesor comercial" },
  { id: "3", nombre: "Nombre Apellido", rol: "Asesora comercial" },
  { id: "4", nombre: "Nombre Apellido", rol: "Atención al cliente" },
];

export function Equipo() {
  return (
    <Section id="equipo" background="white">
      <Reveal>
        <div className="max-w-2xl">
          <Eyebrow>Equipo</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
            Las personas detrás de cada operación
          </h2>
          <p className="mt-4 leading-relaxed text-gris-texto">
            Caras reales para humanizar una inmobiliaria joven: un equipo cercano
            en cada paso de la compra.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPO.map((persona) => (
            <li key={persona.id}>
              {/* TODO(assets): foto real de la persona. */}
              <ImagePlaceholder aspect="aspect-[4/5]" label="Foto" />
              <h3 className="mt-4 text-base font-medium tracking-display">
                {persona.nombre}
              </h3>
              <p className="mt-1 text-sm text-gris-texto">{persona.rol}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
