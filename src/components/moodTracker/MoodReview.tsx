"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { MdAutoAwesome } from "react-icons/md";
import { MoodEntry } from "./MoodForm";
import { useAiFetch } from "@/lib/useAiFetch";

type Period = "weekly" | "monthly" | "yearly";

const PERIOD_TABS: { key: Period; label: string }[] = [
  { key: "weekly", label: "주간" },
  { key: "monthly", label: "월간" },
  { key: "yearly", label: "연간" },
];

interface MoodReviewProps {
  entries: MoodEntry[];
}

export default function MoodReview({ entries }: MoodReviewProps) {
  const [period, setPeriod] = useState<Period>("weekly");
  const [review, setReview] = useState<string | null>(null);
  const { isLoading, error, setError, call } = useAiFetch<{ review: string }>();

  const filteredEntries = useMemo(() => {
    const today = new Date();
    return entries.filter((e) => {
      const d = new Date(e.date + "T12:00:00");
      if (period === "weekly") {
        const start = new Date(today);
        start.setDate(today.getDate() - 6);
        return d >= start && d <= today;
      } else if (period === "monthly") {
        return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
      } else {
        return d.getFullYear() === today.getFullYear();
      }
    });
  }, [entries, period]);

  const handleAnalyze = async () => {
    if (filteredEntries.length === 0) return;
    setReview(null);
    const data = await call(
      "/api/mood-review",
      { entries: filteredEntries.map((e) => ({ date: e.date, mood: e.mood, diary: e.diary })), period },
      "분석에 실패했어요. 다시 시도해주세요."
    );
    if (data) setReview(data.review);
  };

  const handlePeriodChange = (p: Period) => {
    setPeriod(p);
    setReview(null);
    setError(null);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-gray-700">AI 기분 리뷰</p>
        <div className="flex gap-1">
          {PERIOD_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handlePeriodChange(key)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer
                ${period === key ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-100"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {review ? (
        <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4 mb-4">
          {review}
        </div>
      ) : (
        <div className="text-center py-4 mb-4">
          {filteredEntries.length === 0 ? (
            <p className="text-sm text-gray-300">이 기간에 기록된 기분이 없어요</p>
          ) : (
            <p className="text-sm text-gray-400">
              {filteredEntries.length}개의 기록을 AI가 분석해드려요
            </p>
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400 text-center mb-3">{error}</p>
      )}

      <Button
        onClick={handleAnalyze}
        disabled={isLoading || filteredEntries.length === 0}
        className="w-full rounded-full font-bold"
      >
        <MdAutoAwesome size={15} />
        {isLoading ? "분석 중..." : review ? "다시 분석하기" : "분석하기"}
      </Button>
    </div>
  );
}
