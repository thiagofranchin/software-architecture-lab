import { ArrowRight, Clock, Layers } from "lucide-react";
import Link from "next/link";

import { CategoryBadge } from "@/components/content/category-badge";
import { cn } from "@/lib/utils";
import type { Category, Level } from "@/types/content";

type TrilhaCardProps = {
  title: string;
  description: string;
  slug: string;
  category: Category;
  level: Level;
  duration?: string;
  tags?: string[];
  order?: number;
  className?: string;
};

const categoryGlow: Record<Category, string> = {
  Fundamentos:
    "hover:shadow-[0_0_32px_rgba(74,127,212,0.20)] dark:hover:shadow-[0_0_32px_rgba(74,127,212,0.45)] hover:border-[rgba(74,127,212,0.35)]",
  Frontend:
    "hover:shadow-[0_0_32px_rgba(0,184,217,0.20)] dark:hover:shadow-[0_0_32px_rgba(0,184,217,0.45)] hover:border-[rgba(0,184,217,0.35)]",
  Backend:
    "hover:shadow-[0_0_32px_rgba(62,207,142,0.20)] dark:hover:shadow-[0_0_32px_rgba(62,207,142,0.45)] hover:border-[rgba(62,207,142,0.35)]",
  Patterns:
    "hover:shadow-[0_0_32px_rgba(155,111,255,0.20)] dark:hover:shadow-[0_0_32px_rgba(155,111,255,0.45)] hover:border-[rgba(155,111,255,0.35)]",
  Prática:
    "hover:shadow-[0_0_32px_rgba(224,112,64,0.20)] dark:hover:shadow-[0_0_32px_rgba(224,112,64,0.40)] hover:border-primary/35",
};

const categoryTopBar: Record<Category, string> = {
  Fundamentos: "from-[rgba(74,127,212,0.8)] via-primary/50 to-transparent",
  Frontend: "from-[rgba(0,184,217,0.8)] via-[rgba(0,184,217,0.3)] to-transparent",
  Backend: "from-[rgba(62,207,142,0.8)] via-[rgba(62,207,142,0.3)] to-transparent",
  Patterns: "from-[rgba(155,111,255,0.8)] via-[rgba(155,111,255,0.3)] to-transparent",
  Prática: "from-primary/80 via-accent/40 to-transparent",
};

export function TrilhaCard({
  title,
  description,
  slug,
  category,
  level,
  duration,
  tags,
  order,
  className,
}: TrilhaCardProps) {
  return (
    <Link
      href={`/trilhas/${slug}`}
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5",
        categoryGlow[category],
        className,
      )}
    >
      {/* Barra superior colorida por categoria */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-[2px] bg-linear-to-r",
          categoryTopBar[category],
        )}
      />

      <div className="flex items-center justify-between gap-2 pt-1">
        <CategoryBadge category={category} tone="soft" />
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          {order != null && (
            <span className="font-semibold text-primary">
              M-{String(order).padStart(2, "0")}
            </span>
          )}
          <Layers aria-hidden="true" className="size-3.5" />
          <span className="text-[0.7rem] uppercase tracking-wide">Missão</span>
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>

      {tags && tags.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-sm bg-muted px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="rounded-sm border border-border/60 px-1.5 py-0.5 font-mono font-medium uppercase text-[0.65rem] tracking-wide">
            {level}
          </span>
          {duration ? (
            <span className="flex items-center gap-1 font-mono">
              <Clock aria-hidden="true" className="size-3" />
              {duration}
            </span>
          ) : null}
        </div>
        <span className="flex items-center gap-1 font-medium text-primary transition-[gap] group-hover:gap-2">
          Iniciar missão
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
