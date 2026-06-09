/**
 * Emprendimientos / desarrollos que comercializa AURE (terceros). Data-driven:
 * cada uno tiene su página propia en /emprendimiento/[id], con video, info y el
 * showroom 3D embebido (iframe). Para sumar uno, agregá una entrada acá.
 *
 * NOTA: Emprendimientos es una entidad distinta de las propiedades (operaciones
 * venta/alquiler). El feed real (Tokko developments) queda pendiente; por ahora
 * estos datos son curados a mano.
 */
export type Emprendimiento = {
  id: string;
  nombre: string;
  zona: string;
  estado: string;
  /** Desarrollador (tercero). AURE comercializa, no desarrolla. */
  desarrolladora?: string;
  descripcion: string;
  destacados: string[];
  media?: { videoSrc?: string; posterSrc?: string };
  /** Showroom 3D embebible (iframe metaverse.winbuild.app). */
  showroomEmbedUrl?: string;
  /** Placeholder: emprendimiento sin contenido real todavía. */
  placeholder?: boolean;
};

export const EMPRENDIMIENTOS: Emprendimiento[] = [
  {
    id: "nogoya",
    nombre: "Nogoyá 2478",
    zona: "Villa del Parque, CABA",
    estado: "Listo para escriturar",
    desarrolladora: "Nocito Constructora",
    descripcion:
      "Ubicado a metros de la Av. San Martín, conjuga diseño y una localización óptima. La cercanía a las facultades de Ciencias Veterinarias y Agronomía sostiene una demanda habitacional constante e impulsa el movimiento comercial de la zona. Ideal para quienes buscan una vida académica cercana y para familias que quieren apartarse de las áreas céntricas.",
    destacados: [
      "Entrega inmediata, sin esperar obra",
      "A metros de la Av. San Martín",
      "Cerca de Veterinaria y Agronomía (UBA)",
      "Pensado para estudiantes y familias",
    ],
    media: {
      videoSrc: "/proyectos/nogoya.mp4",
      posterSrc: "/proyectos/nogoya-poster.svg",
    },
    showroomEmbedUrl: "https://metaverse.winbuild.app/Mario%20Yennaccaro/nogoya",
  },
  {
    // TODO(cliente): reemplazar por el segundo desarrollo real (info + media + showroom).
    id: "proximo",
    nombre: "Próximo desarrollo",
    zona: "Buenos Aires",
    estado: "Próximamente",
    descripcion:
      "Sumamos desarrollos de forma curada: pocos, bien elegidos. Dejanos tus datos y te avisamos apenas se publique el próximo, con la misma información clara y el mismo acompañamiento de principio a fin.",
    destacados: [
      "Selección curada de desarrollos",
      "Información clara desde el primer día",
      "Showroom 3D al publicarse",
    ],
    placeholder: true,
  },
];

export function getEmprendimiento(id: string): Emprendimiento | undefined {
  return EMPRENDIMIENTOS.find((e) => e.id === id);
}
