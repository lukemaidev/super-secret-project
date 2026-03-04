# GOAL ACHIEVEMENT APP - USER STORIES

## Product Vision

The Goal Achievement App helps users turn vague ambitions into clear, realistic, and personalized goals. Through guided questions, adaptive planning, and supportive progress tracking, the app creates actionable milestone and task-based plans that adjust to the user's timeline, constraints, consistency, and changing life circumstances. The product is designed to feel encouraging rather than judgmental, giving users control while helping them stay motivated and make steady progress toward meaningful goals.

## EPIC 1: GOAL CREATION & CLARIFICATION

### US-1
As a user, I want to enter my initial goal in free text so that I can start even if my goal is vague.

Acceptance criteria:
1. Given I am starting a new goal, when I enter free-text goal content and submit it, then the app saves the goal even if the wording is broad or incomplete.
2. Given my goal is saved successfully, when the submission is complete, then I am moved to the next step in the goal setup flow.
3. Given the goal field is empty, when I try to continue, then the app prevents submission and shows a clear validation message.

### US-2
As a user, I want to be asked one question at a time about my goal so that I am not overwhelmed.

Acceptance criteria:
1. Given I am in the goal clarification flow, when a question is displayed, then only one unanswered question is shown at a time.
2. Given I answer the current question and continue, when the answer is accepted, then the next question is displayed.
3. Given I am moving through the clarification flow, then my previously answered questions remain saved while later unanswered questions stay hidden until I reach them.

### US-3
As a user, I want the app to ask clarifying questions (why, timeline, constraints) so that my goal becomes specific and realistic.

Acceptance criteria:
1. Given I have entered an initial goal, when the clarification flow begins, then the app asks at least one question about my motivation, one about timing, and one about constraints or limitations.
2. Given a clarifying question is shown, then the wording is in plain language and directly related to my stated goal.
3. Given I answer the clarifying questions, when I continue through the flow, then each answer is saved and used in the final goal definition.

### US-4
As a user, I want to review and edit my answers so that I feel in control of my goal definition.

Acceptance criteria:
1. Given I have answered one or more clarification questions, when I open the review step, then I can see all saved answers in one place.
2. Given I am reviewing my answers, when I edit an answer and save it, then the updated answer replaces the previous value.
3. Given I have updated an answer, when I continue, then the latest saved answer is used in the generated goal statement and plan.

### US-5
As a user, I want the app to rewrite my goal based on my answers so that I have a clear, personalized goal statement.

Acceptance criteria:
1. Given I have completed the required clarification questions, when I continue, then the app generates a personalized goal statement.
2. Given the personalized goal statement is generated, then it is shown to me before plan generation begins.
3. Given I provided details such as timeline or constraints, when the goal statement is generated, then those details are reflected in the wording where relevant.

### US-6
As a user, I want to approve or modify the personalized goal so that it truly reflects what I want to achieve.

Acceptance criteria:
1. Given the personalized goal statement is displayed, then I can approve it and continue to plan generation.
2. Given the personalized goal statement is displayed, then I can edit the text before continuing.
3. Given I approve or edit the goal statement, when I save and continue, then the saved version becomes the active goal used for later planning.

## EPIC 2: GOAL PLAN GENERATION

### US-7
As a user, I want the app to generate a goal plan so that I know what actions to take.

Acceptance criteria:
1. Given I have an approved goal, when I request a plan, then the app generates and displays a goal plan.
2. Given a plan is generated successfully, then it includes at least one actionable step I can take.
3. Given plan generation cannot be completed, when the request fails, then the app shows a clear error message and lets me try again.

### US-8
As a user, I want my plan to be broken into milestones so that progress feels achievable.

Acceptance criteria:
1. Given a plan is generated, then the plan is displayed as milestones instead of a single unstructured list.
2. Given a milestone is shown, then it has a clear name or description and associated tasks.
3. Given a plan contains multiple milestones, then the milestones are shown in the order they are intended to be completed.

