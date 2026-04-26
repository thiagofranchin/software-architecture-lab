import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { cache } from "react";

import { parseFrontmatter } from "@/lib/content/frontmatter";
import type { ContentItem } from "@/types/content";

const contentRoot = path.join(process.cwd(), "src", "content");

async function readMdxDirectory(dirName: string): Promise<ContentItem[]> {
  const dir = path.join(contentRoot, dirName);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const files = entries.filter((entry) => entry.endsWith(".mdx"));
  const items = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const raw = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(raw);
      const frontmatter = parseFrontmatter(data, filePath);
      return {
        ...frontmatter,
        body: content,
        filePath,
      } satisfies ContentItem;
    }),
  );

  return items
    .filter((item) => item.published)
    .sort((a, b) => {
      if (a.order != null && b.order != null) return a.order - b.order;
      if (a.order != null) return -1;
      if (b.order != null) return 1;
      return a.title.localeCompare(b.title, "pt-BR");
    });
}

export const getAllTrilhas = cache(() => readMdxDirectory("trilhas"));
export const getAllConceitos = cache(() => readMdxDirectory("conceitos"));

export const getTrilhaBySlug = cache(async (slug: string) => {
  const all = await getAllTrilhas();
  return all.find((item) => item.slug === slug) ?? null;
});

export const getConceitoBySlug = cache(async (slug: string) => {
  const all = await getAllConceitos();
  return all.find((item) => item.slug === slug) ?? null;
});

export async function getRelatedConceitos(slugs: string[]) {
  const all = await getAllConceitos();
  return slugs
    .map((slug) => all.find((item) => item.slug === slug))
    .filter((item): item is ContentItem => Boolean(item));
}

export async function getTrilhaForConceito(conceitoSlug: string) {
  const trilhas = await getAllTrilhas();
  return trilhas.find((t) => t.related.includes(conceitoSlug)) ?? null;
}

export async function getConceitosInTrilha(trilhaSlug: string) {
  const trilha = await getTrilhaBySlug(trilhaSlug);
  if (!trilha) return [];
  const all = await getAllConceitos();
  return trilha.related
    .map((slug) => all.find((c) => c.slug === slug))
    .filter((c): c is ContentItem => Boolean(c));
}
