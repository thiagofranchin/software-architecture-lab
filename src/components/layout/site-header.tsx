"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LcarsBar } from "@/components/cosmic/lcars-bar";
import { Stardate } from "@/components/cosmic/stardate";
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
      <PageContainer className="flex h-16 items-center justify-between gap-6">
        {/* Logo — registro da nave */}
        <Link
          aria-label="Página inicial do Software Architecture Lab"
          className="group flex items-center gap-3 whitespace-nowrap"
          href="/"
          onClick={closeMobile}
        >
          {/* Cotovelo LCARS */}
          <span
            aria-hidden="true"
            className="hidden h-9 w-3 rounded-l-full bg-primary transition-shadow group-hover:shadow-[0_0_14px_var(--color-primary)] sm:block"
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl font-bold uppercase tracking-[0.08em]">
              <span className="text-primary transition-[text-shadow] group-hover:[text-shadow:0_0_12px_var(--color-primary)]">
                Software
              </span>{" "}
              <span className="text-foreground">Architecture</span>{" "}
              <span className="text-accent transition-[text-shadow] group-hover:[text-shadow:0_0_12px_var(--color-accent)]">
                Lab
              </span>
            </span>
            <span className="mt-1 flex items-center gap-2">
              <span className="lcars-readout text-primary/60">NCC-2266</span>
              <Stardate className="hidden sm:inline" />
            </span>
          </span>
        </Link>

        {/* Nav desktop — botões-pílula do console */}
        <nav
          aria-label="Navegação principal"
          className="hidden flex-1 items-center justify-center gap-1 md:flex"
        >
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-1.5 font-serif text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-150",
                  active
                    ? "bg-primary text-primary-foreground shadow-[0_0_16px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
                )}
              >
                {item.label}
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

      {/* Barra segmentada LCARS na base do console */}
      <PageContainer>
        <LcarsBar heightClass="h-[4px]" className="pb-1.5" />
      </PageContainer>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-border/50 bg-background/95 backdrop-blur-md dark:border-white/5 md:hidden"
        >
          <PageContainer className="flex flex-col gap-1 py-4">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={cn(
                    "rounded-full px-4 py-2 font-serif text-base font-semibold uppercase tracking-[0.08em] transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
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
