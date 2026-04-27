---
name: criar-componente-mdx
description: Cria um novo componente React disponível nos arquivos MDX do Software Architecture Lab. Use quando o usuário pedir para criar, adicionar ou registrar um novo componente que possa ser usado no conteúdo das trilhas e conceitos — mesmo que não mencione "MDX" explicitamente.
---

# Criar Componente MDX

Adiciona um novo componente React ao sistema MDX do projeto, tornando-o disponível em todos os arquivos `.mdx`.

## Como o sistema MDX funciona

Componentes MDX são registrados em `src/components/mdx/mdx-components.tsx`. Todo componente listado nesse arquivo pode ser usado diretamente nos arquivos `.mdx` sem `import`. O renderer é `next-mdx-remote` com suporte a JSX.

## Regra importante para props complexas

Evite depender de arrays inline de objetos como prop em MDX, por exemplo:

```mdx
<MeuComponente
  items={[
    { label: "A", value: "B" },
    { label: "C", value: "D" },
  ]}
/>
```

Esse formato pode compilar e ainda assim perder parte dos dados na serialização do MDX para RSC e HTML. Quando o componente precisar de listas estruturadas, prefira:

1. Children com subcomponentes explícitos, como `<MeuComponenteItem />`
2. Props simples e rasas para valores unitários
3. `items` apenas como fallback, não como única API voltada para autores MDX

Se o componente aceita conteúdo repetível, crie também um subcomponente nulo tipado e registre ambos no `mdx-components.tsx`.

## Arquivos envolvidos

| Arquivo | Papel |
|---|---|
| `src/components/content/<nome>.tsx` | Implementação do componente |
| `src/components/mdx/mdx-components.tsx` | Registro do componente no MDX |

## Passo a passo

### 1. Entender o componente

Confirme com o usuário:
- **O que o componente renderiza** (visual e semanticamente)
- **Quais props ele recebe** (obrigatórias e opcionais)
- **Exemplo de uso em MDX** (como o autor de conteúdo vai escrever)
- **Onde ele será usado** (trilhas, conceitos, ou ambos)

### 2. Verificar componentes existentes

Antes de criar, confira se já existe algo parecido:

```bash
ls src/components/content/
grep -n "export function\|export const" src/components/content/*.tsx
```

### 3. Criar o arquivo do componente

Salve em `src/components/content/<nome-kebab-case>.tsx`.

#### Padrões obrigatórios

```tsx
import { cn } from "@/lib/utils";
// outros imports necessários

type <NomeProps> = {
  // props tipadas
};

export function <Nome>({ ... }: <NomeProps>) {
  return (
    // JSX
  );
}
```

**Regras de implementação:**
- Use exclusivamente **Tailwind CSS** para estilização. Sem CSS modules, sem styled-components.
- Use `cn()` de `@/lib/utils` para classes condicionais.
- Ícones: importe de `lucide-react`.
- Cores: use variáveis CSS do tema (`text-foreground`, `bg-muted`, `border-border`, etc.), não cores hardcoded.
- Tipos React: importe de `react` (ex: `ReactNode`, `ComponentPropsWithoutRef`).
- Não use `"use client"` a menos que o componente precise de estado ou eventos de browser.
- Se houver coleção repetível de dados no MDX, ofereça API por children (`<ComponenteItem />`) além de props estruturadas.

#### Variáveis de cor disponíveis no tema

```
foreground, background, muted, muted-foreground
primary, primary-foreground
secondary, secondary-foreground
accent, accent-foreground
border, card, card-foreground
```

Categorias: `category-fundamentos`, `category-frontend`, `category-backend`, `category-patterns`, `category-pratica`

### 4. Registrar no mdx-components.tsx

Abra `src/components/mdx/mdx-components.tsx` e:

1. Adicione o import do novo componente:
```tsx
import { <Nome> } from "@/components/content/<nome-kebab-case>";
```

2. Adicione ao objeto `mdxComponents`:
```tsx
export const mdxComponents = {
  // ... existentes
  <Nome>,
};
```

### 5. Documentar o uso no AGENTS.md

Adicione o novo componente à tabela de componentes MDX disponíveis em `AGENTS.md`:

```markdown
| `<<Nome>>` | `prop1 prop2? prop3` |
```

## Padrões visuais dos componentes existentes

Estude os componentes em `src/components/content/` para manter consistência visual:

- **`Callout`**: `rounded-xl border px-4 py-4` com variantes de cor
- **`ConceptCard`**: `rounded-2xl border border-border/70 bg-card p-5 shadow-sm` com hover
- **`CodeComparison`/`CompareGrid`**: grade de 2 colunas para comparação de código

Novos componentes devem seguir o mesmo nível de arredondamento, espaçamento e uso de variáveis CSS.

## Exemplo de uso em MDX

Após criar, mostre ao usuário como o componente é usado em um arquivo `.mdx`:

```mdx
<NomeDoComponente
  prop1="valor"
  prop2={expressão}
>
  Conteúdo opcional
</NomeDoComponente>
```

Para itens repetíveis, prefira documentar assim:

```mdx
<NomeDoComponente titulo="Exemplo">
  <NomeDoComponenteItem label="A" value="B" />
  <NomeDoComponenteItem label="C" value="D" />
</NomeDoComponente>
```

## Verificação final

```bash
npm run lint
npm run build
```

Além do build, quando houver props estruturadas, confira o HTML/RSC gerado:

```bash
rg -n "texto-esperado-do-componente" .next/server/app .next/server/chunks/ssr
```

Se o cabeçalho do componente aparecer mas os itens internos sumirem no HTML, trate isso como problema de serialização do MDX e migre o uso para children estruturados.

Se houver erros de TypeScript, lint ou diferença entre o MDX e o HTML gerado, corrija antes de considerar o trabalho concluído.
