"use client";

import { useMemo, useState } from "react";

type NodeDef = {
  id: string;
  label: string;
  type?: "primary" | "secondary" | "external";
  layer?: number;
};

type EdgeDef = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
};

type DepVisualizerProps = {
  nodes: NodeDef[];
  edges: EdgeDef[];
  title?: string;
};

const NODE_W = 120;
const NODE_H = 40;
const H_GAP = 60;
const V_GAP = 60;
const PADDING = 24;

type LayoutNode = NodeDef & { x: number; y: number };

function autoLayout(nodes: NodeDef[], edges: EdgeDef[]): LayoutNode[] {
  // Assign layers via topological-like approach
  const layerMap: Record<string, number> = {};
  const nodeIds = nodes.map((n) => n.id);

  for (const node of nodes) {
    layerMap[node.id] = node.layer ?? 0;
  }

  // Propagate layers from edges (if no explicit layer)
  const hasExplicitLayer = nodes.some((n) => n.layer !== undefined);
  if (!hasExplicitLayer) {
    let changed = true;
    while (changed) {
      changed = false;
      for (const edge of edges) {
        if (nodeIds.includes(edge.from) && nodeIds.includes(edge.to)) {
          const newLayer = layerMap[edge.from] + 1;
          if (newLayer > layerMap[edge.to]) {
            layerMap[edge.to] = newLayer;
            changed = true;
          }
        }
      }
    }
  }

  // Group by layer
  const layers: string[][] = [];
  for (const id of nodeIds) {
    const l = layerMap[id] ?? 0;
    if (!layers[l]) layers[l] = [];
    layers[l].push(id);
  }

  // Assign positions
  const positions: Record<string, { x: number; y: number }> = {};
  for (let l = 0; l < layers.length; l++) {
    const group = layers[l] ?? [];
    for (let i = 0; i < group.length; i++) {
      const id = group[i];
      const maxInLayer = group.length;
      positions[id] = {
        x: PADDING + l * (NODE_W + H_GAP),
        y:
          PADDING +
          i * (NODE_H + V_GAP) +
          ((Math.max(...layers.map((g) => g?.length ?? 0)) - maxInLayer) *
            (NODE_H + V_GAP)) /
            2,
      };
    }
  }

  return nodes.map((n) => ({
    ...n,
    x: positions[n.id]?.x ?? PADDING,
    y: positions[n.id]?.y ?? PADDING,
  }));
}

const TYPE_STYLES: Record<string, { fill: string; stroke: string; text: string }> = {
  primary: {
    fill: "hsl(var(--primary) / 0.15)",
    stroke: "hsl(var(--primary) / 0.8)",
    text: "hsl(var(--primary))",
  },
  secondary: {
    fill: "hsl(var(--muted))",
    stroke: "hsl(var(--border))",
    text: "hsl(var(--foreground) / 0.8)",
  },
  external: {
    fill: "hsl(var(--muted) / 0.5)",
    stroke: "hsl(var(--border) / 0.6)",
    text: "hsl(var(--muted-foreground))",
  },
};

export function DepVisualizer({ nodes, edges, title = "Visualizador de Dependências" }: DepVisualizerProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const laid = useMemo(() => autoLayout(nodes, edges), [nodes, edges]);
  const nodeMap = Object.fromEntries(laid.map((n) => [n.id, n]));

  const maxX =
    Math.max(...laid.map((n) => n.x + NODE_W)) + PADDING;
  const maxY =
    Math.max(...laid.map((n) => n.y + NODE_H)) + PADDING;

  function isConnected(nodeId: string) {
    if (!hovered) return true;
    if (nodeId === hovered) return true;
    return edges.some(
      (e) =>
        (e.from === hovered && e.to === nodeId) ||
        (e.to === hovered && e.from === nodeId),
    );
  }

  function isEdgeHighlighted(edge: EdgeDef) {
    if (!hovered) return false;
    return edge.from === hovered || edge.to === hovered;
  }

  return (
    <div className="my-6 rounded-xl border border-border/60 bg-card overflow-hidden">
      <div className="border-b border-border/60 bg-muted/40 px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
      </div>

      <div className="overflow-x-auto p-2">
        <svg
          width={maxX}
          height={maxY}
          viewBox={`0 0 ${maxX} ${maxY}`}
          className="block"
          style={{ minWidth: maxX }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 8 3, 0 6"
                fill="hsl(var(--muted-foreground) / 0.5)"
              />
            </marker>
            <marker
              id="arrowhead-active"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 8 3, 0 6"
                fill="hsl(var(--primary))"
              />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge, i) => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) return null;

            const x1 = from.x + NODE_W;
            const y1 = from.y + NODE_H / 2;
            const x2 = to.x;
            const y2 = to.y + NODE_H / 2;
            const midX = (x1 + x2) / 2;
            const isActive = isEdgeHighlighted(edge);

            return (
              <g key={i}>
                <path
                  d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                  fill="none"
                  stroke={
                    isActive
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground) / 0.4)"
                  }
                  strokeWidth={isActive ? 2 : 1.5}
                  strokeDasharray={edge.dashed ? "5,3" : undefined}
                  markerEnd={
                    isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"
                  }
                  style={{ transition: "stroke 0.15s, stroke-width 0.15s" }}
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={(y1 + y2) / 2 - 4}
                    textAnchor="middle"
                    fontSize={9}
                    fill="hsl(var(--muted-foreground))"
                    className="font-mono"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {laid.map((node) => {
            const connected = isConnected(node.id);
            const style = TYPE_STYLES[node.type ?? "secondary"];

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "default", opacity: connected ? 1 : 0.3, transition: "opacity 0.15s" }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill={style.fill}
                  stroke={hovered === node.id ? "hsl(var(--primary))" : style.stroke}
                  strokeWidth={hovered === node.id ? 2 : 1.5}
                  style={{ transition: "stroke 0.15s" }}
                />
                <text
                  x={node.x + NODE_W / 2}
                  y={node.y + NODE_H / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={11}
                  fontWeight={node.type === "primary" ? "700" : "500"}
                  fill={style.text}
                  fontFamily="var(--font-mono)"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 border-t border-border/60 px-5 py-3">
        {(["primary", "secondary", "external"] as const).map((type) => {
          const style = TYPE_STYLES[type];
          const labels = { primary: "Primário", secondary: "Secundário", external: "Externo" };
          return (
            <div key={type} className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-10 rounded"
                style={{
                  background: style.fill,
                  border: `1.5px solid ${style.stroke}`,
                }}
              />
              <span className="text-xs text-muted-foreground">{labels[type]}</span>
            </div>
          );
        })}
        <span className="text-xs text-muted-foreground/60">
          Passe o mouse sobre um nó para destacar dependências
        </span>
      </div>
    </div>
  );
}
