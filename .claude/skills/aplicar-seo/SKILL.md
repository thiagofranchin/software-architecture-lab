# Skill: /aplicar-seo

Audita e aplica SEO profissional no Software Architecture Lab.

## Quando usar

- Após criar uma nova trilha ou conceito
- Ao adicionar uma nova página estática
- Para verificar a saúde geral do SEO do projeto
- Ao preparar o site para indexação/launch

---

## Arquitetura SEO do projeto

```
src/lib/seo.ts                          ← constantes e helpers centrais
src/components/seo/json-ld.tsx          ← componente de structured data
src/app/opengraph-image.tsx             ← OG image estático (1200×630, edge runtime)
src/app/layout.tsx                      ← metadata base (title template, OG global, Twitter)
src/app/robots.ts                       ← robots.txt
src/app/sitemap.ts                      ← sitemap.xml dinâmico
```

---

## Checklist de auditoria

Execute esta auditoria completa quando o usuário pedir `/aplicar-seo` sem especificar o escopo.

### 1 — Verificar `src/lib/seo.ts`

- [ ] `SITE_URL` aponta para a URL de produção correta (`NEXT_PUBLIC_SITE_URL` ou fallback)
- [ ] `SITE_KEYWORDS` contém as palavras-chave do projeto atualizadas
- [ ] `OG_IMAGE_URL` aponta para `/opengraph-image`

### 2 — Verificar `src/app/opengraph-image.tsx`

- [ ] Arquivo existe e exporta `runtime = "edge"`, `size`, `contentType` e default function
- [ ] A imagem tem 1200×630 px
- [ ] Textos refletem o branding atual do site

### 3 — Verificar `layout.tsx`

Confirme que `metadata` contém:
- [ ] `metadataBase` com `new URL(SITE_URL)`
- [ ] `title.template` no formato `%s · Software Architecture Lab`
- [ ] `description` usando `SITE_DESCRIPTION`
- [ ] `keywords` usando `SITE_KEYWORDS`
- [ ] `robots` com `index: true, follow: true` e `googleBot` configurado
- [ ] `openGraph.images` com `OG_IMAGE_URL`
- [ ] `twitter.card: "summary_large_image"` e `twitter.images`

### 4 — Verificar cada página estática

Para cada arquivo em `src/app/*/page.tsx` (exceto `[slug]`), confirme:
- [ ] Exporta `metadata` usando `buildMetadata({ title, description, path, keywords })`
- [ ] `title` é descritivo e contém palavras-chave relevantes (60–70 chars)
- [ ] `description` está entre 120–160 chars e contém termos de busca naturais
- [ ] `path` está correto (ex: `/trilhas`, `/glossario`)
- [ ] `keywords` tem 4–8 termos específicos da página

### 5 — Verificar páginas dinâmicas `[slug]`

Para `trilhas/[slug]/page.tsx`:
- [ ] `generateMetadata` usa `buildMetadata` com `type: "article"` e `tags: trilha.tags`
- [ ] Inclui `<JsonLd schema={[schemaCourse(...), schemaBreadcrumb(...)]} />`
- [ ] `schemaCourse` recebe `title, description, slug, level, tags`
- [ ] `schemaBreadcrumb` inclui: Home → Trilhas → Título da trilha

Para `conceitos/[slug]/page.tsx`:
- [ ] `generateMetadata` usa `buildMetadata` com `type: "article"` e `tags: conceito.tags`
- [ ] Inclui `<JsonLd schema={[schemaArticle(...), schemaBreadcrumb(...)]} />`
- [ ] `schemaBreadcrumb` inclui: Home → Conceitos → [Trilha se houver] → Título do conceito

### 6 — Verificar `robots.ts`

- [ ] `allow: "/"` está presente
- [ ] `disallow` inclui `["/api/", "/_next/", "/static/"]`
- [ ] `sitemap` aponta para `${SITE_URL}/sitemap.xml`
- [ ] `host` está definido

### 7 — Verificar `sitemap.ts`

