import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { AI_MODEL, extractAiJson } from "@/lib/ai";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();

  if (!keyword?.trim()) {
    return NextResponse.json({ error: "keyword is required" }, { status: 400 });
  }

  try {
    const message = await client.messages.create({
      model: AI_MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `꽃말 키워드: "${keyword}"

이 키워드와 관련된 꽃을 추천해주세요. 아래 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.

{
  "flowers": [
    { "name": "꽃 이름", "emoji": "꽃 이모지", "meaning": "꽃말" }
  ],
  "similarMeanings": ["유사 꽃말1", "유사 꽃말2", "유사 꽃말3"]
}

- flowers: 키워드와 관련된 꽃 3~5개
- emoji: 꽃을 가장 잘 표현하는 이모지 1개
- similarMeanings: 키워드와 유사한 꽃말 키워드 3~5개`,
        },
      ],
    });

    const text = extractAiJson(message);

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
