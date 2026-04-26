"use client";

import { useState } from "react";

type CouplingStrength = "tight" | "medium" | "loose";

type Satellite = {
  label: string;
  coupling?: CouplingStrength;
};

type BlackHoleDiagramProps = {
  title?: string;
  centerLabel: string;
  satellites: Satellite[];
};

const CX = 200;
const CY = 200;
const SAT_R = 20;

const COUPLING_CONFIG: Record<CouplingStrength, { radius: number; strokeDash: string; lineOpacity: number; color: string }> = {
  tight: { radius: 85, strokeDash: "none", lineOpacity: 0.8, color: "#e07040" },
  medium: { radius: 132, strokeDash: "6,3", lineOpacity: 0.5, color: "#9b6fff" },
  loose: { radius: 172, strokeDash: "3,8", lineOpacity: 0.28, color: "#3ecf8e" },
};

function satellitePositions(satellites: Satellite[]) {
  return satellites.map((sat, i) => {
    const angle = -Math.PI / 2 + (i / satellites.length) * 2 * Math.PI;
    const cfg = COUPLING_CONFIG[sat.coupling ?? "medium"];
    return {
      ...sat,
      x: CX + cfg.radius * Math.cos(angle),
      y: CY + cfg.radius * Math.sin(angle),
      cfg,
      angle,
    };
  });
}

function labelAnchor(angle: number): "start" | "middle" | "end" {
  const cos = Math.cos(angle);
  if (cos > 0.3) return "start";
  if (cos < -0.3) return "end";
  return "middle";
}

function labelOffset(angle: number): { dx: number; dy: number } {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const OFF = SAT_R + 9;
  return { dx: cos * OFF, dy: sin * OFF };
}

