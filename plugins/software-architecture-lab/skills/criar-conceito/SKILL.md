---
name: criar-conceito
description: Cria um novo conceito ou aula no Software Architecture Lab. Use sempre que o usuário pedir para criar, adicionar ou escrever uma nova aula, conceito, lição ou conteúdo sobre um tópico de arquitetura.
---

# Criar Conceito

Cria um novo arquivo `.mdx` em `src/content/conceitos/` seguindo a estrutura padrão do projeto.

## O que é um conceito

Conceitos são as aulas individuais do lab. Cada conceito:

- Explica um único problema e como resolvê-lo
- Tem exemplos de código reais com antes e depois
- Aponta quando usar e quando não exagerar
- Linka para conceitos relacionados

## Passo a passo

### 1. Coletar informações

Confirme com o usuário, ou derive do contexto:

- Título do conceito
- Categoria: `Fundamentos | Frontend | Backend | Patterns | Prática`
- Nível: `Iniciante | Intermediário | Avançado`
- Duração estimada, ex: `12 min`
- Trilha à qual pertence, para saber `related` e qual `order` usar
- Conceitos relacionados, slugs de outros conceitos já existentes

### 2. Definir o slug

kebab-case em português derivado do título:

- `Repository Pattern` → `repository-pattern`
- `Inversão de Dependência` → `inversao-de-dependencia`

### 3. Verificar slugs existentes

```bash
grep -h "^slug:" src/content/conceitos/*.mdx | sort
grep -h "^order:" src/content/conceitos/*.mdx | sort -t: -k2 -n
```

Escolha um `order` que não colida com os demais conceitos da mesma categoria ou trilha.

### 4. Criar o arquivo MDX

Salve em `src/content/conceitos/<slug>.mdx`.

Frontmatter obrigatório:

```yaml
---
title: "<Título>"
slug: "<slug>"
description: "<Uma frase: o que é + por que importa>"
category: "<Fundamentos|Frontend|Backend|Patterns|Prática>"
level: "<Iniciante|Intermediário|Avançado>"
duration: "<X min>"
tags:
  - tag-1
  - tag-2
related:
  - slug-conceito-relacionado-1
published: true
order: <numero>
---
```

Estrutura do corpo MDX:

````mdx
## Resumo

**<Nome do conceito>** é [definição clara em 1–2 parágrafos].
[O que resolve / por que existe.]

## Problema que resolve

[Descreva o problema concreto que o conceito endereça.]
[Mostre o sintoma que aparece no código sem esse conceito.]

## Antes e depois

<CompareGrid>
<CodeBad title="<Como fica sem o conceito>">

```<linguagem>
// código problemático
```

</CodeBad>
<CodeGood title="<Como fica aplicando o conceito>">

```<linguagem>
// código com o conceito aplicado
```

</CodeGood>
</CompareGrid>

## Quando usar

- [Sinal 1 de que é hora de aplicar]
- [Sinal 2]

<Callout variant="sucesso" title="Sinal claro">
[Uma frase que resume o gatilho mais confiável para aplicar o conceito.]
</Callout>

## Quando não usar

- [Caso em que o conceito é exagero]
- [Caso em que outro conceito é mais adequado]

<Callout variant="atencao" title="<Título do aviso>">
[Por que é fácil exagerar aqui.]
</Callout>

## Onde aparece no dia a dia

- **<Contexto real>**: [como o conceito aparece nesse contexto]
- **<Outro contexto>**: [...]

## Erros comuns

- [Erro típico 1]
- [Erro típico 2]

<Callout variant="erro" title="Antipattern frequente">
[Descrição do erro mais comum com consequência.]
</Callout>

## Exercício

[Uma tarefa prática curta que o leitor pode fazer mentalmente ou no código.]

## Conceitos relacionados

- [<Título>](/conceitos/<slug>) — [uma frase de por que se relaciona]
- [<Título>](/conceitos/<slug>) — [...]
````

## Diretrizes de escrita

- Tom direto, sem rodeios
- Resumo começa com `**<Nome>** é ...` em negrito
- Código curto, idealmente em TypeScript ou TSX e com contexto plausível
- Não inclua links para slugs inexistentes em `src/content/conceitos/`

Callout variants:

- `sucesso`: boas práticas e sinais de que você está no caminho certo
- `atencao`: armadilhas, trade-offs e quando não exagerar
- `erro`: antipatterns com consequência clara

## Componentes avançados disponíveis no MDX

| Componente | Quando usar |
| --- | --- |
| `<Diagram code="..." />` | Diagramas Mermaid para visualizar fluxos e relações |
| `<TradeoffTable rows={[...]} labelA="..." labelB="..." />` | Comparar duas abordagens em múltiplos critérios |
| `<DecisionCard quando={...} evitar={...} alternativa={...} />` | Síntese de quando usar, quando evitar e alternativa |
| `<Quiz questions={[...]} title="..." />` | Quiz de fixação ao final da aula |
| `<ArchComparator defaultA="mvc" defaultB="clean" />` | Comparação interativa entre arquiteturas |
| `<LayerSimulator items={[...]} title="..." />` | Exercício de arrastar responsabilidades |
| `<DepVisualizer nodes={[...]} edges={[...]} title="..." />` | Visualizador de grafo de dependências |

## Seções obrigatórias vs opcionais

| Seção | Status |
| --- | --- |
| Resumo | Obrigatória |
| Problema que resolve | Obrigatória |
| Antes e depois | Recomendada |
| Quando usar | Obrigatória |
| Quando não usar | Recomendada |
| Onde aparece no dia a dia | Opcional |
| Erros comuns | Recomendada |
| Exercício | Opcional |
| Conceitos relacionados | Obrigatória |

## Vinculando à trilha

Após criar o conceito, pergunte ao usuário se quer adicionar o `ConceptCard` correspondente ao MDX da trilha. Se sim, adicione em `src/content/trilhas/<slug-da-trilha>.mdx`:

```mdx
<ConceptCard
  order={<N>}
  title="<Título do conceito>"
  description="<Uma frase: problema que resolve — mesma energia do Resumo>"
  slug="<slug-do-conceito>"
  category="<category>"
  level="<level>"
  duration="<X min>"
/>
```

E adicione o slug do conceito no campo `related` do frontmatter da trilha.
