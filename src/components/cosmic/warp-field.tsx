import type { CSSProperties } from "react";

type Streak = {
  y: number;
  width: number;
  duration: number;
  delay: number;
  opacity: number;
};

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function generateStreaks(count: number, seed = 7): Streak[] {
  const rand = lcg(seed);
  return Array.from({ length: count }, () => ({
    y: rand() * 100,
    width: 60 + rand() * 160,
    duration: 3.5 + rand() * 5,
    delay: rand() * 8,
    opacity: 0.25 + rand() * 0.5,
  }));
}

type WarpFieldProps = {
  streakCount?: number;
  className?: string;
};

/**
 * Rastros horizontais de estrelas em velocidade de dobra,
 * como na abertura da série. Determinístico (seed fixa) para
 * renderização estável entre servidor e cliente.
 */
export function WarpField({ streakCount = 14, className = "" }: WarpFieldProps) {
  const streaks = generateStreaks(streakCount);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {streaks.map((streak, i) => (
        <span
          key={i}
          className="warp-streak absolute h-px rounded-full bg-linear-to-r from-transparent via-primary/70 to-transparent opacity-0"
          style={
            {
              top: `${streak.y}%`,
              width: `${streak.width}px`,
              "--warp-duration": `${streak.duration}s`,
              "--warp-delay": `${streak.delay}s`,
              "--warp-opacity": streak.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