export function BlackHoleDiagram({ title = "Mapa de Acoplamento", centerLabel = "", satellites = [] }: BlackHoleDiagramProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const sats = satellitePositions(satellites);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border/60 bg-card">
      {/* Header LCARS */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/70">
          {title}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground/40">
          ● Campo Gravitacional
        </span>
      </div>

      <div className="flex flex-col items-center gap-3 p-4">
        <svg
          viewBox="0 0 400 400"
          className="w-full max-w-sm"
          aria-label={title}
          role="img"
        >
          <defs>
            {/* Glow do buraco negro central */}
            <radialGradient id="bh-core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#070b14" stopOpacity="1" />
              <stop offset="60%" stopColor="#1a0a2e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2d1b69" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="bh-glow-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9b6fff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9b6fff" stopOpacity="0" />
            </radialGradient>

            <filter id="bh-filter" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="sat-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Marcadores de seta por acoplamento */}
            {(["tight", "medium", "loose"] as CouplingStrength[]).map((c) => (
              <marker key={c} id={`bh-arr-${c}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill={COUPLING_CONFIG[c].color} opacity={0.8} />
              </marker>
            ))}
          </defs>

          {/* Campo gravitacional (anéis de fundo) */}
          {[44, 68, 95, 125, 158].map((r, i) => (
            <circle
              key={r}
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke="#9b6fff"
              strokeWidth={0.5}
              opacity={0.05 + i * 0.01}
              strokeDasharray="2,10"
            />
          ))}

          {/* Linhas de dependência (pull gravitacional) */}
          {sats.map((sat, i) => {
            const isHovered = hovered === i;
            const isDimmed = hovered !== null && !isHovered;
            const endR = 36; // raio do centro onde a linha termina
            const dx = sat.x - CX;
            const dy = sat.y - CY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const nx = dx / dist;
            const ny = dy / dist;
            return (
              <line
                key={i}
                x1={sat.x - nx * SAT_R}
                y1={sat.y - ny * SAT_R}
                x2={CX + nx * endR}
                y2={CY + ny * endR}
                stroke={sat.cfg.color}
                strokeWidth={isHovered ? 2 : 1.5}
                strokeDasharray={sat.cfg.strokeDash}
                markerEnd={`url(#bh-arr-${sat.coupling ?? "medium"})`}
                opacity={isDimmed ? 0.08 : isHovered ? sat.cfg.lineOpacity * 1.4 : sat.cfg.lineOpacity}
                style={{ transition: "opacity 0.2s, stroke-width 0.2s" }}
              />
            );
          })}

          {/* Satélites */}
          {sats.map((sat, i) => {
            const isHovered = hovered === i;
            const isDimmed = hovered !== null && !isHovered;
            const off = labelOffset(sat.angle);
            return (
              <g
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "default", opacity: isDimmed ? 0.25 : 1, transition: "opacity 0.2s" }}
                filter={isHovered ? "url(#sat-glow)" : undefined}
              >
                {/* Halo */}
                <circle cx={sat.x} cy={sat.y} r={SAT_R + 6} fill={sat.cfg.color} opacity={isHovered ? 0.2 : 0.07} />
                {/* Corpo do satélite */}
                <circle
                  cx={sat.x}
                  cy={sat.y}
                  r={SAT_R}
                  fill={`${sat.cfg.color}22`}
                  stroke={sat.cfg.color}
                  strokeWidth={isHovered ? 2 : 1.5}
                />
                {/* Label do satélite */}
                <text
                  x={sat.x + off.dx}
                  y={sat.y + off.dy}
                  textAnchor={labelAnchor(sat.angle)}
                  dominantBaseline="middle"
                  fontSize={9}
                  fontFamily="var(--font-mono)"
                  fill={sat.cfg.color}
                  opacity={0.9}
                >
                  {sat.label}
                </text>
                {/* Badge de acoplamento */}
                {isHovered && (
                  <text
                    x={sat.x}
                    y={sat.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={7.5}
                    fontFamily="var(--font-mono)"
                    fontWeight={700}
                    fill={sat.cfg.color}
                  >
                    {(sat.coupling ?? "medium").toUpperCase().slice(0, 1)}
                  </text>
                )}
              </g>
            );
          })}

          {/* Buraco negro central */}
          <g filter="url(#bh-filter)">
            <circle cx={CX} cy={CY} r={52} fill="url(#bh-glow-grad)" />
            <circle cx={CX} cy={CY} r={40} fill="url(#bh-core-grad)" />
            <circle cx={CX} cy={CY} r={30} fill="#070b14" stroke="#9b6fff" strokeWidth={1.5} strokeOpacity={0.5} />
          </g>
          <text
            x={CX}
            y={CY - 5}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={9}
            fontWeight={700}
            fontFamily="var(--font-mono)"
            fill="#c084fc"
          >
            {centerLabel}
          </text>
          <text
            x={CX}
            y={CY + 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={7}
            fontFamily="var(--font-mono)"
            fill="#9b6fff"
            opacity={0.7}
          >
            {satellites.length} dep.
          </text>
        </svg>

        {/* Legenda de acoplamento */}
        <div className="flex flex-wrap justify-center gap-4">
          {(["tight", "medium", "loose"] as CouplingStrength[]).map((c) => {
            const cfg = COUPLING_CONFIG[c];
            const labels = { tight: "Acoplamento Rígido", medium: "Acoplamento Médio", loose: "Acoplamento Fraco" };
            return (
              <div key={c} className="flex items-center gap-1.5">
                <svg width="24" height="8" aria-hidden="true">
                  <line
                    x1="0"
                    y1="4"
                    x2="24"
                    y2="4"
                    stroke={cfg.color}
                    strokeWidth="2"
                    strokeDasharray={cfg.strokeDash === "none" ? undefined : cfg.strokeDash}
                  />
                </svg>
                <span className="font-mono text-[0.62rem] uppercase tracking-wide" style={{ color: cfg.color }}>
                  {labels[c]}
                </span>
              </div>
            );
          })}
        </div>

        <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted-foreground/35">
          Linhas sólidas = alto acoplamento · Passe o mouse para inspecionar
        </p>
      </div>
    </div>
  );
}
