"use client";

import { DragEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <div className="flex gap-4 overflow-x-auto">
      {columns.map((column) => (
        <div key={column.id} className="flex-1 min-w-64">
          <Card className="rounded-2xl border-none">
            <CardHeader>
              <CardTitle>{column.title}</CardTitle>
            </CardHeader>
            <CardContent
              className="min-h-40"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
            >
              {column.cards.length === 0 && (
                <div className="py-8 text-sm text-muted-foreground">
                  카드를 여기에 드롭하세요
                </div>
              )}
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className="p-2 bg-gray-100 mb-2 rounded-2xl flex flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between"
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
                  <div className="flex flex-wrap justify-end gap-2">
                    {!editingCardId && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(card.id, card.text)}
                      >
                        ✏️
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDeleteCard(card.id)}
                    >
                      🗑️
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
