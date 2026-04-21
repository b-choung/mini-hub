import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { AI_MODEL } from "@/lib/ai";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { duration, style } = await req.json();

  if (!duration || duration < 10) {
    return NextResponse.json(
      { error: "duration is required (min 10 minutes)" },
      { status: 400 },
    );
  }

  const activityCount = duration <= 60 ? "2~4개" : "3~6개";

  try {
    const message = await client.messages.create({
      model: AI_MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `총 시간: ${duration}분
플랜 방향: ${style}

이 시간 동안 하면 좋을 활동 플랜을 만들어주세요. 아래 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.

{
  "activities": [
    { "title": "활동 이름", "duration": 30, "description": "간단한 설명" }
  ]
}

조건:
- 활동들의 duration 합계가 정확히 ${duration}분이 되어야 합니다
- 활동은 ${activityCount}로 구성해주세요
- "${style}" 방향에 맞는 활동으로 구성해주세요
- duration은 분 단위 정수입니다
- description은 1~2문장으로 간결하게 작성해주세요
- 한국어로 작성해주세요`,
        },
      ],
    });

    const raw =
      message.content[0].type === "text" ? message.content[0].text : "";
    const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (e) {
      console.error("JSON parse error. Raw text:", text, e);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 },
      );
    }
  } catch (e) {
    console.error("Anthropic API error:", e);
    return NextResponse.json(
      { error: "Failed to call AI" },
      { status: 500 },
    );
  }
}
