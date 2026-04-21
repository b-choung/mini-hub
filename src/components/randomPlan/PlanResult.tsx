"use client";

import { MdRefresh } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { PlanData } from "./RandomPlan";
import { formatDuration } from "@/lib/utils";

interface PlanResultProps {
  plan: PlanData;
  onRegenerate: () => void;
  isLoading: boolean;
}

const STYLE_BADGE: Record<string, string> = {
  활동적인: "bg-orange-100 text-orange-500",
  정적인: "bg-blue-100 text-blue-500",
  종합적인: "bg-violet-100 text-violet-500",
};

const STYLE_NUMBER: Record<string, string> = {
  활동적인: "bg-orange-100 text-orange-600",
  정적인: "bg-blue-100 text-blue-600",
  종합적인: "bg-violet-100 text-violet-600",
};

export default function PlanResult({ plan, onRegenerate, isLoading }: PlanResultProps) {
  const durationLabel = formatDuration(plan.duration);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-left">
          <p className="text-sm font-display text-gray-700">추천 플랜</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {durationLabel} ·{" "}
            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${STYLE_BADGE[plan.style] ?? "bg-gray-100 text-gray-500"}`}>
              {plan.style}
            </span>
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          disabled={isLoading}
          className="text-xs text-gray-400 hover:text-primary gap-1 h-auto py-1"
        >
          <MdRefresh size={15} className={isLoading ? "animate-spin" : ""} />
          다시 생성
        </Button>
      </div>

      <div className="space-y-1">
        {plan.activities.map((activity, i) => {
          const cumulative = plan.activities.slice(0, i + 1).reduce((sum, a) => sum + a.duration, 0);
          const ch = Math.floor(cumulative / 60);
          const cm = cumulative % 60;
          const cumulativeLabel = ch > 0 && cm > 0 ? `${ch}시간 ${cm}분` : ch > 0 ? `${ch}시간` : `${cm}분`;

          return (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                    ${STYLE_NUMBER[plan.style] ?? "bg-gray-100 text-gray-500"}`}
                >
                  {i + 1}
                </div>
                {i < plan.activities.length - 1 && (
                  <div className="w-px flex-1 bg-gray-100 my-1" />
                )}
              </div>
              <div className="pb-4 text-left">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-display font-semibold text-gray-700">
                    {activity.title}
                  </span>
                  <span className="text-xs text-gray-400">{activity.duration}분</span>
                  <span className="text-xs text-gray-300">+{cumulativeLabel}</span>
                </div>
                <p className="text-xs text-gray-500">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
