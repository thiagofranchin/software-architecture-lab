"use client";

import { useMemo, useState } from "react";

import { CategoryBadge } from "@/components/content/category-badge";
import { TrilhaCard } from "@/components/content/trilha-card";
import { cn } from "@/lib/utils";
import {
  categories,
  levels,
  type Category,
  type Level,
  type Trilha,
} from "@/types/content";

type TrilhasFilterProps = {
  trilhas: Trilha[];
};

export function TrilhasFilter({ trilhas }: TrilhasFilterProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);

  const filtered = useMemo(() => {
    return trilhas.filter((item) => {
      if (activeCategory && item.category !== activeCategory) return false;
      if (activeLevel && item.level !== activeLevel) return false;
      return true;
    });
  }, [activeCategory, activeLevel, trilhas]);

  const hasActiveFilter = activeCategory || activeLevel;

  return (
    <div className="space-y-4">
      {/* Filtro por categoria */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground w-16 shrink-0">
          Categoria
        </span>
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition",
            activeCategory === null
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/70 text-muted-foreground hover:border-primary/50 hover:text-foreground",
          )}
        >
          Todas
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
                : "opacity-80 hover:opacity-100",
            )}
            aria-pressed={activeCategory === category}
          >
            <CategoryBadge category={category} tone="soft" />
          </button>
        ))}
      </div>

      {/* Filtro por nível */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground w-16 shrink-0">
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
              "rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition",
              activeLevel === level
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/70 text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
            aria-pressed={activeLevel === level}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Limpar filtros */}
      {hasActiveFilter && (
        <button
          type="button"
          onClick={() => {
            setActiveCategory(null);
            setActiveLevel(null);
          }}
          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition"
        >
          Limpar filtros
        </button>
      )}

      {/* Resultados */}
      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          Nenhuma trilha encontrada para estes filtros.
        </p>
      ) : (
        <div className="mt-2 grid gap-5 md:grid-cols-2">
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