### US-9
As a user, I want daily or weekly tasks generated from my goal so that I know exactly what to do next.

Acceptance criteria:
1. Given a plan is generated, then it includes scheduled tasks at a daily cadence, a weekly cadence, or both.
2. Given a task is displayed, then it clearly shows what I need to do and the period in which I should do it.
3. Given I open my plan, then I can identify the next upcoming task without needing to create tasks manually.

### US-10
As a user, I want my plan to reflect my available time so that it fits into my lifestyle.

Acceptance criteria:
1. Given I am setting up or editing my goal plan, then I can provide my available time for completing tasks.
2. Given my available time is saved, when a plan is generated or updated, then the scheduled workload does not exceed that availability.
3. Given I change my available time, when the plan is recalculated, then the updated plan reflects the new time limit.

## EPIC 3: FLEXIBLE COMPONENT SYSTEM

### US-11
As a user, I want my goal plan to be made of flexible components so that I can adjust it when life changes.

Acceptance criteria:
1. Given my plan is displayed, then I can see it as individual milestones, tasks, or other editable components.
2. Given I update a single component, when I save the change, then the rest of the plan remains available without requiring full recreation.
3. Given I have saved a component change, when I return to the plan later, then the updated component is still present.

### US-12
As a user, I want to change task duration so that the plan matches my energy and schedule.

Acceptance criteria:
1. Given a task has a planned duration, then I can edit that duration.
2. Given I save a new task duration, then the updated duration is shown on the task and used in future scheduling.
3. Given I enter an invalid duration value, when I try to save, then the app blocks the change and shows a validation message.

### US-13
As a user, I want to change task frequency so that the plan stays realistic.

Acceptance criteria:
1. Given a recurring task exists, then I can change how often it occurs.
2. Given I save a new task frequency, then future scheduled instances reflect the updated frequency.
3. Given I enter an unsupported or invalid frequency value, when I try to save, then the app prevents the change and explains the issue.

### US-14
As a user, I want to switch difficulty levels (easy, normal, hard) so that the plan adapts to my motivation.

Acceptance criteria:
1. Given I have an active plan, then I can switch the plan difficulty between easy, normal, and hard.
2. Given I change the difficulty level, when the plan updates, then future task load, duration, frequency, or intensity changes to match the selected difficulty.
3. Given a difficulty level is active, then the selected level is clearly shown on the plan.

### US-15
As a user, I want to apply constraints (e.g., no gym, low time) so that the plan respects my limitations.

Acceptance criteria:
1. Given I am editing my plan, then I can add one or more constraints that affect plan generation.
2. Given constraints are active, when the plan is generated or updated, then tasks that conflict with those constraints are removed or replaced.
3. Given a constraint has been applied, then it remains visible on the plan and can be removed or changed later.

### US-16
As a user, I want to preview how changes affect my weekly plan so that I can make informed adjustments.

Acceptance criteria:
1. Given I am changing a plan setting or component, then I can preview the effect on my weekly plan before confirming the change.
2. Given a preview is displayed, then it clearly shows which weekly tasks are added, removed, or modified.
3. Given I cancel the previewed change, then my current saved weekly plan remains unchanged.

## EPIC 4: PLAN ADAPTATION & FEEDBACK

### US-17
As a user, I want the app to detect missed tasks so that it can help me adapt instead of making me feel like I failed.

Acceptance criteria:
1. Given a scheduled task passes its due time without being completed, then the app marks that task as missed.
2. Given a task is marked as missed, then it is shown differently from completed and upcoming tasks.
3. Given missed tasks are detected, then the app offers adaptation or recovery options instead of deleting progress or using punitive language.

### US-18
As a user, I want the app to ask follow-up questions when I struggle so that the plan can be adjusted.

