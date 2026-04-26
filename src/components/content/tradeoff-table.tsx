import { cn } from "@/lib/utils";

type TradeoffRow = {
  criterio: string;
  opcaoA: string;
  opcaoB: string;
  vencedor?: "A" | "B" | "empate";
};

type TradeoffTableProps = {
  rows: TradeoffRow[];
  labelA?: string;
  labelB?: string;
};

export function TradeoffTable({
  rows,
  labelA = "Opção A",
  labelB = "Opção B",
}: TradeoffTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border/60">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-border/60 bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold text-foreground/70 w-1/4">
              Critério
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground w-[37.5%]">
              {labelA}
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground w-[37.5%]">
              {labelB}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {rows.map((row, i) => (
            <tr
              key={i}
              className="transition hover:bg-muted/30"
            >
              <td className="px-4 py-3 font-medium text-foreground/80 text-xs uppercase tracking-wide">
                {row.criterio}
              </td>
              <td
                className={cn(
                  "px-4 py-3 text-foreground/90 leading-snug",
                  row.vencedor === "A" &&
                    "font-semibold text-foreground bg-primary/5",
                )}
              >
                {row.vencedor === "A" && (
                  <span className="mr-1.5 text-primary">✓</span>
                )}
                {row.opcaoA}
              </td>
              <td
                className={cn(
                  "px-4 py-3 text-foreground/90 leading-snug",
                  row.vencedor === "B" &&
                    "font-semibold text-foreground bg-primary/5",
                )}
              >
                {row.vencedor === "B" && (
                  <span className="mr-1.5 text-primary">✓</span>
                )}
                {row.opcaoB}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
