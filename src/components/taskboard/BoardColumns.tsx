"use client";

import { DragEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdEdit, MdDelete } from "react-icons/md";

interface TaskCard {
  id: string;
  text: string;
}

interface Column {
  id: string;
  title: string;
  cards: TaskCard[];
}

interface BoardColumnsProps {
  columns: Column[];
  onUpdateCard: (cardId: string, newText: string) => void;
  onMoveCard: (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
  ) => void;
  onDeleteCard: (cardId: string) => void;
}

export default function BoardColumns({
  columns,
  onUpdateCard,
  onMoveCard,
  onDeleteCard,
}: BoardColumnsProps) {
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [draggedCard, setDraggedCard] = useState<{
    cardId: string;
    fromColumnId: string;
  } | null>(null);

  const startEdit = (cardId: string, text: string) => {
    setEditingCardId(cardId);
    setEditingText(text);
  };

  const saveEdit = (cardId: string) => {
    if (!editingText.trim()) return;
    onUpdateCard(cardId, editingText);
    setEditingCardId(null);
    setEditingText("");
  };

  const handleDragStart = (cardId: string, columnId: string) => {
    setDraggedCard({ cardId, fromColumnId: columnId });
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (toColumnId: string) => {
    if (draggedCard) {
      onMoveCard(draggedCard.cardId, draggedCard.fromColumnId, toColumnId);
      setDraggedCard(null);
    }
  };

  const columnAccents: Record<string, string> = {
    todo: "border-l-4 border-blue-400",
    inprogress: "border-l-4 border-amber-400",
    done: "border-l-4 border-green-400",
  };

  return (
    <div className="flex gap-4 overflow-x-auto">
      {columns.map((column) => (
        <div key={column.id} className="flex-1 min-w-64">
          <Card className="rounded-2xl ring-0 shadow-none">
            <CardHeader className="pb-6">
              <CardTitle className="font-bold">{column.title}</CardTitle>
            </CardHeader>
            <CardContent
              className="min-h-40 pb-16"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              {column.cards.length === 0 && (
                <div className="py-8 text-sm text-muted-foreground">
                  카드를 드롭하세요
                </div>
              )}
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className={`group p-3 bg-white mb-2 rounded-2xl flex flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between shadow-sm hover:shadow-md transition-all cursor-grab ${columnAccents[column.id] ?? ""} ${draggedCard?.cardId === card.id ? "opacity-50" : ""}`}
                  draggable
                  onDragStart={() => handleDragStart(card.id, column.id)}
                >
                  <div className="flex-1">
                    {editingCardId === card.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <Button size="sm" onClick={() => saveEdit(card.id)}>
                          저장
                        </Button>
                      </div>
                    ) : (
                      <span>{card.text}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!editingCardId && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8"
                        onClick={() => startEdit(card.id, card.text)}
                      >
                        <MdEdit />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="destructive"
                      className="size-8"
                      onClick={() => onDeleteCard(card.id)}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
