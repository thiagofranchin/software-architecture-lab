"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { PageContainer } from "@/components/layout/page-container";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/trilhas", label: "Trilhas" },
  { href: "/conceitos", label: "Conceitos" },
  { href: "/glossario", label: "Glossário" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/sobre", label: "Sobre" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/85 backdrop-blur-md dark:border-white/5 dark:bg-background/90">
      {/* Linha de acento superior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
      />

      <PageContainer className="flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link
          aria-label="Página inicial do Software Architecture Lab"
          className="group font-serif text-lg font-black tracking-tight whitespace-nowrap"
          href="/"
          onClick={closeMobile}
        >
          <span className="text-primary transition-[text-shadow] group-hover:[text-shadow:0_0_12px_var(--color-primary)]">
            Software
          </span>{" "}
          <span className="text-foreground">Architecture</span>{" "}
          <span className="text-accent transition-[text-shadow] group-hover:[text-shadow:0_0_12px_var(--color-accent)]">
            Lab
          </span>
        </Link>

        {/* Nav desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden flex-1 items-center justify-center gap-0.5 md:flex"
        >
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground dark:hover:text-foreground dark:text-shadow-none dark:hover:[text-shadow:0_0_8px_rgba(255,255,255,0.25)]",
                )}
              >
                {item.label}
                {/* Indicador de rota ativa */}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-primary opacity-70"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle variant="compact" />
          <Button
            aria-controls="mobile-nav"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </PageContainer>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-border/50 bg-background/95 backdrop-blur-md dark:border-white/5 md:hidden"
        >
          <PageContainer className="flex flex-col gap-0.5 py-4">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={cn(
                    "rounded-md px-3 py-2 text-base font-medium transition-colors",
                    active
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </PageContainer>
        </div>
      ) : null}
    </header>
  );
}
