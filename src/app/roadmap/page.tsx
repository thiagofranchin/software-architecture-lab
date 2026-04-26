import { CheckCircle2, Circle, CircleDashed } from "lucide-react";
import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Roadmap em fases do Software Architecture Lab: do que já foi entregue ao que vem a seguir.",
};

type Status = "done" | "in_progress" | "planned";

type Phase = {
  number: number;
  title: string;
  goal: string;
  items: string[];
  status: Status;
};

const phases: Phase[] = [
  {
    number: 1,
    title: "Fundação Técnica",
    goal: "Criar a base do projeto.",
    items: [
      "Next.js 16 + React 19 + TypeScript",
      "Tailwind CSS v4 com paleta sunset-horizon",
      "Sistema de tema claro/escuro",
      "Layout principal (Header, Footer, navegação)",
      "Configuração MDX com componentes customizados",
      "Deploy automático na Vercel",
    ],
    status: "done",
  },
  {
    number: 2,
    title: "Conteúdo Inicial",
    goal: "Publicar a primeira versão útil.",
    items: [
      "Página inicial",
      "Listagem e detalhe de trilhas",
      "Listagem e detalhe de conceitos",
      "Glossário inicial",
      "Páginas Sobre e Roadmap",
      "Trilha Fundamentos + 2 conceitos publicados",
    ],
    status: "done",
  },
  {
    number: 3,
    title: "Recursos Visuais",
    goal: "Tornar o aprendizado mais claro com diagramas e comparações.",
    items: [
      "Diagramas Mermaid integrados",
      "Componente de comparação de código com syntax highlight",
      "Componentes de trade-off e decisão arquitetural",
      "Navegação entre aulas dentro de uma trilha",
    ],
    status: "planned",
  },
  {
    number: 4,
    title: "Interatividade",
    goal: "Transformar o site em uma experiência prática.",
    items: [
      "Quiz de decisões arquiteturais",
      "Simulador de camadas (arrastar e soltar responsabilidades)",
      "Comparador de arquiteturas (MVC, Clean, Hexagonal, Layered)",
      "Visualizador de dependências",
      "Filtros avançados por nível e tag",
    ],
    status: "planned",
  },
  {
    number: 5,
    title: "Expansão de Conteúdo",
    goal: "Crescer em profundidade e amplitude.",
    items: [
      "Trilha Arquitetura Frontend",
      "Trilha Arquitetura Backend",
      "Trilha Design Patterns",
      "Trilha Refatoração",
      "Estudos de caso completos com React, Next.js e Node.js",
    ],
    status: "planned",
  },
  {
    number: 6,
    title: "Plataforma",
    goal: "Evoluir para uma plataforma completa.",
    items: [
      "Banco de dados e CMS",
      "Autenticação e progresso do usuário",
      "Busca semântica nos conteúdos",
      "Assistente de IA com RAG sobre o próprio site",
      "Sistema de desafios e certificados",
    ],
    status: "planned",
  },
];

const statusMeta: Record<
  Status,
  { label: string; icon: typeof CheckCircle2; tone: string; ring: string }
> = {
  done: {
    label: "Entregue",
    icon: CheckCircle2,
    tone: "text-category-pratica",
    ring: "border-category-pratica/50 bg-category-pratica/10",
  },
  in_progress: {
    label: "Em andamento",
    icon: CircleDashed,
    tone: "text-primary",
    ring: "border-primary/40 bg-primary/10",
  },
  planned: {
    label: "Planejado",
    icon: Circle,
    tone: "text-muted-foreground",
    ring: "border-border/60 bg-muted/30",
  },
};

export default function RoadmapPage() {
  return (
    <PageContainer size="narrow" className="py-16">
      <header className="mb-12">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          Direção
        </p>
        <h1 className="mt-2 font-serif text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Roadmap
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          O Software Architecture Lab evolui em fases. Cada fase tem um
          objetivo claro e entregas concretas.
        </p>
      </header>

      <ol className="space-y-6">
        {phases.map((phase) => {
          const meta = statusMeta[phase.status];
          const Icon = meta.icon;
          return (
            <li
              key={phase.number}
              className={cn(
                "rounded-2xl border p-6 shadow-sm",
                meta.ring,
              )}
            >
              <div className="flex items-start gap-4">
                <Icon
                  aria-hidden="true"
                  className={cn("mt-1 size-6 shrink-0", meta.tone)}
                />
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      Fase {phase.number}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase",
                        meta.tone,
                      )}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                    {phase.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{phase.goal}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
                    {phase.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-primary">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </PageContainer>
  );
}
