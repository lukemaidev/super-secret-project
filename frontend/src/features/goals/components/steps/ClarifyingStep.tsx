import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCurrentQuestion } from "../../hooks/useCurrentQuestion";
import { useSubmitAnswer } from "../../hooks/useSubmitAnswer";
import type { Goal, CurrentQuestion } from "../../types/goals.types";

interface ClarifyingStepProps {
  goal: Goal;
}

function isCurrentQuestion(data: unknown): data is CurrentQuestion {
  return !!data && typeof data === "object" && "questionId" in data;
}

export function ClarifyingStep({ goal }: ClarifyingStepProps) {
  const [answer, setAnswer] = useState("");
  const [animKey, setAnimKey] = useState(0);

  const questionQuery = useCurrentQuestion(goal._id, goal.currentStep === "clarifying");
  const submitAnswer = useSubmitAnswer(goal._id);

  const question = questionQuery.data && isCurrentQuestion(questionQuery.data)
    ? questionQuery.data
    : null;

  useEffect(() => {
    setAnswer("");
    setAnimKey((k) => k + 1);
  }, [question?.questionId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (answer.trim() && question) {
      submitAnswer.mutate(
        { questionId: question.questionId, answer: answer.trim() },
        {
          onSuccess: () => {
            setAnswer("");
          },
        }
      );
    }
  }

  if (questionQuery.isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner className="text-accent !text-2xl" />
      </div>
    );
  }

  if (!question) return null;

  const progress = ((question.questionNumber - 1) / question.totalQuestions) * 100;
  const progressWithCurrent = (question.questionNumber / question.totalQuestions) * 100;

  return (
    <div className="stepFadeIn" key={animKey}>
      <div className="text-center mb-4">
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-accent-highlight font-semibold opacity-80">
          Step 2 of 4 — Clarifying
        </span>
      </div>

      {/* Progress track */}
      <div className="max-w-[480px] mx-auto mb-12">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-foreground-muted font-medium">
            Question {question.questionNumber} of {question.totalQuestions}
          </span>
          <span className="text-sm text-foreground-muted/60 tabular-nums">
            {Math.round(progressWithCurrent)}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-highlight))",
            }}
          />
        </div>
        {/* Dot indicators */}
        <div className="flex justify-between mt-3 px-0.5">
          {Array.from({ length: question.totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < question.questionNumber - 1
                  ? "bg-accent scale-100"
                  : i === question.questionNumber - 1
                    ? "bg-accent-highlight scale-125"
                    : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <form onSubmit={handleSubmit} className="max-w-[560px] mx-auto">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold leading-snug tracking-tight text-foreground text-center mb-8">
          {question.questionText}
        </h2>

        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Take your time..."
            rows={4}
            autoFocus
            className="w-full px-6 py-5 rounded-2xl border-2 border-border bg-surface-glass/50 backdrop-blur-sm text-foreground text-base leading-relaxed resize-none transition-all duration-300 placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_var(--color-accent)/10]"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            size="lg"
            icon={<ArrowRight />}
            iconPosition="end"
            loading={submitAnswer.isPending}
            disabled={!answer.trim()}
            className="!h-13 !px-10 !text-base !font-semibold !tracking-wide !rounded-xl"
          >
            {question.questionNumber === question.totalQuestions ? "Finish" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
