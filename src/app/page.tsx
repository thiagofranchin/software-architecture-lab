import {
  ArrowRight,
  BookOpen,
  Code2,
  GitCompareArrows,
  Layers,
  Network,
  PencilRuler,
  Rocket,
  Telescope,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AnimateOnScroll } from "@/components/cosmic/animate-on-scroll";
import { CometDivider } from "@/components/cosmic/comet-divider";
import { CosmicBackground } from "@/components/cosmic/cosmic-background";
import { TrilhaCard } from "@/components/content/trilha-card";
import { PageContainer } from "@/components/layout/page-container";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button-variants";
import { getAllTrilhas } from "@/lib/content/loader";
import {
  buildMetadata,
  schemaOrganization,
  schemaWebSite,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  path: "",
  keywords: [
    "trilhas de arquitetura de software",
    "aprender clean architecture",
    "design patterns exemplos",
    "curso arquitetura software gratuito",
    "arquitetura frontend React",
    "arquitetura backend Node.js",
  ],
});

const sectors = [
  {
    id: "SETOR-01",
    title: "Arquitetura de Software",
    description: "Camadas, separação, decisões e trade-offs.",
    icon: Layers,
    tone: "fundamentos",
    glow: "hover:shadow-[0_0_28px_rgba(74,127,212,0.25)] dark:hover:shadow-[0_0_28px_rgba(74,127,212,0.45)]",
    border: "hover:border-[rgba(74,127,212,0.40)]",
  },
  {
    id: "SETOR-02",
    title: "Arquitetura Frontend",
    description: "Componentes, hooks, services e organização por feature.",
    icon: Code2,
    tone: "frontend",
    glow: "hover:shadow-[0_0_28px_rgba(0,184,217,0.25)] dark:hover:shadow-[0_0_28px_rgba(0,184,217,0.45)]",
    border: "hover:border-[rgba(0,184,217,0.40)]",
  },
  {
    id: "SETOR-03",
    title: "Arquitetura Backend",
    description: "Controllers, use cases, repositories e domínio.",
    icon: Network,
    tone: "backend",
    glow: "hover:shadow-[0_0_28px_rgba(62,207,142,0.25)] dark:hover:shadow-[0_0_28px_rgba(62,207,142,0.45)]",
    border: "hover:border-[rgba(62,207,142,0.40)]",
  },
  {
    id: "SETOR-04",
    title: "Design Patterns",
    description: "Padrões clássicos e quando (não) usá-los.",
    icon: PencilRuler,
    tone: "patterns",
    glow: "hover:shadow-[0_0_28px_rgba(155,111,255,0.25)] dark:hover:shadow-[0_0_28px_rgba(155,111,255,0.45)]",
    border: "hover:border-[rgba(155,111,255,0.40)]",
  },
  {
    id: "SETOR-05",
    title: "Refatoração",
    description: "Pequenos passos seguros em código existente.",
    icon: GitCompareArrows,
    tone: "alerta",
    glow: "hover:shadow-[0_0_28px_rgba(224,112,64,0.20)] dark:hover:shadow-[0_0_28px_rgba(224,112,64,0.35)]",
    border: "hover:border-primary/40",
  },
  {
    id: "SETOR-06",
    title: "Boas Práticas",
    description: "Testes, nomes, fronteiras e consistência.",
    icon: BookOpen,
    tone: "pratica",
    glow: "hover:shadow-[0_0_28px_rgba(224,112,64,0.20)] dark:hover:shadow-[0_0_28px_rgba(224,112,64,0.35)]",
    border: "hover:border-primary/40",
  },
] as const;

const explorationMethods = [
  {
    icon: Telescope,
    title: "Diagramas",
    description:
      "Representações visuais de camadas, dependências e fluxos — conceitos abstratos ganham forma concreta.",
  },
  {
    icon: Code2,
    title: "Comparativos de código",
    description:
      "Antipattern ao lado da abordagem recomendada, com explicação precisa do porquê cada decisão importa.",
  },
  {
    icon: FlaskConical,
    title: "Estudos de caso",
    description:
      "Cenários reais decompostos em decisões arquiteturais — veja o raciocínio por trás de cada escolha.",
  },
  {
    icon: ShieldCheck,
    title: "Exercícios práticos",
    description:
      "Quizzes e simuladores que testam onde cada responsabilidade pertence no sistema.",
  },
];

const toneToClass: Record<string, string> = {
  fundamentos: "bg-category-fundamentos/15 text-category-fundamentos",
  frontend: "bg-category-frontend/20 text-foreground dark:text-category-frontend",
  backend: "bg-category-backend/15 text-category-backend",
  patterns: "bg-category-patterns/25 text-foreground dark:text-category-patterns",
  alerta: "bg-category-alerta/20 text-foreground",
  pratica: "bg-category-pratica/15 text-category-pratica",
};

