import {
  categories,
  levels,
  type Category,
  type ContentFrontmatter,
  type Level,
} from "@/types/content";

function isCategory(value: unknown): value is Category {
  return (
    typeof value === "string" &&
    (categories as readonly string[]).includes(value)
  );
}

function isLevel(value: unknown): value is Level {
  return (
    typeof value === "string" && (levels as readonly string[]).includes(value)
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

export function parseFrontmatter(
  raw: Record<string, unknown>,
  filePath: string,
): ContentFrontmatter {
  const errors: string[] = [];

  if (typeof raw.title !== "string") errors.push("title (string)");
  if (typeof raw.slug !== "string") errors.push("slug (string)");
  if (typeof raw.description !== "string") errors.push("description (string)");
  if (!isCategory(raw.category))
    errors.push(`category (uma de: ${categories.join(", ")})`);
  if (!isLevel(raw.level)) errors.push(`level (um de: ${levels.join(", ")})`);
  if (typeof raw.duration !== "string") errors.push("duration (string)");
  if (!isStringArray(raw.tags)) errors.push("tags (string[])");
  if (!isStringArray(raw.related)) errors.push("related (string[])");
  if (typeof raw.published !== "boolean") errors.push("published (boolean)");

  if (errors.length > 0) {
    throw new Error(
      `Frontmatter inválido em ${filePath}. Campos esperados: ${errors.join(", ")}`,
    );
  }

  return {
    title: raw.title as string,
    slug: raw.slug as string,
    description: raw.description as string,
    category: raw.category as Category,
    level: raw.level as Level,
    duration: raw.duration as string,
    tags: raw.tags as string[],
    related: raw.related as string[],
    published: raw.published as boolean,
  };
}
