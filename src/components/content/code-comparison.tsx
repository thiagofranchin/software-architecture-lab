"use client";

import { Check, Copy, CopyCheck, Maximize2, Minimize2, X } from "lucide-react";
import { useRef, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CompareGridProps = {
  children: ReactNode;
  className?: string;
};

export function CompareGrid({ children, className }: CompareGridProps) {
  return (
    <div className={cn("my-6 grid gap-4 lg:grid-cols-2", className)}>
      {children}
    </div>
  );
}

type CodeBadProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function CodeBad({
  title = "Antipattern",
  children,
  className,
}: CodeBadProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  async function handleCopy() {
    const code = contentRef.current?.querySelector("code")?.textContent ?? "";
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-category-erro/40 bg-category-erro/5 transition-all",
        expanded && "col-span-full",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-category-erro/30 bg-category-erro/15 px-4 py-2">
        <X aria-hidden="true" className="size-4 shrink-0 text-category-erro" />
        <span className="truncate text-sm font-semibold text-category-erro">
          {title}
        </span>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button
            aria-label={copied ? "Copiado!" : "Copiar código"}
            className="rounded p-1 text-category-erro/60 transition-colors hover:bg-category-erro/20 hover:text-category-erro"
            onClick={handleCopy}
            title={copied ? "Copiado!" : "Copiar código"}
            type="button"
          >
            {copied ? (
              <CopyCheck aria-hidden="true" className="size-3.5" />
            ) : (
              <Copy aria-hidden="true" className="size-3.5" />
            )}
          </button>
          <button
            aria-label={expanded ? "Reduzir bloco" : "Expandir bloco"}
            className="rounded p-1 text-category-erro/60 transition-colors hover:bg-category-erro/20 hover:text-category-erro"
            onClick={() => setExpanded((v) => !v)}
            title={expanded ? "Reduzir" : "Expandir"}
            type="button"
          >
            {expanded ? (
              <Minimize2 aria-hidden="true" className="size-3.5" />
            ) : (
              <Maximize2 aria-hidden="true" className="size-3.5" />
            )}
          </button>
        </div>
      </div>
      <div
        ref={contentRef}
        className="px-4 py-3 text-sm [&_pre]:my-0 [&_pre]:border-0 [&_pre]:bg-transparent [&_pre]:p-0 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
      >
        {children}
      </div>
    </div>
  );
}

type CodeGoodProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function CodeGood({
  title = "Recomendado",
  children,
  className,
}: CodeGoodProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  async function handleCopy() {
    const code = contentRef.current?.querySelector("code")?.textContent ?? "";
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-category-pratica/40 bg-category-pratica/5 transition-all",
        expanded && "col-span-full",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-category-pratica/30 bg-category-pratica/15 px-4 py-2">
        <Check
          aria-hidden="true"
          className="size-4 shrink-0 text-category-pratica"
        />
        <span className="truncate text-sm font-semibold text-category-pratica">
          {title}
        </span>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button
            aria-label={copied ? "Copiado!" : "Copiar código"}
            className="rounded p-1 text-category-pratica/60 transition-colors hover:bg-category-pratica/20 hover:text-category-pratica"
            onClick={handleCopy}
            title={copied ? "Copiado!" : "Copiar código"}
            type="button"
          >
            {copied ? (
              <CopyCheck aria-hidden="true" className="size-3.5" />
            ) : (
              <Copy aria-hidden="true" className="size-3.5" />
            )}
          </button>
          <button
            aria-label={expanded ? "Reduzir bloco" : "Expandir bloco"}
            className="rounded p-1 text-category-pratica/60 transition-colors hover:bg-category-pratica/20 hover:text-category-pratica"
            onClick={() => setExpanded((v) => !v)}
            title={expanded ? "Reduzir" : "Expandir"}
            type="button"
          >
            {expanded ? (
              <Minimize2 aria-hidden="true" className="size-3.5" />
            ) : (
              <Maximize2 aria-hidden="true" className="size-3.5" />
            )}
          </button>
        </div>
      </div>
      <div
        ref={contentRef}
        className="px-4 py-3 text-sm [&_pre]:my-0 [&_pre]:border-0 [&_pre]:bg-transparent [&_pre]:p-0 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
      >
        {children}
      </div>
    </div>
  );
}

/** @deprecated Use CompareGrid + CodeBad + CodeGood separately */
export function CodeComparison({
  badTitle,
  goodTitle,
  bad,
  good,
  className,
}: {
  badTitle?: string;
  goodTitle?: string;
  bad?: ReactNode;
  good?: ReactNode;
  className?: string;
}) {
  return (
    <CompareGrid className={className}>
      <CodeBad title={badTitle}>{bad}</CodeBad>
      <CodeGood title={goodTitle}>{good}</CodeGood>
    </CompareGrid>
  );
}
