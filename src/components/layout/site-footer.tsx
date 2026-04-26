import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

const footerNav = {
  Aprender: [
    { href: "/trilhas", label: "Trilhas" },
    { href: "/conceitos", label: "Conceitos" },
    { href: "/glossario", label: "Glossário" },
  ],
  Projeto: [
    { href: "/sobre", label: "Sobre" },
    { href: "/roadmap", label: "Roadmap" },
  ],
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/30">
      <PageContainer className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <Link
              className="font-serif text-base font-black tracking-tight"
              href="/"
            >
              <span className="text-primary">Software</span>{" "}
              <span className="text-foreground">Architecture</span>{" "}
              <span className="text-accent">Lab</span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Um laboratório visual e prático para aprender arquitetura de
              software em projetos reais.
            </p>
          </div>

          {Object.entries(footerNav).map(([heading, items]) => (
            <div key={heading} className="space-y-3">
              <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                {heading}
              </h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Software Architecture Lab. Todos os direitos reservados.</p>
          <p className="font-mono">
            Construído com ❤️ por Thiago Franchin
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
