import { useState } from "react";
import { Pencil, Check, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEditAnswer } from "../../hooks/useEditAnswer";
import { useGenerateStatement } from "../../hooks/useGenerateStatement";
import type { Goal } from "../../types/goals.types";

interface ReviewStepProps {
  goal: Goal;
}

export function ReviewStep({ goal }: ReviewStepProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const editAnswer = useEditAnswer(goal._id);
  const generateStatement = useGenerateStatement(goal._id);

  function startEdit(questionId: string, currentAnswer: string) {
    setEditingId(questionId);
    setEditText(currentAnswer);
  }

  function saveEdit(questionId: string) {
    if (editText.trim()) {
      editAnswer.mutate(
        { questionId, answer: editText.trim() },
        { onSuccess: () => setEditingId(null) }
      );
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  return (
    <div className="stepFadeIn">
      <div className="text-center mb-4">
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-accent-highlight font-semibold opacity-80">
          Step 3 of 4 — Review
        </span>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-snug tracking-tight text-foreground mb-3">
          Review your answers
        </h2>
        <p className="text-foreground-muted max-w-[48ch] mx-auto leading-relaxed">
          Everything look right? Edit anything you'd like to refine before we generate your personalized goal.
        </p>
      </div>

      {/* Initial goal context */}
      <div className="max-w-[600px] mx-auto mb-6">
        <div className="px-5 py-4 rounded-xl border border-accent/20 bg-accent/5">
          <span className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Your Goal</span>
          <p className="mt-1.5 text-foreground font-medium leading-relaxed m-0">
            {goal.initialText}
          </p>
        </div>
      </div>

      {/* Answer cards */}
      <div className="max-w-[600px] mx-auto flex flex-col gap-4 mb-10">
        {goal.clarifyingAnswers.map((item, index) => (
          <div
            key={item.questionId}
            className="rounded-xl border border-border bg-surface-glass/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-border/80 hover:shadow-[0_4px_20px_var(--color-shadow)]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="px-5 pt-4 pb-1 flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-[0.7rem] uppercase tracking-[0.2em] text-foreground-muted/60 font-medium">
                  Question {index + 1}
                </span>
                <p className="mt-1 text-sm font-semibold text-foreground leading-snug m-0">
                  {item.questionText}
                </p>
              </div>
              {editingId !== item.questionId && (
                <button
                  type="button"
                  onClick={() => startEdit(item.questionId, item.answer)}
                  className="shrink-0 mt-1 w-8 h-8 flex items-center justify-center rounded-lg text-foreground-muted/60 hover:text-accent hover:bg-accent/10 transition-all duration-200 cursor-pointer border-none bg-transparent"
                >
                  <Pencil className="size-3.5" />
                </button>
              )}
            </div>

            <div className="px-5 pb-4 pt-2">
              {editingId === item.questionId ? (
                <div className="flex flex-col gap-3">
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                    className="!bg-transparent !border-accent/30 focus:!border-accent !text-sm min-h-[4rem]"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={cancelEdit}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      icon={<Check />}
                      loading={editAnswer.isPending}
                      onClick={() => saveEdit(item.questionId)}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-foreground-muted text-sm leading-relaxed m-0">
                  {item.answer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Generate button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          icon={<Zap />}
          loading={generateStatement.isPending}
          onClick={() => generateStatement.mutate()}
          className="!h-13 !px-10 !text-base !font-semibold !tracking-wide !rounded-xl"
        >
          {generateStatement.isPending ? "Generating..." : "Generate Goal Statement"}
        </Button>
      </div>

      {generateStatement.error && (
        <p className="mt-4 text-center text-red-600 dark:text-red-400 text-sm">
          Failed to generate. Please try again.
        </p>
      )}
    </div>
  );
}
