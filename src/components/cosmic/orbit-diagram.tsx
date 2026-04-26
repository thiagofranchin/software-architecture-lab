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

function toSafeId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "orbit";
}

export function OrbitDiagram({
  title = "Diagrama Orbital de Arquitetura",
  centerLabel = "Domínio",
  centerColor = "#e07040",
  layers = DEFAULT_LAYERS,
}: OrbitDiagramProps) {
  const usedRadii = RADII.slice(0, Math.min(layers.length, RADII.length));
  const uid = toSafeId(`${title}-${centerLabel}-${layers.map((layer) => layer.label).join("-")}`);
  const rootClass = `orbit-diagram-${uid}`;
  const centerGlowId = `orbit-center-glow-${uid}`;

  return (
    <div className={`my-6 overflow-hidden rounded-xl border border-border/60 bg-card ${rootClass}`}>
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/70">
          {title}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground/40">
          ◎ Diagrama Orbital
        </span>
      </div>

      <div className="flex flex-col items-center gap-3 p-4">
        <style>{`
          .${rootClass} .orbit-layer,
          .${rootClass} .orbit-ring,
          .${rootClass} .orbit-dep,
          .${rootClass} .orbit-legend-item {
            transition: opacity 0.2s, stroke-width 0.2s, filter 0.2s;
          }
          .${rootClass}:has(.orbit-layer:hover) .orbit-layer:not(:hover),
          .${rootClass}:has(.orbit-layer:hover) .orbit-ring,
          .${rootClass}:has(.orbit-layer:hover) .orbit-dep,
          .${rootClass}:has(.orbit-legend-item:hover) .orbit-layer,
          .${rootClass}:has(.orbit-legend-item:hover) .orbit-ring,
          .${rootClass}:has(.orbit-legend-item:hover) .orbit-dep,
          .${rootClass}:has(.orbit-legend-item:hover) .orbit-legend-item {
            opacity: 0.12;
          }
          ${layers
            .map(
              (_, i) => `
          .${rootClass}:has(.orbit-layer[data-layer="${i}"]:hover) .orbit-layer[data-layer="${i}"],
          .${rootClass}:has(.orbit-layer[data-layer="${i}"]:hover) .orbit-ring[data-layer="${i}"],
          .${rootClass}:has(.orbit-layer[data-layer="${i}"]:hover) .orbit-dep[data-layer="${i}"],
          .${rootClass}:has(.orbit-layer[data-layer="${i}"]:hover) .orbit-legend-item[data-layer="${i}"],
          .${rootClass}:has(.orbit-legend-item[data-layer="${i}"]:hover) .orbit-layer[data-layer="${i}"],
          .${rootClass}:has(.orbit-legend-item[data-layer="${i}"]:hover) .orbit-ring[data-layer="${i}"],
          .${rootClass}:has(.orbit-legend-item[data-layer="${i}"]:hover) .orbit-dep[data-layer="${i}"],
          .${rootClass}:has(.orbit-legend-item[data-layer="${i}"]:hover) .orbit-legend-item[data-layer="${i}"] {
            opacity: 1;
          }
          .${rootClass}:has(.orbit-layer[data-layer="${i}"]:hover) .orbit-layer[data-layer="${i}"],
          .${rootClass}:has(.orbit-legend-item[data-layer="${i}"]:hover) .orbit-layer[data-layer="${i}"] {
            filter: url(#orbit-glow-${uid}-${i});
          }
          .${rootClass}:has(.orbit-layer[data-layer="${i}"]:hover) .orbit-ring[data-layer="${i}"],
          .${rootClass}:has(.orbit-legend-item[data-layer="${i}"]:hover) .orbit-ring[data-layer="${i}"] {
            stroke-width: 1.5;
            opacity: 0.65;
          }`,
            )
            .join("\n")}
        `}</style>

        <svg
          viewBox="0 0 400 400"
          className="w-full max-w-sm"
          aria-label={title}
          role="img"
        >
          <defs>
            {layers.map((layer, i) => (
              <filter key={i} id={`orbit-glow-${uid}-${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}

            <filter id={centerGlowId} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {layers.map((layer, i) => (
              <marker
                key={i}
                id={`dep-arrow-${uid}-${i}`}
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

          {usedRadii.map((radius, i) => {
            if (i === 0) return null;
            const inner = usedRadii[i - 1];
            return (
              <line
                key={`dep-${i}`}
                className="orbit-dep"
                data-layer={i}
                x1={CX}
                y1={CY - radius + DOT_R + 2}
                x2={CX}
                y2={CY - inner - DOT_R - 2}
                stroke={layers[i].color}
                strokeWidth={1.2}
                strokeDasharray="4,3"
                markerEnd={`url(#dep-arrow-${uid}-${i})`}
                opacity={0.4}
              />
            );
          })}

          {usedRadii.map((radius, i) => (
            <circle
              key={`ring-${i}`}
              className="orbit-ring"
              data-layer={i}
              cx={CX}
              cy={CY}
              r={radius}
              fill="none"
              stroke={layers[i].color}
              strokeWidth={1}
              strokeDasharray="5,7"
              opacity={0.28}
            />
          ))}

          {layers.slice(0, usedRadii.length).map((layer, li) => {
            const radius = usedRadii[li];
            const pts = positions(layer.items.length, radius);

            return (
              <g
                key={`items-${li}`}
                className="orbit-layer"
                data-layer={li}
                style={{ cursor: "default", opacity: 1 }}
              >
                {pts.map((pt, pi) => (
                  <g key={pi}>
                    <circle cx={pt.x} cy={pt.y} r={DOT_R + 4} fill={layer.color} opacity={0.06} />
                    <circle cx={pt.x} cy={pt.y} r={DOT_R} fill={layer.color} opacity={0.9} />
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

          <g filter={`url(#${centerGlowId})`}>
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

        <div className="flex flex-wrap justify-center gap-2">
          <span
            className="flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wide"
            style={{ color: centerColor }}
          >
            <span className="inline-block size-1.5 rounded-full" style={{ background: centerColor }} />
            Centro
          </span>
          {layers.map((layer, i) => (
            <span
              key={layer.label}
              className="orbit-legend-item flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wide hover:bg-muted/50"
              data-layer={i}
              style={{ color: layer.color }}
            >
              <span className="inline-block size-1.5 rounded-full" style={{ background: layer.color }} />
              {layer.label}
            </span>
          ))}
        </div>

        <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted-foreground/35">
          Dependências fluem para o centro · Passe o mouse para destacar
        </p>
      </div>
    </div>
  );
}
