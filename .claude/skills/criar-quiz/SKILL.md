---
name: criar-quiz
description: Cria um bloco de quiz interativo para uso em conceitos do Software Architecture Lab. Use quando o usuário pedir para adicionar um quiz, exercício de fixação ou perguntas de múltipla escolha a uma aula.
---

# Criar Quiz

Gera o bloco `<Quiz>` pronto para colar em qualquer arquivo `.mdx` de conceito ou trilha.

## O componente Quiz

O componente `<Quiz>` é client-side e já está registrado no registry MDX. Não requer importação no arquivo MDX.

### Props

```tsx
<Quiz
  title="Título do quiz"       // opcional, padrão: "Quiz"
  questions={[                 // array de perguntas
    {
      question: "Texto da pergunta",
      options: [
        { label: "Opção A", correct: true, explanation: "Por que está correta." },
        { label: "Opção B", explanation: "Por que está errada." },
        { label: "Opção C" },
        { label: "Opção D" },
      ],
    },
  ]}
/>
```

### Regras de conteúdo

- **1 a 5 perguntas** por quiz (mais que isso, quebre em dois)
- **Exatamente 1 opção** com `correct: true` por pergunta
- **`explanation`** é opcional mas recomendado para a opção correta e para as opções erradas mais prováveis de confundir
- O quiz exibe uma pergunta por vez, o leitor seleciona, clica em "Verificar" e vê o feedback antes de avançar

## Passo a passo

### 1. Entender o contexto

Identifique:
- Em qual conceito/trilha o quiz vai ser inserido
- Qual seção faz mais sentido (normalmente no final, antes de "Conceitos relacionados")

### 2. Coletar ou sugerir as perguntas

Se o usuário não forneceu as perguntas, proponha com base no conteúdo do conceito. Boas perguntas:
- Testam compreensão, não memorização de nome
- Têm distradores plausíveis (erros comuns do dia a dia)
- São curtas e claras

### 3. Gerar o bloco MDX

```mdx
## Fixação

<Quiz
  title="Quiz — <Nome do Conceito>"
  questions={[
    {
      question: "<Pergunta 1>",
      options: [
        { label: "<Opção correta>", correct: true, explanation: "<Motivo>" },
        { label: "<Distrator 1>", explanation: "<Por que está errado>" },
        { label: "<Distrator 2>" },
        { label: "<Distrator 3>" },
      ],
    },
    {
      question: "<Pergunta 2>",
      options: [
        { label: "<Opção A>" },
        { label: "<Opção correta>", correct: true, explanation: "<Motivo>" },
        { label: "<Distrator>" },
      ],
    },
  ]}
/>
```

### 4. Inserir no arquivo MDX

Cole o bloco gerado em `src/content/conceitos/<slug>.mdx`, logo antes da seção `## Conceitos relacionados` (ou no final da trilha, se for um quiz de revisão geral).

## Exemplos de perguntas bem formuladas

**Ruim** (memorização): "Qual o nome do padrão que isola acesso a dados?"  
**Bom** (compreensão): "Qual dos cenários abaixo indica que você precisa de um Repository?"

**Ruim** (trivial): "O Strategy usa interface ou herança?"  
**Bom** (aplicação): "Você tem um if/else que cresce a cada novo tipo de pagamento. O que o Strategy resolve aqui?"
