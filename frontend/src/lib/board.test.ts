import { describe, expect, it } from "vitest";
import {
  addCard,
  deleteCard,
  getColumnCards,
  moveCard,
  renameColumn,
} from "@/lib/board";
import { initialBoard } from "@/lib/dummy-data";

describe("board helpers", () => {
  it("renames a column", () => {
    const board = renameColumn(initialBoard, "todo", "Ready");

    expect(board.columns.find((column) => column.id === "todo")?.title).toBe(
      "Ready",
    );
  });

  it("adds a card to a column", () => {
    const board = addCard(initialBoard, "todo", "New task", "Some details");

    expect(getColumnCards(board, "todo")).toHaveLength(3);
    expect(getColumnCards(board, "todo").at(-1)).toMatchObject({
      title: "New task",
      details: "Some details",
      columnId: "todo",
    });
  });

  it("deletes a card", () => {
    const board = deleteCard(initialBoard, "card-3");

    expect(board.cards.some((card) => card.id === "card-3")).toBe(false);
    expect(getColumnCards(board, "todo")).toHaveLength(1);
  });

  it("moves a card to another column", () => {
    const board = moveCard(initialBoard, "card-3", "done");

    expect(getColumnCards(board, "todo").some((card) => card.id === "card-3")).toBe(
      false,
    );
    expect(getColumnCards(board, "done").some((card) => card.id === "card-3")).toBe(
      true,
    );
  });

  it("moves a card within a column at a specific index", () => {
    const board = moveCard(initialBoard, "card-3", "todo", 0);
    const todoCards = getColumnCards(board, "todo");

    expect(todoCards[0]?.id).toBe("card-3");
  });
});

describe("initial board", () => {
  it("has five fixed columns", () => {
    expect(initialBoard.columns).toHaveLength(5);
  });

  it("loads dummy cards", () => {
    expect(initialBoard.cards.length).toBeGreaterThan(0);
  });
});
