"use client";

import { useState } from "react";
import AppLayout from "@/components/common/AppLayout";
import PlanForm from "./PlanForm";
import PlanResult from "./PlanResult";

export type PlanStyle = "활동적인" | "정적인" | "종합적인";

export interface Activity {
  title: string;
  duration: number;
  description: string;
}

export interface PlanData {
  id: string;
  duration: number;
  style: PlanStyle;
  activities: Activity[];
  createdAt: string;
}

const MOCK_ACTIVITIES: Activity[] = [
  { title: "스트레칭 & 준비운동", duration: 10, description: "가볍게 몸을 풀어주세요. 관절 위주로 천천히 움직입니다." },
  { title: "산책", duration: 30, description: "동네를 한 바퀴 걸으며 신선한 공기를 마셔보세요." },
  { title: "좋아하는 음악 들으며 휴식", duration: 20, description: "편안한 자세로 앉아 좋아하는 플레이리스트를 틀어두세요." },
];

export default function RandomPlan() {
  const [currentPlan, setCurrentPlan] = useState<PlanData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastParams, setLastParams] = useState<{ duration: number; style: PlanStyle } | null>(null);

  const generatePlan = async (duration: number, style: PlanStyle) => {
    setIsLoading(true);
    setLastParams({ duration, style });
    // TODO: AI API 연동
    await new Promise((r) => setTimeout(r, 600));
    setCurrentPlan({
      id: Date.now().toString(),
      duration,
      style,
      activities: MOCK_ACTIVITIES,
      createdAt: new Date().toISOString(),
    });
    setIsLoading(false);
  };

  const handleRegenerate = () => {
    if (lastParams) generatePlan(lastParams.duration, lastParams.style);
  };

  return (
    <AppLayout title="Random Plan">
      <div className="max-w-lg mx-auto">
        <PlanForm onGenerate={generatePlan} isLoading={isLoading} />
        {currentPlan && (
          <PlanResult
            plan={currentPlan}
            onRegenerate={handleRegenerate}
            isLoading={isLoading}
          />
        )}
      </div>
    </AppLayout>
  );
}
