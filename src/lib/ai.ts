import type Anthropic from "@anthropic-ai/sdk";

export const AI_MODEL = "claude-haiku-4-5-20251001";

export function extractAiJson(message: Anthropic.Message): string {
  const raw = message.content[0].type === "text" ? message.content[0].text : "";
  return raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
}
