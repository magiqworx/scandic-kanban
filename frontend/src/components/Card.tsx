"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card as CardType } from "@/types/kanban";

type CardProps = {
  card: CardType;
  onDelete: (cardId: string) => void;
};

export function Card({ card, onDelete }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: "card", columnId: card.columnId } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`group rounded-lg border border-white/15 bg-white/5 p-4 transition-colors hover:border-white/30 ${
        isDragging ? "opacity-40" : ""
      }`}
      data-testid={`card-${card.id}`}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <button
          type="button"
          className="cursor-grab text-left text-sm font-semibold tracking-wide text-white active:cursor-grabbing"
          {...attributes}
          {...listeners}
          aria-label={`Drag ${card.title}`}
        >
          {card.title}
        </button>
        <button
          type="button"
          onClick={() => onDelete(card.id)}
          className="shrink-0 rounded px-2 py-0.5 text-xs uppercase tracking-widest text-white/40 opacity-0 transition hover:bg-white/10 hover:text-white group-hover:opacity-100"
          aria-label={`Delete ${card.title}`}
        >
          Delete
        </button>
      </div>
      <p className="text-sm leading-relaxed text-white/70">{card.details}</p>
    </article>
  );
}
