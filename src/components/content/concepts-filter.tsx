"use client";

import { useMemo, useState } from "react";

import { CategoryBadge } from "@/components/content/category-badge";
import { ConceptCard } from "@/components/content/concept-card";
import { cn } from "@/lib/utils";
import {
  categories,
  levels,
  type Category,
  type Conceito,
  type Level,
} from "@/types/content";

type ConceptsFilterProps = {
  conceitos: Conceito[];
};

export function ConceptsFilter({ conceitos }: ConceptsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const item of conceitos) {
      for (const tag of item.tags) tags.add(tag);
    }
    return Array.from(tags).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [conceitos]);

  const filtered = useMemo(() => {
    return conceitos.filter((item) => {
      if (activeCategory && item.category !== activeCategory) return false;
      if (activeLevel && item.level !== activeLevel) return false;
      if (activeTag && !item.tags.includes(activeTag)) return false;
      return true;
    });
  }, [activeCategory, activeLevel, activeTag, conceitos]);

  const hasActiveFilter = activeCategory || activeLevel || activeTag;

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

        {/* Filtro por nível */}
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

        {/* Filtro por tag */}
        {allTags.length > 0 && (
          <>
            <div className="h-px bg-border/40 dark:bg-white/5" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground/60 w-20 shrink-0">
                Tags
              </span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setActiveTag((prev) => (prev === tag ? null : tag))
                  }
                  className={cn(
                    "rounded-sm border px-2.5 py-0.5 font-mono text-[0.68rem] tracking-wide transition",
                    activeTag === tag
                      ? "border-primary bg-primary/10 text-primary dark:bg-primary/15"
                      : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                  aria-pressed={activeTag === tag}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Limpar filtros */}
      {hasActiveFilter && (
        <button
          type="button"
          onClick={() => {
            setActiveCategory(null);
            setActiveLevel(null);
            setActiveTag(null);
          }}
          className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground/60 underline underline-offset-4 hover:text-foreground transition"
        >
          ✕ Limpar filtros
        </button>
      )}

      {/* Resultados */}
      {filtered.length === 0 ? (
        <p className="mt-6 font-mono text-sm text-muted-foreground">
          [ Nenhum conceito encontrado para estes filtros ]
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ConceptCard
              key={item.slug}
              title={item.title}
              description={item.description}
              slug={item.slug}
              category={item.category}
              level={item.level}
              duration={item.duration}
              order={item.order}
            />
          ))}
        </div>
      )}
    </div>
  );
}
