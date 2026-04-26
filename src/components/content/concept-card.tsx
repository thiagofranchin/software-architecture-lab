import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";

import { CategoryBadge } from "@/components/content/category-badge";
import { cn } from "@/lib/utils";
import type { Category, Level } from "@/types/content";

type ConceptCardProps = {
  title: string;
  description: string;
  slug: string;
  category: Category;
  level: Level;
  duration?: string;
  order?: number;
  className?: string;
};

const categoryGlow: Record<Category, string> = {
  Fundamentos:
    "hover:shadow-[0_0_24px_rgba(74,127,212,0.15)] dark:hover:shadow-[0_0_24px_rgba(74,127,212,0.35)] hover:border-[rgba(74,127,212,0.30)]",
  Frontend:
    "hover:shadow-[0_0_24px_rgba(0,184,217,0.15)] dark:hover:shadow-[0_0_24px_rgba(0,184,217,0.35)] hover:border-[rgba(0,184,217,0.30)]",
  Backend:
    "hover:shadow-[0_0_24px_rgba(62,207,142,0.15)] dark:hover:shadow-[0_0_24px_rgba(62,207,142,0.35)] hover:border-[rgba(62,207,142,0.30)]",
  Patterns:
    "hover:shadow-[0_0_24px_rgba(155,111,255,0.15)] dark:hover:shadow-[0_0_24px_rgba(155,111,255,0.35)] hover:border-[rgba(155,111,255,0.30)]",
  Prática:
    "hover:shadow-[0_0_24px_rgba(224,112,64,0.15)] dark:hover:shadow-[0_0_24px_rgba(224,112,64,0.35)] hover:border-primary/30",
};

const categoryTopBar: Record<Category, string> = {
  Fundamentos: "from-[rgba(74,127,212,0.55)] via-[rgba(74,127,212,0.15)] to-transparent",
  Frontend: "from-[rgba(0,184,217,0.55)] via-[rgba(0,184,217,0.15)] to-transparent",
  Backend: "from-[rgba(62,207,142,0.55)] via-[rgba(62,207,142,0.15)] to-transparent",
  Patterns: "from-[rgba(155,111,255,0.55)] via-[rgba(155,111,255,0.15)] to-transparent",
  Prática: "from-primary/55 via-accent/15 to-transparent",
};

export function ConceptCard({
  title,
  description,
  slug,
  category,
  level,
  duration,
  order,
  className,
}: ConceptCardProps) {
  return (
    <Link
      href={`/conceitos/${slug}`}
      className={cn(
        "group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5",
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
        <CategoryBadge category={category} tone="soft" size="sm" />
        <div className="flex items-center gap-1.5">
          {order != null && (
            <span className="font-mono text-xs font-semibold text-primary/80">
              ★ {String(order).padStart(2, "0")}
            </span>
          )}
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 text-muted-foreground transition group-hover:text-primary"
          />
        </div>
      </div>

      <h3 className="font-serif text-lg font-bold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
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
    </Link>
  );
}
