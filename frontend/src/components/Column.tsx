"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, KeyboardEvent } from "react";
import type { Card as CardType, Column as ColumnType } from "@/types/kanban";
import { AddCardForm } from "./AddCardForm";
import { Card } from "./Card";

type ColumnProps = {
  column: ColumnType;
  cards: CardType[];
  onRename: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
};

export function Column({
  column,
  cards,
  onRename,
  onAddCard,
  onDeleteCard,
}: ColumnProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column", columnId: column.id },
  });

  function commitTitle() {
    const nextTitle = title.trim() || column.title;
    setTitle(nextTitle);
    onRename(column.id, nextTitle);
    setEditing(false);
  }

  function handleTitleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") commitTitle();
    if (event.key === "Escape") {
      setTitle(column.title);
      setEditing(false);
    }
  }

  return (
    <section
      className="flex w-72 shrink-0 flex-col"
      data-testid={`column-${column.id}`}
    >
      <header className="mb-4 border-b border-white/20 pb-3">
        {editing ? (
          <input
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={commitTitle}
            onKeyDown={handleTitleKeyDown}
            className="w-full bg-transparent text-sm font-semibold uppercase tracking-[0.2em] text-white outline-none"
            aria-label="Column title"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="w-full text-left text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:text-white/80"
            aria-label={`Rename ${column.title}`}
          >
            {column.title}
          </button>
        )}
        <p className="mt-1 text-xs uppercase tracking-widest text-white/40">
          {cards.length} {cards.length === 1 ? "card" : "cards"}
        </p>
      </header>

      <div
        ref={setNodeRef}
        className={`flex min-h-48 flex-1 flex-col gap-3 rounded-xl border p-3 transition-colors ${
          isOver ? "border-white/40 bg-white/5" : "border-white/10 bg-white/[0.02]"
        }`}
      >
        <SortableContext
          items={cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} onDelete={onDeleteCard} />
          ))}
        </SortableContext>
        <AddCardForm
          onAdd={(cardTitle, details) => onAddCard(column.id, cardTitle, details)}
        />
      </div>
    </section>
  );
}
