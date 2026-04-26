"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { Category, ContentItem } from "@/types/content";

// ── Category visual identity ───────────────────────────────
const CATEGORY_COLOR: Record<Category, string> = {
  Fundamentos: "#4a7fd4",
  Frontend:    "#00b8d9",
  Backend:     "#3ecf8e",
  Patterns:    "#9b6fff",
  Prática:     "#e07040",
};

const CATEGORY_ABBR: Record<Category, string> = {
  Fundamentos: "FD",
  Frontend:    "FE",
  Backend:     "BE",
  Patterns:    "PT",
  Prática:     "PR",
};

// ── SVG layout constants ───────────────────────────────────
const SVG_W = 900;
const SVG_H = 560;
const CX = SVG_W / 2;        // 450
const CY = SVG_H / 2 + 10;   // 290 — slightly below center
const TRILHA_ORBIT_R = 165;   // pentagon radius
const CLUSTER_R = 72;         // conceitos cluster radius
const TRILHA_NODE_R = 22;
const CONCEITO_NODE_R = 9;

// Deterministic background stars (no random — SSR safe)
const BG_STARS = Array.from({ length: 60 }, (_, i) => ({
  cx: ((i * 73 + 17 * (i % 7)) % (SVG_W - 20)) + 10,
  cy: ((i * 41 + 23 * (i % 5)) % (SVG_H - 20)) + 10,
  r:  i % 4 === 0 ? 1.8 : i % 3 === 0 ? 1.2 : 0.7,
  opacity: 0.06 + (i % 6) * 0.025,
}));

// ── Types ──────────────────────────────────────────────────
type MapNode = {
  id: string;
  slug: string;
  label: string;
  displayLabel: string;
  abbr: string;
  category: Category;
  type: "trilha" | "conceito";
  x: number;
  y: number;
  outAngle: number; // direction pointing away from parent center
};

type MapEdge = {
  from: string;
  to: string;
  color: string;
};

// ── Helpers ────────────────────────────────────────────────
function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function textAnchor(angle: number): "start" | "middle" | "end" {
  const cos = Math.cos(angle);
  if (cos > 0.3) return "start";
  if (cos < -0.3) return "end";
  return "middle";
}

function buildGraph(
  trilhas: ContentItem[],
  conceitos: ContentItem[],
): { nodes: MapNode[]; edges: MapEdge[] } {
  const nodes: MapNode[] = [];
  const edges: MapEdge[] = [];

  trilhas.forEach((trilha, i) => {
    const angle = -Math.PI / 2 + (i / Math.max(trilhas.length, 1)) * 2 * Math.PI;
    const tx = CX + TRILHA_ORBIT_R * Math.cos(angle);
    const ty = CY + TRILHA_ORBIT_R * Math.sin(angle);
    const trilhaId = `trilha-${trilha.slug}`;
    const color = CATEGORY_COLOR[trilha.category];

    nodes.push({
      id: trilhaId,
      slug: trilha.slug,
      label: trilha.title,
      displayLabel: truncate(trilha.title, 22),
      abbr: CATEGORY_ABBR[trilha.category],
      category: trilha.category,
      type: "trilha",
      x: tx,
      y: ty,
      outAngle: angle,
    });

    const related = trilha.related
      .map((slug) => conceitos.find((c) => c.slug === slug))
      .filter(Boolean) as ContentItem[];

    related.forEach((conceito, j) => {
      const count = related.length;
      let cAngle: number;
      if (count <= 1) {
        cAngle = angle;
      } else if (count === 2) {
        const spread = Math.PI * 0.5;
        cAngle = angle - spread / 2 + j * spread;
      } else {
        const spread = Math.PI * 0.72;
        cAngle = angle - spread / 2 + (j / (count - 1)) * spread;
      }

      const cx2 = tx + CLUSTER_R * Math.cos(cAngle);
      const cy2 = ty + CLUSTER_R * Math.sin(cAngle);
      const conceitoId = `conceito-${conceito.slug}`;

      nodes.push({
        id: conceitoId,
        slug: conceito.slug,
        label: conceito.title,
        displayLabel: truncate(conceito.title, 16),
        abbr: "★",
        category: conceito.category,
        type: "conceito",
        x: cx2,
        y: cy2,
        outAngle: cAngle,
      });

      edges.push({ from: trilhaId, to: conceitoId, color });
    });
  });

  return { nodes, edges };
}

// ── Component ──────────────────────────────────────────────
type ConstellationMapProps = {
  trilhas: ContentItem[];
  conceitos?: ContentItem[];
  activeCategory?: Category | null;
  compact?: boolean;
};

