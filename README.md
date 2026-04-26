# Software Architecture Lab

> Site publicado: **[https://sal-lab.vercel.app/](https://sal-lab.vercel.app/)**

Laboratório visual e prático para aprender arquitetura de software, voltado a desenvolvedores frontend, backend e fullstack. Combina trilhas progressivas, conceitos catalogados, exemplos comparativos (antipattern × recomendado), diagramas interativos e um glossário de referência.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** com paleta `sunset-horizon` em OKLCH
- **Base UI** + componentes shadcn (estilo `base-nova`)
- **MDX** via `next-mdx-remote/rsc` para conteúdo educacional
- **Lucide** para ícones
- Deploy contínuo na **Vercel**

## Scripts

```bash
npm run dev     # dev server em http://localhost:3000
npm run build   # build de produção
npm start       # serve a build
npm run lint    # ESLint
```

## Estrutura

```
src/
├── app/
│   ├── layout.tsx            # metadata base, fontes, tema
│   ├── page.tsx              # Home — JSON-LD WebSite + Organization
│   ├── opengraph-image.tsx   # OG image estático 1200×630 (Edge Runtime)
│   ├── robots.ts             # robots.txt
│   ├── sitemap.ts            # sitemap.xml dinâmico
│   ├── trilhas/              # /trilhas e /trilhas/[slug] — JSON-LD Course
│   ├── conceitos/            # /conceitos e /conceitos/[slug] — JSON-LD TechArticle
│   ├── glossario/            # /glossario
│   ├── roadmap/              # /roadmap
│   └── sobre/                # /sobre
├── components/
│   ├── layout/               # SiteHeader, SiteFooter, PageContainer
│   ├── content/              # CategoryBadge, Callout, CodeComparison, TrilhaCard, ConceptCard, ...
│   ├── seo/                  # JsonLd — injeta structured data (JSON-LD)
│   ├── mdx/                  # mapeamento HTML → componentes e renderizador MDX
│   └── ui/                   # primitivos (Button)
├── content/                  # arquivos .mdx das trilhas, conceitos e glossário
├── lib/
│   ├── content/              # leitura e parsing de frontmatter (gray-matter + type guards)
│   ├── seo.ts                # SITE_URL, buildMetadata(), schemas JSON-LD
│   └── utils.ts              # cn()
└── types/content.ts          # tipos compartilhados (Trilha, Conceito, Categoria, Level)
```

## Conteúdo

Os arquivos MDX vivem em `src/content/<tipo>/<slug>.mdx`. Cada um exige o frontmatter:

```yaml
---
title: "Separação de Responsabilidades"
slug: "separacao-de-responsabilidades"
description: "..."
category: "Fundamentos"        # Fundamentos | Frontend | Backend | Patterns | Prática
level: "Iniciante"             # Iniciante | Intermediário | Avançado
duration: "12 min"
tags: [arquitetura, clean-code]
related: [acoplamento]         # slugs de conceitos relacionados
published: true
---
```

Componentes disponíveis dentro do MDX: `<Callout>`, `<ConceptCard>`, `<TrilhaCard>`, `<CompareGrid>`, `<CodeBad>`, `<CodeGood>`, `<Diagram>`, `<TradeoffTable>`, `<DecisionCard>`, `<Quiz>`, `<ArchComparator>`, `<LayerSimulator>`, `<DepVisualizer>`.

### Trilhas publicadas

| # | Título | Slug | Categoria | Nível |
|---|---|---|---|---|
| 1 | Fundamentos de Arquitetura de Software | `fundamentos-de-arquitetura` | Fundamentos | Iniciante |
| 2 | Arquitetura Frontend | `arquitetura-frontend` | Frontend | Intermediário |
| 3 | Design Patterns | `design-patterns` | Patterns | Intermediário |
| 4 | Arquitetura Backend | `arquitetura-backend` | Backend | Intermediário |
| 5 | Refatoração | `refatoracao` | Prática | Intermediário |

## SEO

O SEO é centralizado em `src/lib/seo.ts` e cobre todas as páginas:

| Recurso | Implementação |
|---|---|
| `<title>` e `<meta description>` | `buildMetadata()` em cada página |
| `canonical` URL | `alternates.canonical` via `buildMetadata()` |
| Open Graph (og:image, og:title, og:description) | Gerado pelo `buildMetadata()` + imagem em `/opengraph-image` |
| Twitter Card | `summary_large_image` configurado globalmente |
| Structured Data (JSON-LD) | `<JsonLd>` nas páginas — schemas `WebSite`, `Course`, `TechArticle`, `BreadcrumbList` |
| `sitemap.xml` | Dinâmico — inclui todas as trilhas e conceitos publicados |
| `robots.txt` | `allow /`, disallow interno, ponteiro para sitemap |
| Keywords | Por página — globais + específicas do conteúdo |

Use a skill `/aplicar-seo` para auditar e manter o SEO ao criar novas páginas.

## Tema

Modo claro/escuro persistente via `localStorage` e sincronizado com `prefers-color-scheme`. A inicialização acontece em script `beforeInteractive` no [src/app/layout.tsx](src/app/layout.tsx) para evitar flash. A alternância usa `useSyncExternalStore` em [src/components/theme-toggle.tsx](src/components/theme-toggle.tsx).

A paleta é monocromática quente — primary (coral `#d97149`), accent (dourado), tokens semânticos por categoria. Todas as cores em OKLCH, definidas em [src/app/globals.css](src/app/globals.css).

## Skills Claude Code

Skills em `.claude/skills/` automatizam tarefas recorrentes:

| Skill | O que faz |
|---|---|
| `/criar-trilha` | Gera `src/content/trilhas/<slug>.mdx` com frontmatter validado |
| `/criar-conceito` | Gera `src/content/conceitos/<slug>.mdx` e vincula na trilha |
| `/criar-quiz` | Adiciona bloco `<Quiz>` interativo a uma aula |
| `/criar-componente-mdx` | Cria componente React e registra no `mdx-components.tsx` |
| `/revisar-trilha` | Valida frontmatter, slugs, ConceptCards e links internos |
| `/checar-conteudo` | Auditoria completa de todo o `src/content/` |
| `/aplicar-seo` | Audita e corrige SEO — metadata, JSON-LD, sitemap e robots |

## Roadmap

Veja [/roadmap](https://sal-lab.vercel.app/roadmap) no site para o caminho completo. As Fases 1–5 estão entregues (fundação técnica, conteúdo inicial, recursos visuais, interatividade e expansão de conteúdo). A Fase 6 inclui banco de dados, autenticação, busca semântica e assistente de IA.
