"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdAdd, MdRemove } from "react-icons/md";
import { PlanStyle } from "./RandomPlan";
import { formatDuration } from "@/lib/utils";

const STYLES: { key: PlanStyle; emoji: string; label: string }[] = [
  { key: "활동적인", emoji: "🏃", label: "활동적인" },
  { key: "정적인", emoji: "📚", label: "정적인" },
  { key: "종합적인", emoji: "✨", label: "종합적인" },
];

const MINUTE_OPTIONS = [0, 15, 30, 45];

interface PlanFormProps {
  onGenerate: (duration: number, style: PlanStyle) => void;
  isLoading: boolean;
}

export default function PlanForm({ onGenerate, isLoading }: PlanFormProps) {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [style, setStyle] = useState<PlanStyle>("종합적인");

  const totalMinutes = hours * 60 + minutes;

  const timeLabel = formatDuration(hours * 60 + minutes);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-4">
      <p className="text-sm font-display text-gray-700 mb-4">계획할 시간</p>

      <div className="flex items-center justify-center gap-4 mb-3">
        <button
          onClick={() => setHours(Math.max(0, hours - 1))}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <MdRemove size={16} />
        </button>
        <span className="text-3xl font-bold text-gray-800 w-20 text-center">
          {hours}시간
        </span>
        <button
          onClick={() => setHours(Math.min(12, hours + 1))}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <MdAdd size={16} />
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {MINUTE_OPTIONS.map((m) => (
          <button
            key={m}
            onClick={() => setMinutes(m)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer
              ${minutes === m
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
          >
            {m}분
          </button>
        ))}
      </div>

      <p className="text-sm font-display text-gray-700 mb-3">플랜 방향</p>
      <div className="flex gap-2 mb-6">
        {STYLES.map(({ key, emoji, label }) => (
          <button
            key={key}
            onClick={() => setStyle(key)}
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl text-xs font-display font-semibold transition-all cursor-pointer
              ${style === key
                ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                : "bg-gray-50 text-gray-400 hover:bg-gray-100"
              }`}
          >
            <span className="text-xl">{emoji}</span>
            {label}
          </button>
        ))}
      </div>

      <Button
        onClick={() => onGenerate(totalMinutes, style)}
        disabled={totalMinutes < 10 || isLoading}
        className="w-full rounded-full font-bold"
      >
        {isLoading ? "생성 중..." : `${timeLabel} 플랜 생성하기`}
      </Button>
    </div>
  );
}
