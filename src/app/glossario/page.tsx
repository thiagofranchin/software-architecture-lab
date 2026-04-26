import { promises as fs } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { MdxContent } from "@/components/mdx/mdx-content";

export const metadata: Metadata = {
  title: "Glossário",
  description:
    "Glossário de termos chave em arquitetura de software: acoplamento, coesão, use case, repository, DTO, schema e mais.",
};

async function readGlossario() {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "glossario",
    "glossario.md",
  );
  return fs.readFile(filePath, "utf8");
}

export default async function GlossarioPage() {
  const source = await readGlossario();

  return (
    <PageContainer size="narrow" className="py-16">
      <header className="mb-10">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          Referência rápida
        </p>
        <h1 className="mt-2 font-serif text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Glossário
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          Definições curtas dos termos mais usados ao longo do site. Cada
          entrada tem uma âncora própria — copie o link para referenciar em
          discussões.
        </p>
      </header>

      <article>
        <MdxContent source={source} />
      </article>
    </PageContainer>
  );
}
