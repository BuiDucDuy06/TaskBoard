import { useState } from "react";

type TaskFormProps = {
  onAdd: (title: string) => void;
};

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title không được để trống.");
      return;
    }

    onAdd(trimmedTitle);
    setTitle("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl gap-3">
      <input
        className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
        placeholder="Enter task title..."
      />

      <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500 active:scale-95">Add Task</button>

      {error && <p>{error}</p>}
    </form>
  );
}