- [ ] Todas as rotas estáticas estão listadas com `priority` correto
- [ ] Homepage tem `priority: 1.0`
- [ ] `/trilhas` e `/conceitos` têm `priority: 0.9`
- [ ] Páginas de trilha têm `priority: 0.8`
- [ ] Páginas de conceito têm `priority: 0.7`
- [ ] `changeFrequency` é adequado para cada tipo de página

---

## Como aplicar SEO em uma nova trilha

Ao criar uma nova trilha em `src/content/trilhas/<slug>.mdx`, o `generateMetadata` em `trilhas/[slug]/page.tsx` já gera metadados automaticamente a partir do frontmatter. Verifique:

1. **`tags`** no frontmatter — são as palavras-chave da trilha; use 4–8 tags descritivas
2. **`description`** no frontmatter — será o `meta description`; escreva entre 120–160 chars com termos de busca naturais
3. **`title`** no frontmatter — será o `<title>`; use palavras-chave no início se possível

Exemplo de frontmatter otimizado para SEO:
```yaml
title: "Design Patterns com TypeScript"
description: "Aprenda os principais design patterns — Strategy, Observer, Factory e Adapter — com exemplos práticos em TypeScript. Saiba quando usar e quando evitar cada padrão."
tags: [design-patterns, strategy, observer, factory, adapter, TypeScript]
```

## Como aplicar SEO em um novo conceito

Mesma lógica: o `generateMetadata` em `conceitos/[slug]/page.tsx` usa o frontmatter. Garanta:

1. **`description`** — 120–160 chars, contendo "o que é X", "como usar X" ou "quando usar X"
2. **`tags`** — 4–8 termos técnicos que desenvolvedores pesquisariam

## Como adicionar uma nova página estática

1. Crie `src/app/<rota>/page.tsx`
2. Importe `buildMetadata` de `@/lib/seo`
3. Exporte `metadata` usando `buildMetadata`:

```typescript
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Título da Página com Palavras-chave",
  description: "Descrição de 120–160 chars com termos de busca relevantes e uma proposta de valor clara.",
  path: "/rota-da-pagina",
  keywords: [
    "termo específico 1",
    "termo específico 2",
    "termo específico 3",
  ],
});
```

4. Adicione a rota ao `sitemap.ts` com `priority` e `changeFrequency` adequados

---

## Adicionar JSON-LD a uma nova página

Para páginas informacionais importantes, adicione structured data:

```typescript
import { JsonLd } from "@/components/seo/json-ld";
import { schemaBreadcrumb, SITE_URL } from "@/lib/seo";

// No JSX:
<JsonLd schema={schemaBreadcrumb([
  { name: "Home", url: SITE_URL },
  { name: "Página Atual", url: `${SITE_URL}/rota` },
])} />
```

Schemas disponíveis em `src/lib/seo.ts`:
| Função | Uso |
|---|---|
| `schemaWebSite()` | Homepage — SearchAction |
| `schemaOrganization()` | Homepage — dados da organização |
| `schemaCourse(...)` | Páginas de trilha |
| `schemaArticle(...)` | Páginas de conceito |
| `schemaBreadcrumb(...)` | Qualquer página com navegação hierárquica |
| `schemaEducationalResource(...)` | Páginas educacionais genéricas |

---

## Verificar build

```bash
npm run build
```

Erros comuns:
- `buildMetadata` retorna campos que conflitam com o `metadata` base do `layout.tsx` → use `buildMetadata` apenas nas páginas, nunca no layout
- Importar `SITE_NAME` ou `SITE_URL` no layout já importa do `seo.ts` — não defina variáveis locais

---

## Relatório de saúde SEO

Emita um relatório com o formato:

```
✅ layout.tsx — metadataBase, title template, OG, Twitter configurados
✅ opengraph-image.tsx — imagem 1200×630 gerada pelo Edge Runtime
✅ robots.ts — allow, disallow e sitemap configurados
✅ sitemap.ts — N trilhas + M conceitos + 6 páginas estáticas
⚠️  conceitos/design-patterns/page.tsx — description muito curta (89 chars)
❌ trilhas/nova-trilha/page.tsx — metadata ausente
```
