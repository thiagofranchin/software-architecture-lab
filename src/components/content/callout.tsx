import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XOctagon,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "atencao" | "erro" | "sucesso";

type CalloutProps = {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
};

const variantConfig: Record<
  CalloutVariant,
  {
    icon: LucideIcon;
    container: string;
    iconClass: string;
    titleClass: string;
    defaultTitle: string;
  }
> = {
  info: {
    icon: Info,
    container:
      "border-category-patterns/50 bg-category-patterns/15 text-foreground",
    iconClass: "text-category-fundamentos",
    titleClass: "text-foreground",
    defaultTitle: "Nota",
  },
  atencao: {
    icon: AlertTriangle,
    container:
      "border-category-alerta/60 bg-category-alerta/15 text-foreground",
    iconClass: "text-category-alerta",
    titleClass: "text-foreground",
    defaultTitle: "Atenção",
  },
  erro: {
    icon: XOctagon,
    container: "border-category-erro/60 bg-category-erro/10 text-foreground",
    iconClass: "text-category-erro",
    titleClass: "text-category-erro",
    defaultTitle: "Erro comum",
  },
  sucesso: {
    icon: CheckCircle2,
    container:
      "border-category-pratica/60 bg-category-pratica/15 text-foreground",
    iconClass: "text-category-pratica",
    titleClass: "text-category-pratica",
    defaultTitle: "Boa prática",
  },
};

export function Callout({
  variant = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;
  const heading = title ?? config.defaultTitle;

  return (
    <aside
      className={cn(
        "my-6 flex gap-3 rounded-xl border px-4 py-4",
        config.container,
        className,
      )}
    >
      <Icon aria-hidden="true" className={cn("mt-0.5 size-5 shrink-0", config.iconClass)} />
      <div className="space-y-1">
        <p className={cn("text-sm font-semibold", config.titleClass)}>
          {heading}
        </p>
        <div className="text-sm leading-6 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}
