import { useParams } from "react-router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useGoal } from "../hooks/useGoal";
import { ClarifyingStep } from "./steps/ClarifyingStep";
import { ReviewStep } from "./steps/ReviewStep";
import { GeneratedStep } from "./steps/GeneratedStep";
import { GoalComplete } from "./GoalComplete";

const STEP_MAP = {
  initial: { label: "Set Goal", index: 0 },
  clarifying: { label: "Clarify", index: 1 },
  reviewing: { label: "Review", index: 2 },
  generated: { label: "Finalize", index: 3 },
  approved: { label: "Complete", index: 4 },
} as const;

const STEPS = ["Set Goal", "Clarify", "Review", "Finalize"] as const;

export function GoalWizard() {
  const { id } = useParams<{ id: string }>();
  const { data: goal, isLoading, error } = useGoal(id!);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Spin
          indicator={<LoadingOutlined className="text-accent text-3xl" />}
        />
      </div>
    );
  }

  if (error || !goal) {
    return (
      <div className="text-center py-32">
        <p className="text-foreground-muted text-lg">Goal not found.</p>
      </div>
    );
  }

  const currentStepInfo = STEP_MAP[goal.currentStep];
  const stepIndex = currentStepInfo.index;

  return (
    <div className="max-w-180 mx-auto px-4 py-12">
      {/* Step progress indicator — only show for non-approved */}
      {goal.currentStep !== "approved" && (
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-120 mx-auto">
            {STEPS.map((label, i) => {
              const isComplete = i < stepIndex;
              const isCurrent = i === stepIndex;

              return (
                <div
                  key={label}
                  className="flex items-center flex-1 last:flex-initial"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                        isComplete
                          ? "bg-accent text-white"
                          : isCurrent
                            ? "bg-accent-highlight/20 text-accent-highlight border-2 border-accent-highlight"
                            : "bg-border/40 text-foreground-muted/50"
                      }`}
                    >
                      {isComplete ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M3 7L6 10L11 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className={`text-[0.65rem] uppercase tracking-[0.12em] font-medium whitespace-nowrap ${
                        isCurrent
                          ? "text-accent-highlight"
                          : isComplete
                            ? "text-accent"
                            : "text-foreground-muted/40"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mx-2 mb-5">
                      <div className="h-0.5 rounded-full bg-border/40 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent transition-all duration-700"
                          style={{ width: isComplete ? "100%" : "0%" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step content */}
      {goal.currentStep === "clarifying" && <ClarifyingStep goal={goal} />}
      {goal.currentStep === "reviewing" && <ReviewStep goal={goal} />}
      {goal.currentStep === "generated" && <GeneratedStep goal={goal} />}
      {goal.currentStep === "approved" && <GoalComplete goal={goal} />}

      <style>{`
        .stepFadeIn {
          animation: stepFade 0.4s ease-out;
        }
        @keyframes stepFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
