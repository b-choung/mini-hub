"use client";

import { Button } from "@/components/ui/button";
import { Goal } from "./GoalTracker";

interface GoalDetailProps {
  goal: Goal;
  onBack: () => void;
  onToggleCheckin: (goalId: string, date: string) => void;
}

const DOW_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

export default function GoalDetail({
  goal,
  onBack,
  onToggleCheckin,
}: GoalDetailProps) {
  const startDate = new Date(goal.startDate);
  const today = new Date().toISOString().split("T")[0];

  const days = Array.from({ length: goal.duration }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const startDow = startDate.getDay();
  const paddedDays: (string | null)[] = [
    ...Array(startDow).fill(null),
    ...days,
  ];
  const remainder = paddedDays.length % 7;
  if (remainder > 0) paddedDays.push(...Array(7 - remainder).fill(null));

  const weeks: (string | null)[][] = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7));
  }

  const progress = Math.round((goal.checkins.length / goal.duration) * 100);

  return (
    <div className="p-4 text-center">
      <Button variant="outline" onClick={onBack} className="mb-4">
        ← 목록으로
      </Button>
      <h2 className="text-xl font-bold mb-1">{goal.name}</h2>
      <p className="text-sm mb-6">
        달성: {goal.checkins.length}/{goal.duration}일 ({progress}%)
      </p>
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse">
          <thead>
            <tr>
              {DOW_LABELS.map((d) => (
                <th
                  key={d}
                  className="w-9 h-9 text-xs text-gray-400 font-normal"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((date, di) => {
                  if (!date) return <td key={di} className="w-9 h-9" />;
                  const isChecked = goal.checkins.includes(date);
                  const isFuture = date > today;
                  const dayNum = days.indexOf(date) + 1;
                  return (
                    <td key={di} className="w-9 h-9 p-0.5">
                      <button
                        onClick={() =>
                          !isFuture && onToggleCheckin(goal.id, date)
                        }
                        disabled={isFuture}
                        className={`w-full h-full rounded-full text-xs font-medium transition-colors
                          ${isChecked ? "bg-primary text-primary-foreground" : "hover:bg-gray-100"}
                          ${isFuture ? "text-gray-300 cursor-default" : "cursor-pointer"}
                        `}
                        title={date}
                      >
                        {dayNum}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
