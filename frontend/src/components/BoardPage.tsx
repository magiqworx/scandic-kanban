"use client";

import dynamic from "next/dynamic";

const KanbanBoard = dynamic(
  () => import("@/components/KanbanBoard").then((mod) => mod.KanbanBoard),
  { ssr: false },
);

export function BoardPage() {
  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <header className="mb-10 border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/40">
          Project Board
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-white">
          Kanban
        </h1>
      </header>
      <KanbanBoard />
    </div>
  );
}