export default async function Home() {
  const trilhas = await getAllTrilhas();
  const featured = trilhas.slice(0, 4);

  return (
    <>
      <JsonLd schema={[schemaWebSite(), schemaOrganization()]} />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <CosmicBackground starCount={100} nebulaVariant="violet" />
        {/* Linha separadora superior — horizonte de eventos */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
        />

        <PageContainer className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border/50 bg-card/80 px-8 py-16 text-center shadow-2xl backdrop-blur-md sm:px-14 sm:py-20 dark:border-white/5 dark:bg-card/70">
            {/* Badge de missão */}
            <span className="mb-8 inline-flex items-center gap-2 rounded-sm border border-primary/25 bg-primary/8 px-4 py-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary/80">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Laboratório · 5 Trilhas · 15 Conceitos · 0 Teoria Vazia
            </span>

            {/* Título com gradiente cósmico */}
            <h1 className="font-serif text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient-cosmic">
                Explore o universo
              </span>
              <br />
              <span className="text-foreground">
                da arquitetura de software
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Aprenda de forma <strong className="text-foreground font-semibold">visual</strong>,{" "}
              <strong className="text-foreground font-semibold">progressiva</strong> e{" "}
              <strong className="text-foreground font-semibold">aplicável</strong> — do
              frontend ao backend, com diagramas, comparativos e exercícios reais.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/trilhas"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "gap-2 px-6")}
              >
                <Rocket className="size-4" aria-hidden />
                Iniciar exploração
              </Link>
              <Link
                href="/conceitos"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-6")}
              >
                Ver conceitos
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            {/* Anel decorativo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 top-1/3 hidden opacity-[0.07] dark:opacity-[0.12] lg:block"
            >
              <svg
                width="220"
                height="220"
                viewBox="0 0 220 220"
                fill="none"
                className="cosmic-orbit text-primary"
                style={{ "--orbit-duration": "28s" } as React.CSSProperties}
              >
                <circle
                  cx="110"
                  cy="110"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />
                <circle cx="110" cy="10" r="6" fill="currentColor" />
              </svg>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-12 bottom-1/4 hidden opacity-[0.05] dark:opacity-[0.10] lg:block"
            >
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                fill="none"
                className="cosmic-orbit text-primary"
                style={{ "--orbit-duration": "40s" } as React.CSSProperties}
              >
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                />
                <circle cx="70" cy="8" r="4" fill="currentColor" />
              </svg>
            </div>
          </div>
        </PageContainer>

        {/* Horizonte de eventos — separador para próxima seção */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border/60 to-transparent"
        />
      </section>

      {/* ── Setores da Galáxia ──────────────────────────────── */}
      <section className="py-20">
        <PageContainer>
          <AnimateOnScroll>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary/70">
                [ Mapa de Bordo ]
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Setores que você vai explorar
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Trilhas e conceitos cobrem desde fundamentos até decisões
                arquiteturais aplicadas em projetos modernos.
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, i) => (
              <AnimateOnScroll key={sector.title} delay={i * 60}>
                <article
                  className={cn(
                    "group flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5",
                    sector.glow,
                    sector.border,
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`flex size-10 items-center justify-center rounded-xl ${toneToClass[sector.tone]}`}
                    >
                      <sector.icon aria-hidden="true" className="size-5" />
                    </div>
                    <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground/60 pt-1">
                      {sector.id}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold tracking-tight text-foreground">
                    {sector.title}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {sector.description}
                  </p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </PageContainer>
      </section>

      <CometDivider duration={5} delay={1} />

      {/* ── Como a exploração funciona ───────────────────────── */}
      <section className="relative overflow-hidden bg-muted/30 py-20 dark:bg-muted/10">
        <CosmicBackground starCount={40} nebulaVariant="teal" className="opacity-60" />
        <PageContainer className="relative">
          <AnimateOnScroll>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary/70">
                [ Protocolo de Exploração ]
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Como a exploração funciona
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Conceitos abstratos ficam concretos quando você consegue
                visualizar, comparar e exercitar.
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-5 md:grid-cols-2">
            {explorationMethods.map((item, i) => (
              <AnimateOnScroll key={item.title} delay={i * 80}>
                <article className="flex gap-4 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon aria-hidden="true" className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </PageContainer>
      </section>

      <CometDivider duration={6} delay={0.3} />

      {/* ── Rotas de Exploração (Trilhas) ────────────────────── */}
      <section className="py-20">
        <PageContainer>
          <AnimateOnScroll>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary/70">
                  [ Rotas de Exploração ]
                </p>
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
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Ver todas as rotas
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </AnimateOnScroll>
          {featured.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {featured.map((trilha, i) => (
                <AnimateOnScroll key={trilha.slug} delay={i * 80}>
                  <TrilhaCard
                    title={trilha.title}
                    description={trilha.description}
                    slug={trilha.slug}
                    category={trilha.category}
                    level={trilha.level}
                    duration={trilha.duration}
                    tags={trilha.tags}
                    order={trilha.order}
                  />
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhuma trilha publicada ainda.
            </p>
          )}
        </PageContainer>
      </section>

      {/* ── CTA final ───────────────────────────────────────── */}
      <section className="pb-24">
        <PageContainer size="narrow">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-10 text-center shadow-sm dark:border-white/5">
            <CosmicBackground starCount={30} nebulaVariant="violet" className="opacity-50" />
            <div className="relative">
              <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary/70">
                [ Status da Missão ]
              </p>
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Quer entender a proposta do projeto?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                O Software Architecture Lab é uma plataforma em construção,
                evoluindo em fases. Veja o log de missão e o caminho que estamos
                seguindo.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/sobre" className={buttonVariants({ variant: "default" })}>
                  Sobre o projeto
                </Link>
                <Link href="/roadmap" className={buttonVariants({ variant: "outline" })}>
                  Ver log de missão
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
