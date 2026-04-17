"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal } from "./GoalTracker";
import AppLayout from "@/components/common/AppLayout";
import { MdDelete } from "react-icons/md";

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
    <AppLayout title="Goal Tracker">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col h-full">
          <Card className="rounded-2xl border-2 border-dashed bg-gray-50 shadow-none h-full">
            <CardHeader>
              <CardTitle className="text-base text-gray-500">
                새 목표 추가
              </CardTitle>
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
                  className="border p-2 rounded-full cursor-pointer outline-none focus:outline-none"
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
            <div key={goal.id} className="flex flex-col h-full">
              <Card
                className="rounded-2xl cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all relative h-full"
                onClick={() => onSelectGoal(goal.id)}
              >
                <button
                  className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteGoal(goal.id);
                  }}
                >
                  <MdDelete size={18} />
                </button>
                <CardHeader className="pr-10">
                  <CardTitle className="text-lg font-bold text-left">
                    {goal.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-left">시작일: {goal.startDate}</p>
                  <p className="text-sm text-left">
                    목표 기간: {goal.duration}일
                  </p>
                  <div className="mt-10 mb-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-blue-500 font-bold text-right">
                    {goal.checkins.length}/{goal.duration}일 ({progress}%)
                  </p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
