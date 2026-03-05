import { useState } from "react";
import { Button } from "antd";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";

import { useApproveGoal } from "../../hooks/useApproveGoal";
import type { Goal } from "../../types/goals.types";

interface GeneratedStepProps {
  goal: Goal;
}

export function GeneratedStep({ goal }: GeneratedStepProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [statement, setStatement] = useState(goal.generatedStatement ?? "");
  const approveGoal = useApproveGoal(goal._id);

  function handleApprove() {
    const final = isEditing ? statement.trim() : undefined;
    approveGoal.mutate(final);
  }

  return (
    <div className="stepFadeIn">
      <div className="text-center mb-4">
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-accent-highlight font-semibold opacity-80">
          Step 4 of 4 — Finalize
        </span>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-snug tracking-tight text-foreground mb-3">
          Your personalized goal
        </h2>
        <p className="text-foreground-muted max-w-[48ch] mx-auto leading-relaxed">
          Here's a refined statement based on everything you shared.
          Feel free to edit it before approving.
        </p>
      </div>

      <div className="max-w-[600px] mx-auto">
        {/* Statement display/editor */}
        <div className="relative rounded-2xl border-2 border-accent/20 bg-accent/[0.03] overflow-hidden">
          {/* Decorative top bar */}
          <div
            className="h-1"
            style={{
              background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-highlight), var(--color-accent))",
            }}
          />

          <div className="p-8">
            {isEditing ? (
              <textarea
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                rows={5}
                autoFocus
                className="w-full bg-transparent text-foreground text-lg leading-relaxed resize-none border-none outline-none placeholder:text-foreground-muted/40"
              />
            ) : (
              <blockquote className="m-0">
                <p className="text-foreground text-lg leading-relaxed font-medium m-0 italic">
                  "{goal.generatedStatement}"
                </p>
              </blockquote>
            )}
          </div>

          {/* Edit toggle */}
          <div className="px-8 pb-5 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (!isEditing) setStatement(goal.generatedStatement ?? "");
                setIsEditing(!isEditing);
              }}
              className="flex items-center gap-1.5 text-sm text-foreground-muted/70 hover:text-accent transition-colors duration-200 cursor-pointer border-none bg-transparent"
            >
              <EditOutlined className="text-xs" />
              {isEditing ? "Cancel editing" : "Edit statement"}
            </button>
          </div>
        </div>

        {/* Approve */}
        <div className="mt-10 flex justify-center">
          <Button
            type="primary"
            size="large"
            icon={<CheckCircleOutlined />}
            loading={approveGoal.isPending}
            onClick={handleApprove}
            disabled={isEditing && !statement.trim()}
            className="!h-13 !px-10 !text-base !font-semibold !tracking-wide !rounded-xl"
          >
            Approve Goal
          </Button>
        </div>

        {approveGoal.error && (
          <p className="mt-4 text-center text-red-600 dark:text-red-400 text-sm">
            Failed to approve. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
