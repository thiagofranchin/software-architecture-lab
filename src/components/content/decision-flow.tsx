import { ArrowRight } from "lucide-react";

type DecisionFlowItem = {
  condition: string;
  solution: string;
  detail?: string;
};

type DecisionFlowProps = {
  question?: string;
  items?: DecisionFlowItem[];
};

const ITEM_COLORS = [
  {
    border: "border-sky-500/40",
    bg: "bg-sky-500/8",
    conditionColor: "text-sky-700 dark:text-sky-300",
    solutionColor: "text-sky-900 dark:text-sky-100",
    dot: "bg-sky-500",
    arrow: "text-sky-500",
  },
  {
    border: "border-violet-500/40",
    bg: "bg-violet-500/8",
    conditionColor: "text-violet-700 dark:text-violet-300",
    solutionColor: "text-violet-900 dark:text-violet-100",
    dot: "bg-violet-500",
    arrow: "text-violet-500",
  },
  {
    border: "border-amber-500/40",
    bg: "bg-amber-500/8",
    conditionColor: "text-amber-700 dark:text-amber-300",
    solutionColor: "text-amber-900 dark:text-amber-100",
    dot: "bg-amber-500",
    arrow: "text-amber-500",
  },
  {
    border: "border-teal-500/40",
    bg: "bg-teal-500/8",
    conditionColor: "text-teal-700 dark:text-teal-300",
    solutionColor: "text-teal-900 dark:text-teal-100",
    dot: "bg-teal-500",
    arrow: "text-teal-500",
  },
  {
    border: "border-rose-500/40",
    bg: "bg-rose-500/8",
    conditionColor: "text-rose-700 dark:text-rose-300",
    solutionColor: "text-rose-900 dark:text-rose-100",
    dot: "bg-rose-500",
    arrow: "text-rose-500",
  },
];

export function DecisionFlow({
  question,
  items = [],
}: DecisionFlowProps) {
  if (!question && items.length === 0) {
    return null;
  }

  return (
    <div className="my-6 not-prose">
      {question && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {question}
        </p>
      )}
      {items.length > 0 ? (
        <div className="flex flex-col gap-2">
          {items.map((item, index) => {
            const color = ITEM_COLORS[index % ITEM_COLORS.length];

            return (
              <div
                key={index}
                className={`flex items-center gap-3 rounded-xl border ${color.border} ${color.bg} px-4 py-3 transition-colors`}
              >
                <span className={`size-2 shrink-0 rounded-full ${color.dot}`} />
                <span
                  className={`min-w-0 flex-1 text-sm font-medium ${color.conditionColor}`}
                >
                  {item.condition}
                </span>
                <ArrowRight className={`size-4 shrink-0 ${color.arrow}`} />
                <div className="min-w-0 flex-2 text-right sm:text-left">
                  <span
                    className={`text-sm font-semibold ${color.solutionColor}`}
                  >
                    {item.solution}
                  </span>
                  {item.detail ? (
                    <span className="block text-xs text-muted-foreground">
                      {item.detail}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
