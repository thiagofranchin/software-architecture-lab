import type { MetadataRoute } from "next";

import { getAllConceitos, getAllTrilhas } from "@/lib/content/loader";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sal-lab.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [trilhas, conceitos] = await Promise.all([
    getAllTrilhas(),
    getAllConceitos(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/trilhas",
    "/conceitos",
    "/glossario",
    "/roadmap",
    "/sobre",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const trilhaRoutes: MetadataRoute.Sitemap = trilhas.map((trilha) => ({
    url: `${baseUrl}/trilhas/${trilha.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const conceitoRoutes: MetadataRoute.Sitemap = conceitos.map((conceito) => ({
    url: `${baseUrl}/conceitos/${conceito.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...trilhaRoutes, ...conceitoRoutes];
}
