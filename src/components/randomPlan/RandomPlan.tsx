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

export default function RandomPlan() {
  const [currentPlan, setCurrentPlan] = useState<PlanData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastParams, setLastParams] = useState<{ duration: number; style: PlanStyle } | null>(null);

  const generatePlan = async (duration: number, style: PlanStyle) => {
    setIsLoading(true);
    setError(null);
    setLastParams({ duration, style });

    try {
      const res = await fetch("/api/random-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration, style }),
      });

      if (!res.ok) throw new Error("플랜 생성에 실패했어요.");

      const data = await res.json();
      setCurrentPlan({
        id: Date.now().toString(),
        duration,
        style,
        activities: data.activities,
        createdAt: new Date().toISOString(),
      });
    } catch {
      setError("플랜 생성에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastParams) generatePlan(lastParams.duration, lastParams.style);
  };

  return (
    <AppLayout title="Random Plan">
      <div className="max-w-lg mx-auto">
        <PlanForm onGenerate={generatePlan} isLoading={isLoading} />
        {error && (
          <p className="text-sm text-red-400 text-center mb-4">{error}</p>
        )}
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
