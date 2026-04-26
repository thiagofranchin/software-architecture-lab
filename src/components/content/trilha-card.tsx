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
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-accent to-category-patterns"
      />
      <div className="flex items-center justify-between gap-2 pt-1">
        <CategoryBadge category={category} tone="soft" />
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {order != null && (
            <span className="font-mono font-semibold text-primary">
              {String(order).padStart(2, "0")}
            </span>
          )}
          <Layers aria-hidden="true" className="size-3.5" />
          Trilha
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {tags && tags.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-muted px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-border/60 px-1.5 py-0.5 font-medium">
            {level}
          </span>
          {duration ? (
            <span className="flex items-center gap-1 font-mono">
              <Clock aria-hidden="true" className="size-3" />
              {duration}
            </span>
          ) : null}
        </div>
        <span className="flex items-center gap-1 font-medium text-primary transition group-hover:gap-2">
          Acessar
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
