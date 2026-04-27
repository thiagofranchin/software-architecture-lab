"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import { cn } from "@/lib/utils";

type AutoHeightProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  contentRef?: RefObject<HTMLDivElement | null>;
  duration?: number;
};

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

export function AutoHeight({
  children,
  className,
  contentClassName,
  contentRef,
  duration = 360,
}: AutoHeightProps) {
  const internalContentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const transitionEndFallbackRef = useRef<number | null>(null);
  const isFirstMeasurementRef = useRef(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const resolvedContentRef = useMemo(
    () => contentRef ?? internalContentRef,
    [contentRef],
  );

  const [inlineHeight, setInlineHeight] = useState<string>("auto");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (transitionEndFallbackRef.current !== null) {
        window.clearTimeout(transitionEndFallbackRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    const contentElement = resolvedContentRef.current;
    const wrapperElement = wrapperRef.current;

    if (!contentElement || !wrapperElement) return;

    function getMeasuredHeight() {
      const currentContent = resolvedContentRef.current;
      if (!currentContent) return 0;

      return currentContent.scrollHeight;
    }

    function finishAnimation() {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (transitionEndFallbackRef.current !== null) {
        window.clearTimeout(transitionEndFallbackRef.current);
        transitionEndFallbackRef.current = null;
      }

      setIsAnimating(false);
      setInlineHeight("auto");
    }

    function animateToHeight(nextHeight: number) {
      const currentWrapper = wrapperRef.current;
      if (!currentWrapper) return;

      const currentHeight = currentWrapper.getBoundingClientRect().height;

      if (isFirstMeasurementRef.current || prefersReducedMotion) {
        isFirstMeasurementRef.current = false;
        setIsAnimating(false);
        setInlineHeight("auto");
        return;
      }

      if (Math.abs(currentHeight - nextHeight) < 1) {
        setIsAnimating(false);
        setInlineHeight("auto");
        return;
      }

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (transitionEndFallbackRef.current !== null) {
        window.clearTimeout(transitionEndFallbackRef.current);
      }

      setIsAnimating(true);
      setInlineHeight(`${currentHeight}px`);

      animationFrameRef.current = window.requestAnimationFrame(() => {
        setInlineHeight(`${nextHeight}px`);
        animationFrameRef.current = null;
      });

      transitionEndFallbackRef.current = window.setTimeout(
        finishAnimation,
        duration + 80,
      );
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const nextHeight = Math.max(entry.contentRect.height, getMeasuredHeight());
      animateToHeight(nextHeight);
    });

    observer.observe(contentElement);

    return () => {
      observer.disconnect();
      finishAnimation();
    };
  }, [duration, prefersReducedMotion, resolvedContentRef]);

  return (
    <div
      ref={wrapperRef}
      className={cn("overflow-hidden", className)}
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.propertyName !== "height") return;

        setIsAnimating(false);
        setInlineHeight("auto");

        if (transitionEndFallbackRef.current !== null) {
          window.clearTimeout(transitionEndFallbackRef.current);
          transitionEndFallbackRef.current = null;
        }
      }}
      style={{
        height: inlineHeight,
        transition: prefersReducedMotion
          ? undefined
          : `height ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: isAnimating ? "height" : undefined,
      }}
    >
      <div ref={resolvedContentRef} className={contentClassName}>
        {children}
      </div>
    </div>
  );
}
