"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type ArchKey = "mvc" | "clean" | "hexagonal" | "layered";

type ArchData = {
  name: string;
  descricao: string;
  camadas: string[];
  pontosForts: string[];
  limitacoes: string[];
  melhorPara: string;
};

const ARCHITECTURES: Record<ArchKey, ArchData> = {
  mvc: {
    name: "MVC",
    descricao:
      "Model-View-Controller separa a aplicação em três papéis: dados (Model), interface (View) e orquestração (Controller).",
    camadas: ["View", "Controller", "Model"],
    pontosForts: [
      "Simples de entender e implementar",
      "Amplamente suportado por frameworks web",
      "Boa separação de interface e lógica",
    ],
    limitacoes: [
      "Controllers tendem a crescer com lógica de negócio",
      "Model pode se tornar um God Object",
      "Difícil testar sem framework",
    ],
    melhorPara: "Aplicações web CRUD de complexidade baixa a média.",
  },
  clean: {
    name: "Clean Architecture",
    descricao:
      "Proposta por Robert Martin, organiza o código em círculos concêntricos onde dependências apontam sempre para dentro (regras de negócio).",
    camadas: ["Entities", "Use Cases", "Interface Adapters", "Frameworks & Drivers"],
    pontosForts: [
      "Domínio completamente isolado de infraestrutura",
      "Testabilidade máxima — lógica sem dependências externas",
      "Fácil de trocar banco de dados, framework ou UI",
    ],
    limitacoes: [
      "Overhead de estrutura em projetos pequenos",
      "Curva de aprendizado alta",
      "Muitas interfaces e abstrações",
    ],
    melhorPara: "Sistemas de médio/grande porte com regras de negócio complexas.",
  },
  hexagonal: {
    name: "Hexagonal (Ports & Adapters)",
    descricao:
      "Criada por Alistair Cockburn, isola o núcleo da aplicação de qualquer tecnologia externa através de ports (interfaces) e adapters (implementações).",
    camadas: ["Core (Domínio)", "Ports (interfaces)", "Adapters (implementações)"],
    pontosForts: [
      "Núcleo completamente agnóstico à tecnologia",
      "Fácil de testar com adapters falsos",
      "Permite múltiplas formas de acionar o sistema",
    ],
    limitacoes: [
      "Mais abstrações que MVC",
      "Pode ser excessivo para CRUDs simples",
      "Requer disciplina para não vazar infraestrutura",
    ],
    melhorPara: "Sistemas com múltiplas formas de entrada (API, CLI, eventos).",
  },
  layered: {
    name: "Layered (N-Tier)",
    descricao:
      "Divide a aplicação em camadas horizontais (Presentation, Business Logic, Data Access) com dependências sempre de cima para baixo.",
    camadas: ["Presentation Layer", "Business Logic Layer", "Data Access Layer", "Database"],
    pontosForts: [
      "Estrutura intuitiva e familiar",
      "Boa separação de responsabilidades por nível",
      "Fácil de manter equipes separadas por camada",
    ],
    limitacoes: [
      "Camada de negócio pode ficar acoplada ao banco",
      "Tendência a se tornar um monólito ball of mud",
      "Difícil escalar camadas independentemente",
    ],
    melhorPara: "Aplicações enterprise tradicionais com equipes especializadas por camada.",
  },
};

const ARCH_OPTIONS: { key: ArchKey; label: string }[] = [
  { key: "mvc", label: "MVC" },
  { key: "clean", label: "Clean" },
  { key: "hexagonal", label: "Hexagonal" },
  { key: "layered", label: "Layered" },
];

type ArchComparatorProps = {
  defaultA?: ArchKey;
  defaultB?: ArchKey;
};

export function ArchComparator({
  defaultA = "mvc",
  defaultB = "clean",
}: ArchComparatorProps) {
  const [archA, setArchA] = useState<ArchKey>(defaultA);
  const [archB, setArchB] = useState<ArchKey>(defaultB);

  const dataA = ARCHITECTURES[archA];
  const dataB = ARCHITECTURES[archB];

  return (
    <div className="my-6 rounded-xl border border-border/60 bg-card overflow-hidden">
      {/* Seletores */}
      <div className="grid grid-cols-2 gap-px bg-border/60">
        <div className="bg-card p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Arquitetura A
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ARCH_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setArchA(key)}
                disabled={key === archB}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs font-medium transition",
                  archA === key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 text-muted-foreground hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-card p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Arquitetura B
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ARCH_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setArchB(key)}
                disabled={key === archA}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs font-medium transition",
                  archB === key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 text-muted-foreground hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Nomes */}
      <div className="grid grid-cols-2 gap-px bg-border/60">
        <div className="bg-muted/40 px-4 py-3">
          <p className="font-serif text-lg font-bold text-foreground">{dataA.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{dataA.descricao}</p>
        </div>
        <div className="bg-muted/40 px-4 py-3">
          <p className="font-serif text-lg font-bold text-foreground">{dataB.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{dataB.descricao}</p>
        </div>
      </div>

      {/* Camadas */}
      <CompareSection label="Camadas">
        <CompareColumn items={dataA.camadas} />
        <CompareColumn items={dataB.camadas} />
      </CompareSection>

      {/* Pontos fortes */}
      <CompareSection label="Pontos fortes">
        <CompareColumn items={dataA.pontosForts} icon="✓" color="text-green-600 dark:text-green-400" />
        <CompareColumn items={dataB.pontosForts} icon="✓" color="text-green-600 dark:text-green-400" />
      </CompareSection>

      {/* Limitações */}
      <CompareSection label="Limitações">
        <CompareColumn items={dataA.limitacoes} icon="✗" color="text-destructive" />
        <CompareColumn items={dataB.limitacoes} icon="✗" color="text-destructive" />
      </CompareSection>

      {/* Melhor para */}
      <div className="grid grid-cols-2 gap-px bg-border/60">
        <div className="bg-card px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-muted-foreground">Melhor para</p>
          <p className="text-xs leading-relaxed text-foreground/90">{dataA.melhorPara}</p>
        </div>
        <div className="bg-card px-4 py-3">
          <p className="mb-1 text-xs font-semibold text-muted-foreground">Melhor para</p>
          <p className="text-xs leading-relaxed text-foreground/90">{dataB.melhorPara}</p>
        </div>
      </div>
    </div>
  );
}

function CompareSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="border-t border-b border-border/60 bg-muted/30 px-4 py-1.5">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border/60">{children}</div>
    </div>
  );
}

function CompareColumn({
  items,
  icon = "•",
  color = "text-muted-foreground",
}: {
  items: string[];
  icon?: string;
  color?: string;
}) {
  return (
    <ul className="bg-card space-y-1 px-4 py-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed text-foreground/85">
          <span className={cn("mt-px shrink-0", color)}>{icon}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
