---
name: checar-conteudo
description: Verifica a integridade de todo o conteúdo MDX do Software Architecture Lab — slugs quebrados, order duplicado, frontmatter inválido e referências cruzadas inconsistentes. Use quando o usuário pedir para checar, auditar, validar ou diagnosticar o conteúdo do projeto.
---

# Checar Conteúdo

Roda uma auditoria completa de todo o conteúdo em `src/content/` e reporta problemas que impediriam build correto ou navegação quebrada no site.

## O que é verificado

| Verificação | Descrição |
|---|---|
| Frontmatter inválido | Campos faltando ou com valores fora do conjunto permitido |
| Slugs duplicados | Dois arquivos com o mesmo `slug` na mesma pasta |
| `order` duplicado | Dois arquivos com o mesmo `order` na mesma pasta |
| Referências quebradas em `related` | Slug listado em `related` não existe em `src/content/conceitos/` |
| ConceptCards com slug inexistente | `<ConceptCard slug="x">` onde `x` não existe em conceitos |
| Links internos quebrados | `/conceitos/<slug>` ou `/trilhas/<slug>` no corpo MDX sem arquivo correspondente |
| `published: false` esquecido | Arquivos com `published: false` que podem ter sido esquecidos |
| Props MDX complexas frágeis | arrays inline de objetos em componentes MDX, com risco de sumirem na serialização |

## Passo a passo

Execute as verificações em sequência e acumule os resultados.

### 1. Inventário

```bash
# Listar todos os slugs de conceitos
grep -h "^slug:" src/content/conceitos/*.mdx | sed 's/slug: //' | sed 's/"//g' | sort

# Listar todos os slugs de trilhas
grep -h "^slug:" src/content/trilhas/*.mdx | sed 's/slug: //' | sed 's/"//g' | sort
```

Salve mentalmente os dois conjuntos de slugs para usar nas verificações seguintes.

### 2. Slugs e orders duplicados

```bash
# Duplicatas de slug em conceitos
grep -h "^slug:" src/content/conceitos/*.mdx | sort | uniq -d

# Duplicatas de slug em trilhas
grep -h "^slug:" src/content/trilhas/*.mdx | sort | uniq -d

# Duplicatas de order em conceitos
grep -h "^order:" src/content/conceitos/*.mdx | sort | uniq -d

# Duplicatas de order em trilhas
grep -h "^order:" src/content/trilhas/*.mdx | sort | uniq -d
```

### 3. Frontmatter inválido

Para cada arquivo `.mdx`, verifique:
- `category` é uma de: `Fundamentos`, `Frontend`, `Backend`, `Patterns`, `Prática`
- `level` é um de: `Iniciante`, `Intermediário`, `Avançado`
- Todos os campos obrigatórios estão presentes: `title slug description category level duration tags related published`

```bash
# Ver todos os valores de category (para identificar typos)
grep -rh "^category:" src/content/ | sort | uniq -c | sort -rn

# Ver todos os valores de level
grep -rh "^level:" src/content/ | sort | uniq -c | sort -rn
```

### 4. Referências quebradas em `related`

Para cada arquivo, extraia os slugs em `related` e verifique se existem em `src/content/conceitos/`:

```bash
grep -rh "^  - " src/content/trilhas/*.mdx src/content/conceitos/*.mdx
```

Compare cada slug com o inventário do passo 1.

### 5. ConceptCards com slug inexistente

```bash
grep -rh 'slug="' src/content/trilhas/*.mdx | grep -o 'slug="[^"]*"' | sed 's/slug="//;s/"//'
```

Cada slug encontrado deve existir no inventário de conceitos.

### 6. Links internos quebrados

```bash
# Links para conceitos no corpo das trilhas
grep -roh '/conceitos/[a-z0-9-]*' src/content/ | sort -u

# Links para trilhas no corpo dos conceitos
grep -roh '/trilhas/[a-z0-9-]*' src/content/ | sort -u
```

Para cada link, verifique se o slug correspondente existe no inventário.

### 7. Arquivos não publicados

```bash
grep -rln "^published: false" src/content/
```

Liste-os no relatório como aviso — podem ser rascunhos esquecidos.

### 8. Props complexas em componentes MDX

Procure componentes usando arrays inline de objetos diretamente no MDX:

```bash
rg -n 'items=\[|rows=\[|questions=\[|nodes=\[|edges=\[' src/content
```

Para cada caso encontrado:
- Verifique se o componente é conhecido por suportar esse formato com segurança
- Se for um componente autoral com dados repetíveis, prefira recomendar children estruturados (`<ComponenteItem />`)
- Se houver histórico de renderizar título sem itens, marque como **aviso importante** ou **erro**, conforme o impacto

Exemplo de correção preferida:

```mdx
<DecisionFlow question="Quem precisa saber disso?">
  <DecisionFlowItem condition="Só este componente?" solution="useState local" />
</DecisionFlow>
```

## Formato do relatório

```
## Auditoria de Conteúdo — <data>

### Resumo
- Trilhas: X arquivos (Y publicadas)
- Conceitos: X arquivos (Y publicados)

### ❌ Erros críticos (impedem build ou criam links quebrados)
- `src/content/trilhas/foo.mdx`: slug "bar-baz" em `related` não existe
- `src/content/conceitos/baz.mdx`: category "Avancado" inválida (deveria ser "Avançado")
- [...]

### ⚠️ Avisos (não quebram o site mas merecem atenção)
- `src/content/trilhas/foo.mdx` e `src/content/trilhas/bar.mdx`: order 2 duplicado
- `src/content/conceitos/draft.mdx`: published: false (rascunho esquecido?)
- `src/content/conceitos/x.mdx`: `<MeuComponente items={[...]}>` usa prop complexa inline em MDX; prefira children estruturados
- [...]

### ✅ OK
- Nenhum slug duplicado encontrado
- Todos os ConceptCards referenciam slugs existentes
- [outros itens limpos]
```

Se não houver erros críticos, declare explicitamente: **"Nenhum erro crítico encontrado. O conteúdo está consistente."**

## Correções automáticas

Se o usuário pedir para corrigir os erros encontrados, aplique as correções uma a uma e confirme cada mudança. Prioridade:
1. Erros de frontmatter (typos em `category`/`level`) — corrigir imediatamente no arquivo
2. Slugs quebrados em `related` — remover ou corrigir se o slug correto for óbvio
3. `order` duplicado — renumerar consultando o usuário sobre a ordem desejada
4. Props complexas frágeis em MDX — migrar para children estruturados quando o componente suportar esse formato
