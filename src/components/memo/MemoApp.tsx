"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STORAGE_KEY = "minihub_memo";

interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function MemoApp() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [newMemo, setNewMemo] = useState<Omit<Memo, "id" | "createdAt">>({
    title: "",
    content: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMemos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  }, [memos]);

  const addMemo = () => {
    if (!newMemo.title.trim()) return;
    const memo: Memo = {
      ...newMemo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setMemos((prev) => [memo, ...prev]);
    setNewMemo({ title: "", content: "" });
  };

  const updateMemo = (id: string, updates: Partial<Memo>) => {
    setMemos((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    );
  };

  const deleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((m) => m.id !== id));
  };

  const startEditing = (id: string) => {
    setEditingId(id);
  };

  const saveEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Memo</h1>
      <Card className="mb-4 rounded-2xl">
        <CardHeader>
          <CardTitle>새 메모</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="제목"
            value={newMemo.title}
            onChange={(e) =>
              setNewMemo((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Textarea
            placeholder="내용"
            value={newMemo.content}
            onChange={(e) =>
              setNewMemo((prev) => ({ ...prev, content: e.target.value }))
            }
          />
          <Button onClick={addMemo}>추가</Button>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        {memos.map((memo) => (
          <Card key={memo.id} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex justify-between">
                {editingId === memo.id ? (
                  <Input
                    value={memo.title}
                    onChange={(e) =>
                      updateMemo(memo.id, { title: e.target.value })
                    }
                  />
                ) : (
                  memo.title
                )}
                <div className="flex gap-2">
                  {editingId === memo.id ? (
                    <Button size="sm" onClick={saveEdit}>
                      저장
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEditing(memo.id)}
                    >
                      편집
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMemo(memo.id)}
                  >
                    삭제
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingId === memo.id ? (
                <Textarea
                  value={memo.content}
                  onChange={(e) =>
                    updateMemo(memo.id, { content: e.target.value })
                  }
                />
              ) : (
                <p>{memo.content}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                생성일: {new Date(memo.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
