import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import type { Goal } from "../types/goals.types";

interface GoalCompleteProps {
  goal: Goal;
}

export function GoalComplete({ goal }: GoalCompleteProps) {
  const navigate = useNavigate();

  return (
    <div className="stepFadeIn">
      <div className="text-center mb-12">
        {/* Animated checkmark */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/30 mb-6 goalCompleteCheck">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-accent">
            <path
              d="M8 18L15 25L28 11"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="goalCheckPath"
            />
          </svg>
        </div>

        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight text-foreground mb-3">
          Goal approved
        </h1>
        <p className="text-foreground-muted text-lg max-w-[44ch] mx-auto leading-relaxed">
          You've taken the first step. Your clarified goal is ready to guide your journey.
        </p>
      </div>

      {/* Final statement showcase */}
      <div className="max-w-[600px] mx-auto">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Gradient border effect */}
          <div
            className="absolute inset-0 rounded-2xl p-[2px]"
            style={{
              background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-highlight), var(--color-accent))",
            }}
          >
            <div className="w-full h-full rounded-[14px] bg-background" />
          </div>

          <div className="relative px-10 py-10">
            <svg width="28" height="22" viewBox="0 0 28 22" className="text-accent/30 mb-4">
              <path
                d="M0 22V14.3C0 11.5 0.6 9.1 1.7 7.1C2.9 5 4.7 3.3 7.1 2L9.8 5.4C8.1 6.4 6.8 7.6 5.9 9.1C5.1 10.5 4.6 12.1 4.5 13.8H8.4V22H0ZM17.1 22V14.3C17.1 11.5 17.7 9.1 18.8 7.1C20 5 21.8 3.3 24.2 2L26.9 5.4C25.2 6.4 23.9 7.6 23 9.1C22.2 10.5 21.7 12.1 21.6 13.8H25.5V22H17.1Z"
                fill="currentColor"
              />
            </svg>
            <p className="text-foreground text-xl leading-relaxed font-medium m-0">
              {goal.finalStatement}
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            icon={<Plus />}
            onClick={() => navigate("/goals/new")}
            className="!h-12 !px-8 !text-base !rounded-xl"
          >
            Set another goal
          </Button>
        </div>
      </div>

      <style>{`
        .goalCompleteCheck {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .goalCheckPath {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: drawCheck 0.5s 0.3s ease-out forwards;
        }
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
