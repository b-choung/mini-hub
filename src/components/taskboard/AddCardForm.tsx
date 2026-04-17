"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Column {
  id: string;
  title: string;
}

interface AddCardFormProps {
  columns: Column[];
  onAddCard: (text: string, columnId: string) => void;
}

export default function AddCardForm({ columns, onAddCard }: AddCardFormProps) {
  const [newCardText, setNewCardText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("todo");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cardText = newCardText.trim();
    if (!cardText) return;

    onAddCard(cardText, selectedColumn);
    setNewCardText("");
  };

  return (
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
  );
}
