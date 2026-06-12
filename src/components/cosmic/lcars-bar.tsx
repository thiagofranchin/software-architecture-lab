import { cn } from "@/lib/utils";

type LcarsBarProps = {
  className?: string;
  /** Altura da barra (classe Tailwind). */
  heightClass?: string;
};

/**
 * Barra segmentada no estilo dos painéis LCARS da Enterprise:
 * blocos arredondados de larguras desiguais em âmbar, lavanda e azul.
 * Puramente decorativa.
 */
const segments = [
  { width: "flex-[5]", color: "bg-primary/80" },
  { width: "flex-[1]", color: "bg-accent/70" },
  { width: "flex-[3]", color: "bg-category-fundamentos/60" },
  { width: "flex-[0.6]", color: "bg-primary/50" },
  { width: "flex-[2]", color: "bg-accent/40" },
  { width: "flex-[1.4]", color: "bg-category-frontend/50" },
  { width: "flex-[7]", color: "bg-primary/30" },
];

export function LcarsBar({ className, heightClass = "h-[5px]" }: LcarsBarProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex w-full gap-1", heightClass, className)}
    >
      {segments.map((segment, i) => (
        <span
          key={i}
          className={cn("h-full rounded-full", segment.width, segment.color)}
        />
      ))}
    </div>
  );
}
