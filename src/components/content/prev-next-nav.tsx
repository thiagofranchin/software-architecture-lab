import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { ContentItem } from "@/types/content";

type PrevNextNavProps = {
  prev: ContentItem | null;
  next: ContentItem | null;
  trilhaSlug: string;
  trilhaTitle: string;
};

export function PrevNextNav({
  prev,
  next,
  trilhaSlug,
  trilhaTitle,
}: PrevNextNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className="mt-12 border-t border-border/60 pt-8"
      aria-label="Navegação entre aulas"
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Trilha:{" "}
        <Link
          href={`/trilhas/${trilhaSlug}`}
          className="text-primary underline-offset-4 hover:underline"
        >
          {trilhaTitle}
        </Link>
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/conceitos/${prev.slug}`}
            className="group flex flex-col gap-1 rounded-xl border border-border/60 bg-card p-4 transition hover:border-primary/40 hover:bg-card/80"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5 transition group-hover:-translate-x-0.5" />
              Aula anterior
            </span>
            <span className="font-medium text-foreground leading-snug">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/conceitos/${next.slug}`}
            className="group flex flex-col items-end gap-1 rounded-xl border border-border/60 bg-card p-4 text-right transition hover:border-primary/40 hover:bg-card/80"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              Próxima aula
              <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
            </span>
            <span className="font-medium text-foreground leading-snug">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
