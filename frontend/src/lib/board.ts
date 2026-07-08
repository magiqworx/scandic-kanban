import type { Board, Card } from "@/types/kanban";

export function renameColumn(
  board: Board,
  columnId: string,
  title: string,
): Board {
  return {
    ...board,
    columns: board.columns.map((column) =>
      column.id === columnId ? { ...column, title } : column,
    ),
  };
}

export function addCard(
  board: Board,
  columnId: string,
  title: string,
  details: string,
): Board {
  const card: Card = {
    id: `card-${crypto.randomUUID()}`,
    columnId,
    title: title.trim(),
    details: details.trim(),
  };

  return {
    ...board,
    cards: [...board.cards, card],
  };
}

export function deleteCard(board: Board, cardId: string): Board {
  return {
    ...board,
    cards: board.cards.filter((card) => card.id !== cardId),
  };
}

export function moveCard(
  board: Board,
  cardId: string,
  targetColumnId: string,
  targetIndex?: number,
): Board {
  const card = board.cards.find((item) => item.id === cardId);
  if (!card) return board;

  const remaining = board.cards.filter((item) => item.id !== cardId);
  const columnCards = remaining.filter(
    (item) => item.columnId === targetColumnId,
  );
  const otherCards = remaining.filter(
    (item) => item.columnId !== targetColumnId,
  );

  const updatedCard = { ...card, columnId: targetColumnId };
  const index =
    targetIndex === undefined
      ? columnCards.length
      : Math.max(0, Math.min(targetIndex, columnCards.length));

  columnCards.splice(index, 0, updatedCard);

  return {
    ...board,
    cards: [...otherCards, ...columnCards],
  };
}

export function getColumnCards(board: Board, columnId: string): Card[] {
  return board.cards.filter((card) => card.columnId === columnId);
}
