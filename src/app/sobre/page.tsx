import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre o Software Architecture Lab",
  description:
    "Conheça o Software Architecture Lab: uma plataforma de aprendizado visual e prático para arquitetura de software. Para desenvolvedores frontend, backend e fullstack que querem evoluir de código para decisões arquiteturais aplicadas em React, Next.js e Node.js.",
  path: "/sobre",
  keywords: [
    "sobre software architecture lab",
    "plataforma aprendizado arquitetura",
    "curso gratuito arquitetura software",
    "desenvolvedores frontend backend",
    "aprender React Next.js arquitetura",
  ],
});

const audiencia = [
  "Desenvolvedores frontend que querem evoluir para uma visão fullstack.",
  "Desenvolvedores júnior e pleno em React, Next.js ou Node.js.",
  "Estudantes de engenharia de software.",
  "Profissionais que querem revisar fundamentos de arquitetura.",
];

const diferenciais = [
  "Explicações didáticas com exemplos comparativos (antipattern × recomendado).",
  "Trilhas progressivas, em vez de posts soltos.",
  "Diagramas e componentes interativos para tornar o abstrato concreto.",
  "Foco em decisões reais — quando aplicar, quando não exagerar.",
];

export default function SobrePage() {
  return (
    <PageContainer size="narrow" className="py-16">
      <header className="mb-10">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          O projeto
        </p>
        <h1 className="mt-2 font-serif text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Sobre o Software Architecture Lab
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          Uma plataforma de aprendizado em arquitetura de software, construída
          como um laboratório visual: onde você não só lê, mas vê, compara e
          experimenta.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          Por que existe
        </h2>
        <p className="text-base leading-7 text-foreground/90">
          Arquitetura de software costuma ser ensinada de forma abstrata,
          desconectada do dia a dia em frameworks modernos. O Software
          Architecture Lab nasceu para mudar isso: explicar conceitos com
          aplicações em <strong>React, Next.js, Node.js, TypeScript</strong> e
          stacks fullstack reais, sem pular as fundações que fazem o resto
          fazer sentido.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          Para quem é
        </h2>
        <ul className="space-y-2 text-base leading-7 text-foreground/90">
          {audiencia.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="text-primary">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          O que diferencia
        </h2>
        <ul className="space-y-2 text-base leading-7 text-foreground/90">
          {diferenciais.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="text-accent">
                ★
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-border/70 bg-muted/40 p-6">
        <h2 className="font-serif text-xl font-bold tracking-tight text-foreground">
          Em construção
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Este site evolui em fases. A versão atual entrega fundação técnica e
          conteúdo inicial. Para ver o que vem a seguir, confira o roadmap.
        </p>
        <div className="mt-4">
          <Link href="/roadmap" className={buttonVariants({ variant: "default" })}>
            Ver roadmap
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
