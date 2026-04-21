"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import { Memo } from "./MemoApp";

interface MemoCardProps {
  memo: Memo;
  isEditing: boolean;
  onStartEdit: () => void;
  onSave: () => void;
  onUpdate: (updates: Partial<Memo>) => void;
  onDelete: () => void;
}

export default function MemoCard({
  memo,
  isEditing,
  onStartEdit,
  onSave,
  onUpdate,
  onDelete,
}: MemoCardProps) {
  return (
    <Card className="rounded-2xl relative">
      <button
        className="absolute top-4 right-1.5 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        onClick={onDelete}
      >
        <MdDelete size={18} />
      </button>
      <CardHeader className="pr-10">
        {isEditing ? (
          <Input
            value={memo.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
        ) : (
          <CardTitle className="text-left text-base">{memo.title}</CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              placeholder="내용을 입력하세요"
              value={memo.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              rows={4}
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                className="rounded-full font-bold"
                onClick={onSave}
              >
                저장
              </Button>
            </div>
          </div>
        ) : (
          <div className="cursor-pointer" onClick={onStartEdit}>
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
  );
}
