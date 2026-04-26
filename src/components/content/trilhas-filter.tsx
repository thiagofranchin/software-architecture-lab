"use client";

import { useMemo, useState } from "react";

import { CategoryBadge } from "@/components/content/category-badge";
import { TrilhaCard } from "@/components/content/trilha-card";
import { ConstellationMap } from "@/components/cosmic/constellation-map";
import { cn } from "@/lib/utils";
import {
  categories,
  levels,
  type Category,
  type Conceito,
  type Level,
  type Trilha,
} from "@/types/content";

type View = "grade" | "mapa";

type TrilhasFilterProps = {
  trilhas: Trilha[];
  conceitos?: Conceito[];
};

export function TrilhasFilter({ trilhas, conceitos = [] }: TrilhasFilterProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [view, setView] = useState<View>("grade");

  const filtered = useMemo(() => {
    return trilhas.filter((item) => {
      if (activeCategory && item.category !== activeCategory) return false;
      if (activeLevel && item.level !== activeLevel) return false;
      return true;
    });
  }, [activeCategory, activeLevel, trilhas]);

  const hasActiveFilter = activeCategory || activeLevel;

  return (
    <div className="space-y-6">
      {/* Painel de filtros */}
      <div className="rounded-xl border border-border/50 bg-card/60 p-4 backdrop-blur-sm dark:border-white/5 dark:bg-card/40 space-y-4">
        {/* Filtro por categoria */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground/60 w-20 shrink-0">
            Setor
          </span>
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wide transition",
              activeCategory === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/70 text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setActiveCategory((prev) => (prev === category ? null : category))
              }
              className={cn(
                "rounded-full transition",
                activeCategory === category
                  ? "ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
                  : "opacity-75 hover:opacity-100",
              )}
              aria-pressed={activeCategory === category}
            >
              <CategoryBadge
                category={category}
                tone={activeCategory === category ? "glow" : "soft"}
              />
            </button>
          ))}
        </div>

        {/* Divisor */}
        <div className="h-px bg-border/40 dark:bg-white/5" />

        {/* Filtro por nível + Toggle de visualização */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground/60 w-20 shrink-0">
              Nível
            </span>
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() =>
                  setActiveLevel((prev) => (prev === level ? null : level))
                }
                className={cn(
                  "rounded-sm border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wide transition",
                  activeLevel === level
                    ? "border-primary bg-primary/10 text-primary dark:bg-primary/15"
                    : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
                aria-pressed={activeLevel === level}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Toggle grade / mapa */}
          <div
            className="flex rounded-sm border border-border/60 overflow-hidden"
            role="group"
            aria-label="Modo de visualização"
          >
            <button
              type="button"
              onClick={() => setView("grade")}
              aria-pressed={view === "grade"}
              title="Visualização em grade"
              className={cn(
                "px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide transition",
                view === "grade"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              )}
            >
              ☷ Grade
            </button>
            <button
              type="button"
              onClick={() => setView("mapa")}
              aria-pressed={view === "mapa"}
              title="Mapa de Constelações"
              className={cn(
                "border-l border-border/60 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide transition",
                view === "mapa"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              )}
            >
              ✦ Mapa
            </button>
          </div>
        </div>
      </div>

      {/* Limpar filtros */}
      {hasActiveFilter && (
        <button
          type="button"
          onClick={() => {
            setActiveCategory(null);
            setActiveLevel(null);
          }}
          className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground/60 underline underline-offset-4 hover:text-foreground transition"
        >
          ✕ Limpar filtros
        </button>
      )}

      {/* Resultados */}
      {view === "mapa" ? (
        <ConstellationMap
          trilhas={trilhas}
          conceitos={conceitos}
          activeCategory={activeCategory}
        />
      ) : filtered.length === 0 ? (
        <p className="mt-6 font-mono text-sm text-muted-foreground">
          [ Nenhuma trilha encontrada para estes filtros ]
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((trilha) => (
            <TrilhaCard
              key={trilha.slug}
              title={trilha.title}
              description={trilha.description}
              slug={trilha.slug}
              category={trilha.category}
              level={trilha.level}
              duration={trilha.duration}
              tags={trilha.tags}
              order={trilha.order}
            />
          ))}
        </div>
      )}
    </div>
  );
}
