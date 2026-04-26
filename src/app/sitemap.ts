import type { MetadataRoute } from "next";

import { getAllConceitos, getAllTrilhas } from "@/lib/content/loader";
import { SITE_URL } from "@/lib/seo";

const LAUNCH_DATE = new Date("2025-01-01");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [trilhas, conceitos] = await Promise.all([
    getAllTrilhas(),
    getAllConceitos(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: LAUNCH_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/trilhas`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/conceitos`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/glossario`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/roadmap`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const trilhaRoutes: MetadataRoute.Sitemap = trilhas.map((trilha) => ({
    url: `${SITE_URL}/trilhas/${trilha.slug}`,
    lastModified: LAUNCH_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const conceitoRoutes: MetadataRoute.Sitemap = conceitos.map((conceito) => ({
    url: `${SITE_URL}/conceitos/${conceito.slug}`,
    lastModified: LAUNCH_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...trilhaRoutes, ...conceitoRoutes];
}
