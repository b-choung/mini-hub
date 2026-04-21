"use client";

import AppLayout from "@/components/common/AppLayout";
import MoodForm, { MoodEntry } from "./MoodForm";
import MoodChart from "./MoodChart";
import MoodCalendar from "./MoodCalendar";
import MoodReview from "./MoodReview";
import { useLocalStorage } from "@/lib/useLocalStorage";

const STORAGE_KEY = "minihub_moodTracker";

export default function MoodTracker() {
  const [entries, setEntries] = useLocalStorage<MoodEntry[]>(STORAGE_KEY, []);

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
        <MoodReview entries={entries} />
      </div>
    </AppLayout>
  );
}
