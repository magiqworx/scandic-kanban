"use client";

import { FormEvent, useState } from "react";

type AddCardFormProps = {
  onAdd: (title: string, details: string) => void;
};

export function AddCardForm({ onAdd }: AddCardFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    onAdd(title, details);
    setTitle("");
    setDetails("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border border-dashed border-white/20 px-3 py-2 text-sm uppercase tracking-widest text-white/50 transition hover:border-white/40 hover:text-white"
      >
        Add card
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-lg border border-white/15 bg-black p-3"
    >
      <input
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        className="w-full rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-white/50"
        aria-label="Card title"
      />
      <textarea
        value={details}
        onChange={(event) => setDetails(event.target.value)}
        placeholder="Details"
        rows={3}
        className="w-full resize-none rounded border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-white/50"
        aria-label="Card details"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-white/90"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setTitle("");
            setDetails("");
          }}
          className="rounded px-3 py-1.5 text-xs uppercase tracking-widest text-white/50 transition hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
