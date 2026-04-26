import type { Metadata } from "next";

import { TrilhasFilter } from "@/components/content/trilhas-filter";
import { PageContainer } from "@/components/layout/page-container";
import { getAllTrilhas } from "@/lib/content/loader";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Trilhas de Arquitetura de Software",
  description:
    "Trilhas de aprendizado em arquitetura de software organizadas por nível e tema — Fundamentos, Frontend, Backend, Design Patterns e Refatoração. Aprenda de forma progressiva com exemplos práticos em React, Next.js e Node.js.",
  path: "/trilhas",
  keywords: [
    "trilhas arquitetura software",
    "curso design patterns",
    "aprender clean architecture",
    "trilha frontend React",
    "trilha backend Node.js",
    "trilha refatoração TypeScript",
  ],
});

export default async function TrilhasPage() {
  const trilhas = await getAllTrilhas();

  return (
    <PageContainer className="py-16">
      <header className="mb-10 max-w-3xl">
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
        <TrilhasFilter trilhas={trilhas} />
      )}
    </PageContainer>
  );
}
