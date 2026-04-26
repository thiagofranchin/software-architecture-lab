import type { Metadata } from "next";

import { ConceptsFilter } from "@/components/content/concepts-filter";
import { PageContainer } from "@/components/layout/page-container";
import { getAllConceitos } from "@/lib/content/loader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Conceitos de Arquitetura de Software",
  description:
    "Catálogo de conceitos de arquitetura de software com explicações didáticas, comparativos de código, diagramas e exercícios. Separação de responsabilidades, acoplamento, repository pattern, dependency injection, design patterns e muito mais.",
  path: "/conceitos",
  keywords: [
    "conceitos arquitetura software",
    "separação de responsabilidades",
    "acoplamento coesão",
    "repository pattern",
    "dependency injection",
    "strategy observer factory adapter",
    "code smells refatoração",
  ],
});

export default async function ConceitosPage() {
  const conceitos = await getAllConceitos();

  return (
    <PageContainer className="py-16">
      <header className="mb-10 max-w-3xl">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary/80">
          [ Base de Dados Estelar ]
        </p>
        <h1 className="mt-2 font-serif text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Conceitos
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          Cada conceito é uma entrada independente da base de dados — com
          resumo, problema que resolve, exemplos comparativos e quando (não)
          aplicar.
        </p>
      </header>

      <ConceptsFilter conceitos={conceitos} />
    </PageContainer>
  );
}
