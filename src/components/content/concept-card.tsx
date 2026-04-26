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
  className?: string;
};

export function ConceptCard({
  title,
  description,
  slug,
  category,
  level,
  duration,
  className,
}: ConceptCardProps) {
  return (
    <Link
      href={`/conceitos/${slug}`}
      className={cn(
        "group relative flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <CategoryBadge category={category} tone="soft" size="sm" />
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-muted-foreground transition group-hover:text-primary"
        />
      </div>
      <h3 className="font-serif text-lg font-bold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
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
    </Link>
  );
}
