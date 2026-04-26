import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { ArchComparator } from "@/components/content/arch-comparator";
import { Callout } from "@/components/content/callout";
import { DecisionCard } from "@/components/content/decision-card";
import { DepVisualizer } from "@/components/content/dep-visualizer";
import { Diagram } from "@/components/content/diagram";
import { ProcessStep, ProcessSteps } from "@/components/content/process-steps";
import { TradeoffTable } from "@/components/content/tradeoff-table";
import { CategoryBadge } from "@/components/content/category-badge";
import {
  CodeBad,
  CodeComparison,
  CodeGood,
  CompareGrid,
} from "@/components/content/code-comparison";
import { ConceptCard } from "@/components/content/concept-card";
import { LayerSimulator } from "@/components/content/layer-simulator";
import { Quiz } from "@/components/content/quiz";
import { TrilhaCard } from "@/components/content/trilha-card";
import { BlackHoleDiagram } from "@/components/cosmic/black-hole-diagram";
import { CometFlow } from "@/components/cosmic/comet-flow";
import { OrbitDiagram } from "@/components/cosmic/orbit-diagram";
import { cn } from "@/lib/utils";

type AnchorProps = ComponentPropsWithoutRef<"a">;

function MdxAnchor({ href = "", className, children, ...props }: AnchorProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const linkClass = cn(
    "font-medium text-primary underline decoration-primary/30 underline-offset-4 transition hover:decoration-primary",
    className,
  );

  if (isInternal) {
    return (
      <Link href={href} className={linkClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={linkClass}
      href={href}
      rel="noreferrer noopener"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="mt-12 mb-6 font-serif text-4xl font-black tracking-tight text-foreground first:mt-0 sm:text-5xl"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 mb-4 scroll-mt-24 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-8 mb-3 scroll-mt-24 font-serif text-xl font-bold tracking-tight text-foreground"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="mt-6 mb-2 scroll-mt-24 text-lg font-semibold text-foreground"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-5 text-base leading-7 text-foreground/90" {...props} />
  ),
  a: MdxAnchor,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-5 list-disc space-y-2 pl-6 text-foreground/90 marker:text-primary/60"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-5 list-decimal space-y-2 pl-6 text-foreground/90 marker:text-primary/60"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-4 border-primary/40 bg-secondary/40 px-5 py-3 text-foreground italic"
      {...props}
    />
  ),
  code: ({
    "data-language": dataLanguage,
    className,
    ...props
  }: ComponentPropsWithoutRef<"code"> & { "data-language"?: string }) => {
    if (dataLanguage) {
      return <code className={className} data-language={dataLanguage} {...props} />;
    }
    return (
      <code
        className="rounded-md border border-border/50 bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        {...props}
      />
    );
  },
  pre: ({
    "data-language": dataLanguage,
    ...props
  }: ComponentPropsWithoutRef<"pre"> & { "data-language"?: string }) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-border/60 bg-muted/60 p-4 font-mono text-sm leading-relaxed"
      data-language={dataLanguage}
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-10 border-border/60" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="min-w-full border-collapse text-sm text-foreground"
        {...props}
      />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-border/70 bg-muted/60 px-3 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-border/40 px-3 py-2 align-top" {...props} />
  ),
  ArchComparator,
  BlackHoleDiagram,
  Callout,
  CategoryBadge,
  CometFlow,
  DecisionCard,
  DepVisualizer,
  Diagram,
  OrbitDiagram,
  ProcessStep,
  ProcessSteps,
  TradeoffTable,
  CodeBad,
  CodeGood,
  CodeComparison,
  CompareGrid,
  ConceptCard,
  LayerSimulator,
  Quiz,
  TrilhaCard,
};
