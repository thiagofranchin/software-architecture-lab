"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

/**
 * Data estelar decorativa no formato TNG (ex: SD 39447.3).
 * Resolvida apenas no cliente (via useSyncExternalStore) para
 * evitar mismatch de hidratação entre servidor e navegador.
 */
function computeStardate(date: Date): string {
  const startOfYear = new Date(date.getFullYear(), 0, 1).getTime();
  const endOfYear = new Date(date.getFullYear() + 1, 0, 1).getTime();
  const yearFraction = (date.getTime() - startOfYear) / (endOfYear - startOfYear);
  const stardate = (date.getFullYear() - 1987) * 1000 + yearFraction * 1000;
  return stardate.toFixed(1);
}

let cachedStardate: string | null = null;

function subscribe() {
  return () => {};
}

function getStardate(): string {
  cachedStardate ??= computeStardate(new Date());
  return cachedStardate;
}

function getServerStardate(): string {
  return "—";
}

export function Stardate({ className }: { className?: string }) {
  const stardate = useSyncExternalStore(subscribe, getStardate, getServerStardate);

  return (
    <span
      className={cn("lcars-readout tabular-nums text-muted-foreground/70", className)}
    >
      SD {stardate}
    </span>
  );
}
