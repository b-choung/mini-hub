"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STORAGE_KEY = "minihub_goalTracker";

interface Goal {
  id: string;
  name: string;
  description: string;
  deadline: string;
  progress: number;
}

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id">>({
    name: "",
    description: "",
    deadline: "",
    progress: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setGoals(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!newGoal.name.trim()) return;
    const goal: Goal = { ...newGoal, id: Date.now().toString() };
    setGoals((prev) => [...prev, goal]);
    setNewGoal({ name: "", description: "", deadline: "", progress: 0 });
  };

  const updateProgress = (id: string, progress: number) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, progress } : g)));
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Goal Tracker</h1>
      <Card className="mb-4 rounded-2xl">
        <CardHeader>
          <CardTitle>새 목표 추가</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="목표 이름"
            value={newGoal.name}
            onChange={(e) =>
              setNewGoal((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Textarea
            placeholder="설명"
            value={newGoal.description}
            onChange={(e) =>
              setNewGoal((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <Input
            type="date"
            value={newGoal.deadline}
            onChange={(e) =>
              setNewGoal((prev) => ({ ...prev, deadline: e.target.value }))
            }
          />
          <Button onClick={addGoal}>추가</Button>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex justify-between">
                {goal.name}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteGoal(goal.id)}
                >
                  삭제
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{goal.description}</p>
              <p className="mb-2">마감일: {goal.deadline}</p>
              <div className="mb-2">
                <label>진행률: {goal.progress}%</label>
                <Slider
                  value={[goal.progress]}
                  onValueChange={(value) => updateProgress(goal.id, value[0])}
                  max={100}
                  step={1}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
