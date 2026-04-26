"use client";

import { useState } from "react";

type OrbitLayer = {
  label: string;
  color: string;
  items: string[];
};

type OrbitDiagramProps = {
  title?: string;
  centerLabel?: string;
  centerColor?: string;
  layers?: OrbitLayer[];
};

const DEFAULT_LAYERS: OrbitLayer[] = [
  {
    label: "Casos de Uso",
    color: "#9b6fff",
    items: ["Regras de Negócio", "Validações"],
  },
  {
    label: "Controllers / Presenters",
    color: "#00b8d9",
    items: ["HTTP", "CLI", "WebSocket"],
  },
  {
    label: "Infrastructure",
    color: "#3ecf8e",
    items: ["Banco de Dados", "APIs Externas", "E-mail"],
  },
];

const CX = 200;
const CY = 200;
const CENTER_R = 32;
const RADII = [75, 128, 181];
const DOT_R = 6;
const LABEL_OFFSET = 11;

function positions(count: number, radius: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = -Math.PI / 2 + (i / count) * 2 * Math.PI;
    return { x: CX + radius * Math.cos(angle), y: CY + radius * Math.sin(angle), angle };
  });
}

function labelAnchor(angle: number): "start" | "middle" | "end" {
  const cos = Math.cos(angle);
  if (cos > 0.25) return "start";
  if (cos < -0.25) return "end";
  return "middle";
}

function labelDy(angle: number): number {
  const sin = Math.sin(angle);
  if (sin > 0.25) return LABEL_OFFSET;
  if (sin < -0.25) return -LABEL_OFFSET;
  return 0;
}

function labelDx(angle: number): number {
  const cos = Math.cos(angle);
  if (Math.abs(cos) > 0.25) return cos > 0 ? LABEL_OFFSET : -LABEL_OFFSET;
  return 0;
}

export function OrbitDiagram({
  title = "Diagrama Orbital de Arquitetura",
  centerLabel = "Domínio",
  centerColor = "#e07040",
  layers = DEFAULT_LAYERS,
}: OrbitDiagramProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const usedRadii = RADII.slice(0, Math.min(layers.length, RADII.length));

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border/60 bg-card">
      {/* Header LCARS */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/70">
          {title}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground/40">
          ◎ Diagrama Orbital
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
            {/* Glow filters por camada */}
            {layers.map((layer, i) => (
              <filter key={i} id={`orbit-glow-${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}

            {/* Glow do centro */}
            <filter id="center-star-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Marcadores de seta (dependência) */}
            {layers.map((layer, i) => (
              <marker
                key={i}
                id={`dep-arrow-${i}`}
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 6 3, 0 6" fill={layer.color} opacity={0.7} />
              </marker>
            ))}
          </defs>

          {/* Setas de dependência — fluem para dentro */}
          {usedRadii.map((radius, i) => {
            if (i === 0) return null;
            const inner = usedRadii[i - 1];
            const isDimmed = hovered !== null && hovered !== i;
            return (
              <line
                key={`dep-${i}`}
                x1={CX}
                y1={CY - radius + DOT_R + 2}
                x2={CX}
                y2={CY - inner - DOT_R - 2}
                stroke={layers[i].color}
                strokeWidth={1.2}
                strokeDasharray="4,3"
                markerEnd={`url(#dep-arrow-${i})`}
                opacity={isDimmed ? 0.08 : 0.4}
                style={{ transition: "opacity 0.2s" }}
              />
            );
          })}

          {/* Anéis de órbita */}
          {usedRadii.map((radius, i) => {
            const isActive = hovered === i;
            const isDimmed = hovered !== null && !isActive;
            return (
              <circle
                key={`ring-${i}`}
                cx={CX}
                cy={CY}
                r={radius}
                fill="none"
                stroke={layers[i].color}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray={isActive ? "none" : "5,7"}
                opacity={isDimmed ? 0.1 : isActive ? 0.65 : 0.28}
                style={{ transition: "opacity 0.2s, stroke-width 0.2s" }}
              />
            );
          })}

          {/* Itens nas órbitas */}
          {layers.slice(0, usedRadii.length).map((layer, li) => {
            const radius = usedRadii[li];
            const pts = positions(layer.items.length, radius);
            const isActive = hovered === li;
            const isDimmed = hovered !== null && !isActive;

            return (
              <g
                key={`items-${li}`}
                onMouseEnter={() => setHovered(li)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "default", opacity: isDimmed ? 0.15 : 1, transition: "opacity 0.2s" }}
                filter={isActive ? `url(#orbit-glow-${li})` : undefined}
              >
                {pts.map((pt, pi) => (
                  <g key={pi}>
                    {/* Halo do ponto */}
                    <circle cx={pt.x} cy={pt.y} r={DOT_R + 4} fill={layer.color} opacity={isActive ? 0.15 : 0.06} />
                    {/* Ponto principal */}
                    <circle cx={pt.x} cy={pt.y} r={DOT_R} fill={layer.color} opacity={0.9} />
                    {/* Rótulo */}
                    <text
                      x={pt.x + labelDx(pt.angle)}
                      y={pt.y + labelDy(pt.angle)}
                      textAnchor={labelAnchor(pt.angle)}
                      dominantBaseline="middle"
                      fontSize={9}
                      fontFamily="var(--font-mono)"
                      fill={layer.color}
                      opacity={0.9}
                    >
                      {layer.items[pi]}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}

          {/* Estrela central (domínio) */}
          <g filter="url(#center-star-glow)">
            <circle cx={CX} cy={CY} r={CENTER_R + 12} fill={centerColor} opacity={0.08} />
            <circle cx={CX} cy={CY} r={CENTER_R + 4} fill={centerColor} opacity={0.14} />
            <circle cx={CX} cy={CY} r={CENTER_R} fill={centerColor} opacity={0.28} />
            <circle cx={CX} cy={CY} r={CENTER_R - 8} fill={centerColor} opacity={0.55} />
          </g>
          <text
            x={CX}
            y={CY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={10}
            fontWeight={700}
            fontFamily="var(--font-mono)"
            fill={centerColor}
          >
            {centerLabel}
          </text>
        </svg>

        {/* Legenda interativa */}
        <div className="flex flex-wrap justify-center gap-2">
          {[{ label: "Centro", color: centerColor }, ...layers.map((l) => ({ label: l.label, color: l.color }))].map(
            (item, i) => (
              <button
                key={i}
                type="button"
                onMouseEnter={() => (i > 0 ? setHovered(i - 1) : undefined)}
                onMouseLeave={() => setHovered(null)}
                className="flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wide transition hover:bg-muted/50"
                style={{
                  color: item.color,
                  opacity: i > 0 && hovered !== null && hovered !== i - 1 ? 0.3 : 1,
                }}
              >
                <span className="inline-block size-1.5 rounded-full" style={{ background: item.color }} />
                {item.label}
              </button>
            ),
          )}
        </div>

        <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted-foreground/35">
          Dependências fluem para o centro · Passe o mouse para destacar
        </p>
      </div>
    </div>
  );
}
