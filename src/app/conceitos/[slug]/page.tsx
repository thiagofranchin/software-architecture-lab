import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryBadge } from "@/components/content/category-badge";
import { RelatedContent } from "@/components/content/related-content";
import { PageContainer } from "@/components/layout/page-container";
import { MdxContent } from "@/components/mdx/mdx-content";
import { getAllConceitos, getConceitoBySlug } from "@/lib/content/loader";

type Params = { slug: string };

export async function generateStaticParams() {
  const conceitos = await getAllConceitos();
  return conceitos.map((conceito) => ({ slug: conceito.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const conceito = await getConceitoBySlug(slug);
  if (!conceito) return { title: "Conceito não encontrado" };
  return {
    title: conceito.title,
    description: conceito.description,
    openGraph: {
      title: conceito.title,
      description: conceito.description,
      type: "article",
    },
  };
}

export default async function ConceitoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const conceito = await getConceitoBySlug(slug);
  if (!conceito) notFound();

  return (
    <PageContainer size="narrow" className="py-12">
      <Link
        href="/conceitos"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Voltar para conceitos
      </Link>

      <header className="mt-6 border-b border-border/60 pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={conceito.category} />
          <span className="rounded-md border border-border/60 px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
            {conceito.level}
          </span>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Clock className="size-3" />
            {conceito.duration}
          </span>
        </div>
        <h1 className="mt-4 font-serif text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          {conceito.title}
        </h1>
        <p className="mt-4 text-lg leading-7 text-muted-foreground">
          {conceito.description}
        </p>
      </header>

      <article className="mt-8">
        <MdxContent source={conceito.body} />
      </article>

      <RelatedContent slugs={conceito.related} />
    </PageContainer>
  );
}
