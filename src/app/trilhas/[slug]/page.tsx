import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryBadge } from "@/components/content/category-badge";
import { RelatedContent } from "@/components/content/related-content";
import { PageContainer } from "@/components/layout/page-container";
import { MdxContent } from "@/components/mdx/mdx-content";
import { getAllTrilhas, getTrilhaBySlug } from "@/lib/content/loader";

type Params = { slug: string };

export async function generateStaticParams() {
  const trilhas = await getAllTrilhas();
  return trilhas.map((trilha) => ({ slug: trilha.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trilha = await getTrilhaBySlug(slug);
  if (!trilha) return { title: "Trilha não encontrada" };
  return {
    title: trilha.title,
    description: trilha.description,
    openGraph: {
      title: trilha.title,
      description: trilha.description,
      type: "article",
    },
  };
}

export default async function TrilhaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const trilha = await getTrilhaBySlug(slug);
  if (!trilha) notFound();

  return (
    <PageContainer size="narrow" className="py-12">
      <Link
        href="/trilhas"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Voltar para trilhas
      </Link>

      <header className="mt-6 border-b border-border/60 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={trilha.category} />
          <span className="rounded-md border border-border/60 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
            {trilha.level}
          </span>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Clock className="size-3" />
            {trilha.duration}
          </span>
        </div>
        <h1 className="mt-4 font-serif text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          {trilha.title}
        </h1>
        <p className="mt-4 text-lg leading-7 text-muted-foreground">
          {trilha.description}
        </p>
        {trilha.tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {trilha.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-muted px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground"
              >
                #{tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <article className="mt-8">
        <MdxContent source={trilha.body} />
      </article>

      <RelatedContent slugs={trilha.related} />
    </PageContainer>
  );
}
