# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start dev server (runs on http://localhost:3000)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run ESLint to check for linting issues
npm run lint
```

## Project Overview

**Software Architecture Lab** is a Next.js application designed as a visual and practical laboratory for learning software architecture concepts.

- **Framework**: Next.js 16.1.6 with App Router
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4 with CSS variables
- **Component System**: shadcn/ui with Base UI
- **Icons**: lucide-react
- **Language**: TypeScript (strict mode)

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout com fonts e tema
│   ├── globals.css         # Estilos globais Tailwind
│   ├── trilhas/            # Rota /trilhas e /trilhas/[slug]
│   ├── conceitos/          # Rota /conceitos e /conceitos/[slug]
│   ├── roadmap/            # Rota /roadmap
│   ├── glossario/          # Rota /glossario
│   └── sobre/              # Rota /sobre
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── content/            # ConceptCard, TrilhaCard, Callout, CategoryBadge, etc.
│   ├── layout/             # PageContainer, SiteHeader, SiteFooter
│   └── mdx/                # MdxContent, MdxComponents (registry de componentes MDX)
├── content/                # Conteúdo MDX (trilhas e conceitos)
│   ├── trilhas/            # Arquivos .mdx de cada trilha
│   └── conceitos/          # Arquivos .mdx de cada conceito/aula
├── lib/
│   ├── content/
│   │   ├── loader.ts       # getAllTrilhas, getAllConceitos, getBy­Slug (cached)
│   │   └── frontmatter.ts  # parseFrontmatter com validação de tipos
│   └── utils.ts            # cn() para merge de classes
└── types/
    └── content.ts          # ContentFrontmatter, Trilha, Conceito, Category, Level
```

### Key Architectural Decisions

**Theme System**: Dark/light mode is implemented using CSS classes (`dark` class on `<html>`) combined with Tailwind's dark mode utilities. The theme preference is persisted in localStorage and respects system preferences as fallback.

- Theme initialization happens via inline script in `layout.tsx` (runs before hydration to prevent flash)
- The `ThemeToggle` component manages theme switching and persistence
- All colors use CSS variables defined in Tailwind config for consistency

**Typography**: The app uses three Google Fonts configured as CSS variables:
- `--font-montserrat` (sans-serif, primary)
- `--font-merriweather` (serif, display)
- `--font-ubuntu-mono` (monospace, code)

**Component Library**: shadcn/ui components are configured to use the `base-nova` style with neutral colors and CSS variables. Import alias: `@/components/ui`.

**Styling Approach**: Pure Tailwind CSS with `tailwind-merge` and `clsx` for conditional classes. The `cn()` utility function in `src/lib/utils.ts` merges classes while avoiding conflicts.

## TypeScript & Path Aliases

- `@/*` resolves to `./src/*`
- Strict mode enabled (`"strict": true`)
- Target: ES2017

## Theme Configuration

Theme colors are defined via Tailwind CSS variables (see `components.json` for aliases). Common colors include `background`, `foreground`, `primary`, `secondary`, `accent`, `muted`, `border`, `card`, etc. These map to CSS variables in the theme layer.

## Content System (Trilhas e Conceitos)

O conteúdo é escrito em **MDX** e lido em build-time pelo loader em `src/lib/content/loader.ts`.

### Frontmatter obrigatório (trilhas e conceitos)

```yaml
title: string
slug: string           # kebab-case, único dentro da pasta
description: string
category: Fundamentos | Frontend | Backend | Patterns | Prática
level: Iniciante | Intermediário | Avançado
duration: string       # ex: "2h 30min" ou "12 min"
tags: string[]
related: string[]      # slugs de conceitos relacionados
published: boolean     # false = não aparece no site
order: number          # opcional; define ordem na listagem
```

`parseFrontmatter` em `src/lib/content/frontmatter.ts` lança erro em build se algum campo obrigatório estiver faltando ou com valor inválido.

### Componentes MDX disponíveis

Registrados em `src/components/mdx/mdx-components.tsx`:

