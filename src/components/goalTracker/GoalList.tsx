"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal } from "./GoalTracker";

interface GoalListProps {
  goals: Goal[];
  onAddGoal: (data: Omit<Goal, "id" | "checkins">) => void;
  onDeleteGoal: (id: string) => void;
  onSelectGoal: (id: string) => void;
}

export default function GoalList({
  goals,
  onAddGoal,
  onDeleteGoal,
  onSelectGoal,
}: GoalListProps) {
  const [form, setForm] = useState<Omit<Goal, "id" | "checkins">>({
    name: "",
    startDate: "",
    duration: 30,
  });

  const handleAdd = () => {
    if (!form.name.trim() || !form.startDate) return;
    onAddGoal(form);
    setForm({ name: "", startDate: "", duration: 30 });
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Goal Tracker</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="w-[calc((100%-2rem)/3)] flex flex-col">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>새 목표 추가</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input
                placeholder="목표 이름"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                />
                <select
                  value={form.duration}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      duration: Number(e.target.value) as 30 | 50 | 100,
                    }))
                  }
                  className="border p-2 rounded-full cursor-pointer"
                >
                  <option value={30}>30일</option>
                  <option value={50}>50일</option>
                  <option value={100}>100일</option>
                </select>
              </div>
              <Button onClick={handleAdd}>추가</Button>
            </CardContent>
          </Card>
        </div>
        {goals.map((goal) => {
          const progress = Math.round(
            (goal.checkins.length / goal.duration) * 100,
          );
          return (
            <div
              key={goal.id}
              className="w-[calc((100%-2rem)/3)] flex flex-col"
            >
              <Card
                className="rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onSelectGoal(goal.id)}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold">{goal.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">시작일: {goal.startDate}</p>
                  <p className="text-sm">목표 기간: {goal.duration}일</p>
                  <p className="text-sm mt-1 text-blue-500 font-bold">
                    달성: {goal.checkins.length}/{goal.duration}일 ({progress}%)
                  </p>
                  <Button
                    variant="destructive"
                    className="mt-3 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteGoal(goal.id);
                    }}
                  >
                    삭제
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
