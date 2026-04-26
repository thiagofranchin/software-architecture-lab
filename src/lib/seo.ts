import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sal-lab.vercel.app";

export const SITE_NAME = "Software Architecture Lab";

export const SITE_DESCRIPTION =
  "Laboratório visual e prático para aprender arquitetura de software — trilhas progressivas, conceitos com exemplos comparativos, diagramas e exercícios interativos. Do frontend ao backend.";

export const SITE_KEYWORDS = [
  "arquitetura de software",
  "clean architecture",
  "design patterns",
  "arquitetura frontend",
  "arquitetura backend",
  "hexagonal architecture",
  "SOLID",
  "domain driven design",
  "DDD",
  "dependency injection",
  "injeção de dependência",
  "repository pattern",
  "service layer",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "refatoração",
  "code smells",
  "strategy pattern",
  "observer pattern",
  "factory pattern",
  "adapter pattern",
  "separação de responsabilidades",
  "acoplamento",
  "coesão",
  "trilha de aprendizado",
  "curso arquitetura de software",
  "aprender programação",
];

export const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;

export const SITE_AUTHOR = {
  name: SITE_NAME,
  url: SITE_URL,
};

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "",
  keywords = [],
  type = "website",
  publishedTime,
  tags = [],
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const allKeywords = [...new Set([...SITE_KEYWORDS.slice(0, 6), ...keywords])];

  const ogArticleExtra =
    type === "article" && publishedTime
      ? { publishedTime, tags, authors: [SITE_URL] }
      : {};

  return {
    title,
    description,
    keywords: allKeywords,
    authors: [SITE_AUTHOR],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: type === "article" ? "article" : "website",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_NAME}`,
          type: "image/png",
        },
      ],
      ...ogArticleExtra,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_URL],
      site: "@SoftArchLab",
      creator: "@SoftArchLab",
    },
  };
}

// ─── JSON-LD schema builders ──────────────────────────────────────────────────

export function schemaWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/conceitos?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function schemaOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
      width: 32,
      height: 32,
    },
  };
}

export function schemaBreadcrumb(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function schemaCourse({
  title,
  description,
  slug,
  level,
  tags = [],
}: {
  title: string;
  description: string;
  slug: string;
  level: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description,
    url: `${SITE_URL}/trilhas/${slug}`,
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
    educationalLevel: level,
    keywords: tags.join(", "),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };
}

export function schemaArticle({
  title,
  description,
  slug,
  tags = [],
}: {
  title: string;
  description: string;
  slug: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: `${SITE_URL}/conceitos/${slug}`,
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
    keywords: tags.join(", "),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
    },
  };
}

export function schemaEducationalResource({
  title,
  description,
  url,
  level,
}: {
  title: string;
  description: string;
  url: string;
  level: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: title,
    description,
    url,
    inLanguage: "pt-BR",
    isAccessibleForFree: true,
    educationalLevel: level,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
