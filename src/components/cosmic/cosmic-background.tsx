import type { CSSProperties } from "react";

type Star = {
  x: number;
  y: number;
  size: 1 | 2;
  minOpacity: number;
  maxOpacity: number;
  delay: number;
  duration: number;
};

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function generateStars(count: number, seed = 42): Star[] {
  const rand = lcg(seed);
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: rand() < 0.72 ? 1 : (2 as 1 | 2),
    minOpacity: 0.1 + rand() * 0.2,
    maxOpacity: 0.5 + rand() * 0.5,
    delay: rand() * 9,
    duration: 2 + rand() * 6,
  }));
}

type CosmicBackgroundProps = {
  starCount?: number;
  className?: string;
  nebulaVariant?: "default" | "violet" | "teal" | "none";
};

const nebulaStyles: Record<NonNullable<CosmicBackgroundProps["nebulaVariant"]>, string> = {
  default:
    "bg-[radial-gradient(ellipse_at_75%_20%,rgba(155,111,255,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(0,184,217,0.08)_0%,transparent_45%)]",
  violet:
    "bg-[radial-gradient(ellipse_at_70%_15%,rgba(155,111,255,0.18)_0%,transparent_50%),radial-gradient(ellipse_at_25%_75%,rgba(74,127,212,0.12)_0%,transparent_45%)]",
  teal:
    "bg-[radial-gradient(ellipse_at_65%_25%,rgba(0,184,217,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_30%_70%,rgba(62,207,142,0.10)_0%,transparent_45%)]",
  none: "",
};

export function CosmicBackground({
  starCount = 90,
  className = "",
  nebulaVariant = "default",
}: CosmicBackgroundProps) {
  const stars = generateStars(starCount);

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden",
        nebulaStyles[nebulaVariant],
        className,
      ].join(" ")}
    >
      {stars.map((star, i) => (
        <span
          key={i}
          className="cosmic-twinkle absolute rounded-full bg-white"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--star-min-opacity": star.minOpacity,
              "--star-max-opacity": star.maxOpacity,
              "--star-delay": `${star.delay}s`,
              "--star-duration": `${star.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
