import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { categoryToToken, type Category } from "@/types/content";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide whitespace-nowrap",
  {
    variants: {
      tone: {
        solid: "",
        soft: "",
        outline: "border bg-transparent",
      },
      size: {
        sm: "px-2 py-0.5 text-[0.7rem]",
        md: "px-2.5 py-0.5 text-xs",
      },
    },
    defaultVariants: {
      tone: "solid",
      size: "md",
    },
  },
);

type CategoryBadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    category: Category;
  };

const toneClasses: Record<Category, Record<"solid" | "soft" | "outline", string>> = {
  Fundamentos: {
    solid: "bg-category-fundamentos text-category-fundamentos-foreground",
    soft: "bg-category-fundamentos/15 text-category-fundamentos",
    outline: "border-category-fundamentos/60 text-category-fundamentos",
  },
  Frontend: {
    solid: "bg-category-frontend text-category-frontend-foreground",
    soft: "bg-category-frontend/20 text-foreground",
    outline: "border-category-frontend/60 text-category-frontend-foreground",
  },
  Backend: {
    solid: "bg-category-backend text-category-backend-foreground",
    soft: "bg-category-backend/15 text-category-backend",
    outline: "border-category-backend/60 text-category-backend",
  },
  Patterns: {
    solid: "bg-category-patterns text-category-patterns-foreground",
    soft: "bg-category-patterns/25 text-foreground",
    outline: "border-category-patterns/70 text-foreground",
  },
  Prática: {
    solid: "bg-category-pratica text-category-pratica-foreground",
    soft: "bg-category-pratica/15 text-category-pratica",
    outline: "border-category-pratica/60 text-category-pratica",
  },
};

export function CategoryBadge({
  category,
  tone = "solid",
  size,
  className,
  ...props
}: CategoryBadgeProps) {
  const toneKey: "solid" | "soft" | "outline" = tone ?? "solid";
  return (
    <span
      data-category={categoryToToken[category]}
      className={cn(
        badgeVariants({ tone, size }),
        toneClasses[category][toneKey],
        className,
      )}
      {...props}
    >
      {category}
    </span>
  );
}
