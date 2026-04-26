import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { TrilhaCard } from "@/components/content/trilha-card";
import { getAllTrilhas } from "@/lib/content/loader";

export const metadata: Metadata = {
  title: "Trilhas",
  description:
    "Trilhas de aprendizado em arquitetura de software, organizadas por nível e propósito.",
};

export default async function TrilhasPage() {
  const trilhas = await getAllTrilhas();

  return (
    <PageContainer className="py-16">
      <header className="mb-12 max-w-3xl">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          Aprendizado guiado
        </p>
        <h1 className="mt-2 font-serif text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Trilhas
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          Cada trilha agrupa aulas, conceitos e exercícios em uma sequência
          intencional. Escolha pelo seu nível atual ou pelo tema que mais
          combina com o seu próximo desafio.
        </p>
      </header>

      {trilhas.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma trilha publicada ainda. Volte em breve.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {trilhas.map((trilha) => (
            <TrilhaCard
              key={trilha.slug}
              title={trilha.title}
              description={trilha.description}
              slug={trilha.slug}
              category={trilha.category}
              level={trilha.level}
              duration={trilha.duration}
              tags={trilha.tags}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
