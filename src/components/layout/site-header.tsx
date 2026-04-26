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
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <PageContainer className="flex h-16 items-center justify-between gap-6">
        <Link
          aria-label="Página inicial do Software Architecture Lab"
          className="font-serif text-lg font-black tracking-tight whitespace-nowrap"
          href="/"
          onClick={closeMobile}
        >
          <span className="text-primary">Software</span>{" "}
          <span className="text-foreground">Architecture</span>{" "}
          <span className="text-accent">Lab</span>
        </Link>

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
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
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

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-border/60 bg-background md:hidden"
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
