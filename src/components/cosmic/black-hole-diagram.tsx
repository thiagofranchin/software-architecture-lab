type CouplingStrength = "tight" | "medium" | "loose";

type Satellite = {
  label: string;
  coupling?: CouplingStrength;
};

type BlackHoleDiagramProps = {
  title?: string;
  centerLabel: string;
  satellites?: Satellite[];
};

const VIEWBOX_SIZE = 520;
const CX = VIEWBOX_SIZE / 2;
const CY = VIEWBOX_SIZE / 2;
const SAT_R = 24;

const COUPLING_CONFIG: Record<CouplingStrength, { radius: number; strokeDash: string; lineOpacity: number; color: string }> = {
  tight: { radius: 122, strokeDash: "none", lineOpacity: 0.92, color: "#e07040" },
  medium: { radius: 186, strokeDash: "6,3", lineOpacity: 0.62, color: "#9b6fff" },
  loose: { radius: 236, strokeDash: "3,8", lineOpacity: 0.4, color: "#3ecf8e" },
};

const DEFAULT_SATELLITES: Satellite[] = [
  { label: "Database", coupling: "tight" },
  { label: "Mailer", coupling: "tight" },
  { label: "Logger", coupling: "medium" },
  { label: "Cache", coupling: "medium" },
  { label: "HttpClient", coupling: "loose" },
  { label: "Config", coupling: "loose" },
];

function toSafeId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "black-hole";
}

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

function labelPosition(
  angle: number,
  x: number,
  y: number,
): { x: number; y: number; anchor: "start" | "middle" | "end" } {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const sideOffset = SAT_R + 18;
  const verticalOffset = SAT_R + 18;

  if (x < VIEWBOX_SIZE * 0.22) {
    return { x: x + sideOffset, y, anchor: "start" };
  }

  if (x > VIEWBOX_SIZE * 0.78) {
    return { x: x - sideOffset, y, anchor: "end" };
  }

  if (Math.abs(cos) < 0.35) {
    return {
      x,
      y: y + Math.sign(sin || 1) * verticalOffset,
      anchor: "middle",
    };
  }

  return {
    x: x + Math.sign(cos || 1) * sideOffset,
    y,
    anchor: cos > 0 ? "start" : "end",
  };
}

