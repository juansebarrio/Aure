export type ClassValue = string | number | null | false | undefined;

/**
 * Une clases condicionalmente (filtra valores falsy).
 * Helper mínimo para no depender de librerías externas.
 * Nota: no resuelve conflictos de Tailwind; al pasar `className`
 * a un primitivo, las clases del consumidor van al final.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
