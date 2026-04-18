"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdAdd, MdDelete } from "react-icons/md";

const STORAGE_KEY = "minihub_memo";

interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function MemoApp() {
  const [memos, setMemos] = useState<Memo[]>([]);
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
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Memo</h1>
          <Button size="icon" className="rounded-full" onClick={addMemo}>
            <MdAdd />
          </Button>
        </div>
        {memos.length === 0 && (
          <p className="text-center text-gray-400 mt-16">새 메모를 작성해보세요</p>
        )}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {memos.map((memo) => (
            <div key={memo.id} className="break-inside-avoid mb-4">
              <Card className="rounded-2xl relative">
                <button
                  className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  onClick={() => deleteMemo(memo.id)}
                >
                  <MdDelete size={18} />
                </button>
                <CardHeader className="pr-10">
                  {editingId === memo.id ? (
                    <Input
                      value={memo.title}
                      onChange={(e) =>
                        updateMemo(memo.id, { title: e.target.value })
                      }
                    />
                  ) : (
                    <CardTitle className="text-left text-base">
                      {memo.title}
                    </CardTitle>
                  )}
                </CardHeader>
                <CardContent>
                  {editingId === memo.id ? (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="내용을 입력하세요"
                        value={memo.content}
                        onChange={(e) =>
                          updateMemo(memo.id, { content: e.target.value })
                        }
                        rows={4}
                      />
                      <Button
                        size="sm"
                        className="rounded-full font-bold"
                        onClick={() => setEditingId(null)}
                      >
                        저장
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => setEditingId(memo.id)}
                    >
                      <p className="text-sm text-left text-gray-500 whitespace-pre-wrap">
                        {memo.content || "내용을 입력하려면 클릭하세요"}
                      </p>
                      <p className="text-xs text-gray-400 mt-4 text-left">
                        {new Date(memo.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
