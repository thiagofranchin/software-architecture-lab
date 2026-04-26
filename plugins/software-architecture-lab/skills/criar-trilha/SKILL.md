---
name: criar-trilha
description: Cria uma nova trilha de aprendizado no Software Architecture Lab. Use sempre que o usuário pedir para criar, adicionar ou escrever uma nova trilha ou um conjunto de aulas sobre um tema de arquitetura de software.
---

# Criar Trilha

Cria um novo arquivo `.mdx` em `src/content/trilhas/` seguindo a estrutura padrão do projeto.

## O que é uma trilha

Trilhas são percursos de aprendizado que agrupam conceitos relacionados. Cada trilha tem:

- Um arquivo MDX com frontmatter validado
- Uma seção `Sobre esta trilha`
- Uma seção `O que você vai aprender`
- Uma seção `Aulas` com `ConceptCard` para cada aula existente
- Uma seção `Próximos passos`

## Passo a passo

### 1. Coletar informações

Antes de criar, confirme com o usuário:

- Título da trilha
- Categoria: `Fundamentos | Frontend | Backend | Patterns | Prática`
- Nível: `Iniciante | Intermediário | Avançado`
- Duração estimada, ex: `2h 30min`
- Aulas que a trilha vai conter, slugs dos conceitos em `src/content/conceitos/`
- `order`, número inteiro que define a posição na lista de trilhas

Se o usuário não informar tudo, derive o que der pelo contexto e pergunte só o que for necessário.

### 2. Definir o slug

O slug segue kebab-case em português, derivado do título:

- `Arquitetura Backend` → `arquitetura-backend`
- `Clean Architecture` → `clean-architecture`

### 3. Criar o arquivo MDX

Salve em `src/content/trilhas/<slug>.mdx`.

Frontmatter obrigatório:

```yaml
---
title: "<Título>"
slug: "<slug>"
description: "<Uma frase que descreve o que o aluno vai aprender e por que importa>"
category: "<Fundamentos|Frontend|Backend|Patterns|Prática>"
level: "<Iniciante|Intermediário|Avançado>"
duration: "<Xh Ymin>"
tags:
  - tag-1
  - tag-2
related:
  - slug-conceito-1
  - slug-conceito-2
published: true
order: <numero>
---
```

Regras do frontmatter:

- `category` deve ser exatamente uma das 5 opções
- `level` deve ser exatamente uma das 3 opções, com acento
- `tags` e `related` são listas de strings
- `published: true` para a trilha aparecer no site

Corpo do MDX:

```mdx
## Sobre esta trilha

[1–2 parágrafos que respondem: qual problema esta trilha resolve? Para quem é?]

<Callout variant="info" title="Para quem é">
[Perfil do público-alvo em uma frase.]
</Callout>

## O que você vai aprender

- [Item 1]
- [Item 2]
- [Item N]

## Aulas

<div className="flex flex-col gap-4">
  <ConceptCard
    order={1}
    title="<Título do Conceito>"
    description="<Uma frase descrevendo o que o aluno aprende nesta aula.>"
    slug="<slug-do-conceito>"
    category="<mesma categoria da trilha ou categoria do conceito>"
    level="<Iniciante|Intermediário|Avançado>"
    duration="<X min>"
  />
</div>

## Próximos passos

[1 parágrafo sugerindo trilhas ou conceitos para continuar após esta trilha.]
```

## Componentes MDX disponíveis

| Componente | Quando usar |
| --- | --- |
| `<Callout variant="info">` | Notas, contexto, para quem é |
| `<Callout variant="atencao">` | Avisos, armadilhas comuns |
| `<Callout variant="erro">` | Erros que o aluno deve evitar |
| `<Callout variant="sucesso">` | Boas práticas confirmadas |
| `<ConceptCard order slug title description category level duration />` | Link para cada aula da trilha |
| `<TrilhaCard />` | Link para outra trilha |
| `<CompareGrid>` + `<CodeBad>` + `<CodeGood>` | Comparação antes e depois de código |

## Verificação antes de salvar

Antes de criar o arquivo, confirme:

- O `slug` não existe em `src/content/trilhas/`
- Todos os slugs em `related` existem em `src/content/conceitos/`
- `category` e `level` usam os valores exatos permitidos
- O `order` não colide com trilhas existentes

Para checar trilhas existentes:

```bash
grep -h "^order:" src/content/trilhas/*.mdx | sort
grep -h "^slug:" src/content/trilhas/*.mdx
```

## Exemplo de `ConceptCard` bem escrito

```mdx
<ConceptCard
  order={1}
  title="Repository Pattern"
  description="Isole o acesso a dados atrás de uma interface clara. O Repository evita que lógica de banco vaze para o domínio da aplicação."
  slug="repository-pattern"
  category="Backend"
  level="Intermediário"
  duration="15 min"
/>
```

A descrição do `ConceptCard` deve:

- Ter 1–2 frases
- Explicar o problema que o conceito resolve, não só o que ele é
- Ser escrita em português, no tom direto do projeto
