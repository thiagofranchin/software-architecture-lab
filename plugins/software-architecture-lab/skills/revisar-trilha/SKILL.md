---
name: revisar-trilha
description: Revisa uma trilha do Software Architecture Lab verificando consistência de slugs, frontmatter, ConceptCards e vínculos entre arquivos. Use quando o usuário pedir para revisar, checar, validar ou auditar uma trilha antes de publicar.
---

# Revisar Trilha

Executa uma revisão de consistência em um arquivo de trilha e em todos os conceitos que ela referencia.

## O que é verificado

1. Frontmatter da trilha, com campos obrigatórios presentes e valores válidos
2. Slugs em `related`, garantindo que cada slug exista em `src/content/conceitos/`
3. `ConceptCard`s no corpo, comparando props com o frontmatter do conceito correspondente
4. `order` da trilha, checando colisão com outras trilhas
5. Tags, sem duplicatas ou valores em branco
6. Links no corpo MDX, garantindo que apontem para slugs existentes

## Passo a passo

### 1. Identificar a trilha

Se o usuário não informar o slug, liste as trilhas disponíveis:

```bash
grep -h "^slug:" src/content/trilhas/*.mdx
```

### 2. Ler a trilha

Leia o arquivo `src/content/trilhas/<slug>.mdx` completo.

### 3. Verificar frontmatter

Cheque cada campo contra os valores permitidos:

```text
category: Fundamentos | Frontend | Backend | Patterns | Prática
level:    Iniciante | Intermediário | Avançado
```

Campos obrigatórios: `title slug description category level duration tags related published order`

### 4. Verificar slugs em `related`

Para cada slug listado em `related`, confirme que o arquivo existe:

```bash
ls src/content/conceitos/<slug>.mdx
```

### 5. Verificar `ConceptCard`

Para cada `<ConceptCard>` no corpo MDX:

- O `slug` existe em `src/content/conceitos/`?
- O `title` bate com o `title` do frontmatter do conceito?
- `category` e `level` batem com o frontmatter do conceito?
- `duration` bate com o frontmatter do conceito?

Leia os conceitos referenciados para comparar. Se houver divergência, sinalize e sugira a correção.

### 6. Verificar `order` da trilha

```bash
grep -h "^order:" src/content/trilhas/*.mdx | sort -t: -k2 -n
```

Se o `order` da trilha revisada colide com outra, sinalize.

### 7. Verificar links internos no corpo

Para cada link no formato `/conceitos/<slug>` ou `/trilhas/<slug>` encontrado no corpo MDX, confirme que o arquivo correspondente existe.

```bash
grep -o '/conceitos/[a-z0-9-]*' src/content/trilhas/<slug>.mdx | sort -u
grep -o '/trilhas/[a-z0-9-]*' src/content/trilhas/<slug>.mdx | sort -u
```

## Formato do relatório

```text
## Revisão: <título da trilha>

### ✅ OK
- Frontmatter completo e válido

### ⚠️ Avisos
- ConceptCard "X": duration "12 min" mas conceito tem "15 min"

### ❌ Erros
- Slug "foo-bar" em `related` não existe em src/content/conceitos/
```

Se tudo estiver correto, diga explicitamente que a trilha está pronta para `published: true`.

## Correções automáticas

Se o usuário pedir para corrigir os problemas encontrados, aplique as correções diretamente nos arquivos. Prefira corrigir o arquivo da trilha, ajustando `ConceptCard`, `related` e `order`, antes de sugerir alterar os conceitos, a menos que o conceito esteja claramente errado.
