"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import type { Board, Card as CardType } from "@/types/kanban";
import {
  addCard,
  deleteCard,
  getColumnCards,
  moveCard,
  renameColumn,
} from "@/lib/board";
import { initialBoard } from "@/lib/dummy-data";
import { Column } from "./Column";

function findColumnId(board: Board, id: string): string | undefined {
  if (board.columns.some((column) => column.id === id)) return id;

  const card = board.cards.find((item) => item.id === id);
  return card?.columnId;
}

export function KanbanBoard() {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const card = board.cards.find((item) => item.id === event.active.id);
    setActiveCard(card ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCard(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const sourceColumnId = findColumnId(board, activeId);
    const targetColumnId = findColumnId(board, overId);
    if (!sourceColumnId || !targetColumnId) return;

    const targetCards = getColumnCards(board, targetColumnId);
    const overCardIndex = targetCards.findIndex((card) => card.id === overId);
    const targetIndex =
      overCardIndex === -1 ? targetCards.length : overCardIndex;

    setBoard((current) => moveCard(current, activeId, targetColumnId, targetIndex));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-6">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            cards={getColumnCards(board, column.id)}
            onRename={(columnId, title) =>
              setBoard((current) => renameColumn(current, columnId, title))
            }
            onAddCard={(columnId, title, details) =>
              setBoard((current) => addCard(current, columnId, title, details))
            }
            onDeleteCard={(cardId) =>
              setBoard((current) => deleteCard(current, cardId))
            }
          />
        ))}
      </div>

      <DragOverlay>
        {activeCard ? (
          <article className="w-72 rounded-lg border border-white/30 bg-black p-4 shadow-2xl">
            <h3 className="text-sm font-semibold tracking-wide text-white">
              {activeCard.title}
            </h3>
            <p className="mt-2 text-sm text-white/70">{activeCard.details}</p>
          </article>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
