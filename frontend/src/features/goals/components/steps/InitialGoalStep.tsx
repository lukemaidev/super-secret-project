import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCreateGoal } from "../../hooks/useCreateGoal";

export function InitialGoalStep() {
  const [text, setText] = useState("");
  const createGoal = useCreateGoal();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim()) {
      createGoal.mutate(text.trim());
    }
  }

  return (
    <div className="stepFadeIn">
      <div className="text-center mb-12">
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-accent-highlight font-semibold mb-4 opacity-80">
          Step 1 of 4
        </span>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-foreground mb-4">
          What do you want
          <br />
          to achieve?
        </h1>
        <p className="text-foreground-muted text-lg max-w-[44ch] mx-auto leading-relaxed">
          Don't overthink it. Write your goal as it comes to mind —
          we'll help you refine it together.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-[560px] mx-auto">
        <div className="relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="I want to..."
            rows={4}
            className="w-full px-6 py-5 rounded-2xl border-2 border-border bg-surface-glass/50 backdrop-blur-sm text-foreground text-lg leading-relaxed resize-none transition-all duration-300 placeholder:text-foreground-muted/40 focus:outline-none focus:border-accent focus:shadow-[0_0_0_4px_var(--color-accent)/10]"
          />
          {/* Subtle corner accent */}
          <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500">
            <svg viewBox="0 0 32 32" className="w-full h-full text-accent/20">
              <path d="M32 0 L32 32 L0 32" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            size="lg"
            icon={<ArrowRight />}
            iconPosition="end"
            loading={createGoal.isPending}
            disabled={!text.trim()}
            className="!h-13 !px-10 !text-base !font-semibold !tracking-wide !rounded-xl"
          >
            Begin Clarifying
          </Button>
        </div>

        {createGoal.error && (
          <p className="mt-4 text-center text-red-600 dark:text-red-400 text-sm">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
