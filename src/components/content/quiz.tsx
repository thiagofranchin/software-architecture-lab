"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type QuizOption = {
  label: string;
  correct?: boolean;
  explanation?: string;
};

type QuizQuestion = {
  question: string;
  options: QuizOption[];
};

type QuizProps = {
  questions: QuizQuestion[];
  title?: string;
};

type AnswerState = {
  selected: number | null;
  revealed: boolean;
};

export function Quiz({ questions, title = "Quiz" }: QuizProps) {
  const [answers, setAnswers] = useState<AnswerState[]>(() =>
    questions.map(() => ({ selected: null, revealed: false })),
  );
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const answer = answers[current];

  const score = answers.filter(
    (a, i) =>
      a.revealed &&
      a.selected !== null &&
      questions[i].options[a.selected]?.correct,
  ).length;

  function select(index: number) {
    if (answer.revealed) return;
    setAnswers((prev) =>
      prev.map((a, i) => (i === current ? { ...a, selected: index } : a)),
    );
  }

  function reveal() {
    if (answer.selected === null) return;
    setAnswers((prev) =>
      prev.map((a, i) => (i === current ? { ...a, revealed: true } : a)),
    );
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setAnswers(questions.map(() => ({ selected: null, revealed: false })));
    setCurrent(0);
    setFinished(false);
  }

  const isCorrect =
    answer.revealed &&
    answer.selected !== null &&
    question.options[answer.selected]?.correct;

  const explanation =
    answer.revealed && answer.selected !== null
      ? question.options[answer.selected]?.explanation
      : null;

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="my-6 rounded-xl border border-border/60 bg-card p-6 text-center space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Resultado — {title}
        </p>
        <p className="text-5xl font-black text-foreground">
          {score}/{questions.length}
        </p>
        <p className="text-muted-foreground text-sm">
          {pct >= 80
            ? "Excelente! Você domina o assunto."
            : pct >= 50
              ? "Bom progresso. Revise os pontos em que errou."
              : "Continue estudando — releia o conteúdo e tente novamente."}
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-2 rounded-lg border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/10"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="my-6 rounded-xl border border-border/60 bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Pergunta */}
      <div className="px-5 pt-5 pb-3">
        <p className="text-base font-semibold leading-snug text-foreground">
          {question.question}
        </p>
      </div>

      {/* Opções */}
      <div className="space-y-2 px-5 pb-4">
        {question.options.map((opt, i) => {
          const isSelected = answer.selected === i;
          const isRevealedCorrect = answer.revealed && opt.correct;
          const isRevealedWrong = answer.revealed && isSelected && !opt.correct;

          return (
            <button
              key={i}
              type="button"
              onClick={() => select(i)}
              disabled={answer.revealed}
              className={cn(
                "w-full rounded-lg border px-4 py-3 text-left text-sm transition",
                !answer.revealed && !isSelected &&
                  "border-border/60 hover:border-primary/40 hover:bg-primary/5",
                !answer.revealed && isSelected &&
                  "border-primary bg-primary/10 font-medium text-foreground",
                isRevealedCorrect &&
                  "border-green-500/60 bg-green-500/10 font-medium text-green-700 dark:text-green-400",
                isRevealedWrong &&
                  "border-destructive/60 bg-destructive/10 text-destructive",
                answer.revealed && !isSelected && !opt.correct &&
                  "border-border/40 opacity-50",
              )}
            >
              <span className="mr-2 font-mono text-xs text-muted-foreground">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Explicação */}
      {explanation && (
        <div className="mx-5 mb-4 rounded-lg bg-muted/60 px-4 py-3 text-sm text-foreground/80 leading-relaxed">
          {explanation}
        </div>
      )}

      {/* Resultado inline */}
      {answer.revealed && (
        <div
          className={cn(
            "mx-5 mb-4 rounded-lg px-4 py-2 text-xs font-semibold",
            isCorrect
              ? "bg-green-500/10 text-green-700 dark:text-green-400"
              : "bg-destructive/10 text-destructive",
          )}
        >
          {isCorrect ? "✓ Correto!" : "✗ Incorreto."}
        </div>
      )}

      {/* Ações */}
      <div className="flex justify-end gap-2 border-t border-border/60 px-5 py-3">
        {!answer.revealed ? (
          <button
            type="button"
            onClick={reveal}
            disabled={answer.selected === null}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
          >
            Verificar
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            {current < questions.length - 1 ? "Próxima →" : "Ver resultado"}
          </button>
        )}
      </div>
    </div>
  );
}
