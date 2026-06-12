"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

type ThemeToggleProps = {
  className?: string;
  variant?: "default" | "compact";
};

const STORAGE_KEY = "theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  // Modo escuro é o padrão — a ponte da Enterprise opera com as luzes baixas
  return stored === "light" ? "light" : "dark";
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function ThemeToggle({
  className,
  variant = "default",
}: ThemeToggleProps = {}) {
  const theme = useSyncExternalStore(
    subscribe,
    readTheme,
    () => "dark" as Theme,
  );

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }

  const isDark = theme === "dark";

  if (variant === "compact") {
    return (
      <Button
        aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
        className={cn("rounded-full", className)}
        onClick={toggleTheme}
        size="icon-sm"
        type="button"
        variant="ghost"
      >
        {isDark ? <Sun /> : <Moon />}
      </Button>
    );
  }

  return (
    <Button
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      className={cn(
        "rounded-full border border-border/70 bg-card/80 px-4 text-card-foreground shadow-md backdrop-blur-sm",
        className,
      )}
      onClick={toggleTheme}
      size="sm"
      type="button"
      variant="outline"
    >
      {isDark ? <Sun /> : <Moon />}
      {isDark ? "Light" : "Dark"}
    </Button>
  );
}
