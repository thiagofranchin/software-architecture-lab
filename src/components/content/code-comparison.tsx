"use client";

import { Check, Copy, CopyCheck, Maximize2, Minimize2, X } from "lucide-react";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  AutoHeight,
  usePrefersReducedMotion,
} from "@/components/content/auto-height";
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

type CodeComparisonCardProps = {
  accentClassName: string;
  accentIcon: ReactNode;
  actionClassName: string;
  children: ReactNode;
  className?: string;
  expandedShadowClassName: string;
  title: string;
};

const CARD_EXPAND_DURATION_MS = 1500;

function CodeComparisonCard({
  accentClassName,
  accentIcon,
  actionClassName,
  children,
  className,
  expandedShadowClassName,
  title,
}: CodeComparisonCardProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inlineWidth, setInlineWidth] = useState<string>();
  const [isWidthAnimating, setIsWidthAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const widthAnimationFrameRef = useRef<number | null>(null);
  const widthAnimationTimeoutRef = useRef<number | null>(null);
  const previousWidthRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  async function handleCopy() {
    const code = contentRef.current?.querySelector("code")?.textContent ?? "";
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  useEffect(() => {
    return () => {
      if (widthAnimationFrameRef.current !== null) {
        cancelAnimationFrame(widthAnimationFrameRef.current);
      }

      if (widthAnimationTimeoutRef.current !== null) {
        window.clearTimeout(widthAnimationTimeoutRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    const nextWidth = cardRef.current?.getBoundingClientRect().width;
    const previousWidth = previousWidthRef.current;

    if (nextWidth === undefined || previousWidth === null) return;

    previousWidthRef.current = null;

    if (prefersReducedMotion || Math.abs(nextWidth - previousWidth) < 1) {
      setIsWidthAnimating(false);
      setInlineWidth(undefined);
      return;
    }

    if (widthAnimationFrameRef.current !== null) {
      cancelAnimationFrame(widthAnimationFrameRef.current);
    }

    if (widthAnimationTimeoutRef.current !== null) {
      window.clearTimeout(widthAnimationTimeoutRef.current);
    }

    setIsWidthAnimating(true);
    setInlineWidth(`${previousWidth}px`);

    widthAnimationFrameRef.current = window.requestAnimationFrame(() => {
      setInlineWidth(`${nextWidth}px`);
      widthAnimationFrameRef.current = null;
    });

    widthAnimationTimeoutRef.current = window.setTimeout(() => {
      setIsWidthAnimating(false);
      setInlineWidth(undefined);
      widthAnimationTimeoutRef.current = null;
    }, CARD_EXPAND_DURATION_MS + 80);
  }, [isExpanded, prefersReducedMotion]);

  function handleToggleExpand() {
    previousWidthRef.current = cardRef.current?.getBoundingClientRect().width ?? null;
    setIsExpanded((current) => !current);
  }

  return (
    <div
      className={cn(
        "min-w-0",
        isExpanded && "col-span-full",
        className,
      )}
    >
      <div
        ref={cardRef}
        className={cn(
          "overflow-hidden rounded-xl border transition-[box-shadow,border-color,background-color] duration-300 ease-out",
          isExpanded && expandedShadowClassName,
          accentClassName,
        )}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.propertyName !== "width") return;

          setIsWidthAnimating(false);
          setInlineWidth(undefined);

          if (widthAnimationTimeoutRef.current !== null) {
            window.clearTimeout(widthAnimationTimeoutRef.current);
            widthAnimationTimeoutRef.current = null;
          }
        }}
        style={{
          marginInlineEnd: isExpanded ? "auto" : undefined,
          transition: prefersReducedMotion
            ? undefined
            : `width ${CARD_EXPAND_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          width: inlineWidth,
          willChange: isWidthAnimating ? "width" : undefined,
        }}
      >
        <div
          className={cn(
            "flex items-center gap-2 border-b px-4 py-2",
            accentClassName,
          )}
        >
          {accentIcon}
          <span className="truncate text-sm font-semibold">{title}</span>
          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button
              aria-label={copied ? "Copiado!" : "Copiar código"}
              className={cn("rounded p-1 transition-colors", actionClassName)}
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
              aria-label={isExpanded ? "Reduzir bloco" : "Expandir bloco"}
              className={cn("rounded p-1 transition-colors", actionClassName)}
              onClick={handleToggleExpand}
              title={isExpanded ? "Reduzir" : "Expandir"}
              type="button"
            >
              {isExpanded ? (
                <Minimize2 aria-hidden="true" className="size-3.5" />
              ) : (
                <Maximize2 aria-hidden="true" className="size-3.5" />
              )}
            </button>
          </div>
        </div>

        <AutoHeight
          contentClassName="px-4 py-3 text-sm [&_pre]:my-0 [&_pre]:border-0 [&_pre]:bg-transparent [&_pre]:shadow-none [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
          contentRef={contentRef}
          duration={CARD_EXPAND_DURATION_MS}
        >
          <div className="code-scroll-frame">{children}</div>
        </AutoHeight>
      </div>
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
  return (
    <CodeComparisonCard
      accentClassName="border-category-erro/40 bg-category-erro/5 text-category-erro"
      accentIcon={
        <X aria-hidden="true" className="size-4 shrink-0 text-category-erro" />
      }
      actionClassName="text-category-erro/60 hover:bg-category-erro/20 hover:text-category-erro"
      className={className}
      expandedShadowClassName="shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-category-erro)_65%,transparent),0_14px_36px_color-mix(in_oklab,var(--color-category-erro)_14%,transparent)]"
      title={title}
    >
      {children}
    </CodeComparisonCard>
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
  return (
    <CodeComparisonCard
      accentClassName="border-category-pratica/40 bg-category-pratica/5 text-category-pratica"
      accentIcon={
        <Check
          aria-hidden="true"
          className="size-4 shrink-0 text-category-pratica"
        />
      }
      actionClassName="text-category-pratica/60 hover:bg-category-pratica/20 hover:text-category-pratica"
      className={className}
      expandedShadowClassName="shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-category-pratica)_65%,transparent),0_14px_36px_color-mix(in_oklab,var(--color-category-pratica)_12%,transparent)]"
      title={title}
    >
      {children}
    </CodeComparisonCard>
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
