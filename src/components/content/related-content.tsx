import { ConceptCard } from "@/components/content/concept-card";
import { getRelatedConceitos } from "@/lib/content/loader";

type RelatedContentProps = {
  slugs: string[];
  title?: string;
};

export async function RelatedContent({
  slugs,
  title = "Conteúdos relacionados",
}: RelatedContentProps) {
  if (!slugs || slugs.length === 0) return null;

  const items = await getRelatedConceitos(slugs);
  if (items.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border/60 pt-10">
      <h2 className="mb-5 font-serif text-xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ConceptCard
            key={item.slug}
            title={item.title}
            description={item.description}
            slug={item.slug}
            category={item.category}
            level={item.level}
            duration={item.duration}
          />
        ))}
      </div>
    </section>
  );
}
