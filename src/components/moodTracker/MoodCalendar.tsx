"use client";

import { useState } from "react";
import { MdChevronLeft, MdChevronRight, MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { MoodEntry, MOODS } from "./MoodForm";
import { DOW_LABELS } from "@/lib/constants";

const MOOD_BG: Record<string, string> = {
  행복: "bg-yellow-100",
  흥분: "bg-orange-100",
  평온: "bg-blue-100",
  피곤: "bg-violet-100",
  슬픔: "bg-slate-100",
  화남: "bg-red-100",
};

interface MoodCalendarProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
}

export default function MoodCalendar({ entries, onDelete }: MoodCalendarProps) {
  const [current, setCurrent] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const entryMap = entries.reduce<Record<string, MoodEntry>>((acc, e) => {
    acc[e.date] = e;
    return acc;
  }, {});

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();

  const cells: (string | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const d = i + 1;
      return `${current.year}-${String(current.month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }),
  ];
  const remainder = cells.length % 7;
  if (remainder > 0) cells.push(...Array(7 - remainder).fill(null));

  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const prevMonth = () =>
    setCurrent((c) => {
      const d = new Date(c.year, c.month - 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const nextMonth = () =>
    setCurrent((c) => {
      const d = new Date(c.year, c.month + 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const selectedEntry = selectedDate ? entryMap[selectedDate] : null;
  const selectedMood = selectedEntry
    ? MOODS.find((m) => m.label === selectedEntry.mood)
    : null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-display text-gray-700">기분 달력</p>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-400"
          >
            <MdChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-gray-600 w-20 text-center">
            {current.year}.{String(current.month + 1).padStart(2, "0")}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-400"
          >
            <MdChevronRight size={18} />
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {DOW_LABELS.map((d) => (
              <th key={d} className="text-xs text-gray-400 font-normal pb-2">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((date, di) => {
                if (!date) return <td key={di} className="p-0.5 h-12" />;
                const entry = entryMap[date];
                const moodInfo = entry
                  ? MOODS.find((m) => m.label === entry.mood)
                  : null;
                const isToday = date === today;
                const isSelected = date === selectedDate;
                const dayNum = parseInt(date.split("-")[2], 10);

                return (
                  <td key={di} className="p-0.5 h-12">
                    <button
                      onClick={() => setSelectedDate(isSelected ? null : date)}
                      className={`w-full h-full rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer gap-0.5
                        ${isSelected ? "ring-2 ring-primary bg-primary/5" : ""}
                        ${entry && !isSelected ? `${MOOD_BG[entry.mood] ?? "bg-gray-50"} hover:opacity-80` : ""}
                        ${!entry && !isSelected ? "hover:bg-gray-50" : ""}
                      `}
                    >
                      <span
                        className={`text-xs font-medium leading-none
                          ${isToday ? "text-primary font-bold" : "text-gray-500"}
                        `}
                      >
                        {dayNum}
                      </span>
                      {moodInfo && (
                        <span className="text-sm leading-none">
                          {moodInfo.emoji}
                        </span>
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEntry && selectedMood && (
        <div
          className={`mt-4 rounded-xl px-4 py-3 flex items-start gap-3 ${MOOD_BG[selectedEntry.mood] ?? "bg-gray-50"}`}
        >
          <span className="text-2xl shrink-0">{selectedMood.emoji}</span>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-gray-700">
                {selectedEntry.mood}
              </span>
              <span className="text-xs text-gray-400">
                {selectedEntry.date}
              </span>
            </div>
            {selectedEntry.diary && (
              <p className="text-sm text-gray-500">{selectedEntry.diary}</p>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="size-7 text-gray-300 hover:text-red-400 hover:bg-white/60 shrink-0"
            onClick={() => {
              onDelete(selectedEntry.id);
              setSelectedDate(null);
            }}
          >
            <MdDelete size={15} />
          </Button>
        </div>
      )}
    </div>
  );
}
