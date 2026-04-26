import {
  ArrowRight,
  BookOpen,
  Code2,
  GitCompareArrows,
  Layers,
  Network,
  PencilRuler,
} from "lucide-react";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { TrilhaCard } from "@/components/content/trilha-card";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { getAllTrilhas } from "@/lib/content/loader";

const learningTopics = [
  {
    title: "Arquitetura de Software",
    description: "Camadas, separação, decisões e trade-offs.",
    icon: Layers,
    tone: "fundamentos",
  },
  {
    title: "Arquitetura Frontend",
    description: "Componentes, hooks, services e organização por feature.",
    icon: Code2,
    tone: "frontend",
  },
  {
    title: "Arquitetura Backend",
    description: "Controllers, use cases, repositories e domínio.",
    icon: Network,
    tone: "backend",
  },
  {
    title: "Design Patterns",
    description: "Padrões clássicos e quando (não) usá-los.",
    icon: PencilRuler,
    tone: "patterns",
  },
  {
    title: "Refatoração",
    description: "Pequenos passos seguros em código existente.",
    icon: GitCompareArrows,
    tone: "alerta",
  },
  {
    title: "Boas Práticas",
    description: "Testes, nomes, fronteiras e consistência.",
    icon: BookOpen,
    tone: "pratica",
  },
] as const;

const learnVisually = [
  {
    title: "Diagramas",
    description:
      "Representações visuais de camadas, dependências e fluxos para fixar conceitos abstratos.",
  },
  {
    title: "Comparativos de código",
    description:
      "Antipattern ao lado da abordagem recomendada, com explicação do porquê.",
  },
  {
    title: "Estudos de caso",
    description:
      "Cenários reais (e-commerce, propostas, dashboards) decompostos em decisões arquiteturais.",
  },
  {
    title: "Exercícios práticos",
    description:
      "Perguntas curtas que testam onde colocar cada responsabilidade.",
  },
];

const toneToClass: Record<string, string> = {
  fundamentos: "bg-category-fundamentos/15 text-category-fundamentos",
  frontend: "bg-category-frontend/25 text-foreground",
  backend: "bg-category-backend/15 text-category-backend",
  patterns: "bg-category-patterns/30 text-foreground",
  alerta: "bg-category-alerta/25 text-foreground",
  pratica: "bg-category-pratica/15 text-category-pratica",
};

export default async function Home() {
  const trilhas = await getAllTrilhas();
  const featured = trilhas.slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-accent)_0%,transparent_42%),radial-gradient(circle_at_bottom,var(--color-secondary)_0%,transparent_48%)] opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-6 top-10 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
        />
        <PageContainer className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-4xl rounded-4xl border border-border/70 bg-card/85 px-8 py-16 text-center shadow-2xl backdrop-blur-sm sm:px-12 sm:py-20">
            <span className="mb-6 inline-flex rounded-full border border-primary/20 bg-secondary px-4 py-1 text-sm font-medium tracking-wide text-secondary-foreground">
              Laboratório visual e aplicado
            </span>
            <h1 className="font-serif text-5xl leading-tight font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              <span className="text-primary">Software</span>{" "}
              <span className="text-foreground">Architecture</span>{" "}
              <span className="text-accent">Lab</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Aprenda arquitetura de software de forma <strong>visual</strong>,{" "}
              <strong>progressiva</strong> e <strong>aplicável</strong> ao
              mundo real — do frontend ao backend.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/trilhas"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "px-5")}
              >
                Começar pelas trilhas
                <ArrowRight />
              </Link>
              <Link
                href="/conceitos"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-5")}
              >
                Ver conceitos
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-20">
        <PageContainer>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              O que você vai aprender
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Trilhas e conceitos cobrem desde fundamentos até decisões
              arquiteturais aplicadas em projetos modernos.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningTopics.map((topic) => (
              <article
                key={topic.title}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div
                  className={`flex size-10 items-center justify-center rounded-xl ${toneToClass[topic.tone]}`}
                >
                  <topic.icon aria-hidden="true" className="size-5" />
                </div>
                <h3 className="font-serif text-lg font-bold tracking-tight text-foreground">
                  {topic.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {topic.description}
                </p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-muted/40 py-20">
        <PageContainer>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Aprenda visualmente
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Conceitos abstratos ficam concretos quando você consegue
              visualizar, comparar e exercitar.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {learnVisually.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
              >
                <h3 className="font-serif text-xl font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-20">
        <PageContainer>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Trilhas recomendadas
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Comece pelos fundamentos e avance conforme estiver confortável.
                Cada trilha agrupa aulas, conceitos e exercícios em sequência.
              </p>
            </div>
            <Link
              href="/trilhas"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Ver todas <ArrowRight className="size-4" />
            </Link>
          </div>
          {featured.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {featured.map((trilha) => (
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
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhuma trilha publicada ainda.
            </p>
          )}
        </PageContainer>
      </section>

      <section className="pb-24">
        <PageContainer size="narrow">
          <div className="rounded-3xl border border-border/70 bg-linear-to-br from-primary/10 via-card to-accent/10 p-10 text-center shadow-sm">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Quer entender a proposta do projeto?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              O Software Architecture Lab é uma plataforma em construção,
              evoluindo em fases. Veja o caminho que estamos seguindo.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/sobre" className={buttonVariants({ variant: "default" })}>
                Sobre o projeto
              </Link>
              <Link href="/roadmap" className={buttonVariants({ variant: "outline" })}>
                Ver roadmap
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
