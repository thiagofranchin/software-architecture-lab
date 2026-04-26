import type { Metadata } from "next";

import { ConceptsFilter } from "@/components/content/concepts-filter";
import { PageContainer } from "@/components/layout/page-container";
import { getAllConceitos } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Conceitos",
  description:
    "Conceitos fundamentais de arquitetura de software, com explicações didáticas, exemplos de código e diagramas.",
};

export default async function ConceitosPage() {
  const conceitos = await getAllConceitos();

  return (
    <PageContainer className="py-16">
      <header className="mb-10 max-w-3xl">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          Catálogo
        </p>
        <h1 className="mt-2 font-serif text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Conceitos
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          Cada conceito é uma página independente, com resumo, problema que
          resolve, exemplos comparativos e quando (não) aplicar.
        </p>
      </header>

      <ConceptsFilter conceitos={conceitos} />
    </PageContainer>
  );
}
