import Link from "next/link";

import { CosmicBackground } from "@/components/cosmic/cosmic-background";
import { LcarsBar } from "@/components/cosmic/lcars-bar";
import { Stardate } from "@/components/cosmic/stardate";
import { PageContainer } from "@/components/layout/page-container";

const footerNav = {
  "Rotas de Navegação": [
    { href: "/trilhas", label: "Trilhas" },
    { href: "/conceitos", label: "Conceitos" },
    { href: "/glossario", label: "Glossário" },
  ],
  "Documentos da Missão": [
    { href: "/sobre", label: "Sobre o projeto" },
    { href: "/roadmap", label: "Log de Missão" },
  ],
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/50 bg-background dark:border-white/5">
      {/* Campo estelar sutil no footer */}
      <CosmicBackground starCount={35} nebulaVariant="none" className="opacity-40 dark:opacity-60" />

      <PageContainer className="relative pt-4">
        <LcarsBar heightClass="h-[5px]" />
      </PageContainer>

      <PageContainer className="relative py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Identidade */}
          <div className="space-y-3">
            <Link
              className="group font-serif text-lg font-bold uppercase tracking-[0.08em]"
              href="/"
            >
              <span className="text-primary transition-[text-shadow] group-hover:[text-shadow:0_0_10px_var(--color-primary)]">
                Software
              </span>{" "}
              <span className="text-foreground">Architecture</span>{" "}
              <span className="text-accent">Lab</span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Um laboratório visual e prático para explorar arquitetura de
              software em projetos reais.
            </p>
            <p className="lcars-readout text-muted-foreground/50">
              Explore. Aprenda. Construa.
            </p>
          </div>

          {/* Links de navegação */}
          {Object.entries(footerNav).map(([heading, items]) => (
            <div key={heading} className="space-y-3">
              <h2 className="flex items-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
                <span
                  aria-hidden="true"
                  className="h-3 w-1.5 rounded-full bg-primary/60"
                />
                {heading}
              </h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground dark:hover:[text-shadow:0_0_6px_rgba(255,255,255,0.2)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rodapé inferior */}
        <div className="mt-10 flex flex-col gap-2 border-t border-border/40 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between dark:border-white/5">
          <p className="flex flex-wrap items-center gap-x-2">
            <span>© {year} Software Architecture Lab · NCC-2266</span>
            <Stardate />
          </p>
          <p className="font-mono tracking-wide">
            Construído com ❤️ por Thiago Franchin
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