| Componente | Props principais |
|---|---|
| `<Callout>` | `variant: info \| atencao \| erro \| sucesso`, `title?` |
| `<ConceptCard>` | `order? slug title description category level duration?` |
| `<TrilhaCard>` | `slug title description category level duration?` |
| `<CompareGrid>` | wrapper para CodeBad + CodeGood |
| `<CodeBad>` | `title` |
| `<CodeGood>` | `title` |
| `<CategoryBadge>` | `category` |

### Criando uma nova trilha

Use a skill `/criar-trilha` ou crie manualmente `src/content/trilhas/<slug>.mdx` com o frontmatter acima. O arquivo é detectado automaticamente pelo loader — não é necessário nenhum registro adicional.

### Criando um novo conceito (aula)

Use a skill `/criar-conceito` ou crie manualmente `src/content/conceitos/<slug>.mdx` com o mesmo frontmatter. Para que apareça em uma trilha, adicione o `slug` no campo `related` da trilha e adicione um `<ConceptCard>` no corpo MDX da trilha.

### Trilhas publicadas

| Order | Título | Slug | Categoria | Nível | Aulas |
|---|---|---|---|---|---|
| 1 | Fundamentos de Arquitetura de Software | `fundamentos-de-arquitetura` | Fundamentos | Iniciante | separacao-de-responsabilidades, acoplamento |
| 2 | Arquitetura Frontend | `arquitetura-frontend` | Frontend | Intermediário | colocalizacao-de-estado, componentes-vs-containers, camadas-no-frontend |
| 3 | Design Patterns | `design-patterns` | Patterns | Intermediário | strategy, observer, factory, adapter |
| 4 | Arquitetura Backend | `arquitetura-backend` | Backend | Intermediário | repository-pattern, service-layer, dependency-injection |
| 5 | Refatoração | `refatoracao` | Prática | Intermediário | code-smells, extrair-metodo, refatoracao-segura |

Ao criar uma nova trilha, use o próximo `order` disponível (atualmente **6**) e atualize esta tabela.

## Skills disponíveis

Skills em `.claude/skills/` automatizam tarefas recorrentes neste projeto.

| Skill | Arquivo | O que faz |
|---|---|---|
| `/criar-trilha` | `.claude/skills/criar-trilha/SKILL.md` | Coleta título, categoria, nível, aulas e `order`; gera `src/content/trilhas/<slug>.mdx` com frontmatter validado e seções MDX padrão |
| `/criar-conceito` | `.claude/skills/criar-conceito/SKILL.md` | Coleta dados da aula e trilha de destino; gera `src/content/conceitos/<slug>.mdx` com Resumo, Problema, Antes/depois, Quando usar, Erros comuns e Conceitos relacionados; oferece vincular o `ConceptCard` na trilha |
| `/revisar-trilha` | `.claude/skills/revisar-trilha/SKILL.md` | Verifica frontmatter, slugs em `related`, props dos `ConceptCard` vs frontmatter real dos conceitos, `order` duplicado e links internos quebrados; emite relatório ✅ / ⚠️ / ❌ |
| `/checar-conteudo` | `.claude/skills/checar-conteudo/SKILL.md` | Auditoria de todo `src/content/`: slugs e `order` duplicados, `category`/`level` com typo, referências cruzadas quebradas e rascunhos com `published: false` esquecidos |
| `/criar-componente-mdx` | `.claude/skills/criar-componente-mdx/SKILL.md` | Cria o `.tsx` em `src/components/content/` seguindo padrões do projeto (Tailwind, variáveis CSS do tema, sem `"use client"` desnecessário) e registra no `mdx-components.tsx` |

## Development Notes

- Hot reload funciona automaticamente para arquivos em `src/`
- shadcn/ui components: `npx shadcn-ui@latest add <component-name>`
- Novas páginas devem seguir as convenções do App Router em `src/app/`
- Componentes client-side precisam da diretiva `"use client"`
- Conteúdo MDX inválido (frontmatter errado) causa erro em build-time
