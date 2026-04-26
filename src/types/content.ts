export const categories = [
  "Fundamentos",
  "Frontend",
  "Backend",
  "Patterns",
  "Prática",
] as const;

export type Category = (typeof categories)[number];

export const levels = ["Iniciante", "Intermediário", "Avançado"] as const;

export type Level = (typeof levels)[number];

export type ContentFrontmatter = {
  title: string;
  slug: string;
  description: string;
  category: Category;
  level: Level;
  duration: string;
  tags: string[];
  related: string[];
  published: boolean;
  order?: number;
};

export type ContentItem = ContentFrontmatter & {
  body: string;
  filePath: string;
};

export type Trilha = ContentItem;
export type Conceito = ContentItem;

export const categoryToToken: Record<Category, string> = {
  Fundamentos: "category-fundamentos",
  Frontend: "category-frontend",
  Backend: "category-backend",
  Patterns: "category-patterns",
  Prática: "category-pratica",
};
