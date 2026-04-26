"use client";

import { useMemo, useState } from "react";

import { CategoryBadge } from "@/components/content/category-badge";
import { ConceptCard } from "@/components/content/concept-card";
import { cn } from "@/lib/utils";
import { categories, type Category, type Conceito } from "@/types/content";

type ConceptsFilterProps = {
  conceitos: Conceito[];
};

export function ConceptsFilter({ conceitos }: ConceptsFilterProps) {
  const [active, setActive] = useState<Category | null>(null);

  const filtered = useMemo(() => {
    if (!active) return conceitos;
    return conceitos.filter((item) => item.category === active);
  }, [active, conceitos]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition",
            active === null
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
              setActive((prev) => (prev === category ? null : category))
            }
            className={cn(
              "rounded-full transition",
              active === category
                ? "ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
                : "opacity-80 hover:opacity-100",
            )}
            aria-pressed={active === category}
          >
            <CategoryBadge category={category} tone="soft" />
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhum conceito nesta categoria ainda.
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
