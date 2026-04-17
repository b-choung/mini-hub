"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/common/AppLayout";

const STORAGE_KEY = "minihub_moodTracker";

interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  note: string;
}

const moods = ["행복", "슬픔", "화남", "평온", "피곤", "흥분"];

export default function MoodTracker() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Omit<MoodEntry, "id">>({
    date: new Date().toISOString().split("T")[0],
    mood: "",
    note: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!newEntry.mood) return;
    const entry: MoodEntry = { ...newEntry, id: Date.now().toString() };
    setEntries((prev) => [entry, ...prev]);
    setNewEntry({
      date: new Date().toISOString().split("T")[0],
      mood: "",
      note: "",
    });
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <AppLayout title="Mood Tracker">
      <Card className="mb-4 rounded-2xl">
        <CardHeader>
          <CardTitle>새 기분 기록</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            type="date"
            value={newEntry.date}
            onChange={(e) =>
              setNewEntry((prev) => ({ ...prev, date: e.target.value }))
            }
          />
          <div className="flex gap-2 flex-wrap">
            {moods.map((mood) => (
              <Button
                key={mood}
                variant={newEntry.mood === mood ? "default" : "outline"}
                onClick={() => setNewEntry((prev) => ({ ...prev, mood }))}
              >
                {mood}
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="메모"
            value={newEntry.note}
            onChange={(e) =>
              setNewEntry((prev) => ({ ...prev, note: e.target.value }))
            }
          />
          <Button onClick={addEntry}>기록</Button>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex justify-between">
                {entry.date} - {entry.mood}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteEntry(entry.id)}
                >
                  삭제
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{entry.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
