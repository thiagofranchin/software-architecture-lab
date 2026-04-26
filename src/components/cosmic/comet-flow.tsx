import { ArrowDown, ArrowRight, Database, Globe, Layers3, ServerCog } from "lucide-react";

import { cn } from "@/lib/utils";

type CometNode = {
  label: string;
  sublabel?: string;
  color?: string;
};

type CometFlowProps = {
  title?: string;
  nodes: CometNode[];
  cometLabel?: string;
  duration?: number;
};

function toSafeId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "comet-flow";
}

function getNodeKind(label: string, index: number, total: number) {
  const normalized = label.toLowerCase();

  if (normalized.includes("service")) {
    return "service";
  }

  if (index === 0 || index === total - 1) {
    return "edge";
  }

  return "support";
}

function getNodeIcon(label: string, index: number, total: number) {
  const normalized = label.toLowerCase();

  if (normalized.includes("request") || normalized.includes("http")) {
    return Globe;
  }

  if (normalized.includes("service")) {
    return Layers3;
  }

  if (normalized.includes("repository")) {
    return ServerCog;
  }

  if (normalized.includes("database") || normalized.includes("db")) {
    return Database;
  }

  if (index === total - 1) {
    return Database;
  }

  return Layers3;
}

function getNodeTone(kind: ReturnType<typeof getNodeKind>) {
  switch (kind) {
    case "service":
      return {
        card:
          "border-primary/45 bg-primary/10 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_22%,transparent),0_18px_36px_-24px_color-mix(in_oklab,var(--primary)_65%,transparent)] dark:bg-primary/12",
        badge: "border-primary/40 bg-primary/14 text-primary",
        title: "text-primary",
        sublabel: "text-foreground/78",
        connector: "bg-primary/35",
        dot: "bg-primary shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_60%,transparent)]",
      };
    case "edge":
      return {
        card: "border-accent/35 bg-accent/8",
        badge: "border-accent/35 bg-accent/14 text-accent-foreground",
        title: "text-foreground",
        sublabel: "text-muted-foreground/90",
        connector: "bg-accent/30",
        dot: "bg-accent",
      };
    default:
      return {
        card: "border-border/70 bg-background/80",
        badge: "border-border/70 bg-muted/70 text-foreground/85",
        title: "text-foreground",
        sublabel: "text-muted-foreground",
        connector: "bg-border",
        dot: "bg-muted-foreground/80",
      };
  }
}

export function CometFlow({
  title = "Fluxo de Dados",
  nodes = [],
  cometLabel = "request",
  duration = 4,
}: CometFlowProps) {
  const uid = toSafeId(`${title}-${cometLabel}-${nodes.map((node) => node.label).join("-")}`);
  const cometAnim = `cf-comet-${uid}`;
  const cometGlowAnim = `cf-comet-glow-${uid}`;

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/70">
          {title}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground/40">
          ☄ Diagrama de Fluxo
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <style>{`
          @keyframes ${cometAnim} {
            0% { left: 0%; opacity: 0; }
            8% { opacity: 1; }
            92% { opacity: 1; }
            100% { left: calc(100% - 0.9rem); opacity: 0; }
          }
          @keyframes ${cometGlowAnim} {
            0% { left: -1.25rem; opacity: 0; }
            8% { opacity: 0.65; }
            92% { opacity: 0.65; }
            100% { left: calc(100% - 2.25rem); opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            .${uid}-comet,
            .${uid}-comet-glow {
              animation: none !important;
              left: 0%;
              opacity: 1;
            }
          }
        `}</style>

        <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-linear-to-r from-primary/6 via-background to-background px-4 py-4 sm:px-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-1/2 hidden -translate-y-1/2 md:block"
          >
            <div className="relative h-px bg-transparent">
              <div className="absolute inset-x-0 top-0 border-t border-dashed border-border/70" />
              <div
                className={cn(
                  "absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_70%,transparent)]",
                  `${uid}-comet`,
                )}
                style={{ animation: `${cometAnim} ${duration}s linear infinite` }}
              />
              <div
                className={cn(
                  "absolute top-1/2 h-1.5 w-7 -translate-y-1/2 rounded-full bg-linear-to-r from-primary/0 via-primary/45 to-primary/80 blur-[1px]",
                  `${uid}-comet-glow`,
                )}
                style={{ animation: `${cometGlowAnim} ${duration}s linear infinite` }}
              />
            </div>
          </div>

          <div className="relative flex items-center justify-between gap-3">
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-primary/75">
                fluxo da requisição
              </div>
              <div className="mt-1 text-sm text-foreground/80">
                HTTP entra, o service orquestra o negócio, o repository persiste.
              </div>
            </div>
            <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-primary">
              {cometLabel}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
            {nodes.map((node, index) => {
              const kind = getNodeKind(node.label, index, nodes.length);
              const tone = getNodeTone(kind);
              const Icon = getNodeIcon(node.label, index, nodes.length);
              const isLast = index === nodes.length - 1;

              return (
                <div
                  key={`${node.label}-${index}`}
                  className="flex flex-col md:min-w-0 md:flex-1 md:flex-row md:items-center"
                >
                  <article
                    className={cn(
                      "relative min-w-0 rounded-2xl border px-4 py-4 transition-shadow",
                      tone.card,
                      kind === "service" ? "md:-translate-y-1" : "",
                    )}
                    style={node.color ? { borderColor: node.color } : undefined}
                  >
                    <div
                      aria-hidden="true"
                      className={cn(
                        "mb-3 flex size-10 items-center justify-center rounded-xl border",
                        tone.badge,
                      )}
                      style={node.color ? { color: node.color, borderColor: node.color } : undefined}
                    >
                      <Icon className="size-4" />
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div
                          className={cn("text-sm font-semibold tracking-tight sm:text-[0.95rem]", tone.title)}
                          style={node.color ? { color: node.color } : undefined}
                        >
                          {node.label}
                        </div>
                        {node.sublabel ? (
                          <div className={cn("mt-1 text-xs leading-5 sm:text-[0.8rem]", tone.sublabel)}>
                            {node.sublabel}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex shrink-0 flex-col items-center gap-1">
                        <div className={cn("size-2.5 rounded-full", tone.dot)} />
                        <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground/70">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {kind === "service" ? (
                      <div className="mt-3 inline-flex rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-primary">
                        centro da regra de negócio
                      </div>
                    ) : null}
                  </article>

                  {!isLast ? (
                    <>
                      <div className="flex justify-center py-1.5 md:hidden">
                        <div className="flex flex-col items-center gap-1 text-muted-foreground/70">
                          <div className={cn("h-6 w-px", tone.connector)} />
                          <ArrowDown className="size-3.5" />
                        </div>
                      </div>
                      <div className="hidden md:flex md:w-8 md:shrink-0 md:items-center md:justify-center">
                        <div className="flex w-full items-center gap-1.5 text-muted-foreground/70">
                          <div className={cn("h-px flex-1", tone.connector)} />
                          <ArrowRight className="size-3.5 shrink-0" />
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
