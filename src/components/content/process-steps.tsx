import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type ProcessStepsVariant = "default" | "pratica";
type ProcessStepTone = "default" | "attention";

type ProcessStepsProps = {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  variant?: ProcessStepsVariant;
};

type ProcessStepProps = {
  children?: ReactNode;
  className?: string;
  note?: ReactNode;
  step?: number | string;
  title: ReactNode;
  tone?: ProcessStepTone;
};

type ProcessStepInternalProps = ProcessStepProps & {
  computedStep?: number | string;
  isLast?: boolean;
  variant?: ProcessStepsVariant;
};

const containerVariants: Record<ProcessStepsVariant, string> = {
  default: "border-border/60 bg-card/70 shadow-sm",
  pratica:
    "border-category-pratica/25 bg-linear-to-br from-category-pratica/12 via-background to-background shadow-lg shadow-black/5 dark:shadow-black/20",
};

const badgeVariants: Record<
  ProcessStepsVariant,
  Record<ProcessStepTone, string>
> = {
  default: {
    default:
      "border-border/70 bg-background text-foreground shadow-sm shadow-black/5",
    attention:
      "border-category-alerta/50 bg-category-alerta/15 text-category-alerta",
  },
  pratica: {
    default:
      "border-category-pratica/35 bg-category-pratica/15 text-category-pratica",
    attention:
      "border-category-alerta/50 bg-category-alerta/15 text-category-alerta",
  },
};

const lineVariants: Record<
  ProcessStepsVariant,
  Record<ProcessStepTone, string>
> = {
  default: {
    default: "bg-border/70",
    attention: "bg-category-alerta/40",
  },
  pratica: {
    default: "bg-category-pratica/30",
    attention: "bg-category-alerta/40",
  },
};

const noteVariants: Record<ProcessStepTone, string> = {
  default: "border-border/60 bg-background/70 text-foreground/75",
  attention:
    "border-category-alerta/40 bg-category-alerta/10 text-foreground/85",
};

const stepCardVariants: Record<
  ProcessStepsVariant,
  Record<ProcessStepTone, string>
> = {
  default: {
    default: "border-border/50 bg-background/55",
    attention: "border-category-alerta/35 bg-category-alerta/8",
  },
  pratica: {
    default:
      "border-category-pratica/20 bg-card/90 shadow-md shadow-black/5 dark:bg-card/75 dark:shadow-black/20",
    attention:
      "border-category-alerta/35 bg-linear-to-br from-category-alerta/14 to-card/92 shadow-md shadow-black/5 dark:to-card/78 dark:shadow-black/20",
  },
};

export function ProcessSteps({
  children,
  className,
  description,
  eyebrow,
  title,
  variant = "pratica",
}: ProcessStepsProps) {
  const items = Children.toArray(children);
  const isPratica = variant === "pratica";

  return (
    <section
      className={cn(
        "my-6 overflow-hidden rounded-3xl border p-5 sm:p-6",
        containerVariants[variant],
        className,
      )}
    >
      {title || eyebrow || description ? (
        <div
          className={cn(
            "mb-6 rounded-2xl border px-4 py-4 sm:px-5",
            isPratica
              ? "border-category-pratica/20 bg-background/75 backdrop-blur-sm"
              : "border-border/50 bg-background/55",
          )}
        >
          {eyebrow ? (
            <div className="mb-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-category-pratica/80">
              {eyebrow}
            </div>
          ) : null}

          {title ? (
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border",
                  isPratica
                    ? "border-category-pratica/30 bg-category-pratica/14 text-category-pratica"
                    : "border-border/60 bg-background text-foreground",
                )}
              >
                <CheckCircle2 aria-hidden="true" className="size-4" />
              </div>
              <div className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {title}
              </div>
            </div>
          ) : null}

          {description ? (
            <div className="mt-3 max-w-3xl text-sm leading-6 text-foreground/75 sm:text-[0.95rem]">
              {description}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-5 sm:space-y-6">
        {items.map((child, index) => {
          if (!isValidElement<ProcessStepInternalProps>(child)) {
            return child;
          }

          return cloneElement(child as ReactElement<ProcessStepInternalProps>, {
            computedStep: child.props.step ?? index + 1,
            isLast: index === items.length - 1,
            variant,
          });
        })}
      </div>
    </section>
  );
}

export function ProcessStep({
  children,
  className,
  computedStep,
  isLast = false,
  note,
  step,
  title,
  tone = "default",
  variant = "pratica",
}: ProcessStepInternalProps) {
  const stepLabel = computedStep ?? step;

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 sm:gap-x-5",
        className,
      )}
    >
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "z-10 flex size-11 items-center justify-center rounded-full border text-sm font-black tracking-tight shadow-sm",
            badgeVariants[variant][tone],
          )}
        >
          {stepLabel}
        </div>
        {!isLast ? (
          <div
            aria-hidden="true"
            className={cn(
              "mt-3 h-full w-0.5 min-h-10 rounded-full",
              lineVariants[variant][tone],
            )}
          />
        ) : null}
      </div>

      <div className="min-w-0 pb-2">
        <div
          className={cn(
            "rounded-2xl border px-4 py-4 sm:px-5 sm:py-5",
            stepCardVariants[variant][tone],
          )}
        >
          <div className="text-base font-semibold leading-7 text-foreground sm:text-[1.05rem]">
            {title}
          </div>

          {children ? (
            <div className="mt-2 text-sm leading-6 text-foreground/80">{children}</div>
          ) : null}

          {note ? (
            <div
              className={cn(
                "mt-3 flex items-start gap-2 rounded-xl border px-3 py-2 text-sm leading-6",
                noteVariants[tone],
              )}
            >
              <ArrowRight
                aria-hidden="true"
                className="mt-1 size-3.5 shrink-0 text-current"
              />
              <div>{note}</div>
            </div>
          ) : null}

          {tone === "attention" ? (
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-category-alerta">
              <AlertTriangle aria-hidden="true" className="size-3.5 shrink-0" />
              Atenção imediata
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
