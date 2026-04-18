"use client";

import { useState, useEffect } from "react";
import GoalList from "./GoalList";
import GoalDetail from "./GoalDetail";

const STORAGE_KEY = "minihub_goalTracker";

export interface Goal {
  id: string;
  name: string;
  startDate: string;
  duration: 30 | 50 | 100;
  checkins: string[];
}

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const addGoal = (data: Omit<Goal, "id" | "checkins">) => {
    const goal: Goal = { ...data, id: Date.now().toString(), checkins: [] };

    setGoals((prev) => [...prev, goal]);
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const toggleCheckin = (goalId: string, date: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const checkins = g.checkins.includes(date)
          ? g.checkins.filter((d) => d !== date)
          : [...g.checkins, date];
        return { ...g, checkins };
      }),
    );
  };

  const selectedGoal = goals.find((g) => g.id === selectedGoalId) ?? null;

  if (selectedGoal) {
    return (
      <GoalDetail
        goal={selectedGoal}
        onBack={() => setSelectedGoalId(null)}
        onToggleCheckin={toggleCheckin}
      />
    );
  }

  return (
    <GoalList
      goals={goals}
      onAddGoal={addGoal}
      onDeleteGoal={deleteGoal}
      onSelectGoal={setSelectedGoalId}
    />
  );
}
