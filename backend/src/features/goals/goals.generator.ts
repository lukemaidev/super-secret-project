import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

import { config } from "../../config/env";
import { logger } from "../../utils/logger";
import type { ClarifyingAnswer } from "./goals.types";

function buildPrompt(initialText: string, answers: ClarifyingAnswer[]): string {
  const answersBlock = answers
    .map((a) => `Q: ${a.questionText}\nA: ${a.answer}`)
    .join("\n\n");

  return `You are a goal-setting coach. Based on the user's initial goal and their answers to clarifying questions, write a clear, specific, and motivating personalized goal statement in 2-3 sentences. Write in second person ("You will...").

Initial goal: "${initialText}"

Clarifying answers:
${answersBlock}

Write ONLY the goal statement, nothing else.`;
}

async function generateWithNova(prompt: string): Promise<string> {
  const client = new BedrockRuntimeClient({
    region: config.awsRegion ?? "us-east-1",
    credentials: {
      accessKeyId: config.awsAccessKeyId!,
      secretAccessKey: config.awsSecretAccessKey!,
    },
  });

  const command = new InvokeModelCommand({
    modelId: "amazon.nova-lite-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      messages: [{ role: "user", content: [{ text: prompt }] }],
      inferenceConfig: {
        maxTokens: 300,
        temperature: 0.7,
      },
    }),
  });

  const response = await client.send(command);
  const body = JSON.parse(new TextDecoder().decode(response.body));
  return body.output.message.content[0].text.trim();
}

function generateWithTemplate(initialText: string, answers: ClarifyingAnswer[]): string {
  const motivation = answers.find((a) => a.questionId === "motivation")?.answer ?? "";
  const timeline = answers.find((a) => a.questionId === "timeline")?.answer ?? "";
  const success = answers.find((a) => a.questionId === "success")?.answer ?? "";

  return `You will ${initialText.toLowerCase().replace(/\.$/, "")}, driven by your desire to ${motivation.toLowerCase().replace(/\.$/, "")}. Your target is to achieve this by ${timeline.toLowerCase().replace(/\.$/, "")}, and you'll know you've succeeded when ${success.toLowerCase().replace(/\.$/, "")}.`;
}

export async function generateGoalStatement(
  initialText: string,
  answers: ClarifyingAnswer[]
): Promise<string> {
  if (config.awsAccessKeyId && config.awsSecretAccessKey) {
    try {
      const prompt = buildPrompt(initialText, answers);
      return await generateWithNova(prompt);
    } catch (error) {
      logger.error(error, "Nova AI generation failed, falling back to template");
    }
  }

  return generateWithTemplate(initialText, answers);
}
