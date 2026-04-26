"use client";

import type { CSSProperties, ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type AnimateOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  distance = 24,
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-out", className)}
      style={
        {
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0px)" : `translateY(${distance}px)`,
          transitionDelay: inView ? `${delay}ms` : "0ms",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
