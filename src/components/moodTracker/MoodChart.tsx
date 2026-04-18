"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MoodEntry, MOODS } from "./MoodForm";

type Period = "weekly" | "monthly" | "yearly";

const MOOD_COLORS: Record<string, string> = {
  행복: "#facc15",
  흥분: "#f97316",
  평온: "#60a5fa",
  피곤: "#a78bfa",
  슬픔: "#94a3b8",
  화남: "#f87171",
};

const PERIODS: { key: Period; label: string }[] = [
  { key: "weekly", label: "주간" },
  { key: "monthly", label: "월간" },
  { key: "yearly", label: "연간" },
];

interface MoodChartProps {
  entries: MoodEntry[];
}

export default function MoodChart({ entries }: MoodChartProps) {
  const [period, setPeriod] = useState<Period>("weekly");

  const filteredEntries = useMemo(() => {
    const now = new Date();
    return entries.filter((e) => {
      const d = new Date(e.date);
      if (period === "weekly") {
        const ago = new Date(now);
        ago.setDate(now.getDate() - 6);
        return d >= ago;
      } else if (period === "monthly") {
        const ago = new Date(now);
        ago.setDate(now.getDate() - 29);
        return d >= ago;
      } else {
        return d.getFullYear() === now.getFullYear();
      }
    });
  }, [entries, period]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    MOODS.forEach(({ label }) => (counts[label] = 0));
    filteredEntries.forEach((e) => {
      if (counts[e.mood] !== undefined) counts[e.mood]++;
    });
    return MOODS.map(({ label, emoji }) => ({
      name: emoji,
      label,
      count: counts[label],
    }));
  }, [filteredEntries]);

  const total = filteredEntries.length;
  const topMood = chartData.reduce((a, b) => (a.count >= b.count ? a : b));

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-5">
        <div className="text-left">
          <p className="text-sm font-semibold text-gray-700">기분 통계</p>
          {total > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">
              {total}개 기록 · 최다{" "}
              <span className="text-gray-600 font-medium">
                {topMood.name} {topMood.label}
              </span>
            </p>
          )}
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-full p-0.5">
          {PERIODS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer
                ${period === key ? "bg-white text-gray-700 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {total === 0 ? (
        <p className="text-sm text-gray-300 py-10">아직 기록이 없습니다</p>
      ) : (
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={chartData} barCategoryGap="30%">
            <XAxis
              dataKey="name"
              tick={{ fontSize: 18 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide allowDecimals={false} />
            <Tooltip
              formatter={(value, _, props) => [`${value}회`, props.payload.label]}
              cursor={{ fill: "#f9fafb", radius: 8 }}
              contentStyle={{
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.label}
                  fill={MOOD_COLORS[entry.label] ?? "#e5e7eb"}
                  opacity={entry.count === 0 ? 0.2 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
