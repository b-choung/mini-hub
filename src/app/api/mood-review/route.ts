import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { AI_MODEL } from "@/lib/ai";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { entries, period } = await req.json();

  if (!entries || entries.length === 0) {
    return NextResponse.json({ error: "entries is required" }, { status: 400 });
  }

  const periodLabel = period === "weekly" ? "주간" : period === "monthly" ? "월간" : "연간";

  const entriesText = entries
    .map((e: { date: string; mood: string; diary: string }) =>
      `- ${e.date} / 기분: ${e.mood}${e.diary ? ` / 일기: ${e.diary}` : ""}`
    )
    .join("\n");

  try {
    const message = await client.messages.create({
      model: AI_MODEL,
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `아래는 사용자의 ${periodLabel} 기분 기록입니다.

${entriesText}

이 기록을 바탕으로 사용자의 ${periodLabel} 감정 상태를 따뜻하고 공감하는 톤으로 3~4문장 이내로 분석해주세요.
- 전반적인 감정 흐름을 짚어주세요
- 특이한 패턴이 있다면 언급해주세요
- 마지막에 짧은 응원 한 마디로 마무리해주세요
- 한국어로 작성해주세요
- JSON이나 마크다운 없이 일반 텍스트로만 응답하세요`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text.trim() : "";

    return NextResponse.json({ review: text });
  } catch (e) {
    console.error("Anthropic API error:", e);
    return NextResponse.json({ error: "Failed to call AI" }, { status: 500 });
  }
}
