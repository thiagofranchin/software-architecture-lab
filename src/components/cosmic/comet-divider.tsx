"use client";

import { useId } from "react";

type CometDividerProps = {
  duration?: number;
  delay?: number;
};

export function CometDivider({ duration = 4, delay = 0.5 }: CometDividerProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className="relative h-12 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes cometd-travel-${uid} {
          0%   { transform: translateX(-8%);   opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateX(108%);  opacity: 0; }
        }
        @keyframes cometd-tail-${uid} {
          0%   { transform: translateX(-8%);   opacity: 0; }
          8%   { opacity: 0.4; }
          88%  { opacity: 0.4; }
          100% { transform: translateX(108%);  opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cometd-head-${uid},
          .cometd-tail-${uid} { display: none !important; }
        }
      `}</style>

      {/* Horizontal separator line */}
      <div className="absolute top-1/2 inset-x-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      {/* Comet tail */}
      <div
        className={`cometd-tail-${uid} absolute top-1/2 -translate-y-1/2 left-0 right-0`}
        style={{
          animation: `cometd-tail-${uid} ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-24"
          style={{
            background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.5))",
          }}
        />
      </div>

      {/* Comet head */}
      <div
        className={`cometd-head-${uid} absolute top-1/2 -translate-y-1/2 left-0 right-0`}
        style={{
          animation: `cometd-travel-${uid} ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        <div
          className="absolute left-0 size-2 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            top: "50%",
            background: "hsl(var(--primary))",
            boxShadow: "0 0 8px 2px hsl(var(--primary) / 0.6)",
          }}
        />
      </div>
    </div>
  );
}
