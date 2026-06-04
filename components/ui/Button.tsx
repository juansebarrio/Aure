import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "glass";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-dorado text-blanco hover:brightness-105 active:brightness-95",
  secondary: "border border-current bg-transparent text-current hover:bg-white/10",
  glass:
    "border border-white/15 bg-white/10 text-blanco backdrop-blur-sm hover:bg-white/20 active:bg-white/25",
};

type ButtonSize = "sm" | "md";

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3 text-xs",
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
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      ...linkProps
    } = props;
    return (
      <Link className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    href: _h,
    ...buttonProps
  } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
