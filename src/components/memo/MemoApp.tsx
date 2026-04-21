"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdAdd } from "react-icons/md";
import MemoCard from "./MemoCard";
import { useLocalStorage } from "@/lib/useLocalStorage";

const STORAGE_KEY = "minihub_memo";

export interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function MemoApp() {
  const [memos, setMemos] = useLocalStorage<Memo[]>(STORAGE_KEY, []);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addMemo = () => {
    const memo: Memo = {
      id: Date.now().toString(),
      title: "새 메모",
      content: "",
      createdAt: new Date().toISOString(),
    };
    setMemos((prev) => [memo, ...prev]);
    setEditingId(memo.id);
  };

  const updateMemo = (id: string, updates: Partial<Memo>) => {
    setMemos((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    );
  };

  const deleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((m) => m.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <div className="px-4 py-12">
      <div className="max-w-225 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display">Memo</h1>
          <Button size="icon" className="rounded-full" onClick={addMemo}>
            <MdAdd />
          </Button>
        </div>
        {memos.length === 0 && (
          <p className="text-center text-gray-400 mt-16">
            새 메모를 작성해보세요
          </p>
        )}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {memos.map((memo) => (
            <div key={memo.id} className="break-inside-avoid mb-4">
              <MemoCard
                memo={memo}
                isEditing={editingId === memo.id}
                onStartEdit={() => setEditingId(memo.id)}
                onSave={() => setEditingId(null)}
                onUpdate={(updates) => updateMemo(memo.id, updates)}
                onDelete={() => deleteMemo(memo.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
