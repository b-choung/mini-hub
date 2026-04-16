"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STORAGE_KEY = "minihub_taskboard";

interface TaskCard {
  id: string;
  text: string;
}

interface Column {
  id: string;
  title: string;
  cards: TaskCard[];
}

const initialColumns: Column[] = [
  { id: "todo", title: "To Do", cards: [] },
  { id: "inprogress", title: "In Progress", cards: [] },
  { id: "done", title: "Done", cards: [] },
];

export default function TaskBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newCardText, setNewCardText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("todo");
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [draggedCard, setDraggedCard] = useState<{
    cardId: string;
    fromColumnId: string;
  } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setColumns(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addCard = () => {
    const cardText = newCardText.trim();
    if (!cardText) return;

    const newCard: TaskCard = { id: Date.now().toString(), text: cardText };
    setColumns((prev) =>
      prev.map((col) =>
        col.id === selectedColumn
          ? { ...col, cards: [...col.cards, newCard] }
          : col,
      ),
    );
    setNewCardText("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCard();
  };

  const updateCardText = (cardId: string, newText: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === cardId ? { ...card, text: newText } : card,
        ),
      })),
    );
  };

  const moveCard = (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
  ) => {
    setColumns((prev) => {
      const fromCol = prev.find((c) => c.id === fromColumnId);
      const toCol = prev.find((c) => c.id === toColumnId);
      if (!fromCol || !toCol) return prev;
      const card = fromCol.cards.find((c) => c.id === cardId);
      if (!card) return prev;
      return prev.map((col) => {
        if (col.id === fromColumnId) {
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        if (col.id === toColumnId) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      });
    });
  };

  const deleteCard = (cardId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.filter((card) => card.id !== cardId),
      })),
    );
  };

  const startEdit = (cardId: string, text: string) => {
    setEditingCardId(cardId);
    setEditingText(text);
  };

  const saveEdit = (cardId: string) => {
    if (!editingText.trim()) return;
    updateCardText(cardId, editingText);
    setEditingCardId(null);
    setEditingText("");
  };

  const handleDragStart = (cardId: string, fromColumnId: string) => {
    setDraggedCard({ cardId, fromColumnId });
  };

  const handleDrop = (toColumnId: string) => {
    if (draggedCard) {
      moveCard(draggedCard.cardId, draggedCard.fromColumnId, toColumnId);
      setDraggedCard(null);
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>
      <form className="mb-4 flex gap-2" onSubmit={handleSubmit}>
        <Input
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="새 카드 추가"
        />
        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className="border p-2 rounded"
        >
          {columns.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
        </select>
        <Button type="submit">추가</Button>
      </form>
      <div className="flex gap-4 overflow-x-auto">
        {columns.map((column) => (
          <div key={column.id} className="flex-1 min-w-64">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>{column.title}</CardTitle>
              </CardHeader>
              <CardContent
                className="min-h-[160px]"
                onDragOver={(e) => e.preventDefault()}
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
                        onClick={() => deleteCard(card.id)}
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
    </div>
  );
}
