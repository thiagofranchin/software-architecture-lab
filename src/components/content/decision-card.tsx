import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type { ReactNode } from "react";

type DecisionCardProps = {
  quando: ReactNode;
  evitar: ReactNode;
  alternativa?: ReactNode;
};

export function DecisionCard({ quando, evitar, alternativa }: DecisionCardProps) {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border border-border/60 bg-card p-4">
        <div className="mb-2 flex items-center gap-2">
          <CheckCircle className="size-4 text-green-500 shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Quando usar
          </span>
        </div>
        <div className="text-sm leading-6 text-foreground/90">{quando}</div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-4">
        <div className="mb-2 flex items-center gap-2">
          <XCircle className="size-4 text-destructive shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Quando evitar
          </span>
        </div>
        <div className="text-sm leading-6 text-foreground/90">{evitar}</div>
      </div>

      {alternativa && (
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:col-span-2 lg:col-span-1">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-500 shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Alternativa
            </span>
          </div>
          <div className="text-sm leading-6 text-foreground/90">{alternativa}</div>
        </div>
      )}
    </div>
  );
}
