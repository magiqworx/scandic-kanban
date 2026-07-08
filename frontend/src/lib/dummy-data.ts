import type { Board } from "@/types/kanban";

export const COLUMN_IDS = [
  "backlog",
  "todo",
  "in-progress",
  "review",
  "done",
] as const;

export const initialBoard: Board = {
  columns: [
    { id: "backlog", title: "Backlog" },
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ],
  cards: [
    {
      id: "card-1",
      columnId: "backlog",
      title: "Research competitors",
      details: "Review three similar products and note UX patterns.",
    },
    {
      id: "card-2",
      columnId: "backlog",
      title: "Define MVP scope",
      details: "Lock features for the first release.",
    },
    {
      id: "card-3",
      columnId: "todo",
      title: "Design board layout",
      details: "Wireframe the five-column Scandinavian layout.",
    },
    {
      id: "card-4",
      columnId: "todo",
      title: "Set up project repo",
      details: "Initialize Next.js app and tooling.",
    },
    {
      id: "card-5",
      columnId: "in-progress",
      title: "Build drag and drop",
      details: "Implement card movement between columns.",
    },
    {
      id: "card-6",
      columnId: "in-progress",
      title: "Style components",
      details: "Apply black background and white typography.",
    },
    {
      id: "card-7",
      columnId: "review",
      title: "Write unit tests",
      details: "Cover board state helpers.",
    },
    {
      id: "card-8",
      columnId: "done",
      title: "Populate dummy data",
      details: "Seed the board with sample cards on load.",
    },
  ],
};
