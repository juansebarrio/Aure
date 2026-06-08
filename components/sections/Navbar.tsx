"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks, propiedadesMenu, primaryCta, siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="17" y2="6" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="14" x2="17" y2="14" />
        </>
      )}
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={cn("transition-transform", open && "rotate-180")}
    >
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navLinkCls =
  "text-[11px] font-medium uppercase tracking-[0.1em] text-white/55 transition-colors hover:text-white";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [propsOpen, setPropsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dropdown "Propiedades": cerrar al hacer click afuera o con Esc.
  useEffect(() => {
    if (!propsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPropsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPropsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [propsOpen]);

  return (
    <div className="fixed left-0 right-0 top-5 z-50">
      <Container>
        {/* Píldora flotante — mismo ancho que el contenido de la página */}
        <div
          className={cn(
            "w-full rounded-full border text-white transition-all duration-500",
            scrolled
              ? "border-white/15 bg-azul/90 backdrop-blur-md"
              : "border-white/12 bg-azul/25 backdrop-blur-md",
          )}
        >
          <div className="flex h-14 items-center justify-between gap-4 px-6">
            {/* Wordmark */}
            <Link
              href="/"
              onClick={close}
              className="text-lg font-medium tracking-tight text-white"
            >
              aure<span className="text-dorado">.</span>
              <span className="sr-only"> — {siteConfig.submarca}</span>
            </Link>

            {/* Nav — desktop */}
            <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
              {/* Dropdown Propiedades */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={propsOpen}
                  onClick={() => setPropsOpen((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors",
                    propsOpen ? "text-white" : "text-white/55 hover:text-white",
                  )}
                >
                  Propiedades
                  <Chevron open={propsOpen} />
                </button>
                {propsOpen ? (
                  <div className="absolute left-0 top-full z-50 mt-3 w-56 rounded-2xl border border-white/12 bg-azul/95 p-2 backdrop-blur-md">
                    {propiedadesMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setPropsOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={navLinkCls}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA — desktop: texto en blanco + flecha dorada, con divisor. */}
            <div className="hidden items-center gap-5 md:flex">
              <span aria-hidden="true" className="h-5 w-px bg-white/20" />
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-80"
              >
                {primaryCta.label}
                <svg
                  viewBox="0 0 20 12"
                  width="18"
                  height="11"
                  fill="none"
                  aria-hidden="true"
                  className="text-dorado transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    d="M1 6h17M13 1l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Hamburger — mobile */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center text-white md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        {/* Menú mobile — panel separado debajo de la píldora */}
        {open ? (
          <div
            id="mobile-menu"
            className="mt-2 rounded-2xl border border-white/12 bg-azul/95 px-5 py-4 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col" aria-label="Principal">
              <p className="pb-1 pt-1 text-[10px] uppercase tracking-eyebrow text-dorado">
                Propiedades
              </p>
              {propiedadesMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="py-2 pl-3 text-sm font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <div className="my-3 h-px bg-white/10" />

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="py-2.5 text-sm font-medium uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button href={primaryCta.href} onClick={close} className="mt-4 w-full">
              {primaryCta.label}
            </Button>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
