"use client";

import { useState, useEffect } from "react";
import AddCardForm from "./AddCardForm";
import BoardColumns from "./BoardColumns";

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

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setColumns(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const handleAddCard = (text: string, columnId: string) => {
    const newCard: TaskCard = { id: Date.now().toString(), text };
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col,
      ),
    );
  };

  const handleUpdateCard = (cardId: string, newText: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === cardId ? { ...card, text: newText } : card,
        ),
      })),
    );
  };

  const handleMoveCard = (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
  ) => {
    if (fromColumnId === toColumnId) return;

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

  const handleDeleteCard = (cardId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.filter((card) => card.id !== cardId),
      })),
    );
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>
      <AddCardForm columns={columns} onAddCard={handleAddCard} />
      <BoardColumns
        columns={columns}
        onUpdateCard={handleUpdateCard}
        onMoveCard={handleMoveCard}
        onDeleteCard={handleDeleteCard}
      />
    </div>
  );
}
