"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdAdd } from "react-icons/md";
import { Column } from "./TaskBoard";

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
    <form className="mb-4 flex gap-2 items-center" onSubmit={handleSubmit}>
      <select
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
        className="h-8 border px-2.5 rounded-lg text-sm outline-none focus:outline-none"
      >
        {columns.map((col) => (
          <option key={col.id} value={col.id}>
            {col.title}
          </option>
        ))}
      </select>
      <Input
        value={newCardText}
        onChange={(e) => setNewCardText(e.target.value)}
        placeholder="새 카드 추가"
      />
      <Button type="submit" size="icon"><MdAdd /></Button>
    </form>
  );
}
