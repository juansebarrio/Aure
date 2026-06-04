"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { navLinks, primaryCta, siteConfig } from "@/lib/site";
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

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-5 z-50">
      <Container>
      {/* Píldora flotante — mismo ancho que el contenido de la página */}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full border text-white transition-all duration-500",
          scrolled
            ? "border-white/15 bg-azul/90 backdrop-blur-md"
            : "border-white/12 bg-azul/25 backdrop-blur-md",
        )}
      >
        {/* Barra principal */}
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

          {/* Nav links — desktop */}
          <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.1em] text-white/55 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA — desktop (ver imagen): texto en blanco + flecha dorada,
              precedido por un divisor fino. */}
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

        {/* Mobile menu — despliega dentro de la píldora */}
        {open && (
          <div
            id="mobile-menu"
            className="border-t border-white/10 px-6 pb-5 pt-3"
          >
            <nav className="flex flex-col">
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
        )}
      </div>
      </Container>
    </div>
  );
}
