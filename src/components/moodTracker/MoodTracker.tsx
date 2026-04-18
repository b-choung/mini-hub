"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/common/AppLayout";
import MoodForm, { MoodEntry } from "./MoodForm";
import MoodChart from "./MoodChart";
import MoodCalendar from "./MoodCalendar";

const STORAGE_KEY = "minihub_moodTracker";

export default function MoodTracker() {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: MoodEntry) => {
    setEntries((prev) => {
      const filtered = prev.filter((e) => e.date !== entry.date);
      return [entry, ...filtered];
    });
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <AppLayout title="Mood Tracker">
      <div className="max-w-lg mx-auto">
        <MoodForm
          onAdd={addEntry}
          registeredDates={new Set(entries.map((e) => e.date))}
        />
        <MoodCalendar entries={entries} onDelete={deleteEntry} />
        <MoodChart entries={entries} />
      </div>
    </AppLayout>
  );
}
