# Software Architecture Lab

> Site publicado: **[https://sal-lab.vercel.app/](https://sal-lab.vercel.app/)**

Laboratório visual e prático para aprender arquitetura de software, voltado a desenvolvedores frontend, backend e fullstack. Combina trilhas progressivas, conceitos catalogados, exemplos comparativos (antipattern × recomendado) e um glossário de referência.

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
├── app/                  # rotas (Home, /trilhas, /conceitos, /glossario, /sobre, /roadmap)
├── components/
│   ├── layout/           # SiteHeader, SiteFooter, PageContainer
│   ├── content/          # CategoryBadge, Callout, CodeComparison, TrilhaCard, ConceptCard, ...
│   ├── mdx/              # mapeamento HTML → componentes e renderizador MDX
│   └── ui/               # primitivos (Button)
├── content/              # arquivos .mdx das trilhas, conceitos e glossário
├── lib/content/          # leitura e parsing de frontmatter (gray-matter + type guards)
├── types/content.ts      # tipos compartilhados (Trilha, Conceito, Categoria, Level)
└── app/globals.css       # tokens OKLCH e tokens de categoria
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

Componentes disponíveis dentro do MDX: `<CategoryBadge>`, `<Callout>` (variantes `info` / `atencao` / `erro` / `sucesso`), `<CodeComparison>`, `<ConceptCard>`, `<TrilhaCard>`.

## Tema

Modo claro/escuro persistente via `localStorage` e sincronizado com `prefers-color-scheme`. A inicialização acontece em script `beforeInteractive` no [src/app/layout.tsx](src/app/layout.tsx) para evitar flash. A alternância usa `useSyncExternalStore` em [src/components/theme-toggle.tsx](src/components/theme-toggle.tsx).

A paleta é monocromática quente — primary (coral), accent (dourado), tokens semânticos por categoria. Todas as cores em OKLCH, definidas em [src/app/globals.css](src/app/globals.css).

## Roadmap

Veja [/roadmap](https://sal-lab.vercel.app/roadmap) no site para o caminho completo. Esta versão entrega Fases 1 e 2 (fundação técnica + conteúdo inicial). As próximas fases incluem diagramas Mermaid, playground interativo, expansão de trilhas e, futuramente, plataforma com autenticação e busca semântica.
