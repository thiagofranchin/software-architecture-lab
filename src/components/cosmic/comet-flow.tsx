"use client";

import { useId } from "react";

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

const NODE_W = 96;
const NODE_H = 44;
const ARROW_W = 40;
const PAD = 28;
const MID_Y = NODE_H / 2 + PAD;

export function CometFlow({
  title = "Fluxo de Dados",
  nodes = [],
  cometLabel = "request",
  duration = 4,
}: CometFlowProps) {
  const uid = useId().replace(/:/g, "");
  const totalW = PAD * 2 + nodes.length * NODE_W + (nodes.length - 1) * ARROW_W;
  const totalH = NODE_H + PAD * 2 + 20; // +20 for sublabels

  const cometPathD = `M ${PAD} ${MID_Y} L ${totalW - PAD} ${MID_Y}`;
  const travelDist = totalW - PAD * 2;

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border/60 bg-card">
      {/* Header LCARS */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/70">
          {title}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground/40">
          ☄ Diagrama de Fluxo
        </span>
      </div>

      <div className="overflow-x-auto p-4">
        <style>{`
          @keyframes comet-travel-${uid} {
            0%   { transform: translateX(0px);           opacity: 0; }
            5%   { opacity: 1; }
            90%  { opacity: 1; }
            100% { transform: translateX(${travelDist}px); opacity: 0; }
          }
          @keyframes comet-tail-${uid} {
            0%   { transform: translateX(0px);           opacity: 0; }
            5%   { opacity: 0.35; }
            90%  { opacity: 0.35; }
            100% { transform: translateX(${travelDist}px); opacity: 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            .comet-head-${uid}, .comet-tail1-${uid}, .comet-tail2-${uid} {
              animation: none !important;
              display: none;
            }
          }
        `}</style>

        <svg
          width={totalW}
          height={totalH}
          viewBox={`0 0 ${totalW} ${totalH}`}
          aria-label={title}
          role="img"
          style={{ minWidth: totalW }}
        >
          <defs>
            {/* Seta padrão */}
            <marker id={`cf-arrow-${uid}`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--muted-foreground) / 0.5)" />
            </marker>

            {/* Glow do cometa */}
            <filter id={`cf-glow-${uid}`} x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Linha de base (trilha do cometa) */}
          <path
            d={cometPathD}
            fill="none"
            stroke="hsl(var(--border) / 0.5)"
            strokeWidth={1}
            strokeDasharray="3,6"
          />

          {/* Setas entre nós */}
          {nodes.slice(0, -1).map((_, i) => {
            const x1 = PAD + (i + 1) * NODE_W + i * ARROW_W;
            const x2 = x1 + ARROW_W;
            return (
              <line
                key={i}
                x1={x1}
                y1={MID_Y}
                x2={x2 - 8}
                y2={MID_Y}
                stroke="hsl(var(--muted-foreground) / 0.4)"
                strokeWidth={1.5}
                markerEnd={`url(#cf-arrow-${uid})`}
              />
            );
          })}

          {/* Nós */}
          {nodes.map((node, i) => {
            const x = PAD + i * (NODE_W + ARROW_W);
            const isFirst = i === 0;
            const isLast = i === nodes.length - 1;

            return (
              <g key={i}>
                {/* Retângulo */}
                <rect
                  x={x}
                  y={PAD}
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill={isFirst || isLast ? "hsl(var(--primary) / 0.08)" : "hsl(var(--muted) / 0.7)"}
                  stroke={isFirst || isLast ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border) / 0.8)"}
                  strokeWidth={isFirst || isLast ? 1.5 : 1}
                />
                {/* Label principal */}
                <text
                  x={x + NODE_W / 2}
                  y={PAD + NODE_H / 2 - (node.sublabel ? 6 : 0)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={10}
                  fontWeight={isFirst || isLast ? 700 : 500}
                  fontFamily="var(--font-mono)"
                  fill={isFirst || isLast ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.85)"}
                >
                  {node.label}
                </text>
                {/* Sublabel opcional */}
                {node.sublabel && (
                  <text
                    x={x + NODE_W / 2}
                    y={PAD + NODE_H / 2 + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={8}
                    fontFamily="var(--font-mono)"
                    fill="hsl(var(--muted-foreground) / 0.6)"
                  >
                    {node.sublabel}
                  </text>
                )}
              </g>
            );
          })}

          {/* Cauda do cometa (trail) */}
          <rect
            className={`comet-tail2-${uid}`}
            x={PAD - 14}
            y={MID_Y - 2}
            width={14}
            height={4}
            rx={2}
            fill="hsl(var(--primary))"
            opacity={0}
            style={{ animation: `comet-tail-${uid} ${duration}s linear infinite` }}
          />
          <rect
            className={`comet-tail1-${uid}`}
            x={PAD - 8}
            y={MID_Y - 2.5}
            width={8}
            height={5}
            rx={2}
            fill="hsl(var(--primary))"
            opacity={0}
            style={{
              animation: `comet-tail-${uid} ${duration}s linear infinite`,
              animationDelay: `${duration * 0.02}s`,
            }}
          />

          {/* Cabeça do cometa */}
          <circle
            className={`comet-head-${uid}`}
            cx={PAD}
            cy={MID_Y}
            r={6}
            fill="hsl(var(--primary))"
            filter={`url(#cf-glow-${uid})`}
            opacity={0}
            style={{ animation: `comet-travel-${uid} ${duration}s linear infinite` }}
          />

          {/* Label do cometa */}
          <text
            x={totalW / 2}
            y={totalH - 4}
            textAnchor="middle"
            fontSize={8}
            fontFamily="var(--font-mono)"
            fill="hsl(var(--primary) / 0.6)"
          >
            ☄ {cometLabel}
          </text>
        </svg>
      </div>
    </div>
  );
}
