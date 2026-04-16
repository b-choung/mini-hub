'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const STORAGE_KEY = 'minihub_taskboard';

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
  { id: 'todo', title: 'To Do', cards: [] },
  { id: 'inprogress', title: 'In Progress', cards: [] },
  { id: 'done', title: 'Done', cards: [] },
];

export default function TaskBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newCardText, setNewCardText] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('todo');

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
    if (!newCardText.trim()) return;
    const newCard: TaskCard = { id: Date.now().toString(), text: newCardText };
    setColumns(prev => prev.map(col =>
      col.id === selectedColumn ? { ...col, cards: [...col.cards, newCard] } : col
    ));
    setNewCardText('');
  };

  const moveCard = (cardId: string, fromColumnId: string, toColumnId: string) => {
    setColumns(prev => {
      const fromCol = prev.find(c => c.id === fromColumnId);
      const toCol = prev.find(c => c.id === toColumnId);
      if (!fromCol || !toCol) return prev;
      const card = fromCol.cards.find(c => c.id === cardId);
      if (!card) return prev;
      return prev.map(col => {
        if (col.id === fromColumnId) {
          return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
        }
        if (col.id === toColumnId) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      });
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>
      <div className="mb-4 flex gap-2">
        <Input
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="새 카드 추가"
        />
        <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)} className="border p-2 rounded">
          {columns.map(col => <option key={col.id} value={col.id}>{col.title}</option>)}
        </select>
        <Button onClick={addCard}>추가</Button>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {columns.map(column => (
          <div key={column.id} className="flex-1 min-w-64">
            <Card>
              <CardHeader>
                <CardTitle>{column.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {column.cards.map(card => (
                  <div key={card.id} className="p-2 bg-gray-100 mb-2 rounded flex justify-between items-center">
                    <span>{card.text}</span>
                    <div className="flex gap-1">
                      {column.id !== 'todo' && <Button size="sm" variant="outline" onClick={() => moveCard(card.id, column.id, 'todo')}>←</Button>}
                      {column.id !== 'inprogress' && <Button size="sm" variant="outline" onClick={() => moveCard(card.id, column.id, 'inprogress')}>→</Button>}
                      {column.id !== 'done' && <Button size="sm" variant="outline" onClick={() => moveCard(card.id, column.id, 'done')}>→</Button>}
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