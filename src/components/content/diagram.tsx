"use client";

import mermaid from "mermaid";
import { useEffect, useId, useRef, useState } from "react";

type DiagramProps = {
  code: string;
};

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#f97316",
    primaryTextColor: "#1a1a1a",
    primaryBorderColor: "#f97316",
    lineColor: "#9ca3af",
    secondaryColor: "#fef3c7",
    tertiaryColor: "#f3f4f6",
  },
});

export function Diagram({ code }: DiagramProps) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    setError(null);

    mermaid
      .render(`diagram-${id}`, code.trim())
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      })
      .catch((err: Error) => {
        setError(err.message ?? "Erro ao renderizar diagrama.");
      });
  }, [code, id]);

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-destructive/40 bg-destructive/10 p-4 font-mono text-xs text-destructive">
        Erro no diagrama: {error}
      </div>
    );
  }

  return (
    <div className="my-6 flex justify-center overflow-x-auto rounded-xl border border-border/60 bg-card p-6">
      <div ref={ref} className="max-w-full [&_svg]:max-w-full" />
    </div>
  );
}
