"use client";

import { Button } from "@/components/ui/button";
import { Goal } from "./GoalTracker";
import { MdArrowBack } from "react-icons/md";
import { DOW_LABELS } from "@/lib/constants";

interface GoalDetailProps {
  goal: Goal;
  onBack: () => void;
  onToggleCheckin: (goalId: string, date: string) => void;
}

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
    <div className="px-4 py-12">
      <div className="w-fit mx-auto">
        <div className="mb-6">
          <Button variant="outline" size="icon" onClick={onBack}>
            <MdArrowBack />
          </Button>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-1">{goal.name}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {goal.startDate} · {goal.duration}일 목표
          </p>
          <div className="max-w-xs mx-auto mb-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-blue-500 font-bold mb-6">
            {goal.checkins.length}/{goal.duration}일 ({progress}%)
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
                      const isToday = date === today;
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
                            ${isToday && !isChecked ? "ring-2 ring-primary text-primary" : ""}
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
      </div>
    </div>
  );
}
