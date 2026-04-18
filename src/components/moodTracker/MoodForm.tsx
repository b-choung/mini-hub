"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  diary: string;
  createdAt: string;
}

export const MOODS = [
  { label: "행복", emoji: "😊", score: 5 },
  { label: "흥분", emoji: "🤩", score: 4 },
  { label: "평온", emoji: "😌", score: 3 },
  { label: "피곤", emoji: "😴", score: 2 },
  { label: "슬픔", emoji: "😢", score: 1 },
  { label: "화남", emoji: "😠", score: 0 },
];

const MAX_DIARY_LENGTH = 100;

interface MoodFormProps {
  onAdd: (entry: MoodEntry) => void;
  registeredDates: Set<string>;
}

export default function MoodForm({ onAdd, registeredDates }: MoodFormProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [mood, setMood] = useState("");
  const [diary, setDiary] = useState("");

  const isRegistered = registeredDates.has(date);

  const handleSubmit = () => {
    if (!mood) return;
    onAdd({
      id: Date.now().toString(),
      date,
      mood,
      diary,
      createdAt: new Date().toISOString(),
    });
    setMood("");
    setDiary("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-semibold text-gray-700">오늘의 기분</p>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-fit text-sm text-gray-500 border-none shadow-none p-0 h-auto"
        />
      </div>

      <div className="flex gap-2 justify-between mb-5">
        {MOODS.map(({ label, emoji }) => (
          <button
            key={label}
            onClick={() => setMood(label)}
            className={`flex flex-col items-center gap-1.5 flex-1 py-3 rounded-2xl text-xs font-medium transition-all cursor-pointer
              ${mood === label
                ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                : "text-gray-400 hover:bg-gray-50"
              }`}
          >
            <span className={`text-2xl transition-transform ${mood === label ? "scale-110" : ""}`}>
              {emoji}
            </span>
            {label}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <Textarea
          placeholder="오늘 하루를 한 줄로 남겨보세요"
          value={diary}
          onChange={(e) => setDiary(e.target.value.slice(0, MAX_DIARY_LENGTH))}
          className="resize-none h-20 text-sm pr-12"
        />
        <span className="absolute bottom-2.5 right-3 text-xs text-gray-300">
          {diary.length}/{MAX_DIARY_LENGTH}
        </span>
      </div>

      {isRegistered && (
        <p className="text-xs text-amber-500 text-center -mt-1">
          이미 기록된 날짜입니다. 저장 시 기존 기록이 덮어씌워집니다.
        </p>
      )}
      <Button
        onClick={handleSubmit}
        disabled={!mood}
        className="w-full rounded-full font-bold"
      >
        {isRegistered ? "수정하기" : "기록하기"}
      </Button>
    </div>
  );
}
