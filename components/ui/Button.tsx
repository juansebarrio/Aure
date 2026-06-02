import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

/**
 * Botón/CTA de marca. Plano, sin sombras.
 * - primary: fondo dorado + texto azul (CTA principal).
 * - secondary: fantasma (borde fino, hereda el color del contexto).
 *
 * Corners rectos: decisión de marca (estética arquitectónica/sobria). El spec
 * no define radio; queda centralizado en `base` para cambiarlo en un solo lugar.
 *
 * Polimórfico: si recibe `href` renderiza un <Link>, si no un <button>.
 */
const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-opacity disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-gold text-brand-blue hover:opacity-90",
  secondary:
    "border border-current bg-transparent text-current hover:opacity-70",
};

type ButtonSize = "sm" | "md";

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-6 py-3 text-sm",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonProps =
  | (SharedProps & { href: string } & Omit<
        ComponentPropsWithoutRef<"a">,
        keyof SharedProps | "href"
      >)
  | (SharedProps & { href?: undefined } & Omit<
        ComponentPropsWithoutRef<"button">,
        keyof SharedProps
      >);

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (props.href !== undefined) {
    const {
      variant: _variant,
      size: _size,
      className: _className,
      children: _children,
      ...linkProps
    } = props;
    return (
      <Link className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    size: _size,
    className: _className,
    children: _children,
    href: _href,
    ...buttonProps
  } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