export function ConstellationMap({
  trilhas,
  conceitos = [],
  activeCategory = null,
  compact = false,
}: ConstellationMapProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  const { nodes, edges } = useMemo(
    () => buildGraph(trilhas, conceitos),
    [trilhas, conceitos],
  );

  // Map conceito ID → parent trilha category for visibility checks
  const conceitoParentCategory = useMemo(() => {
    const map = new Map<string, Category>();
    edges.forEach((e) => {
      const parent = nodes.find((n) => n.id === e.from);
      if (parent) map.set(e.to, parent.category);
    });
    return map;
  }, [edges, nodes]);

  function isVisible(node: MapNode): boolean {
    if (!activeCategory) return true;
    if (node.type === "trilha") return node.category === activeCategory;
    const parentCat = conceitoParentCategory.get(node.id);
    return parentCat === activeCategory;
  }

  function isEdgeVisible(e: MapEdge): boolean {
    if (!activeCategory) return true;
    const parent = nodes.find((n) => n.id === e.from);
    return parent?.category === activeCategory;
  }

  function isDimmed(id: string): boolean {
    if (!hovered) return false;
    if (id === hovered) return false;
    return !edges.some(
      (e) => (e.from === hovered && e.to === id) || (e.to === hovered && e.from === id),
    );
  }

  const viewBox = compact
    ? `${CX - 300} ${CY - 260} 600 520`
    : `0 0 ${SVG_W} ${SVG_H}`;

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
      {/* Header LCARS */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/70">
          Mapa de Constelações
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground/40">
          ✦ {trilhas.length} Trilhas · {conceitos.length} Conceitos
        </span>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={viewBox}
          className="w-full"
          style={{ minHeight: compact ? 320 : 380 }}
          aria-label="Mapa de Constelações — visualização interativa de trilhas e conceitos"
          role="img"
        >
          <defs>
            {/* Per-category glow filters */}
            {Object.entries(CATEGORY_COLOR).map(([cat, color]) => (
              <filter
                key={cat}
                id={`cmap-glow-${cat}`}
                x="-120%"
                y="-120%"
                width="340%"
                height="340%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feFlood floodColor={color} floodOpacity="0.4" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* Decorative background stars */}
          {BG_STARS.map((s, i) => (
            <circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="currentColor"
              className="text-foreground"
              opacity={s.opacity}
            />
          ))}

          {/* Constellation edges */}
          {edges.map((edge, i) => {
            const from = nodes.find((n) => n.id === edge.from);
            const to = nodes.find((n) => n.id === edge.to);
            if (!from || !to) return null;
            const visible = isEdgeVisible(edge);
            const dimFrom = isDimmed(edge.from);
            const dimTo = isDimmed(edge.to);
            const dim = dimFrom && dimTo;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={edge.color}
                strokeWidth={0.9}
                strokeDasharray="3,6"
                opacity={!visible ? 0.03 : dim ? 0.08 : hovered ? 0.5 : 0.25}
                style={{ transition: "opacity 0.25s" }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const color = CATEGORY_COLOR[node.category];
            const visible = isVisible(node);
            const dim = isDimmed(node.id);
            const hov = hovered === node.id;
            const connected = !hov && edges.some(
              (e) =>
                (e.from === hovered && e.to === node.id) ||
                (e.to === hovered && e.from === node.id),
            );
            const nr = node.type === "trilha" ? TRILHA_NODE_R : CONCEITO_NODE_R;
            const labelR = nr + (node.type === "trilha" ? 13 : 9);
            const lx = node.x + Math.cos(node.outAngle) * labelR;
            const ly = node.y + Math.sin(node.outAngle) * labelR;
            const anchor = textAnchor(node.outAngle);

            return (
              <g
                key={node.id}
                onClick={() =>
                  router.push(
                    node.type === "trilha"
                      ? `/trilhas/${node.slug}`
                      : `/conceitos/${node.slug}`,
                  )
                }
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  cursor: "pointer",
                  opacity: !visible ? 0.05 : dim ? 0.12 : 1,
                  transition: "opacity 0.25s",
                }}
                filter={hov || connected ? `url(#cmap-glow-${node.category})` : undefined}
                aria-label={`${node.type === "trilha" ? "Trilha" : "Conceito"}: ${node.label}`}
              >
                {/* Outer halo */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nr + (node.type === "trilha" ? 10 : 5)}
                  fill={color}
                  opacity={hov ? 0.18 : connected ? 0.10 : 0.04}
                  style={{ transition: "opacity 0.2s" }}
                />
                {/* Main circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={nr}
                  fill={`${color}18`}
                  stroke={color}
                  strokeWidth={hov ? 2 : connected ? 1.8 : node.type === "trilha" ? 1.5 : 1}
                  style={{ transition: "stroke-width 0.2s" }}
                />
                {/* Trilha: abbreviation inside + inner dot */}
                {node.type === "trilha" && (
                  <>
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={9}
                      fontWeight={700}
                      fontFamily="var(--font-mono)"
                      fill={color}
                      opacity={0.9}
                    >
                      {node.abbr}
                    </text>
                  </>
                )}
                {/* Conceito: inner star dot */}
                {node.type === "conceito" && (
                  <circle cx={node.x} cy={node.y} r={3} fill={color} opacity={0.7} />
                )}
                {/* Label */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  fontSize={node.type === "trilha" ? 10 : 8.5}
                  fontWeight={node.type === "trilha" ? 700 : 400}
                  fontFamily="var(--font-mono)"
                  fill={color}
                  opacity={hov || connected || !hovered ? 0.92 : 0.5}
                  style={{ transition: "opacity 0.2s" }}
                >
                  {node.displayLabel}
                </text>
              </g>
            );
          })}

          {/* Center label */}
          <text
            x={CX}
            y={CY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={8}
            fontFamily="var(--font-mono)"
            fill="currentColor"
            className="text-muted-foreground/25"
          >
            ✦
          </text>
        </svg>
      </div>

      <div className="border-t border-border/40 px-5 py-3">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted-foreground/35">
          Clique para explorar · Passe o mouse para destacar conexões entre trilhas e conceitos
        </p>
      </div>
    </div>
  );
}
