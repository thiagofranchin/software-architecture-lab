import { ArrowRight } from "lucide-react";
import {
  Children,
  isValidElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type DecisionFlowItem = {
  condition: string;
  solution: string;
  detail?: string;
};

type DecisionFlowProps = {
  children?: ReactNode;
  question?: string;
  items?: DecisionFlowItem[];
};

type DecisionFlowItemProps = DecisionFlowItem;

export function DecisionFlowItem(_props: DecisionFlowItemProps) {
  return null;
}

export function DecisionFlow({
  children,
  question,
  items = [],
}: DecisionFlowProps) {
  const childItems = Children.toArray(children).flatMap((child) => {
    if (!isValidElement<DecisionFlowItemProps>(child)) {
      return [];
    }

    if (!child.props.condition || !child.props.solution) {
      return [];
    }

    return [
      {
        condition: child.props.condition,
        solution: child.props.solution,
        detail: child.props.detail,
      },
    ];
  });

  const resolvedItems = items.length > 0 ? items : childItems;

  if (!question && resolvedItems.length === 0) {
    return null;
  }

  return (
    <div className="my-6 not-prose">
      {question && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {question}
        </p>
      )}
      {resolvedItems.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-sm shadow-black/5 dark:border-border/80 dark:bg-card/55 dark:shadow-black/20">
          <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent px-4 py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-primary/80 dark:text-primary/75 sm:px-5">
            Mapa de decisão
          </div>

          <div className="divide-y divide-border/45 px-4 py-3 sm:px-5">
          {resolvedItems.map((item, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "py-3 first:pt-0 last:pb-0",
                  "grid gap-x-4 gap-y-1.5",
                  "sm:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1.45fr)] sm:items-center",
                )}
              >
                <span
                  className={cn(
                    "min-w-0 font-mono text-[0.92rem] font-semibold text-foreground",
                    "sm:text-[0.95rem]",
                  )}
                >
                  {item.condition}
                </span>
                <div className="hidden justify-center sm:flex">
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary/75"
                  />
                </div>
                <div className="min-w-0 sm:text-left">
                  <div className="flex items-start gap-2 sm:hidden">
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-primary/75"
                    />
                    <div className="min-w-0">
                      <span className="font-mono text-[0.88rem] font-semibold text-foreground sm:text-[0.93rem]">
                        {item.solution}
                      </span>
                      {item.detail ? (
                        <span className="ml-1 font-mono text-[0.8rem] text-muted-foreground">
                          ({item.detail})
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="hidden min-w-0 sm:block">
                    <span className="font-mono text-[0.88rem] font-semibold text-foreground sm:text-[0.93rem]">
                      {item.solution}
                    </span>
                    {item.detail ? (
                      <span className="ml-1 font-mono text-[0.8rem] text-muted-foreground">
                        ({item.detail})
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
