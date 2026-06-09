type LogoProps = {
  /** imagotipo = isotipo + "aure." ; logotipo = solo "aure." */
  variant?: "imagotipo" | "logotipo";
  /** light = fondo claro (logo azul) ; dark = fondo oscuro (logo crema) */
  mode?: "light" | "dark";
  className?: string;
};

const SRC: Record<
  NonNullable<LogoProps["variant"]>,
  Record<NonNullable<LogoProps["mode"]>, string>
> = {
  imagotipo: {
    light: "/brand/aure-imagotipo.svg",
    dark: "/brand/aure-imagotipo-negativo.svg",
  },
  logotipo: {
    light: "/brand/aure-logotipo.svg",
    dark: "/brand/aure-logotipo-negativo.svg",
  },
};

export function Logo({
  variant = "imagotipo",
  mode = "light",
  className,
}: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={SRC[variant][mode]} alt="aure" className={className} />
  );
}