Acceptance criteria:
1. Given I repeatedly miss tasks or indicate that I am struggling, when the app detects that pattern, then it asks follow-up questions.
2. Given follow-up questions are asked, then they help identify the reason for the difficulty, such as lack of time, low motivation, or unrealistic task size.
3. Given I answer the follow-up questions, when the plan is updated, then the answers are used to inform the adjustment.

### US-19
As a user, I want the plan to automatically scale down during busy periods so that I can stay consistent.

Acceptance criteria:
1. Given a busy period is identified for my schedule, when the plan is recalculated, then the workload for that period is reduced automatically.
2. Given the workload is scaled down, then the busy period contains fewer tasks, shorter tasks, or both compared with the normal plan.
3. Given the busy period ends, when normal scheduling resumes, then the app restores the regular workload or prompts me to confirm the next step.

### US-20
As a user, I want the plan to scale up when I am consistent so that I continue to grow.

Acceptance criteria:
1. Given I complete at least 80% of my scheduled tasks for two consecutive weeks, when the app evaluates my progress, then it increases the future workload slightly or recommends a higher difficulty.
2. Given the plan is scaled up, then the updated plan clearly shows the added challenge before or when it is applied.
3. Given the workload increases, then my past progress remains unchanged and visible.

## EPIC 5: PROGRESS TRACKING & MOTIVATION

### US-21
As a user, I want to track my completed tasks so that I can see my progress.

Acceptance criteria:
1. Given I have a scheduled task, then I can mark it as completed.
2. Given I complete a task, when I save that completion, then the task shows a completed state and the date of completion.
3. Given tasks are marked complete, then they contribute to my visible progress totals.

### US-22
As a user, I want to see streaks and progress indicators so that I stay motivated.

Acceptance criteria:
1. Given I have recorded task activity, then the app displays a streak count and at least one progress indicator for my goal or plan.
2. Given I complete tasks in consecutive planned periods, then the streak count increases accordingly.
3. Given I complete or miss tasks, then the progress indicators update to reflect the latest saved state.

### US-23
As a user, I want weekly summaries so that I can reflect on my progress.

Acceptance criteria:
1. Given a week of plan activity has occurred, then the app provides a weekly summary for that period.
2. Given a weekly summary is displayed, then it includes completed tasks, missed tasks, and upcoming tasks.
3. Given I want to review my history, then I can access the current week's summary and at least one previous weekly summary.

### US-24
As a user, I want positive feedback when I make progress so that I feel encouraged.

Acceptance criteria:
1. Given I complete a task or milestone, then the app shows a supportive feedback message.
2. Given a feedback message is shown, then the wording focuses on progress and encouragement rather than guilt or shame.
3. Given I make progress, then the feedback appears within the same session in which the progress was recorded.

## EPIC 6: USER CONTROL & EXPERIENCE

### US-25
As a user, I want to pause or modify my goal without losing progress so that the app works with my life.

Acceptance criteria:
1. Given I have an active goal, then I can pause it and resume it later.
2. Given I pause or modify my goal, then my completed tasks and progress history remain saved.
3. Given I modify my goal, when the updated version is saved, then future planning reflects the change while past progress stays visible.

### US-26
As a user, I want to revisit and refine my goal over time so that it evolves with me.

Acceptance criteria:
1. Given I have a saved goal, then I can reopen it and review the current goal statement and related answers.
2. Given I edit the goal details and save them, then the revised goal becomes the current active version.
3. Given the goal has been refined, when planning information is refreshed, then the plan reflects the latest saved goal.

### US-27
As a user, I want the app to feel supportive rather than judgmental so that I feel safe using it consistently.

Acceptance criteria:
1. Given the app displays guidance, progress, or recovery messages, then the wording uses supportive and neutral language.
2. Given I miss tasks, pause a goal, or change direction, then the app offers constructive next steps instead of blame-focused messaging.
3. Given the app shows an error or validation message, then it explains what I can do next in plain language.
