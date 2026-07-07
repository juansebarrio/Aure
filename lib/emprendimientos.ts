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
    // Contenido tomado del brochure oficial de CDO hub (brochure_V2).
    // TODO(cliente): confirmar estado (¿en pozo / en obra?). Showroom 3D pendiente.
    id: "vuelta-de-obligado",
    nombre: "Vuelta de Obligado 3830",
    zona: "Núñez, CABA",
    estado: "En desarrollo",
    desarrolladora: "CDO hub",
    descripcion:
      "Unidades de 1, 2 y 3 ambientes en Núñez, con una propuesta contemporánea que prioriza la funcionalidad, el confort y el aprovechamiento del espacio. Ambientes luminosos y bien resueltos, terminaciones de calidad y balcón en todas las unidades, con terrazas propias en los pisos altos. A metros de Av. del Libertador, Av. Cabildo y Av. General Paz, con acceso rápido al subte (línea D), al tren Mitre y a espacios verdes como el Parque Saavedra y la Costanera Norte.",
    destacados: [
      "Unidades de 1, 2 y 3 ambientes, todas con balcón",
      "Terrazas propias en los pisos altos",
      "A metros de Av. del Libertador, Cabildo y Gral. Paz",
      "Entorno barrial: Parque Saavedra y Costanera Norte cerca",
    ],
    media: {
      videoSrc: "/proyectos/vuelta-de-obligado.mp4",
      posterSrc: "/proyectos/vuelta-de-obligado-poster.jpg",
    },
  },
];

export function getEmprendimiento(id: string): Emprendimiento | undefined {
  return EMPRENDIMIENTOS.find((e) => e.id === id);
}