export function BlackHoleDiagram({ title = "Mapa de Acoplamento", centerLabel = "", satellites }: BlackHoleDiagramProps) {
  const resolvedSatellites = satellites?.length ? satellites : DEFAULT_SATELLITES;
  const sats = satellitePositions(resolvedSatellites);
  const uid = toSafeId(`${title}-${centerLabel}-${resolvedSatellites.map((sat) => `${sat.label}-${sat.coupling ?? "medium"}`).join("-")}`);
  const coreGradId = `bh-core-grad-${uid}`;
  const glowGradId = `bh-glow-grad-${uid}`;
  const coreFilterId = `bh-filter-${uid}`;
  const satGlowId = `sat-glow-${uid}`;

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/70">
          {title}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground/40">
          ● Campo Gravitacional
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="rounded-2xl border border-primary/10 bg-linear-to-br from-primary/5 via-background to-background px-3 py-4 sm:px-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary/70">
                força do acoplamento
              </div>
              <div className="mt-1 text-sm text-foreground/80">
                Quanto mais perto do núcleo, mais rígida e arriscada é a dependência.
              </div>
            </div>
          </div>

          <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          className="bh-diagram w-full max-w-2xl"
          aria-label={title}
          role="img"
        >
          <defs>
            <radialGradient id={coreGradId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#070b14" stopOpacity="1" />
              <stop offset="60%" stopColor="#1a0a2e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2d1b69" stopOpacity="0" />
            </radialGradient>

            <radialGradient id={glowGradId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9b6fff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9b6fff" stopOpacity="0" />
            </radialGradient>

            <filter id={coreFilterId} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id={satGlowId} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {(["tight", "medium", "loose"] as CouplingStrength[]).map((c) => (
              <marker key={c} id={`bh-arr-${uid}-${c}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill={COUPLING_CONFIG[c].color} opacity={0.8} />
              </marker>
            ))}
          </defs>

          {/* CSS hover effects — sem "use client" ou useState */}
          <style>{`
            .bh-sat { cursor: default; transition: opacity 0.2s; }
            .bh-sat .bh-sat-halo { transition: opacity 0.2s; }
            .bh-sat:hover .bh-sat-halo { opacity: 0.22 !important; }
            .bh-sat .bh-sat-body { transition: stroke-width 0.2s; }
            .bh-sat:hover .bh-sat-body { stroke-width: 2; }
            .bh-sat .bh-sat-badge { opacity: 0; transition: opacity 0.15s; }
            .bh-sat:hover .bh-sat-badge { opacity: 1; }
            .bh-sat:hover { filter: url(#${satGlowId}); }
            .bh-diagram:has(.bh-sat:hover) .bh-sat:not(:hover) { opacity: 0.25; }
            .bh-diagram:has(.bh-sat:hover) .bh-line { opacity: 0.14; }
          `}</style>

          {/* Anéis de fundo */}
          {[64, 98, 136, 186, 236].map((r, i) => (
            <circle
              key={r}
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke="#9b6fff"
              strokeWidth={0.7}
              opacity={0.08 + i * 0.015}
              strokeDasharray="3,10"
            />
          ))}

          {/* Linhas de dependência */}
          {sats.map((sat, i) => {
            const endR = 36;
            const dx = sat.x - CX;
            const dy = sat.y - CY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const nx = dx / dist;
            const ny = dy / dist;
            return (
              <line
                key={i}
                className="bh-line"
                x1={sat.x - nx * SAT_R}
                y1={sat.y - ny * SAT_R}
                x2={CX + nx * endR}
                y2={CY + ny * endR}
                stroke={sat.cfg.color}
                strokeWidth={1.9}
                strokeDasharray={sat.cfg.strokeDash === "none" ? undefined : sat.cfg.strokeDash}
                markerEnd={`url(#bh-arr-${uid}-${sat.coupling ?? "medium"})`}
                opacity={sat.cfg.lineOpacity}
                style={{ transition: "opacity 0.2s" }}
              />
            );
          })}

          {/* Satélites */}
          {sats.map((sat, i) => {
            const label = labelPosition(sat.angle, sat.x, sat.y);
            return (
              <g key={i} className="bh-sat">
                <circle className="bh-sat-halo" cx={sat.x} cy={sat.y} r={SAT_R + 8} fill={sat.cfg.color} opacity={0.1} />
                <circle
                  className="bh-sat-body"
                  cx={sat.x}
                  cy={sat.y}
                  r={SAT_R}
                  fill={`${sat.cfg.color}28`}
                  stroke={sat.cfg.color}
                  strokeWidth={1.75}
                />
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor={label.anchor}
                  dominantBaseline="middle"
                  fontSize={11}
                  fontWeight={700}
                  fontFamily="var(--font-mono)"
                  fill={sat.cfg.color}
                  opacity={0.96}
                >
                  {sat.label}
                </text>
                <text
                  className="bh-sat-badge"
                  x={sat.x}
                  y={sat.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={8.5}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill={sat.cfg.color}
                >
                  {(sat.coupling ?? "medium").toUpperCase().slice(0, 1)}
                </text>
              </g>
            );
          })}

          {/* Buraco negro central */}
          <g filter={`url(#${coreFilterId})`}>
            <circle cx={CX} cy={CY} r={72} fill={`url(#${glowGradId})`} />
            <circle cx={CX} cy={CY} r={54} fill={`url(#${coreGradId})`} />
            <circle cx={CX} cy={CY} r={38} fill="#070b14" stroke="#9b6fff" strokeWidth={1.75} strokeOpacity={0.6} />
          </g>
          <text
            x={CX}
            y={CY - 7}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fontWeight={700}
            fontFamily="var(--font-mono)"
            fill="#c084fc"
          >
            {centerLabel}
          </text>
          <text
            x={CX}
            y={CY + 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={8}
            fontFamily="var(--font-mono)"
            fill="#9b6fff"
            opacity={0.78}
          >
            {resolvedSatellites.length} dep.
          </text>
        </svg>
          </div>
        </div>

        {/* Legenda */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 rounded-2xl border border-border/50 bg-background/70 px-4 py-3">
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

        <p className="mt-3 text-center font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted-foreground/35">
          Linhas sólidas = alto acoplamento · Passe o mouse para inspecionar
        </p>
      </div>
    </div>
  );
}
